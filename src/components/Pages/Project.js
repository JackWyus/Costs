import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import styles from './Project.module.css'


import Loading from '../Layout/Loading.jsx';
import Container from '../Layout/Container';
import ProjectForm from '../project/ProjectForm.jsx'
import Message from '../Layout/Message.jsx';
import ServiceForm from '../Services/ServiceForm';

import { parse, v4 as uuid4} from 'uuid'
import ServiceCard from '../Services/ServiceCard';

function Project()
{
  const {id} = useParams();
  const [project, setProject] = useState([]);
  const [services, setServices] = useState([])
  //false > 'Editar projeto' true > 'Fechar Projeto'
  const [showProjectForm, setShowProjectForm] = useState(false);

  const [showServiceForm, setShowServiceForm] = useState(false);


  //State referente a mensagem e ao seu tipo
  const [message, setMessage] = useState();
  const [type, setType] = useState();

  useEffect(() => {
    setTimeout(() =>{
      fetch(`http://localhost:5000/projects/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(respo => respo.json())
        .then(data => {
          setProject(data)
          setServices(data.services)
        })
        .catch(err => console.log(err))
    },)
  }, [id])



  function editPost(project){
    //Resetando o State para que possa ocorrer a 'message' para mais de uma atualização.
    setMessage('')
    if(project.budget < project.cost){
      setMessage('O orçamento não pode ser menor que o custo do projeto!')
      setType('error')
      return false
    }

    //Requisição para atualizar somente  os dados alterado do Projeto.
    fetch(`http://localhost:5000/projects/${project.id}`, {method: 'PATCH', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(project)})
      .then(respo => respo.json())
      .then(data => {
          setProject(data)
          setShowProjectForm(!showProjectForm)
          setMessage('Projeto atualizado!')
          setType('success')
        })
      .catch(err => console.log(err));
  }

  function createService(project){
    // Resetando o state para que quando o usuário clicar novamente a mensagem possa aparecer de novo.
    setMessage('')
    //Last service 
    const lastService = project.services[project.services.length - 1]
    //Responsável por criar um id único para renderizar as listas sem problemas
    lastService.id = uuid4();

    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);

    if (newCost > parseFloat(project.budget)){
      setMessage('Orçamento ultrapassado, verifique o valor do serviço!');
      setType('error');

      //Eliminando o serviço , pois em uma próxima adicação de serviço ele pode entrar junto.
      project.services.pop();
      return false
    }
    // add service cost to project cost total
    project.cost = newCost

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setServices(data.services);
        setShowServiceForm(!showServiceForm);
        setMessage('Serviço adicionado!');
        setType('success');
      })
  }

  function removeService(id, cost) {
    setMessage('')
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id,
    )

    const projectUpdated = project;

    projectUpdated.services = servicesUpdated;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost)

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(projectUpdated);
        setServices(servicesUpdated);
        setMessage('Serviço removido com sucesso!');
        setType('succes');
      })
  }

  //Alterando o State baseado no click - mostrando o botão de 'Editar ou Fechar projeto'
  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm)
  }
  //Alterando o State baseado no click - mostrando o botão de 'Adicionar ou Fechar '
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  return(
    <>
      {project.name ? (
          <div className={styles.project_details}>
            <Container customClass= 'column'>
            {message && <Message type={type} msg={message} />}

              <div className={styles.details_container}>
                <h1>Projeto: {project.name}</h1>
                <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Editar Projeto' : 'Fechar Projeto'}</button>

                {!showProjectForm ? (
                  <div className={styles.form}>
                    <p>
                      <span>Categoria:</span> {project.category.name}
                    </p>
                    <p>
                      <span>Total do orçamento:</span> R${project.budget}
                    </p>
                    <p>
                      <span>Total utilizado:</span> R${project.cost}
                    </p>
                  </div>
                ) : (
                    <div className={styles.form}>
                      <ProjectForm
                        handleSubmit={editPost}
                        btnText="Salvar Edição"
                        projectData={project}
                      />
                      form
                    </div>
                  )
                }
              </div>
              
              <div className={styles.service_form_container}>
                <h2>Adicione um serviço:</h2>
                <button className={styles.btn} onClick={toggleServiceForm}> {!showServiceForm ? 'Adicionar' : 'Fechar'}</button>

                <div className={styles.form}>
                {showServiceForm && 
                  <ServiceForm
                    handleSubmit={createService}
                    btnText="Adicionar Serviço"
                    projectData={project}
                  />
                }
                </div>
              </div>

              <h2>Serviços:</h2>
              <Container customClass="start">
                {services.length > 0 &&
                  //Quando vamos retornar um objeto no map, precisamos colocar o () ao invés de chavês
                  services.map((service) => (
                    <ServiceCard
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    key={service.id}
                    handleRemove={removeService}
                    />
                  ))
                }
                {services.length === 0 && <p>Não há serviços cadastrados.</p>}
              </Container>
            </Container>
          </div>

        ) : (<Loading/>)
      }
    </>
  )
}

export default Project;