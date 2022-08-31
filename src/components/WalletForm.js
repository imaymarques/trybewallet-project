import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrencies } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      payment: 'Dinheiro',
      category: 'Alimentação',
      amount: '',
      description: '',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  inputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  // handleClick = () => {

  // }

  render() {
    const { currencies } = this.props;
    const { payment, category, amount, description } = this.state;
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
          <select data-testid="currency-input" name="coins" onChange={ this.inputChange }>
            {currencies.map((curr) => (
              <option key={ curr } value={ curr }>{ curr }</option>
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
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
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
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
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
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
