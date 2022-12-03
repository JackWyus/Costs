import styled, {css} from "styled-components";

export const Container = styled.div`
  width: 100%;
  padding: 1rem;
  margin: 0 auto;
  margin-bottom: 2rem;
  text-align: center;

  font-size: 1.6rem;
  border: 1px solid #000;
  border-radius: 5px;

  ${props => props.type == 'success' ? css`
    color: #155724;
    border-color: #C3E6CB;
    background-color: #D4EDDA;
  ` : css`
    color: #721C24;
    border-color: #F8D7DA;
    background-color: #F5C6CB;
  `}

`