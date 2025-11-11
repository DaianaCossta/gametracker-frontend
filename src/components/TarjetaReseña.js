import './TarjetaReseña.css';

function TarjetaReseña({ reseña, onEliminar, onEditar }) {
  console.log("Reseña recibida:", reseña);
  
  const handleEditar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("¡Editando reseña!", reseña);
    onEditar(reseña);
  };

  const handleEliminar = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEliminar(reseña._id);
  };

  return (
    <div className="tarjeta-reseña">
      {/*Botón de editar*/}
      <button 
        className="btn-editar-reseña"
        onClick={handleEditar}
        type="button"
        title="Editar reseña"
      >
        ✏️
      </button>

      {/*Botón de eliminar*/}
      <button 
        className="btn-eliminar-reseña"
        onClick={handleEliminar}
        type="button"
        title="Eliminar reseña"
      >
        ❌
      </button>
      
      <div className="reseña-header">
        <h3>🎮 {reseña.juegoTitulo}</h3>
        <span className="reseña-fecha">{reseña.fecha}</span>
      </div>
      
      <p className="reseña-texto">{reseña.texto}</p>
    </div>
  );
}

export default TarjetaReseña;