import React from 'react';
import styles from './Home.module.css';
import saving from '../../img/savings.svg'
import LinkButton from '../Layout/LinkButton.jsx';

function Home() {
  return (
    <section className={styles.home_container}>
      <h1>Bem-Vindo ao <span>Costs</span></h1>
      <p>Comece a gerenciar seus projetos agora mesmo!</p>
      {/* Estamos passando de forma dinâmica a url e o texto */}
      <LinkButton to='/newproject' text="Criar Projeto"/>
      <img src={saving} alt='Costs' />
    </section>
  )
}

export default Home;