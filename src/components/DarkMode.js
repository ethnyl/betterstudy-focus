import React from 'react';
import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';

const ToggleButton = styled.button`
  background-color: ${props => props.isDark ? '#f1c40f' : '#34495e'};
  color: ${props => props.isDark ? '#34495e' : '#f1c40f'};
  border: none;
  border-radius: 30px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const DarkMode = ({ isDark, toggleDarkMode }) => {
  return (
    <ToggleButton onClick={toggleDarkMode} isDark={isDark}>
      {isDark ? <FaSun /> : <FaMoon />}
    </ToggleButton>
  );
};

export default DarkMode;