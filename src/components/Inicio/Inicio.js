import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './inicio.css'; // Importamos el archivo CSS

const Inicio = () => {
  return (
    <div>
      <NavBar />
      <div style={styles.container}>
        <h1 style={styles.title}>PyChallenges</h1> {/* Título enorme */}
        <div style={styles.cardContainer}> {/* Contenedor para las cards */}
          <div style={styles.card}>
            <h2>Realizar Pruebas</h2>
            <p>
              ¡Ponte a prueba resolviendo desafiantes problemas de Python en diferentes niveles de dificultad!
            </p>
            <Link to="/realizar-pruebas">
              <button style={styles.button}>Comenzar</button>
            </Link>
          </div>
          <div style={styles.card}>
            <h2>Agregar Preguntas</h2>
            <p>
              ¿Tienes preguntas interesantes sobre Python? ¡Contribuye a nuestra comunidad agregando nuevas preguntas!
            </p>
            <Link to="/agregar-preguntas">
              <button style={styles.button}>Contribuir</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  title: {
    fontSize: '5rem', // Tamaño del título enorme
    fontWeight: 'bold',
    color: '#007BFF',
    margin: '20px 0',
    animation: 'bounce 1s', // Animación bounce de 1 segundo
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center', // Centramos las cards horizontalmente
  },
  card: {
    width: '300px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    margin: '20px',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Inicio;
