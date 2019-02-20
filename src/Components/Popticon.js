import React, { useState, useEffect, createContext } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeInAndGrow = keyframes`
  0% {
    opacity: 0;
    font-size: 0;
  }
  50% {
    opacity: 1;
    font-size: 13rem;
  }
  100% {
    opacity: 0;
    font-size: 0;
  }
`;

const ToastContainer = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
`;
const Toast = styled.div`
  margin: 0;
  padding: 0;
  opacity: 0;
  font-size: 13rem;
  animation: 0.8s ${fadeInAndGrow} ease-in;
  position: absolute;
  z-index: 1;
`;

let ids = 0;

const { Consumer, Provider } = createContext({
  popticons: [],
  popticoner: () => {},
});

const SinglePopticon = () => <Toast>📝</Toast>;
const PopticonProvider = ({ children }) => {
  const [popticons, updatePopticon] = useState([]);
  const popticoner = () => {
    const id = ids++;
    updatePopticon([...popticons, { id, time: new Date().getTime() }]);
  };
  useEffect(() => {
    setInterval(
      () =>
        updatePopticon(
          popticons.filter(it => new Date().getTime() - it.time > 2000)
        ),
      2000
    );
  }, []);
  return (
    <Provider value={{ popticons, popticoner, updatePopticon }}>
      {children}
      {!!popticons.length && (
        <ToastContainer>
          {popticons.map(popticon => (
            <SinglePopticon key={popticon.id} />
          ))}
        </ToastContainer>
      )}
    </Provider>
  );
};

const PopticonConsumer = ({ children }) => (
  <Consumer>{context => children(context)}</Consumer>
);

export const withPopticonManager = Comp => props => (
  <PopticonConsumer>
    {context => <Comp popticonManager={context} {...props} />}
  </PopticonConsumer>
);
withPopticonManager.displayName = 'WithPopticonManager';

export default PopticonProvider;
