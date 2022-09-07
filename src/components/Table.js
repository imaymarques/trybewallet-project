import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteButton, editButton } from '../redux/actions';
import './table.css';

class Table extends Component {
  removeButton = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteButton(id));
  };

  editButton = (id) => {
    const { dispatch } = this.props;
    dispatch(editButton(id));
  };

  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <div className="table-names">
        <table>
          <thead>
            <th className="des">Descrição</th>
            <th className="tag-el">Tag</th>
            <th className="met">Método de pagamento</th>
            <th className="val">Valor</th>
            <th className="coin-el">Moeda</th>
            <th className="cam">Câmbio utilizado</th>
            <th className="conv">Valor convertido</th>
            <th className="coin-conv">Moeda de conversão</th>
            <th className="ed-ex">Editar/Excluir</th>
          </thead>
          <tbody className="table">
            {expenses.map((el) => (

              <tr key={ el.id }>
                <td className="description">{el.description}</td>
                <td className="tag">{el.tag}</td>
                <td className="method">{el.method}</td>
                <td className="value">
                  { el.value === '' ? '0.00' : Number(el.value).toFixed(2) }
                </td>
                <td className="currency-name">{el.exchangeRates[el.currency].name}</td>
                <td className="cambio">
                  { Number(el.exchangeRates[el.currency].ask).toFixed(2) }
                </td>
                <td className="currency-value">
                  {Number(el.exchangeRates[el.currency]
                    .ask * el.value).toFixed(2)}
                </td>
                <td className="reals">Real brasileiro</td>
                <td className="buttons">
                  <button
                    className="bttn-edit"
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.editButton(el.id) }
                  >
                    Editar

                  </button>
                  <button
                    className="bttn-delete"
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
