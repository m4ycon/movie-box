import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 10px;
  }

  body {
    background-color: #1f1f1f;
    font-family: 'Roboto', sans-serif;
    font-size: 1.6rem;
    color: #fff;
  }

  * {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 0.7rem;
    height: 0.7rem;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 0.35rem;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #ffd66e;
    border-radius: 0.35rem;

    /* Handle on hover */
    :hover {
      background: darken(#ffd66e, 35%);
    }
  }

`

export default GlobalStyle
