import styled from "styled-components";

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: #222;
  padding: 1em;

  .list{
    display: flex;
    list-style: none;
    align-items: center;
  }

  .item{
    margin-right: 1rem;
  }

  .item a{
    color: #fff;
    text-decoration: none;
  }

  .item a:hover{
    color: #FFBB33;
  }
`