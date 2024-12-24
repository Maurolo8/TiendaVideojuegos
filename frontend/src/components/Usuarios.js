import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, ButtonGroup, Form, Alert } from 'react-bootstrap';
import fetchs from '../fetchs';
import 'bootstrap/dist/css/bootstrap.min.css';

const Usuarios = () => {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [id, setId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('ADMIN');
  const [descuento, setDescuento] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [suscripto, setSuscripto] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState('');

  // Cargar la lista de usuarios al inicio
  useEffect(() => {
    fetchs.listUsuarios(setListaUsuarios);
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = () => {
    const usuario = { id, nombre, correo };

    if (tipoUsuario === 'ADMIN') {
      usuario.descuento = descuento;
      usuario.contrasena = contrasena;
    } else if (tipoUsuario === 'PREMIUM') {
      usuario.descuento = descuento;
      usuario.suscripto = suscripto;
    }

    fetchs.createOrUpdateUsuario(usuario, tipoUsuario, setListaUsuarios, setError, setSuccess);
    clearForm();
  };

  // Función para llenar el formulario con los datos del usuario seleccionado
  const fillForm = (usuario) => {
    setId(usuario.id);
    setNombre(usuario.nombre);
    setCorreo(usuario.correo);
    setDescuento(usuario.descuento || '');
    setContrasena(usuario.contrasena || '');
    setSuscripto(usuario.suscripto || '');

    if (usuario.contrasena != null) {
      setTipoUsuario('ADMIN');
    } else if (usuario.suscripto != null) {
      setTipoUsuario('PREMIUM');
    } else {
      setTipoUsuario('REGULAR');
    }
  };

  // Función para limpiar el formulario
  const clearForm = () => {
    setId(null);
    setNombre('');
    setCorreo('');
    setTipoUsuario('ADMIN');
    setDescuento('');
    setContrasena('');
    setSuscripto('');
  };

  // Función para filtrar usuarios por tipo
  const handleFiltrarPorTipo = () => {
    if (filtroTipo) {
      fetchs.filterUsuariosByTipo(filtroTipo, setListaUsuarios);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Gestión de Usuarios</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Operación realizada con éxito</Alert>}

      {/* Formulario para agregar o modificar usuarios */}
      <Row className="mb-4">
        <Col md={4}>
          <h4 className="mb-3">Formulario de Usuario</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control value={id || ''} onChange={(e) => setId(e.target.value)} type="number" placeholder="ID del usuario" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control value={nombre} onChange={(e) => setNombre(e.target.value)} type="text" placeholder="Nombre del usuario" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control value={correo} onChange={(e) => setCorreo(e.target.value)} type="email" placeholder="Correo del usuario" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo de Usuario</Form.Label>
              <Form.Select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)}>
                <option value="ADMIN">Admin</option>
                <option value="PREMIUM">Premium</option>
                <option value="REGULAR">Regular</option>
              </Form.Select>
            </Form.Group>

            {tipoUsuario === 'ADMIN' && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control value={contrasena} onChange={(e) => setContrasena(e.target.value)} type="password" placeholder="Contraseña" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Descuento</Form.Label>
                  <Form.Control value={descuento} onChange={(e) => setDescuento(e.target.value)} type="number" placeholder="Descuento" />
                </Form.Group>
              </>
            )}

            {tipoUsuario === 'PREMIUM' && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de Suscripción</Form.Label>
                  <Form.Control value={suscripto} onChange={(e) => setSuscripto(e.target.value)} type="date" />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Descuento</Form.Label>
                  <Form.Control value={descuento} onChange={(e) => setDescuento(e.target.value)} type="number" placeholder="Descuento" />
                </Form.Group>
              </>
            )}

            <Button variant="primary" onClick={handleSubmit}>
              {id ? 'Modificar' : 'Agregar'} Usuario
            </Button>
            <Button variant="secondary" className="ms-2" onClick={clearForm}>
              Limpiar
            </Button>
          </Form>
        </Col>

        {/* Filtro por tipo de usuario */}
        <Col md={8}>
          <h4 className="mb-3">Filtrar Usuarios</h4>
          <Form.Group className="d-flex mb-4">
            <Form.Select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
              <option value="">Seleccione tipo de usuario</option>
              <option value="ADMIN">Admin</option>
              <option value="PREMIUM">Premium</option>
              <option value="REGULAR">Regular</option>
            </Form.Select>
            <Button variant="info" className="ms-2" onClick={handleFiltrarPorTipo}>
              Filtrar
            </Button>
            <Button variant="secondary" className="ms-2" onClick={() => fetchs.listUsuarios(setListaUsuarios)}>
              Quitar Filtro
            </Button>
          </Form.Group>

          {/* Tabla de usuarios */}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Descuento</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listaUsuarios.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center">No hay usuarios disponibles.</td>
                </tr>
              ) : (
                listaUsuarios.map((usuario) => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre}</td>
                    <td>{usuario.correo}</td>
                    <td>{usuario.descuento || 'N/A'}</td>
                    <td>
                      <ButtonGroup>
                        <Button variant="warning" onClick={() => fillForm(usuario)}>
                          Editar
                        </Button>
                        <Button variant="danger" onClick={() => fetchs.deleteUsuario(usuario.id, tipoUsuario, setListaUsuarios, setError, setSuccess)}>
                          Eliminar
                        </Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Usuarios;