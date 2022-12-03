import styled from "styled-components";


export const Gradient = styled.div`
  height: 2.5rem;
  /* background: linear-gradient(to top, rgb(17, 11, 101), #222); */
`
export const Container = styled.footer`
  padding: 3rem;
  text-align: center;

  color: #fff;
  background-color: #222;

  .gradient{
    background-color: #ffbb33;
  }

  .social_list{
    display: flex;
    justify-content: center;
    list-style: none;
  }

  .social_list li{
    margin: 0 1.5rem;
  }

  .social_list li svg{
    font-size: 2rem;
    cursor: pointer;
  }

  .social_list svg:hover{
    color: #ffbb33;
  }

  .copy_right{
    font-size: 1.6rem;
    margin-top: 2rem;
  }

  .copy_right span{
    font-weight: bold;
    color: #ffbb33;
  }
`