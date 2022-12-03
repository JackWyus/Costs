import React from 'react';
import { Btn } from './LinkButton.js';

//Vamos receber duas propriedades 'to' para dizermos para onde é que vai o link que o usuário clicar.
// e text para mudarmos o texto baseado onde formos usar ele
function LinkButton({ to, text }) {
  return (
    // Vamos colocar o 'text' e 'to' de forma dinâmica.
    <Btn to={to}>
      {text}
    </Btn>
    )
};

export default LinkButton;