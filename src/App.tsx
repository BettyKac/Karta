import { useState } from 'react';
import './App.css';
import { Payment } from './assets/componenst/payment/payment';

function App() {
  return (
    <>
      <h1 className="header-main">Programování karta</h1>
      <Payment />
    </>
  );
}

export default App;
