import React from 'react';
import styles from './Input.module.css';

/*Esse input vai ser dinâmico, logo, ele vai receber propriedades*/
// handleOnChange é para podermos manusear os dados do input
// text vai ser o texto da label
function Input({type, text, name, placeholder, handleOnChange, value}) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}> {text} </label>
      <input 
        type={type} 
        name={name} 
        placeholder={placeholder} 
        id={name} 
        onChange={handleOnChange}
        value={value}
      />
    </div>
  )
};

export default Input;