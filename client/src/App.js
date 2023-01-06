import './App.css';
import Principal from './componentes/Principal'
import Registrarse from './componentes/Registrarse'
import SeleccionarCita from './componentes/cliente/SeleccionarCita';
import Perfil from './componentes/Perfil'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import VerTerapeutas from './componentes/cliente/VerTerapeutas';
import ModificarPerfil from './componentes/ModificarPerfil';
import CrearCitas from './componentes/terapeuta/CrearCitas';
import ModificarContrasena from './componentes/ModificarContrasena';
import BarraPrincipalTerapeuta from './componentes/terapeuta/BarraPrincipalTerapeuta';
import Consultas from './componentes/terapeuta/Consultas';
import BarraPrincipalAdministrador from './componentes/administrador/BarraPrincipalAdministrador';
import Citas from './componentes/administrador/Citas';
import Clientes from './componentes/administrador/Clientes';
import AdminVerTerapeutas from './componentes/administrador/AdminVerTerapeutas';
import Blog from './componentes/Blog'
import PasosReserva from './componentes/PasosReserva';
import Orden from './componentes/cliente/ListaServicios';
import BarraPrincipal from './componentes/cliente/BarraPrincipal';
import PagoRealizado from './componentes/cliente/PagoRealizado';
import AdminServicios from './componentes/administrador/AdminServicios';
import {ProtectedRoute} from './helpers/ProtectedRoute';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><BarraPrincipal/><Principal/></>} />
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/blog" element={<><Blog/> </>}/>
          <Route path="/reservar" element={<PasosReserva/>}/>
          <Route path="/verTerapeutas" element={<VerTerapeutas />} />

          <Route path="/seleccionarCita" element={<ProtectedRoute><SeleccionarCita /></ProtectedRoute>}/>
          <Route path="/perfil" element={<ProtectedRoute> <Perfil /></ProtectedRoute>}/>
          <Route path="/modificar-perfil" element={<ProtectedRoute> <><ModificarPerfil /></></ProtectedRoute>}/>
          <Route path="/orden" element={<ProtectedRoute><><BarraPrincipal/><Orden/></></ProtectedRoute>}/>
          <Route path="/pagoRealizado" element={<ProtectedRoute><PagoRealizado/></ProtectedRoute>}/>

          <Route path="/crearCitas" element={<ProtectedRoute><><CrearCitas /></></ProtectedRoute>}/>
          <Route path="/modificar-perfil" element={<ProtectedRoute><> <ModificarPerfil /></></ProtectedRoute>}/>
          <Route path="/modificar-contrasena" element={<ProtectedRoute><> <ModificarContrasena/></></ProtectedRoute>}/>

          <Route path="/terapeuta/login" element={<><BarraPrincipalTerapeuta/> <Principal/></>}/>
          <Route path="/consultas" element={<ProtectedRoute> <><BarraPrincipalTerapeuta/> <Consultas/></></ProtectedRoute>}/>

          <Route path="/administrador/login" element={<><BarraPrincipalAdministrador/> <Principal/></>}/>
          <Route path="/clientes" element={<ProtectedRoute><><BarraPrincipalAdministrador/> <Clientes/></></ProtectedRoute>}/>
          <Route path="/citas" element={<ProtectedRoute><><BarraPrincipalAdministrador/> <Citas/></></ProtectedRoute>}/>
          <Route path="/listaTerapeutas" element={<ProtectedRoute><AdminVerTerapeutas/></ProtectedRoute>}/>   
          <Route path="/servicios" element={<ProtectedRoute><><BarraPrincipalAdministrador/><AdminServicios/></></ProtectedRoute>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
