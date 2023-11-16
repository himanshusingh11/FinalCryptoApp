import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CryptoCoinsTable from './components/CryptoCoinsTable';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <CryptoCoinsTable />
      <Footer />
    </div>
  );
}

export default App;
