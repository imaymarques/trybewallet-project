// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET_COINS } from '../actions';

const INIT_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

function walletReducer(state = INIT_STATE, action) {
  switch (action.type) {
  case WALLET_COINS:
    return {
      ...state,
      currencies: action.payload,
    };
  default:
    return state;
  }
}

export default walletReducer;
