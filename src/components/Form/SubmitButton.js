import React from 'react'
import styles from './SubmitButton.module.css'

// A única propriedade que vamos receber é o 'text' que será o texto do botão
// Vamos poder usar ele em vários lugares.
function SubmitButton({ text }) {
  return (
    <div>
      <button className={styles.btn}> {text} </button>
    </div>
  )
};

export default SubmitButton;