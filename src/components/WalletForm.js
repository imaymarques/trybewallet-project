import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies, response } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      payment: 'Dinheiro',
      category: 'Alimentação',
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
    const { dispatch, expenses } = this.props;
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
    dispatch(response(amountDescripton));
    this.setState({
      payment: 'Dinheiro',
      category: 'Alimentação',
      amount: '',
      description: '',
      coins: 'USD',
    });
  };

  render() {
    const { currencies } = this.props;
    const { payment, category, amount, description, coins } = this.state;
    return (
      <div className="WalletForm">
        <label htmlFor="value-input">
          Valor:
          <input
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
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ this.inputChange }
          />
        </label>
        <button type="button" onClick={ this.handleClick }>Adicionar Despesas</button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(WalletForm);
