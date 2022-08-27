// Esse reducer será responsável por tratar as informações da pessoa usuária

import { EMAIL_INPUT } from '../actions/index';

const INITAL_STATE = {
  email: '',
};

function userReducer(state = INITAL_STATE, action) {
  switch (action.type) {
  case EMAIL_INPUT:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}

export default userReducer;
