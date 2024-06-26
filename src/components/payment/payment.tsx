import React, { useState, useRef } from 'react';
import './payment.css';

export const Payment: React.FC = () => {
  const [cardInputVisible, setCardInputVisible] = useState<boolean>(false);
  const [pay, setPay] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value.length === 4 && index < 3) {
        inputRefs[index + 1].current?.focus();
      }
    } else {
      e.target.value = e.target.value.slice(0, -1); // Remove the last character if it is not a number
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData('Text');
    if (!/^\d+$/.test(pasteData)) {
      e.preventDefault();
    }
  };

  const handleClick = () => {
    const allFilled = inputRefs.every(
      (ref) => ref.current && ref.current.value.length === 4,
    );

    if (allFilled) {
      setError('');
      setPay(true);
    } else {
      setError('Vyplňte všechny kolonky čísly');
    }
  };

  const handlePay = () => setCardInputVisible(!cardInputVisible);

  return (
    <div className="payment">
      <button onClick={handlePay}>Zadat kartu</button>

      {cardInputVisible ? (
        <>
          <h2 className="header-input-fields">Zadej číslo karty</h2>
          <div className="input-fields">
            {inputRefs.map((ref, index) => (
              <input
                key={index}
                type="text"
                maxLength={4}
                ref={ref}
                onChange={(e) => handleInput(e, index)}
                onKeyDown={handleKeyPress}
                onPaste={handlePaste}
              />
            ))}
          </div>
          <button className="pay-button" onClick={handleClick}>
            Odeslat
          </button>
          {error && <p className="error-message">{error}</p>}
          {pay && <p>Zaplaceno 🧚</p>}
        </>
      ) : null}
    </div>
  );
};
