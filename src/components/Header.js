import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './header.css';

class Header extends Component {
  expenseSum = () => {
    const { expenses } = this.props;
    const sum = expenses
      .reduce((acc, { value, currency, exchangeRates }) => acc + (exchangeRates[currency]
        .ask * value), 0).toFixed(2);
    return sum;
  };

  render() {
    const { email } = this.props;
    return (
      <div
        className="header-page"
      >
        <div className="simbol-wallet">
          <img
            src="https://www.clipartmax.com/png/full/212-2120379_coin-wallet-icon-icon-wallet-png.png"
            alt="wallet"
            className="wallet-img-header"
          />
          <div className="tybewallet">TrybeWallet</div>
        </div>
        <header>
          <p data-testid="email-field">{ `Email: ${email}` }</p>
          <div>
            Despesas Totais:
            <p data-testid="total-field">{ this.expenseSum() }</p>
          </div>
          <p data-testid="header-currency-field">BRL</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.objectOf(PropTypes.string.isRequired),
}.isRequired;

export default connect(mapStateToProps)(Header);
