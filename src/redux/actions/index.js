// Coloque aqui suas actions

export const EMAIL_INPUT = 'EMAIL_INPUT';
export const WALLET_COINS = 'WALLET_COINS';

export const emailInput = (email) => ({
  type: EMAIL_INPUT,
  payload: email,
});

export const walletCoins = (coins) => ({ type: WALLET_COINS, payload: coins });

export const getCurrencies = () => async (dispatch) => {
  const API = await fetch('https://economia.awesomeapi.com.br/json/all');
  const info = await API.json();
  const coins = Object.keys(info).filter((el) => el !== 'USDT');
  dispatch(walletCoins(coins));
};
