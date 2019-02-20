import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  flex: 1;
  padding: 10px;
  margin: 16px;
  border-radius: 4px;
  border: 1px solid #202220;
  background-color: #202020;
  color: #C5C8C6;
  font-size: 20px;
`;

const Search = (props, ref) => {
  const inputRef = useRef();
  const onKeyPress = ev => {
    ev.key === 'Enter' && inputRef.current.nextSibling.focus();
  };
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    hasFocus: () => inputRef.current === document.activeElement,
  }));
  return (
    <Input
      ref={inputRef}
      name="reviewer-search"
      placeholder="search"
      onKeyPress={onKeyPress}
      {...props}
    />
  );
};

export default forwardRef(Search);
