import React from 'react'
import { useState, useEffect } from "react";

import styles from './ProjectForm.module.css'

import Input from '../Form/Input';
import Select from '../Form/Select';
import SubmitButton from '../Form/SubmitButton';

function ProjectForm({ btnText, handleSubmit, projectData }) {
  const [categories, setCategories] = useState([]);
  const [project, setProject] = useState(projectData || {});

  // Se você não usar o useEffect, o React vai entender que é pra verificar o estado a todo momento na requisição fetch.
  // O React vai fazer request a todo momento para verificar se o valor do elemento muda e atualizar no seu devido componente.
  // Com o useEffect, ele vai renderizar isso apenas uma vez quando precisarmos acessar ele
  useEffect(() => {
    //Fizemos uma Request do tipo 'Get' com o Fecth Api para a URL que contém nosso arquivo Json
    fetch("http://localhost:5000/categories", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((response) => response.json()) //Pegamos os dados provenientes da Response e transformamos em Json
      .then((data) => {
        setCategories(data); //Pegamos os dados provenientes do Json e passamos para o atualizador do  'categories'
        // Com essas categorias, podemos enviar elas para o SELECT
      })
      .catch((error) => console.log(error));
  }, []);

  const submit = (e) => {
    e.preventDefault();
    console.log(project)
    handleSubmit(project);
  };

  // Vamos alterar o nome do projeto
  // vamos fazer um destruct, pegar todos os dados do projeto até então, que é meu state(project) e vamos dizer que o nome do input vai ser igual ao valor digitado pelo usuário no input
  function handleChange(e) {
    setProject({ ...project, [e.target.name]: e.target.value });
  }

  function handleCategory(e) {
    setProject({ ...project, category: {
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text // 'e.target.selectedIndex' podemos acessar qual opção selecionada por meio do Index e depois vamos acessar o text dela
    } });
  }

  return (
    <form onSubmit={submit} className={styles.form}>
      <Input
        type="text"
        text="Nome do Projeto"
        placeholder="Insira o nome do Projeto"
        name="name"
        handleOnChange={handleChange}
        value={project.name ? project.name : ""}
      />

      <Input
        type="number"
        text="Orçamento do Projeto"
        placeholder="Insira o Orçamento Total"
        name="budget" // valor total
        handleOnChange={handleChange}
        value={project.budget ? project.budget : ""}
      />

      <Select
        name="category_id"
        text="Selecione a categoria"
        options={categories}
        handleOnChange={handleCategory}
        value={project.category ? project.category.id : ""} // se tivermos um project.category, vamos informar o id se não, vamos passar um valor vázio
      />

      <SubmitButton text={btnText} />
    </form>
  );
}

export default ProjectForm;