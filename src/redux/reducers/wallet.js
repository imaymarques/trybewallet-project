// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { WALLET_COINS, API_EXPENSE, DELETE_BUTTON, EDIT_BUTTON } from '../actions';

const INIT_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

function walletReducer(state = INIT_STATE, action) {
  console.log(action);
  switch (action.type) {
  case WALLET_COINS:
    return {
      ...state,
      currencies: action.payload,
    };
  case API_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case DELETE_BUTTON:
    return {
      ...state,
      expenses: state.expenses.filter((el) => el.id !== action.id),
    };
  case EDIT_BUTTON:
    return {
      ...state,
      expenses: action.payload,
    };
  default:
    return state;
  }
}

export default walletReducer;
