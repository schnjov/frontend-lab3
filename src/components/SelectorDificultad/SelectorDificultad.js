import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Title = styled.h2`
  margin-bottom: 10px;
`;

const Select = styled.select`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const Option = styled.option`
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SelectorDificultad = ({ onDificultadSeleccionada }) => {
  const [dificultad, setDificultad] = useState('');

  const handleDificultadChange = (event) => {
    setDificultad(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onDificultadSeleccionada(dificultad);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Title>Elige la dificultad:</Title>
      <Select value={dificultad} onChange={handleDificultadChange}>
        <Option value="">-- Selecciona una dificultad --</Option>
        <Option value="Facil">Fácil</Option>
        <Option value="Media">Media</Option>
        <Option value="Dificil">Difícil</Option>
      </Select>
      <Button type="submit" disabled={!dificultad}>Comenzar</Button>
    </FormContainer>
  );
};

export default SelectorDificultad;
