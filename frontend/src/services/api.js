const BASE_URL = 'http://localhost:8084';

// Funciones para Videojuegos
export const listVideojuegos = (setLista) => {
  fetch(`${BASE_URL}/videojuego`)
    .then(response => response.json())
    .then(data => setLista(data))
    .catch(error => console.error('Fetch error:', error));
};

export const createVideojuego = (videojuego, setMsg, setSuccess, setListaVideojuegos) => {
  fetch(`${BASE_URL}/videojuego`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(videojuego),
  })
    .then(response => {
      if (!response.ok) throw new Error('Error al crear el videojuego');
      return response.json();
    })
    .then(() => {
      setMsg('Videojuego agregado con éxito');
      setSuccess(true);
      listVideojuegos(setListaVideojuegos);
    })
    .catch(error => {
      setMsg(error.message);
      setSuccess(false);
    });
};