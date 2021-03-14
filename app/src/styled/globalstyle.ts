import { createGlobalStyle } from 'styled-components';
import { ThemeType } from './theme';

export const GlobalStyle = createGlobalStyle<{ theme: ThemeType }>`
  *::selection {
    background-color: #3CCD6A;
    color: white;
  }

  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
    font-family: 'Raleway', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  body{
    padding: 0;
    margin: 0;
    transition: background-color 0.2s linear;
    overflow: hidden;
  }
  #root {
    max-width: 1920px;
    margin: 0 auto;
    overflow-x: hidden;
  }
  *, a, p, div, li, h1, h2, h3, h4, h5, h6, header, footer {
    font-weight: 400; /* Default size */
    font-family: 'Raleway', sans-serif;
    transition: background-color 0.2s linear;
    transition: box-shadow 0.125s linear;
    margin: 0;
    user-select: none;
    padding: 0;
    box-sizing: border-box;
    color: ${({ theme }) => theme.s};
  }
  h2 {
    font-weight: 600;
  }

  button {
    display: block;
    font-weight: 700;
    padding: 7px 25px;
    border-radius: 8px;
    border: none;
  }
  a, button {
    cursor: pointer;
    text-decoration: none;
    background-position: -100px;
    &:active, &:focus{
      outline: 0;
      outline-style: none;
      -moz-outline-style: none;
    }
  }

`;
