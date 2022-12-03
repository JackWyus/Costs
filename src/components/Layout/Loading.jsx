import React from 'react'
import { Container } from './Loading';
import ReactLoading from 'react-loading';

function Loading() {
  return (
    <Container>
      <ReactLoading type='spin' color='#ffbb33' height={50} width={50}/>
    </Container>
  )
}

export default Loading