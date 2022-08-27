import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div className="header-page">
        <header>
          <p data-testid="email-field">{ `Email: ${email}` }</p>
          <p data-testid="total-field">Despesas Totais: 0</p>
          <p data-testid="header-currency-field">Câmbio: BRL</p>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
