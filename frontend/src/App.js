import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Alert from 'react-bootstrap/Alert';
import Avatar from 'boring-avatars';
import fetchs from './fetchs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import Videojuegos from './components/Videojuegos';
import Usuarios from './components/Usuarios';
import Venta from './components/Venta';
import Login from './components/Login';

function App() {
  const [showVideojuegosMenu, setShowVideojuegosMenu] = useState(false);
  const [showUsuariosMenu, setShowUsuariosMenu] = useState(false);
  const [showVentasMenu, setShowVentasMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Para verificar si el usuario está autenticado
  const [listaVideojuegos, setListaVideojuegos] = useState([]);
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [msg, setMsg] = useState(null); // Mensaje para mostrar en alert
  const [success, setSuccess] = useState(null); // Determina si la operación fue exitosa

  const handleShowVideojuegosMenu = () => {
    setShowVideojuegosMenu(true);
    setShowUsuariosMenu(false);
    setShowVentasMenu(false);
  };

  const handleShowUsuariosMenu = () => {
    setShowUsuariosMenu(true);
    setShowVideojuegosMenu(false);
    setShowVentasMenu(false);
  };

  const handleShowVentasMenu = () => {
    setShowVentasMenu(true);
    setShowUsuariosMenu(false);
    setShowVideojuegosMenu(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowVideojuegosMenu(false);
    setShowUsuariosMenu(false);
    setShowVentasMenu(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchs.listVideojuegos(setListaVideojuegos);
      fetchs.listUsuarios(setListaUsuarios);
    }
  }, [isAuthenticated]);

  return (
    <div className="App">
      {/* Mostrar la barra de navegación y contenido si está autenticado */}
      {isAuthenticated ? (
        <>
          <Navbar bg="primary" variant="dark" expand="sm">
            <Container>
              <Navbar.Brand href="#home" className="fw-bold">
                Inicio
              </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link onClick={handleShowVideojuegosMenu}>Videojuegos</Nav.Link>
                <Nav.Link onClick={handleShowUsuariosMenu}>Usuarios</Nav.Link>
                <Nav.Link onClick={handleShowVentasMenu}>Ventas</Nav.Link>
              </Nav>

              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="light"
                  className="d-flex align-items-center border rounded-pill px-3 py-1"
                  style={{ boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)' }}
                >
                  <Avatar
                    size={30}
                    name="Admin"
                    variant="beam" 
                    colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                    className="me-2"
                  />
                  <span className="fw-semibold">Perfil</span>
                </Dropdown.Toggle>

                <Dropdown.Menu className="mt-2">
                  <Dropdown.Item onClick={handleLogout} className="text-danger fw-bold">
                    Cerrar Sesión
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Container>
          </Navbar>

          {success && (
            <Alert
              variant="success"
              style={{ width: '30%', margin: 'auto', marginTop: '2.5%', textAlign: 'center' }}
            >
              {msg}
            </Alert>
          )}
          {!success && msg && (
            <Alert
              variant="danger"
              style={{ width: '30%', margin: 'auto', marginTop: '2.5%', textAlign: 'center' }}
            >
              {msg}
            </Alert>
          )}

          {showVideojuegosMenu && <Videojuegos listaVideojuegos={listaVideojuegos} />}
          {showUsuariosMenu && <Usuarios listaUsuarios={listaUsuarios} />}
          {showVentasMenu && <Venta listaUsuarios={listaUsuarios} listaVideojuegos={listaVideojuegos} />}
        </>
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} setMsg={setMsg} setSuccess={setSuccess} />
      )}
    </div>
  );
}

export default App;
