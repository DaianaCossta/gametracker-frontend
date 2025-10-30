import { useState, useEffect } from 'react';
import './App.css';
import TarjetaJuego from './components/TarjetaJuego';
import FormularioJuego from './components/FormularioJuego';
import TarjetaReseña from './components/TarjetaReseña';
import FormularioReseña from './components/FormularioReseña';
import EstadisticasPersonales from './components/EstadisticasPersonales';
import * as api from './services/api';

function App() {
  const [juegos, setJuegos] = useState([]);
  const [reseñas, setReseñas] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar datos cuando la app se monta
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const juegosData = await api.obtenerJuegos();
      const reseñasData = await api.obtenerReseñas();
      setJuegos(juegosData);
      setReseñas(reseñasData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
    setCargando(false);
  };

  const agregarJuego = async (nuevoJuego) => {
    try {
      const juegoGuardado = await api.crearJuego(nuevoJuego);
      setJuegos([juegoGuardado, ...juegos]);
    } catch (error) {
      alert('Error al agregar juego');
    }
  };

  const eliminarJuego = async (id) => {
    try {
      await api.eliminarJuego(id);
      setJuegos(juegos.filter(juego => juego._id !== id));
    } catch (error) {
      alert('Error al eliminar juego');
    }
  };

  const agregarReseña = async (nuevaReseña) => {
    try {
      const reseñaGuardada = await api.crearReseña(nuevaReseña);
      setReseñas([reseñaGuardada, ...reseñas]);
    } catch (error) {
      alert('Error al agregar reseña');
    }
  };

  const eliminarReseña = async (id) => {
    try {
      await api.eliminarReseña(id);
      setReseñas(reseñas.filter(reseña => reseña._id !== id));
    } catch (error) {
      alert('Error al eliminar reseña');
    }
  };

  if (cargando) {
    return (
      <div className="App">
        <h1>🎮 GameTracker</h1>
        <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>🎮 GameTracker</h1>
      
      <section className="seccion">
        <EstadisticasPersonales juegos={juegos} reseñas={reseñas} />
      </section>

      <section className="seccion">
        <h2 className="titulo-seccion">📚 Mi Biblioteca</h2>
        <FormularioJuego onAgregarJuego={agregarJuego} />
        <div className="biblioteca">
          {juegos.length === 0 ? (
            <p className="mensaje-vacio">No hay juegos todavía. ¡Agrega el primero!</p>
          ) : (
            juegos.map((juego) => (
              <TarjetaJuego 
                key={juego._id} 
                juego={juego}
                onEliminar={eliminarJuego}
              />
            ))
          )}
        </div>
      </section>

      <section className="seccion">
        <h2 className="titulo-seccion">📝 Mis Reseñas</h2>
        <FormularioReseña 
          juegos={juegos} 
          onAgregarReseña={agregarReseña}
        />
        <div className="lista-reseñas">
          {reseñas.length === 0 ? (
            <p className="mensaje-vacio">No hay reseñas todavía. ¡Escribe la primera!</p>
          ) : (
            reseñas.map((reseña) => (
              <TarjetaReseña 
                key={reseña._id}
                reseña={reseña}
                onEliminar={eliminarReseña}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default App;