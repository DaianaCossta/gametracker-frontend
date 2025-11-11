const API_URL = 'http://localhost:5000/api';

// JUEGOS 

 export const obtenerJuegos = async () => {
  try {
    const response = await fetch(`${API_URL}/juegos`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener juegos:', error);
    return [];
  }
 };

 export const crearJuego = async (juego) => {
  try {
    const response = await fetch(`${API_URL}/juegos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(juego),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear juego:', error);
    throw error;
  }
 };

 export const actualizarJuego = async (id, juego) => {
  try {
    const response = await fetch(`${API_URL}/juegos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(juego),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al actualizar juego:', error);
    throw error;
  }
  };

 export const eliminarJuego = async (id) => {
  try {
    const response = await fetch(`${API_URL}/juegos/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al eliminar juego:', error);
    throw error;
  }
 };

// RESEÑAS

export const obtenerReseñas = async () => {
  try {
    const response = await fetch(`${API_URL}/resenas`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    return [];
  }
};
//crear reseña
export const crearReseña = async (reseña) => {
  try {
    const response = await fetch(`${API_URL}/resenas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reseña),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear reseña:', error);
    throw error;
  }
};
//actualizar reseña
export const actualizarReseña = async (id, reseña) => {
  try {
    const response = await fetch(`${API_URL}/resenas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reseña),
    });
    const data = await response.json();
    //si la respuesta no es ok, ej 400, 404, 500, lanzamos un error
    if (!response.ok) {
      throw new Error(data.message || 'Error al actualizar reseña');  
    }
    //si la respuesta es ok, retornamos los datos
    return data;
  } catch (error) {
    console.error('Error al actualizar reseña:', error);
    throw error;
  }
};
//eliminar reseña
export const eliminarReseña = async (id) => {
  try {
    const response = await fetch(`${API_URL}/resenas/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al eliminar reseña:', error);
    throw error;
  }
};