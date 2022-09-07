import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, response, editField } from '../redux/actions';
import './walletForm.css';

const food = 'Alimentação';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      payment: 'Dinheiro',
      category: food,
      amount: '',
      description: '',
      coins: 'USD',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  inputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleClick = async () => {
    const { payment, category, amount, description, coins } = this.state;
    const { dispatch, expenses, editor } = this.props;
    const fetchAPI = await fetch('https://economia.awesomeapi.com.br/json/all');
    const API = await fetchAPI.json();
    const amountDescripton = {
      id: expenses.length, // se quebrar é por causa do length
      method: payment,
      tag: category,
      value: amount,
      description,
      currency: coins,
      exchangeRates: API,
    };
    if (!editor) {
      dispatch(response(amountDescripton));
      this.setState({
        payment: 'Dinheiro',
        category: food,
        amount: '',
        description: '',
        coins: 'USD',
      });
    }
    if (editor) {
      dispatch(editField({
        method: payment,
        tag: category,
        value: amount,
        description,
        currency: coins,
        exchangeRates: API,
      }));
      this.setState({
        payment: 'Dinheiro',
        category: food,
        amount: '',
        description: '',
        coins: 'USD',
      });
    }
  };

  render() {
    const { currencies, editor } = this.props;
    const { payment, category, amount, description, coins } = this.state;
    return (
      <div className="WalletForm">
        <label htmlFor="value-input">
          Valor:
          <input
            className="value-input"
            data-testid="value-input"
            type="number"
            name="amount"
            value={ amount }
            onChange={ this.inputChange }
          />
        </label>
        <label htmlFor="currency">
          Moeda:
          <select
            className="coin-input"
            data-testid="currency-input"
            name="coins"
            onChange={ this.inputChange }
            value={ coins }
          >
            {currencies.map((curr) => (
              <option key={ curr }>{ curr }</option>
            ))}
          </select>
        </label>
        <label htmlFor="payment">
          Método de pagamento:
          <select
            className="payment-input"
            data-testid="method-input"
            name="payment"
            value={ payment }
            onChange={ this.inputChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="category">
          Categoria:
          <select
            className="category-input"
            data-testid="tag-input"
            name="category"
            value={ category }
            onChange={ this.inputChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <label htmlFor="description">
          Descrição:
          <input
            className="description-input"
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ this.inputChange }
          />
        </label>
        <button
          className="add-input"
          type="button"
          onClick={ this.handleClick }
        >
          { editor ? 'Editar despesa' : 'Adicionar despesa' }
        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  editor: PropTypes.bool.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(WalletForm);
