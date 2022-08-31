import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteButton } from '../redux/actions';

class Table extends Component {
  removeButton = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteButton(id));
  };

  render() {
    const { expenses } = this.props;
    console.log(expenses);
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
            {expenses.map((el) => (

              <tr key={ el.id }>
                <td>{el.description}</td>
                <td>{el.tag}</td>
                <td>{el.method}</td>
                <td>
                  {
                    el.value === '' ? '0.00' : Number(el.value).toFixed(2)
                  }
                </td>
                <td>{el.exchangeRates[el.currency].name}</td>
                <td>
                  {
                    Number(el.exchangeRates[el.currency].ask).toFixed(2)
                  }

                </td>
                <td>
                  {Number(el.exchangeRates[el.currency]
                    .ask * el.value).toFixed(2)}
                </td>
                <td>Real brasileiro</td>
                <td>
                  <button
                    type="button"
                    onClick={ () => this.removeButton(el.id) }
                    data-testid="delete-btn"
                  >
                    Excluir

                  </button>
                </td>
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
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, null)(Table);
