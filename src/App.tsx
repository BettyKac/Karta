import { useState } from 'react';
import './App.css';
import { Payment } from './assets/componenst/payment/payment';

function App() {
  const [pay, setPay] = useState<boolean>(false);
  const handleClick = () => setPay(!pay);
  return (
    <>
      <h1 className="header-main">Programování karta</h1>
      <Payment />

      
    </>
  );
}

export default App;
