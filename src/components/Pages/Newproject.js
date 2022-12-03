import React from 'react'
import { useNavigate } from 'react-router-dom'

import ProjectForm from '../project/ProjectForm.jsx';
import styles from './Newproject.module.css'

function Newproject() {
  // usado para fazer redirecionamento
  const history = useNavigate() 

  function createPost(project){
    // Inicialização do cost e serviços
    project.cost = 0;
    project.services = [];

    fetch('http://localhost:5000/projects',{
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(project)
      }
    )
    .then(response => response.json())
    .then(data => {
      // Redirecionamento quando finalizado a criação do projeto
      history('/projects', {state: {message: 'Projeto Criado com Sucesso!'}});
    })
    .catch(error => console.log(error))
  }

  return (
    <div className={styles.newproject_container}>
      <h1>Criar Projeto</h1>
      <p>Crie seu projeto para depois adicionar os Serviços</p>
      <ProjectForm handleSubmit={createPost} btnText='Criar Projeto'/>
    </div>
  )
}

export default Newproject;