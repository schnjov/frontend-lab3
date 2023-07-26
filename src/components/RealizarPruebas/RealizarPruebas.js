import React, { useState, useEffect } from 'react';
import NavBar from '../NavBar/NavBar';
import SelectorDificultad from '../SelectorDificultad/SelectorDificultad';
import { Typography, Container, Box, Button, Card, CardContent, TextField } from '@mui/material';
import './RealizarPruebas.css'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import python from 'react-syntax-highlighter/src/languages/hljs/python'
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useActionData, useParams } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { python as langPython } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';

const RealizarPruebas = () => {
  const [dificultad, setDificultad] = useState('');
  const [mostrarSelectorDificultad, setMostrarSelector] = useState(true);
  const [mostrarPreguntas, setMostrarPreguntas] = useState(false);
  const [preguntas, setPreguntas] = useState([]);
  const [respuestasUsuario, setRespuestasUsuario] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestaUsuario, setRespuestaUsuario] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [notaFinal, setNotaFinal] = useState(0);
  const [tiempoTranscurrido, setTiempoTranscurrido] = useState(0);
  const [inicioPrueba, setInicioPrueba] = useState(0);

  SyntaxHighlighter.registerLanguage('python', python);

  // Iniciar el cronómetro
  const iniciarCronometro = () => {
    setInicioPrueba(Date.now());
  };

  // Detener el cronómetro
  const detenerCronometro = () => {
    const tiempoFinal = Date.now();
    setTiempoTranscurrido((tiempoFinal - inicioPrueba) / 1000);
  };

  // Restablecer el cronómetro
  const restablecerCronometro = () => {
    setTiempoTranscurrido(0);
  };

  const create_puntaje = (puntaje) => {
    localStorage.setItem("puntaje", puntaje);
}

  // Función para cargar las preguntas desde el servidor
  const cargarPreguntas = async (dificultad) => {
    try {
      setDificultad(dificultad);
      const response = await fetch(`http://34.176.217.38:8080/preguntas/${dificultad}`);
      const data = await response.json();
      setPreguntas(data);
      setPreguntaActual(0);
      setRespuestasUsuario([]);
      setMostrarResultado(false);
      setMostrarSelector(false);
      setMostrarPreguntas(true);
      iniciarCronometro();
      create_puntaje(0);
    } catch (error) {
      console.error('Error al cargar las preguntas:', error);
    }
  };

  // Función para manejar el envío de respuestas
  const handleSubmitRespuesta = (event) => {
    event.preventDefault();
    setRespuestasUsuario((prevRespuestas) => [...prevRespuestas, respuestaUsuario]);
    const preguntaActualObj = preguntas[preguntaActual];
    const respuestaCorrecta = preguntaActualObj.respuesta;
    if (respuestaUsuario === respuestaCorrecta) {
      // Respuesta correcta, asignamos nota 7
      var notaActual = localStorage.getItem("puntaje");
      notaActual = parseInt(notaActual) + 7;
      create_puntaje(notaActual);
    } else {
      // Respuesta incorrecta, asignamos nota 1
      var notaActual = localStorage.getItem("puntaje");
      notaActual = parseInt(notaActual) + 1;
      create_puntaje(notaActual);
    }

    if (preguntaActual === preguntas.length - 1) {
      // Si es la última pregunta, finalizamos la prueba
      finalizarPrueba();
      return;
    }
    // Pasamos a la siguiente pregunta
    setPreguntaActual((prevPreguntaActual) => prevPreguntaActual + 1);
    setRespuestaUsuario('');
    setMostrarResultado(false);
  };

  // Función para finalizar la prueba y mostrar resultados
  const finalizarPrueba = () => {
    // Detenemos el cronómetro
    detenerCronometro();

    // Calculamos la nota final promediando el puntaje total con la cantidad de preguntas
    const notaFinalCalculada = localStorage.getItem("puntaje") / preguntas.length;
    setNotaFinal(notaFinalCalculada);
    setMostrarResultado(true);
  };

  // Restablecer el cronómetro y cargar nuevas preguntas cuando se inicia la prueba
  useEffect(() => {
    if (mostrarPreguntas) {
      restablecerCronometro();
      cargarPreguntas(dificultad);
    }
  }, [mostrarPreguntas, dificultad]);

  return (
    <div>
      <NavBar />
      <Container maxWidth="sm">
        <Box mt={4} textAlign="center">
          <Typography variant="h4" component="h1">
            Realizar Pruebas
          </Typography>
          {mostrarSelectorDificultad && (
            <SelectorDificultad onDificultadSeleccionada={cargarPreguntas} />
          )}
          {mostrarPreguntas && (
            <Typography variant="h6" component="p">
              Cargando preguntas para dificultad: {dificultad}
            </Typography>
          )}
          {preguntas.length > 0 && !mostrarResultado && (
            <Card>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Pregunta {preguntaActual + 1}
                </Typography>
                <Typography variant="body1" component="p">
                  {preguntas[preguntaActual].pregunta}
                </Typography>
                <CodeMirror
                  value={preguntas[preguntaActual].codigo}
                  width="100%"
                  readOnly={true}
                  extensions={[langPython()]}
                  align="left"
                />
                <form onSubmit={handleSubmitRespuesta}>
                  <TextField
                    label="Respuesta"
                    variant="outlined"
                    value={respuestaUsuario}
                    onChange={(e) => setRespuestaUsuario(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!respuestaUsuario}
                  >
                    Enviar Respuesta
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
          {mostrarResultado && (
            <Box mt={2} className="resultado-container">
              <Typography variant="h6" component="p">
                ¡Prueba finalizada! Tu nota final es: {notaFinal.toFixed(2)}
              </Typography>
              <Typography variant="body1" component="p">
                Tiempo empleado: {tiempoTranscurrido} segundos
              </Typography>
              <Typography variant="h6" component="p">
                Resultados por pregunta:
              </Typography>
              {preguntas.map((pregunta, index) => (
                <Card
                  key={index}
                  className='pregunta-card'
                  sx={{
                    backgroundColor: `${respuestasUsuario[index] === pregunta.respuesta ? 'success.main' : 'error.main'}`,
                  }}
                >
                  <CardContent>
                    <Typography variant="body1" component="p">
                      Pregunta {index + 1}: {pregunta.pregunta}
                    </Typography>
                    <Typography variant="body1" component="p">
                      Tu respuesta : {respuestasUsuario[index]}
                    </Typography>
                    <CodeMirror
                      value={preguntas[preguntaActual].codigo}
                      width="100%"
                      readOnly={true}
                      extensions={[langPython()]}
                      align="left"
                    />
                    {respuestasUsuario[index] !== pregunta.respuesta && (
                      <Typography variant="body1" component="p">
                        Respuesta correcta : {pregunta.respuesta}
                      </Typography>
                    )}
                    <Typography variant="body1" component="p">
                      Nota de la pregunta: {respuestasUsuario[index] === pregunta.respuesta ? '7' : '1'}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default RealizarPruebas;
