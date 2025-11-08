import { useState, useEffect } from 'react';
import './FormularioJuego.css';

function FormularioJuego({ onAgregarJuego, onActualizarJuego, juegoEditando }) {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [puntuacion, setPuntuacion] = useState(3);
  const [completado, setCompletado] = useState(false);
  const [horasJugadas, setHorasJugadas] = useState(0);
  const [portadaURL, setPortadaURL] = useState("");

  // Este useEffect se ejecuta cuando cambia juegoEditando
  // Si hay un juego para editar, llenamos el formulario con sus datos
  useEffect(() => {
    if (juegoEditando) {
      setTitulo(juegoEditando.titulo);
      setGenero(juegoEditando.genero);
      setPuntuacion(juegoEditando.puntuacion);
      setCompletado(juegoEditando.completado);
      setHorasJugadas(juegoEditando.horasJugadas);
      setPortadaURL(juegoEditando.portadaURL || "");
    }
  }, [juegoEditando]);

  const limpiarFormulario = () => {
    setTitulo("");
    setGenero("");
    setPuntuacion(3);
    setCompletado(false);
    setHorasJugadas(0);
    setPortadaURL("");
  };

  const manejarSubmit = (e) => {
    e.preventDefault();
    
    if (titulo.trim() === "" || genero.trim() === "") {
      alert("Por favor completa al menos el título y género");
      return;
    }

    const datosJuego = {
      titulo: titulo,
      genero: genero,
      puntuacion: puntuacion,
      completado: completado,
      horasJugadas: horasJugadas,
      portadaURL: portadaURL
    };

    // Si estamos editando, llamamos a onActualizarJuego
    // Si no, llamamos a onAgregarJuego
    if (juegoEditando) {
      onActualizarJuego(juegoEditando._id, datosJuego);
    } else {
      onAgregarJuego(datosJuego);
    }

    limpiarFormulario();
  };

  return (
    <div className="formulario-container">
      <h2>{juegoEditando ? "✏️ Editar Juego" : "➕ Agregar Nuevo Juego"}</h2>
      
      <form onSubmit={manejarSubmit}>
        <div className="campo">
          <label>Título del juego: *</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej: The Last of Us"
          />
        </div>

        <div className="campo">
          <label>Género: *</label>
          <input
            type="text"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            placeholder="Ej: Aventura"
          />
        </div>

        <div className="campo">
          <label>URL de la portada (opcional):</label>
          <input
            type="text"
            value={portadaURL}
            onChange={(e) => setPortadaURL(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
          {portadaURL && (
            <div className="preview-imagen">
              <p>Vista previa:</p>
              <img src={portadaURL} alt="Preview" onError={(e) => e.target.style.display = 'none'} />
            </div>
          )}
        </div>

        <div className="campo">
          <label>Horas jugadas: {horasJugadas}h</label>
          <input
            type="number"
            min="0"
            value={horasJugadas}
            onChange={(e) => setHorasJugadas(Number(e.target.value))}
          />
        </div>

        <div className="campo">
          <label>Puntuación: {puntuacion}/5</label>
          <input
            type="range"
            min="1"
            max="5"
            value={puntuacion}
            onChange={(e) => setPuntuacion(Number(e.target.value))}
          />
        </div>

        <div className="campo-checkbox">
          <label>
            <input
              type="checkbox"
              checked={completado}
              onChange={(e) => setCompletado(e.target.checked)}
            />
            ¿Completado?
          </label>
        </div>

        <button type="submit" className="btn-agregar">
          {juegoEditando ? "💾 Guardar Cambios" : "Agregar Juego"}
        </button>

        {juegoEditando && (
          <button 
            type="button" 
            className="btn-cancelar"
            onClick={limpiarFormulario}
          >
            Cancelar
          </button>
        )}
      </form>
    </div>
  );
}

export default FormularioJuego;