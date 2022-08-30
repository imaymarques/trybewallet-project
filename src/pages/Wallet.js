import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    return (
      <div className="wallet-page">
        <div>TrybeWallet</div>
        <Header />
        <WalletForm />
      </div>
    );
  }
}

export default Wallet;
