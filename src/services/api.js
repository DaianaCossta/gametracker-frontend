const API_URL = 'http://localhost:5000/api';

// ========== JUEGOS ==========

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

// ========== RESEÑAS ==========

export const obtenerReseñas = async () => {
  try {
    const response = await fetch(`${API_URL}/reseñas`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    return [];
  }
};

export const crearReseña = async (reseña) => {
  try {
    const response = await fetch(`${API_URL}/reseñas`, {
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

export const eliminarReseña = async (id) => {
  try {
    const response = await fetch(`${API_URL}/reseñas/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al eliminar reseña:', error);
    throw error;
  }
};