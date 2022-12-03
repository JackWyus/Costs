import React from 'react'
import { Container } from './Message'
import { useState, useEffect } from 'react'

// vamos receber o 'tipo da mensagem' e o 'texto da mensagem'
  // Tipos de mensagem, sucesso! erro! aviso! ...
function Message({type, msg}) {

  // Vamos alterar a visibilidade de acordo com uma condição > quando passar 3segundos, logo vamos usar o setTimeOut()
  const [visible, setVisible] = useState(false) // ele começa false, pois não será exibido de imediato

  // Vamos na verdade usar o useEffect para ele ser condicionado a msg
    // ou seja, só vamos exibir o componente de message se existir mensagem
  useEffect(() =>{
      //Se a mensagem não existir
      if(!msg){
        setVisible(false);
        return;
      }else{
      // se tiver
        setVisible(true);

        // vamos eliminar a menasgem após 3s
        const timer = setTimeout(() => {
          setVisible(false)// ela deixará de ser exibida em 3s
        }, 3000);

        // retornando o resete de timer, pq precisamos retornar algo
        return () => clearTimeout(timer);
      }

    }, [msg])


  return (
    <>
      {visible && (
        <Container type={type}>
          {msg}
        </Container>
      )}
    </>
  )
}

export default Message;