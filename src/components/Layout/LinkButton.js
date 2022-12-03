import styled from "styled-components";
import { Link } from "react-router-dom";




export const Btn = styled(Link)`
  padding: 1rem;
  text-decoration: none;
  border-radius: var(--button-borde);
  filter: brightness(1.2);
  font-size: 1.6rem;
  color: #fff;
  background-color: #222;

  :hover{
    filter: brightness(12px);
    filter: drop-shadow(0 0 0.75rem rgb(56, 3, 146, 50%));
    background: rgb(148, 3, 129);
  }
`;