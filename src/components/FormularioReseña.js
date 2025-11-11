import { useState, useEffect } from 'react';
import './FormularioReseña.css';

function FormularioReseña({ juegos, onAgregarReseña, onActualizarReseña, reseñaEditando,onCancelarEdicion }) {
  const [juegoSeleccionado, setJuegoSeleccionado] = useState("");
  const [textoReseña, setTextoReseña] = useState("");

  //useEffect llena el formulario cuando hay una reseña para editar
  useEffect(() => {
    if (reseñaEditando) {
      setJuegoSeleccionado(reseñaEditando.juegoId);
      setTextoReseña(reseñaEditando.texto);
    } else { //si no hay reseña para editar, limpiamos el formulario
      setJuegoSeleccionado("");
      setTextoReseña("");
    }
  }, [reseñaEditando]);

  const limpiarFormulario = () => {
    setJuegoSeleccionado("");
    setTextoReseña("");
    
   //Llama a la función de App.js para limpiar reseñaEditando
   if (reseñaEditando) {
        onCancelarEdicion(); 
    }
  };

  const manejarSubmit = (e) => {
    e.preventDefault();

    if (juegoSeleccionado === "" || textoReseña.trim() === "") {
      alert("Por favor completa todos los campos");
      return;
    }

    const juegoEncontrado = juegos.find(j => j._id === juegoSeleccionado);
    
    if (!juegoEncontrado) {
      alert("Selecciona un juego válido");
      return;
    }

    const datosReseña = {
      juegoId: juegoEncontrado._id,
      juegoTitulo: juegoEncontrado.titulo,
      texto: textoReseña,
      fecha: new Date().toLocaleDateString('es-ES')
    };

    //Si estamos editando, llamamos a onActualizarReseña
    //si no, llamamos a onAgregarReseña
    if (reseñaEditando) {
      onActualizarReseña(reseñaEditando._id, datosReseña);
    } else {
      onAgregarReseña(datosReseña);
      limpiarFormulario();
    }
  };

  return (
    <div className="formulario-reseña-container">
      <h2>{reseñaEditando ? "✏️ Editar Reseña" : "📝 Escribir Nueva Reseña"}</h2>
      
      <form onSubmit={manejarSubmit}>
        <div className="campo">
          <label>Selecciona el juego:</label>
          <select
            value={juegoSeleccionado}
            onChange={(e) => setJuegoSeleccionado(e.target.value)}
          >
            <option value="">-- Elige un juego --</option>
            {juegos.map((juego) => (
              <option key={juego._id} value={juego._id}>
                {juego.titulo}
              </option>
            ))}
          </select>
        </div>

        <div className="campo">
          <label>Tu reseña:</label>
          <textarea
            value={textoReseña}
            onChange={(e) => setTextoReseña(e.target.value)}
            placeholder="Escribe tu opinión sobre el juego..."
            rows="6"
          />
        </div>

        <button type="submit" className="btn-agregar-reseña">
          {reseñaEditando ? "💾 Guardar Cambios" : "Publicar Reseña"}
        </button>

        {reseñaEditando && (
          <button 
            type="button" 
            className="btn-cancelar-reseña"
            onClick={limpiarFormulario}
          >
            Cancelar
          </button>
        )}
      </form>
    </div>
  );

}

export default FormularioReseña;

