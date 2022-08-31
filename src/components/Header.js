import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
      <div className="header-page">
        <header>
          <p data-testid="email-field">{ `Email: ${email}` }</p>
          <div>
            Despesas Totais:
            <p data-testid="total-field">{ this.expenseSum() }</p>
          </div>
          <p data-testid="header-currency-field">Câmbio: BRL</p>
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
