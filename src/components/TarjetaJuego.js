import './TarjetaJuego.css';

function TarjetaJuego({ juego, onEliminar, onEditar }) {
  
  const handleEditar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("¡CLICK EN EDITAR! Juego:", juego.titulo);
    onEditar(juego);
  };

  const handleEliminar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEliminar(juego._id);
  };

  return (
    <div className="tarjeta-juego">
      <button
        className="btn-editar"
        onClick={handleEditar}
        type="button"
        title="Editar juego"
      >
        ✏️
      </button>

      <button 
        className="btn-eliminar"
        onClick={handleEliminar}
        type="button"
        title="Eliminar juego"
      >
        ❌
      </button>
      
      {juego.portadaURL && (
        <div className="portada-container">
          <img 
            src={juego.portadaURL} 
            alt={juego.titulo}
            className="portada-juego"
            onError={(e) => e.target.style.display = 'none'}
          />
        </div>
      )}
      
      <h2>{juego.titulo}</h2>
      <p>Género: {juego.genero}</p>
      <p>⭐ Puntuación: {juego.puntuacion}/5</p>
      
      {juego.horasJugadas > 0 && (
        <p>⏱️ Horas jugadas: {juego.horasJugadas}h</p>
      )}
      
      <p>{juego.completado ? "✅ Completado" : "⏳ En progreso"}</p>
    </div>
  );
}

export default TarjetaJuego;