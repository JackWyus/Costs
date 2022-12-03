import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import styles from './Projects.module.css'
import Message from '../Layout/Message.jsx'
import Container from '../../components/Layout/Container'
import Loading from '../Layout/Loading.jsx'
import LinkButton from '../Layout/LinkButton.jsx'
import ProjectCard from '../project/ProjectCard'

function Projects() {
  //Como vamos renderizar os projetos criados, precisamos de um local para salva-los, vamos usar o useState para isso
  const [projects, setProjects] = useState([])
  // Agora precisamos buscar os projetos do serve para guarda-los
  //Lembrando de usar o UseEffect para fazer a requisição, pois ele vai fazer várias requisições sem parar para atualizar o componente

  const [removeLoading, setRemoveLoading] = useState(true)

  // Vamos usar o hook useLocation para acessar o componente de message 

  const [projectMessage, setProjectMessage] = useState('');

  const location = useLocation()

  let message = '';
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() =>{
    setTimeout(() => {
        fetch(' http://localhost:5000/projects', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json',
          }})
        .then(response => response.json())
        .then(data => {
          setProjects(data)// transferindo os dados para a variável Projects
          setRemoveLoading(false)
        })
        .catch(error => console.log(error))
      },500)
  }, [])

  function removeProject(id)
  {
    setProjectMessage('');
    fetch(`http://localhost:5000/projects/${id}`,
      {
        method: 'DELETE',
        headers:{
          'Content-type': 'application/json',
        },
      })
      .then(res => res.json())
      .then(() => {
        setProjects(projects.filter((project) => project.id !== id))
        setProjectMessage('Projeto excluido com Sucesso!');
      }).catch(erro => console.log(erro))
    
  }


  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to='/newproject' text="Criar Projeto"/>
      </div>
      {/* O type vai definir o modo como a mensagem será estilizada */}
      {message && <Message msg={message} type='success' />}
      {projectMessage && <Message msg={projectMessage} type='success' />}

      <Container customClass='start' >
        {/* Vamos verificar primeiro se existe algum projeto, se tiver, vamos percorrer o Array e para cada item, vamos renderizar um Card */}
        {projects.length > 0 && 
          projects.map((project) => (<ProjectCard 
                name={project.name} 
                id={project.id}
                key={project.id}
                budget={project.budget} 
                category={project.category ? project.category.name : 'Categoria Indefinida'}
                handleRemove={removeProject}
              />
            )
          )
        }
        {removeLoading && <Loading/>}

        {!removeLoading && projects.length === 0 && (
          <p>Não existe Projetos Cadastrados!</p>
        )}

      </Container>
    </div>
  )
}

export default Projects