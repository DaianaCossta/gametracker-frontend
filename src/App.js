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
  const [juegoEditando, setJuegoEditando] = useState(null);
  const [reseñaEditando, setReseñaEditando] = useState(null);

  // Cargar datos cuando la app se monta
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const juegosData = await api.obtenerJuegos();
      const reseñasData = await api.obtenerReseñas();
      console.log("Reseñas recibidas:", reseñasData); // esto es clave para depurar
      setJuegos(juegosData);
      setReseñas(reseñasData);
      if (!Array.isArray(reseñasData)) {
      console.error("La respuesta de reseñas no es un array:", reseñasData);
      setReseñas([]);
    } else {
      setReseñas(reseñasData);
    }
    } catch (error) {
      console.error('Error al cargar datos:', error);
    }
    setCargando(false);
  };
  //agregar un juego
  const agregarJuego = async (nuevoJuego) => {
    try {
      const juegoGuardado = await api.crearJuego(nuevoJuego);
      setJuegos([juegoGuardado, ...juegos]);
    } catch (error) {
      alert('Error al agregar juego');
    }
  };
    //FUNCIONES JUEGOS
   //actualizar juego
  const actualizarJuego = async (id, datosActualizados) => {
    try {
      const juegoActualizado = await api.actualizarJuego(id, datosActualizados);
      // Actualiza la lista de juegos
      setJuegos(juegos.map(juego => 
        juego._id === id ? juegoActualizado : juego
      ));
      // Limpia el juego que estaba editando
      setJuegoEditando(null);
    } catch (error) {
      alert('Error al actualizar juego');
    }
  };

  //preparar juego para editar
  const prepararEdicion = (juego) => {
    setJuegoEditando(juego);
    // scroll hacia el formulario de edicion
    window.scrollTo({ top: 800, behavior: 'smooth' });
  };

  const eliminarJuego = async (id) => {
    try {
      await api.eliminarJuego(id);
      setJuegos(juegos.filter(juego => juego._id !== id));
    } catch (error) {
      alert('Error al eliminar juego');
    }
  };

  //FUNCIONES RESEÑAS
  //agregar reseña
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
  
  //Actualizar reseña
const actualizarReseña = async (id, datosActualizados) => {
  try {
    const reseñaActualizada = await api.actualizarReseña(id, datosActualizados);
    setReseñas(reseñas.map(reseña => 
      reseña._id === id ? reseñaActualizada : reseña
    ));
    setReseñaEditando(null);
  } catch (error) {
    alert('Error al actualizar reseña');
  }
};

//Preparar reseña para editar
const prepararEdicionReseña = (reseña) => {
  setReseñaEditando(reseña);
  window.scrollTo({ top: 4000, behavior: 'smooth' }); 
};
 //Cancelar edición de reseña
 const cancelarEdicionReseña = () => {
    setReseñaEditando(null); 
  };

  if (cargando) {
    return (
      <div className="App">
        <h1>Game Zone</h1>
        <p style={{ textAlign: 'start', fontSize: '2.5rem' }}>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Game Zone</h1>
      
      <section className="seccion">
        <EstadisticasPersonales juegos={juegos} reseñas={reseñas} />
      </section>

      <section className="seccion">
        <h2 className="titulo-seccion">📚 Biblioteca</h2>
        <FormularioJuego onAgregarJuego={agregarJuego}
          onActualizarJuego={actualizarJuego}
          juegoEditando={juegoEditando} 
          />
        <div className="lista-juegos">
          {juegos.length === 0 ? (
            <p className="mensaje-vacio">No hay juegos todavía. ¡Agrega el primero!</p>
          ) : (
            juegos.map((juego) => (
              <TarjetaJuego 
                key={juego._id} 
                juego={juego}
                onEliminar={eliminarJuego}
                onEditar={prepararEdicion}
              />
            ))
          )}
        </div>
      </section>

      <section className="seccion">
        <h2 className="titulo-seccion">📝 Mis reseñas</h2>
        <FormularioReseña 
          juegos={juegos} 
          onAgregarReseña={agregarReseña}
          onActualizarReseña={actualizarReseña}
          reseñaEditando={reseñaEditando}
          onCancelarEdicion={cancelarEdicionReseña}
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
                onEditar={prepararEdicionReseña}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default App;