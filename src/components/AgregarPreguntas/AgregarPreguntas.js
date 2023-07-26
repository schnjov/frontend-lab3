import React, { useState, useCallback } from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {
  Typography,
  TextField,
  Button,
  Container,
  Box,
} from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { python as langPython } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';
import NavBar from '../NavBar/NavBar';
import Axios from 'axios';
import Swal from 'sweetalert2';

SyntaxHighlighter.registerLanguage('python', python);

const AgregarPreguntas = () => {
  const initialState = {
    pregunta: '',
    codigo: '',
    respuesta: '',
    dificultad: '',
  };

  const [input, setInput] = useState(initialState);

  const changePreguntaHandler = (event) => {
    setInput({ ...input, pregunta: event.target.value });
  };

  const changeCodigoHandler = useCallback((value) => {
    setInput({ ...input, codigo: value });
  }, [input]);

  const changeRespuestaHandler = (event) => {
    setInput({ ...input, respuesta: event.target.value });
  };

  const changeDificultadHandler = (event) => {
    setInput({ ...input, dificultad: event.target.value });
  };

  const limpiarCampos = () => {
    setInput(initialState);
  };

  const guardarPreguntaEnBackend = () => {
    const nuevaPregunta = {
      pregunta: input.pregunta,
      codigo: input.codigo,
      respuesta: input.respuesta,
      dificultad: input.dificultad,
    };

    // Realizar la solicitud POST al backend usando Axios
    Axios.post('http://34.176.217.38:8080/preguntas', nuevaPregunta)
      .then((response) => {
        // Aquí puedes manejar la respuesta del backend si es necesario
        console.log('Pregunta guardada con éxito:', response.data);

        // Mostrar SweetAlert de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Pregunta guardada!',
          text: 'La pregunta se ha guardado exitosamente.',
        });

        // Limpiar los campos después de guardar
        limpiarCampos();
      })
      .catch((error) => {
        // Manejar errores si ocurre alguno durante la solicitud
        console.error('Error al guardar la pregunta:', error);
      });
  };

  const imprimirPregunta = () => {
    console.log('Pregunta ingresada:', input);
    guardarPreguntaEnBackend();
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="sm">
        <Box mt={4} textAlign="center">
          <Typography variant="h4" component="h1">
            Ingresar Nueva Pregunta
          </Typography>

          <TextField
            label="Pregunta"
            variant="outlined"
            value={input.pregunta}
            onChange={changePreguntaHandler}
            fullWidth
            margin="normal"
          />

          <Typography variant="body1" component="p">
            Código Python:
          </Typography>
          <CodeMirror
            value={input.codigo}
            height="300px"
            width="100%"
            extensions={[langPython()]}
            theme={dracula}
            onChange={changeCodigoHandler}
            align="left"
          />

          <TextField
            label="Respuesta de la pregunta"
            variant="outlined"
            value={input.respuesta}
            onChange={changeRespuestaHandler}
            fullWidth
            margin="normal"
          />

          <TextField
            select
            label="Dificultad de la pregunta"
            variant="outlined"
            value={input.dificultad}
            onChange={changeDificultadHandler}
            fullWidth
            margin="normal"
          >
            <option value="Fácil">Fácil</option>
            <option value="Media">Media</option>
            <option value="Difícil">Difícil</option>
          </TextField>

          <Button
            variant="contained"
            color="primary"
            onClick={imprimirPregunta}
            disabled={!input.pregunta || !input.codigo || !input.respuesta || !input.dificultad}
            style={{ marginBottom: '10px' }}
          >
            Guardar Pregunta
          </Button>
        </Box>
      </Container>
    </div>
  );
};

export default AgregarPreguntas;
