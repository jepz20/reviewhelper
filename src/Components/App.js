import React, { Fragment } from 'react';
import { hot } from 'react-hot-loader';
import { createGlobalStyle } from 'styled-components';
import Projects from './Projects';
import PopticonProvider from './Popticon';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #141414;
    color: #C5C8C6;
    font-size: 16px;
    line-height: 1.7;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"
  }
`;

const App = () => {
  return (
    <PopticonProvider>
      <Fragment>
        <GlobalStyle />
        <Projects />
      </Fragment>
    </PopticonProvider>
  );
};

export default hot(module)(App);
