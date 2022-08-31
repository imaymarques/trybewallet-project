import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        Table
        <table>
          <thead>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </thead>
          <tbody>
            {expenses.map((el, index) => (

              <tr key={ index }>
                <td>{el.description}</td>
                <td>{el.tag}</td>
                <td>{el.method}</td>
                <td>
                  {
                    el.value === '' ? '0.00' : parseFloat(el.value).toFixed(2)
                  }
                </td>
                <td>{el.exchangeRates[el.currency].name}</td>
                <td>
                  {
                    parseFloat(el.exchangeRates[el.currency].ask).toFixed(2)
                  }

                </td>
                <td>
                  {parseFloat(el.exchangeRates[el.currency]
                    .ask * el.value).toFixed(2)}
                </td>
                <td>Real brasileiro</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

export default connect(mapStateToProps, null)(Table);
