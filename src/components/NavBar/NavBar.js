import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav style={styles.navBar}>
      <div style={styles.logoContainer}>
        <span style={styles.logoText}>PyChallenges</span>
      </div>
      <ul style={styles.navItems}>
        <li style={styles.navigationItem}>
          <Link to="/" style={styles.link}>Inicio</Link>
        </li>
        <li style={styles.navigationItem}>
          <Link to="/realizar-pruebas" style={styles.link}>Realizar Pruebas</Link>
        </li>
        <li style={styles.navigationItem}>
          <Link to="/agregar-preguntas" style={styles.link}>Contribuir</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navBar: {
    backgroundColor: '#333',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    color: '#fff',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', // Agregamos una sombra suave
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logoText: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginLeft: '10px',
  },
  navItems: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navigationItem: {
    margin: '0 15px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    padding: '8px 12px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
  ['link:hover']: { // Utilizamos notación de corchetes para definir estilos condicionales
    backgroundColor: '#555', // Cambiamos el color de fondo al pasar el cursor por encima
  },
};

export default NavBar;
