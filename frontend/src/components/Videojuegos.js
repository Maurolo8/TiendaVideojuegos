import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, ButtonGroup, Alert } from 'react-bootstrap';
import fetchs from '../fetchs';

const Videojuegos = () => {
  const [listaVideojuegos, setListaVideojuegos] = useState([]);
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [cantidadStock, setCantidadStock] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState('');
  const [trailerURL, setTrailerURL] = useState('');
  const [msg, setMsg] = useState(null);
  const [success, setSuccess] = useState(null);
  const [filtroCantidad, setFiltroCantidad] = useState('');

  // Cargar la lista de videojuegos al inicio
  useEffect(() => {
    fetchs.listVideojuegos(setListaVideojuegos);
  }, []);

  // Llenar formulario para editar
  const fillForm = (videojuego) => {
    setId(videojuego.id);
    setNombre(videojuego.nombre);
    setCantidadStock(videojuego.cantidadStock);
    setDescripcion(videojuego.descripcion);
    setPrecio(videojuego.precio);
    setCategoria(videojuego.categoria);
    setImagen(videojuego.imagen);
    setTrailerURL(videojuego.trailerURL);
  };

  // Limpiar formulario
  const clearForm = () => {
    setId(null);
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setImagen('');
    setTrailerURL('');
    setCantidadStock('');
    setCategoria('');
  };

  // Manejar el envío del formulario
  const handleSubmit = () => {
    const videojuego = { id, nombre, descripcion, precio, cantidadStock, categoria, imagen, trailerURL };
    fetchs.createOrUpdateVideojuego(videojuego, setListaVideojuegos, setMsg, setSuccess);
    clearForm();
  };

  // Filtrar por cantidad de stock
  const handleFiltrarPorCantidad = () => {
    if (filtroCantidad) {
      fetchs.filterVideojuegosByStock(filtroCantidad, setListaVideojuegos);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Gestión de Videojuegos</h2>

      {msg && <Alert variant={success ? 'success' : 'danger'}>{msg}</Alert>}

      {/* Formulario para crear o modificar videojuegos */}
      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <Form>
            <h4 className="mb-3">Formulario de Videojuego</h4>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Cantidad en Stock</Form.Label>
              <Form.Control type="number" value={cantidadStock} onChange={(e) => setCantidadStock(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control value={categoria} onChange={(e) => setCategoria(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL de la Imagen</Form.Label>
              <Form.Control value={imagen} onChange={(e) => setImagen(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>URL del Trailer</Form.Label>
              <Form.Control value={trailerURL} onChange={(e) => setTrailerURL(e.target.value)} />
            </Form.Group>
            <Button variant="primary" onClick={handleSubmit}>
              {id ? 'Modificar' : 'Agregar'} Videojuego
            </Button>
            <Button variant="secondary" className="ms-2" onClick={clearForm}>
              Limpiar
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Filtro por cantidad de stock */}
      <Row className="mb-4">
        <Col md={6} className="mx-auto">
          <h4 className="mb-3">Filtrar Videojuegos por Stock</h4>
          <Form.Group className="mb-3 d-flex">
            <Form.Control
              type="number"
              placeholder="Ingrese cantidad de stock"
              value={filtroCantidad}
              onChange={(e) => setFiltroCantidad(e.target.value)}
            />
            <Button variant="info" className="ms-2" onClick={handleFiltrarPorCantidad}>
              Filtrar
            </Button>
            <Button variant="secondary" className="ms-2" onClick={() => fetchs.listVideojuegos(setListaVideojuegos)}>
              Quitar Filtro
            </Button>
          </Form.Group>
        </Col>
      </Row>

      {/* Listado de videojuegos */}
      <Row>
        {listaVideojuegos.length === 0 ? (
          <Col>
            <p className="text-center mt-4">No hay videojuegos disponibles. Agrega uno para comenzar.</p>
          </Col>
        ) : (
          listaVideojuegos.map((videojuego) => (
            <Col md={4} className="mb-4" key={videojuego.id}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={videojuego.imagen || 'https://via.placeholder.com/150'}
                  alt={videojuego.nombre}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{videojuego.nombre}</Card.Title>
                  <Card.Text>{videojuego.descripcion}</Card.Text>
                  <Card.Text>
                    <strong>Precio:</strong> ${videojuego.precio}
                  </Card.Text>
                  <Card.Text>
                    <strong>Cantidad en Stock:</strong> {videojuego.cantidadStock}
                  </Card.Text>
                  <Card.Text>
                    <strong>Categoría:</strong> {videojuego.categoria}
                  </Card.Text>
                  {videojuego.trailerURL && (
                    <a
                      href={videojuego.trailerURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-info mb-2 w-100"
                    >
                      Ver Trailer
                    </a>
                  )}
                  <ButtonGroup className="w-100">
                    <Button variant="warning" onClick={() => fillForm(videojuego)}>
                      Editar
                    </Button>
                    <Button variant="danger" onClick={() => fetchs.deleteVideojuego(videojuego.id, setListaVideojuegos, setMsg, setSuccess)}>
                      Eliminar
                    </Button>
                  </ButtonGroup>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Videojuegos;