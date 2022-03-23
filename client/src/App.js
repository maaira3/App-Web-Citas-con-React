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

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Principal/></>} />
          <Route path="/registrarse" element={<Registrarse />} />

          <Route path="/seleccionarCita" element={<SeleccionarCita />} />
          <Route path="/verTerapeutas" element={<VerTerapeutas />} />

          <Route path="/perfil" element={<><Perfil /></>} />
          <Route path="/modificar-perfil" element={<><ModificarPerfil /></>} />

          <Route path="/crearCitas" element={<><CrearCitas /></>} />
          <Route path="/modificar-perfil" element={<> <ModificarPerfil /></>} />
          <Route path="/modificar-contrasena" element={<> <ModificarContrasena/></>}/>
          <Route path="/terapeuta/login" element={<><BarraPrincipalTerapeuta/> <Principal/></>}/>
          <Route path="/consultas" element={<><BarraPrincipalTerapeuta/> <Consultas/></>}/>
          <Route path="/administrador/login" element={<><BarraPrincipalAdministrador/> <Principal/></>}/>
          <Route path="/clientes" element={<><BarraPrincipalAdministrador/> <Clientes/></>}/>
          <Route path="/citas" element={<><BarraPrincipalAdministrador/> <Citas/></>}/>
          <Route path="/listaTerapeutas" element={<AdminVerTerapeutas/>} />   
          <Route path="/blog" element={<><Blog/> </>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
