import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../../App';
import renderWithRouterAndRedux from './renderWith';
import Header from '../../components/Header';
import Table from '../../components/Table';
import mockData from './mockData';

describe('Verifica se os testes estão cobrindo o componente Login', () => {
  it('Verifica se o component App está sendo renderizado na tela e tem a rota /', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(App).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });

  it('Verifica se tem um input email na tela inicial', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByLabelText(/email/i);
    expect(email).toBeInTheDocument();
  });

  it('Verifica se tem um input senha na tela inicial', () => {
    renderWithRouterAndRedux(<App />);
    const password = screen.getByLabelText(/password/i);
    expect(password).toBeInTheDocument();
  });

  it('Verifica se tem um botão de entrar na tela', () => {
    const button = screen.getByRole('button', { name: /Entrar/i });
    expect(button).toBeInTheDocument();
  });

  it('Verifica se o botão está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });

  it('Verifica se o botão está habilitado se email e senha estiverem válidos', () => {
    renderWithRouterAndRedux(<App />);
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    const emailTest = 'teste@gmail.com';
    const passwordTest = '123456';
    userEvent.type(email, emailTest);
    userEvent.type(password, passwordTest);
    expect(button).toBeEnabled();
  });

  it('Verifica se ao clicar no botão, vai para a rota carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const loginButton = screen.getByRole('button', { name: /Entrar/i });
    const email = screen.getByLabelText(/email/i);
    const password = screen.getByLabelText(/password/i);
    userEvent.type(email, 'imaymarques@gmail.com');
    userEvent.type(password, '123456');
    userEvent.click(loginButton);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/carteira');
  });
});

describe('Verifica se os testes cobrem o componente Header', () => {
  it('Verifica se o email do usuário está na tela', () => {
    renderWithRouterAndRedux(<Header />);
    const user = screen.getByTestId('email-field');
    expect(user).toBeInTheDocument();
  });

  it('Veririca se possui o valor total', () => {
    renderWithRouterAndRedux(<Header />);
    const totalValue = screen.getByTestId('total-field');
    expect(totalValue).toBeInTheDocument();
  });

  it('Verifica sem o valor do câmbio está na tela', () => {
    renderWithRouterAndRedux(<Header />);
    const currency = screen.getByTestId('header-currency-field');
    expect(currency).toBeInTheDocument();
  });
});

describe('Verifica se os testes estão cobrindo o componente Wallet', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
    }));

    renderWithRouterAndRedux(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const button = screen.getByRole('button', { name: 'Entrar' });

    userEvent.type(email, 'imaymarques@gmail.com');
    userEvent.type(password, '123456');
    userEvent.click(button);
  });
  it('Verifica se é feita a chamada da API', async () => {
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
  });

  it('Verifica se possui o título Trybewallet na tela', () => {
    const title = screen.getByRole('heading', { name: /TrybeWallet/i });
    expect(title).toBeInTheDocument();
  });
  it('Verifica se possui a caixa de digitar Description', () => {
    const description = screen.getByTestId('description-input');
    expect(description).toBeInTheDocument();
  });
  it('Verifica se a caixa Valor está na tela', () => {
    const value = screen.getByTestId('value-input');
    expect(value).toBeInTheDocument();
  });
  it('Verifica se o input Moeda está na tela', () => {
    const currency = screen.getByTestId('currency-input');
    expect(currency).toBeInTheDocument();
  });
  it('Verifica se o Método de Pagamento está sendo renderizado', () => {
    const payment = screen.getByTestId('method-input');
    expect(payment).toBeInTheDocument();
  });
  it('Verifica se a Categoria está sendo renderizada', () => {
    const category = screen.getByTestId('tag-input');
    expect(category).toBeInTheDocument();
  });
  it('Verifica se ao clicar no botão excluir, o valor zera', () => {
    const sum = screen.getByText(/despesa total:/i);
    const deleteBtn = screen.getByTestId('delete-btn');
    expect(deleteBtn).toBeInTheDocument();

    userEvent.click(deleteBtn);

    expect(deleteBtn).not.toBeInTheDocument();
    expect(sum).toHaveTextContent('0.00');
  });
});

describe('Veririca se os testes estão cobrindo o componente Table', () => {
  test('Testa o formulário da página de carteira das despesas', async () => {
    const playing = 'Lazer';
    const worldTravel = 'Viajar o Mundo';
    const expense = {
      id: 0,
      value: '100',
      currency: 'USD',
      method: 'Dinheiro',
      tag: playing,
      description: worldTravel,
      exchangeRates: mockData,
    };
    renderWithRouterAndRedux(<Table />, { initialState: {
      wallet: {
        expenses: [expense],
      },
    },
    initialEntries: ['/carteira'] });

    expect(screen.queryByText(playing)).toBeInTheDocument();
    expect(screen.queryByText(worldTravel)).toBeInTheDocument();
    expect(screen.queryByText('100.00')).toBeInTheDocument();
    expect(screen.queryByText('Dinheiro')).toBeInTheDocument();
    expect(screen.queryByText('Dólar Americano/Real Brasileiro')).toBeInTheDocument();

    const editButton = screen.getByTestId('edit-btn');
    const deleteButton = screen.getByTestId('delete-btn');

    expect(editButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    userEvent.click(deleteButton);
    expect(screen.queryByText(playing)).not.toBeInTheDocument();
    expect(screen.queryByText(worldTravel)).not.toBeInTheDocument();
    expect(screen.queryByText('100.00')).not.toBeInTheDocument();
    expect(screen.queryByText('Dinheiro')).not.toBeInTheDocument();
    expect(screen.queryByText('Dólar Americano/Real Brasileiro')).not.toBeInTheDocument();
  });
});
