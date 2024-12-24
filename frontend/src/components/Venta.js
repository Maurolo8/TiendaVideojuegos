import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Table, Alert, ButtonGroup } from 'react-bootstrap';
import fetchs from '../fetchs';

const Venta = ({ listaUsuarios, listaVideojuegos }) => {
  const [listaVentas, setListaVentas] = useState([]);
  const [usuarioId, setUsuarioId] = useState('');
  const [videojuegoId, setVideojuegoId] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [fechaCompra, setFechaCompra] = useState('');
  const [lineasVenta, setLineasVenta] = useState([]);
  const [ventaId, setVentaId] = useState(null);
  const [msg, setMsg] = useState(null);
  const [success, setSuccess] = useState(null);
  const [filtroUsuarioId, setFiltroUsuarioId] = useState('');
  const [filtroFecha, setFiltroFecha] = useState('');
  const adminId = localStorage.getItem("adminId");
  // Cargar la lista de ventas al montar el componente
  useEffect(() => {
    fetchs.listVentas(setListaVentas);
    const fecha = new Date();
    const formatoPersonalizado = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')}`;
    setFechaCompra(formatoPersonalizado);
  }, []);

  // Agregar una línea de venta
  const agregarLineaVenta = () => {
    if (videojuegoId && cantidad > 0) {
      const videojuegoSeleccionado = listaVideojuegos.find((v) => v.id === parseInt(videojuegoId));
      const nuevaLinea = {
        videojuego: videojuegoSeleccionado,
        cantidad: parseInt(cantidad),
      };
      setLineasVenta([...lineasVenta, nuevaLinea]);
    }
  };

  // Confirmar la venta
  const confirmarVenta = () => {
    const venta = {
      usuario: { id: parseInt(usuarioId) },
      lineasVenta: lineasVenta.map((linea) => ({
        videojuego: { id: linea.videojuego.id },
        cantidad: linea.cantidad,
      })),
      fechaCompra,
      administrador: { id: parseInt(adminId) }, // El ID del admin está hardcodeado a 1
    };
    console.log(venta);
    
    fetchs.createOrUpdateVenta(venta, setListaVentas, setMsg, setSuccess);
    clearForm();
  };

  // Eliminar una línea de venta
  const eliminarLineaVenta = (index) => {
    const nuevasLineas = lineasVenta.filter((_, i) => i !== index);
    setLineasVenta(nuevasLineas);
  };

  // Cargar los datos de una venta seleccionada para editar
  const fillForm = (venta) => {
    setVentaId(venta.id);
    setUsuarioId(venta.usuario.id.toString());
    setFechaCompra(venta.fechaCompra);
    setLineasVenta(
      venta.lineasVenta.map((linea) => ({
        videojuego: { id: linea.videojuego.id, nombre: linea.videojuego.nombre },
        cantidad: linea.cantidad,
      }))
    );
  };

  // Limpiar el formulario
  const clearForm = () => {
    setVentaId(null);
    setUsuarioId('');
    setVideojuegoId('');
    setCantidad(1);
    setLineasVenta([]);
  };

  // Filtrar ventas por usuario
  const handleFiltrarPorUsuario = () => {
    fetchs.filterVentasByUsuario(filtroUsuarioId, setListaVentas, setMsg, setSuccess);
  };

  // Filtrar ventas por fecha
  const handleFiltrarPorFecha = () => {
    fetchs.filterVentasByFecha(filtroFecha, setListaVentas, setMsg, setSuccess);
  };

  // Quitar todos los filtros y recargar la lista completa de ventas
  const quitarFiltros = () => {
    setFiltroUsuarioId('');
    setFiltroFecha('');
    fetchs.listVentas(setListaVentas);
  };
  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Gestión de Ventas</h2>

      {msg && <Alert variant={success ? 'success' : 'danger'}>{msg}</Alert>}

      <Row>
        <Col md={6}>
          <h4 className="mb-3">Formulario de Venta</h4>
          <Form.Group className="mb-3">
            <Form.Label>Usuario</Form.Label>
            <Form.Select value={usuarioId} onChange={(e) => setUsuarioId(e.target.value)}>
              <option value="" disabled>Seleccione un usuario</option>
              {listaUsuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nombre} ({usuario.tipoUsuario})
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Videojuego</Form.Label>
            <Form.Select value={videojuegoId} onChange={(e) => setVideojuegoId(e.target.value)}>
              <option value="" disabled>Seleccione un videojuego</option>
              {listaVideojuegos.map((videojuego) => (
                <option key={videojuego.id} value={videojuego.id}>
                  {videojuego.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control type="number" min="1" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
          </Form.Group>

          <Button variant="primary" onClick={agregarLineaVenta}>
            Agregar Videojuego
          </Button>
          <Button variant="success" className="ms-2" onClick={confirmarVenta}>
            {ventaId ? 'Modificar Venta' : 'Confirmar Venta'}
          </Button>
          <Button variant="secondary" className="ms-2" onClick={clearForm}>
            Limpiar
          </Button>
        </Col>

        <Col md={6}>
          <h4 className="mb-3">Líneas de Venta</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Videojuego</th>
                <th>Cantidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {lineasVenta.map((linea, index) => (
                <tr key={index}>
                  <td>{linea.videojuego.nombre}</td>
                  <td>{linea.cantidad}</td>
                  <td>
                    <Button variant="danger" size="sm" onClick={() => eliminarLineaVenta(index)}>
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <hr className="my-4" />

      <Row className="mb-4">
        <Col md={6}>
          <h4>Filtrar por Usuario</h4>
          <Form.Select value={filtroUsuarioId} onChange={(e) => setFiltroUsuarioId(e.target.value)}>
            <option value="">Seleccione un usuario</option>
            {listaUsuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.id}>
                {usuario.nombre}
              </option>
            ))}
          </Form.Select>
          <Button variant="info" className="ms-2" onClick={handleFiltrarPorUsuario}>
            Filtrar
          </Button>
          <Button variant="secondary" className="ms-2" onClick={quitarFiltros}>Quitar Filtros</Button>
        </Col>

        <Col md={6}>
          <h4>Filtrar por Fecha</h4>
          <Form.Control type="date" value={filtroFecha} onChange={(e) => setFiltroFecha(e.target.value)} />
          <Button variant="info" className="ms-2" onClick={handleFiltrarPorFecha}>
            Filtrar
          </Button>
          <Button variant="secondary" className="ms-2" onClick={quitarFiltros}>Quitar Filtro</Button>
        </Col>
      </Row>

      <h3 className="mt-4">Lista de Ventas</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Fecha</th>
            <th>Monto Total</th>
            <th>Monto c/Descuento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaVentas.map((venta) => (
            
            <tr key={venta.id}>
              <td>{venta.id}</td>
              <td>{venta.usuario.nombre}</td>
              <td>{venta.fechaCompra}</td>
              <td>${(venta.montoTotal.toFixed(2))}</td>
              <td>
                ${
                  venta.usuario.descuento
                  ? (venta.montoTotal * (1 - venta.usuario.descuento / 100)).toFixed(2)
                  : venta.montoTotal.toFixed(2)
                }
              </td>
              <td>
                <ButtonGroup>
                  <Button variant="warning" onClick={() => fillForm(venta)}>
                    Editar
                  </Button>
                  <Button variant="danger" onClick={() => fetchs.deleteVenta(venta.id, setListaVentas, setMsg, setSuccess)}>
                    Eliminar
                  </Button>
                </ButtonGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Venta;