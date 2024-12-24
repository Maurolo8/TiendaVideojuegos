// --------- Modificar la URL segun su configuracion -------------------
const BASE_URL = 'http://localhost:5000';

// Listar videojuegos
const listVideojuegos = (setListaVideojuegos) => {
  fetch(`${BASE_URL}/videojuego`)
    .then((response) => response.json())
    .then((data) => setListaVideojuegos(data))
    .catch((error) => console.error('Fetch error:', error));
};

// Filtrar videojuegos por cantidad de stock
const filterVideojuegosByStock = (cantidad, setListaVideojuegos) => {
  fetch(`${BASE_URL}/videojuego/filtrarCantidad?cantidad=${cantidad}`)
    .then((response) => {
      if (!response.ok) throw new Error('Error al filtrar videojuegos por cantidad de stock');
      return response.json();
    })
    .then((data) => setListaVideojuegos(data))
    .catch((error) => console.error('Fetch error:', error));
};

// Crear o modificar un videojuego
const createOrUpdateVideojuego = (videojuego, setListaVideojuegos, setMsg, setSuccess) => {
  const method = videojuego.id ? 'PUT' : 'POST';
  const url = `${BASE_URL}/videojuego`; // Eliminar el id de la URL para el método PUT

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(videojuego),
  })
    .then((response) => {
      if (!response.ok) throw new Error('Error al guardar el videojuego');
      return response.json();
    })
    .then(() => {
      setMsg(`Videojuego ${videojuego.id ? 'modificado' : 'creado'} con éxito`);
      setSuccess(true);
      listVideojuegos(setListaVideojuegos); // Refrescar la lista de videojuegos
    })
    .catch((error) => {
      setMsg(error.message);
      setSuccess(false);
    });
};
 
  // Eliminar un videojuego
  const deleteVideojuego = (id, setListaVideojuegos, setMsg, setSuccess) => {
    fetch(`${BASE_URL}/videojuego/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) throw new Error('Error al eliminar el videojuego');
        return response.text();
      })
      .then(() => {
        setMsg('Videojuego eliminado con éxito');
        setSuccess(true);
        listVideojuegos(setListaVideojuegos);
      })
      .catch((error) => {
        setMsg(error.message);
        setSuccess(false);
      });
  };

// Listar usuarios
const listUsuarios = (setLista) => {
  fetch(`${BASE_URL}/usuario`)
    .then((response) => {
      console.log('HTTP Status:', response.status);
      return response.json();
    })
    .then((data) => {
      console.log('Datos recibidos del servidor:', data);
      if (Array.isArray(data)) {
        setLista(data);
      } else {
        setLista([]);
      }
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      setLista([]);
    });
};
  
 // Filtrar usuarios por tipo
const filterUsuariosByTipo = (tipo, setListaUsuarios) => {
  fetch(`${BASE_URL}/usuario/filtrarPorTipo?tipo=${tipo}`)
    .then((response) => {
      if (!response.ok) throw new Error('Error al filtrar usuarios por tipo');
      return response.json();
    })
    .then((data) => setListaUsuarios(data))
    .catch((error) => console.error('Fetch error:', error));
};
// Crear o modificar usuario (Admin, Premium o Regular)
const createOrUpdateUsuario = (usuario, tipoUsuario, setListaUsuarios, setMsg, setSuccess) => {
  // Determinar el método HTTP: 'PUT' para modificar, 'POST' para crear
  const method = usuario.id ? 'PUT' : 'POST';

  // Determinar la URL sin incluir el ID en caso de 'PUT'
  const url = tipoUsuario === 'ADMIN'
    ? `${BASE_URL}/usuarioAdmin`
    : tipoUsuario === 'PREMIUM'
    ? `${BASE_URL}/usuarioPremium`
    : `${BASE_URL}/usuario`;

  // Realizar la solicitud fetch
  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario),
  })
    .then((response) => {
      if (!response.ok) throw new Error(`Error al ${usuario.id ? 'modificar' : 'crear'} el usuario`);
      return response.json();
    })
    .then(() => {
      setMsg(`Usuario ${usuario.id ? 'modificado' : 'creado'} con éxito`);
      setSuccess(true);
      listUsuarios(setListaUsuarios);
    })
    .catch((error) => {
      setMsg(error.message);
      setSuccess(false);
    });
};
  
  // Eliminar usuario (Regular , Admin o Premium)
  const deleteUsuario = (id, tipoUsuario, setListaUsuarios, setMsg, setSuccess) => {
    const url = tipoUsuario === 'ADMIN'
  ? `${BASE_URL}/usuarioAdmin/${id}`
  : tipoUsuario === 'PREMIUM'
  ? `${BASE_URL}/usuarioPremium/${id}`
  : `${BASE_URL}/usuario/${id}`;
  
    fetch(url, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) throw new Error('Error al eliminar el usuario');
        return response.text();
      })
      .then(() => {
        setMsg('Usuario eliminado con éxito');
        setSuccess(true);
        listUsuarios(setListaUsuarios);
      })
      .catch((error) => {
        setMsg(error.message);
        setSuccess(false);
      });
  };
  

// Listar ventas con el monto total calculado
const listVentas = (setListaVentas) => {
  fetch(`${BASE_URL}/venta`)
    .then((response) => {
      if (!response.ok) throw new Error('Error al obtener la lista de ventas');
      return response.json();
    })
    .then((ventas) => {
      const ventasConMonto = ventas.map((venta) => {
        const montoTotal = venta.lineasVenta?.reduce((total, linea) => {
          return total + (linea.cantidad * (linea.videojuego?.precio || 0));
        }, 0) || 0;
        return { ...venta, montoTotal };
      });
      setListaVentas(ventasConMonto);
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      setListaVentas([]);
    });
};

// Filtrar ventas por usuario
const filterVentasByUsuario = (usuarioId, setListaVentas, setMsg, setSuccess) => {
  fetch(`${BASE_URL}/venta/ComprasUsuario?id=${usuarioId}`)
    .then((response) => {
      if (!response.ok) throw new Error('Error al filtrar ventas por usuario');
      return response.json();
    })
    .then((ventas) => {
      // Calcular monto total para cada venta
      const ventasConMonto = ventas.map((venta) => ({
        ...venta,
        montoTotal: venta.lineasVenta.reduce((total, linea) => total + linea.cantidad * linea.videojuego.precio, 0),
      }));
      setListaVentas(ventasConMonto);
      setMsg(null);
      setSuccess(true);
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      setMsg(error.message);
      setSuccess(false);
    });
};

// Filtrar ventas por fecha
const filterVentasByFecha = (fecha, setListaVentas, setMsg, setSuccess) => {
  fetch(`${BASE_URL}/venta/FiltrarPorFecha?fecha=${fecha}`)
    .then((response) => {
      if (!response.ok) throw new Error('Error al filtrar ventas por fecha');
      return response.json();
    })
    .then((ventas) => {
      // Calcular monto total para cada venta
      const ventasConMonto = ventas.map((venta) => ({
        ...venta,
        montoTotal: venta.lineasVenta.reduce((total, linea) => total + linea.cantidad * linea.videojuego.precio, 0),
      }));
      setListaVentas(ventasConMonto);
      setMsg(null);
      setSuccess(true);
    })
    .catch((error) => {
      console.error('Fetch error:', error);
      setMsg(error.message);
      setSuccess(false);
    });
};

// Crear o modificar una venta
const createOrUpdateVenta = (venta, setListaVentas, setMsg, setSuccess) => {
  const method = venta.id ? 'PUT' : 'POST';
  const url = venta.id ? `${BASE_URL}/venta/${venta.id}` : `${BASE_URL}/venta`;

  const ventaBody = {
    usuario: { id: venta.usuario.id },
    administrador: { id: venta.administrador.id },
    fechaCompra: venta.fechaCompra,
    lineasVenta: venta.lineasVenta.map((linea) => ({
      videojuego: { id: linea.videojuego.id },
      cantidad: linea.cantidad,
    })),
  };

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ventaBody),
  })
    .then((response) => {
      if (!response.ok) throw new Error(`Error al ${venta.id ? 'modificar' : 'crear'} la venta`);
      return response.json();
    })
    .then(() => {
      setMsg(`Venta ${venta.id ? 'modificada' : 'creada'} con éxito`);
      setSuccess(true);
      listVentas(setListaVentas);
    })
    .catch((error) => {
      setMsg(error.message);
      setSuccess(false);
    });
};

// Eliminar una venta
const deleteVenta = (id, setListaVentas, setMsg, setSuccess) => {
  fetch(`${BASE_URL}/venta/${id}`, { method: 'DELETE' })
    .then((response) => {
      if (!response.ok) throw new Error('Error al eliminar la venta');
      return response.text();
    })
    .then(() => {
      setMsg('Venta eliminada con éxito');
      setSuccess(true);
      listVentas(setListaVentas);
    })
    .catch((error) => {
      setMsg(error.message);
      setSuccess(false);
    });
};

  // Listar líneas de venta
const listLineasVenta = (setLista) => {
    fetch(`${BASE_URL}/lineaVenta`)
      .then((response) => response.json())
      .then((data) => setLista(data))
      .catch((error) => console.error('Fetch error:', error));
  };
  
  // Crear o modificar una línea de venta
  const createOrUpdateLineaVenta = (lineaVenta, setListaLineasVenta, setMsg, setSuccess) => {
    const method = lineaVenta.id ? 'PUT' : 'POST';
    fetch(`${BASE_URL}/lineaVenta`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lineaVenta),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Error al guardar la línea de venta');
        return response.json();
      })
      .then(() => {
        setMsg(`Línea de venta ${lineaVenta.id ? 'modificada' : 'creada'} con éxito`);
        setSuccess(true);
        listLineasVenta(setListaLineasVenta);
      })
      .catch((error) => {
        setMsg(error.message);
        setSuccess(false);
      });
  };
  
  // Eliminar una línea de venta
  const deleteLineaVenta = (id, setListaLineasVenta, setMsg, setSuccess) => {
    fetch(`${BASE_URL}/lineaVenta/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) throw new Error('Error al eliminar la línea de venta');
        return response.text();
      })
      .then(() => {
        setMsg('Línea de venta eliminada con éxito');
        setSuccess(true);
        listLineasVenta(setListaLineasVenta);
      })
      .catch((error) => {
        setMsg(error.message);
        setSuccess(false);
      });
  };

  const loginUsuarioAdmin = (correo, contrasena, setAuth, setMsg, setSuccess) => {
    // Construimos la URL con los parámetros
    const url = `http://localhost:5000/usuarioAdmin/login?correo=${encodeURIComponent(correo)}&contrasena=${encodeURIComponent(contrasena)}`;
    
    // Realizamos la solicitud GET
    fetch(url, {
        method: "POST", // Usa GET ya que los datos están en los parámetros
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("Credenciales incorrectas");
            }
            return response.text(); // Si el login es exitoso, obtenemos la respuesta como texto
        })
        .then((data) => {
            setMsg(data);
            setSuccess(true);
            setAuth(true); // Indicamos que la autenticación fue correcta
            
            localStorage.setItem("adminId", data.charAt(6)); // lo hice asi, porque al hacerlo "localStorage.setItem("adminId", data.id);" no funciona, guarda undefined
            console.log(localStorage.getItem("adminId"));
        })
        .catch((error) => {
            setMsg(error.message);
            setSuccess(false);
            setAuth(false); // Indicamos que la autenticación falló
        });
};



export default {
    listVideojuegos,
    createOrUpdateVideojuego,
    deleteVideojuego,
  listUsuarios,
  createOrUpdateUsuario,
  deleteUsuario,
  listVentas,
  createOrUpdateVenta,
  deleteVenta,
  listLineasVenta,
  createOrUpdateLineaVenta,
  deleteLineaVenta,
  loginUsuarioAdmin,
  filterVideojuegosByStock,
  filterUsuariosByTipo,
  filterVentasByFecha,
  filterVentasByUsuario,
};