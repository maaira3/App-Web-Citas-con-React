import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import FormLogin from './../FormLogin';
import logo from './../../logoblanco.png'
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem('token')
const nombre = localStorage.getItem('nombre')
const tipousuario = localStorage.getItem('tipo')

export default function BarraPrincipalAdministrador()
{
    const saludo = "¡Hola "+ nombre +"!";
    let history = useNavigate();
    const classAdmin = token ? "navlink-admin" : "navlink";
    const classAdminSep = token ? "navlink-admin sep" : "navlink sep";
    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem('nombre')
        localStorage.removeItem('id')
        localStorage.removeItem('tipo')
        history.push("/");
    }

    return (
        
        <>
                <Navbar collapseOnSelect expand="lg" fixed="top" bg="navbar" className="py-3" >
                    <div></div>
                    <Container  className="px-4 px-lg-5">
                        
                        <Navbar.Brand href="/" className="mlnav-4" > 
                        <img
                            alt=""
                            src={logo}
                            width="80"
                            height="30"
                            className="d-inline-block align-top"
                        />{'  '}&nbsp;<font color="white"><b>&nbsp;&nbsp;&nbsp;&nbsp;PSICOELEMENTAL</b></font>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto margin-nav">
                            <Nav.Link href="/"  className={classAdmin}>Inicio</Nav.Link>
                            <Nav.Link href="/blog" className={classAdmin}>Blog</Nav.Link>
                            <Nav.Link href="/verTerapeutas" className={classAdmin}>Terapeutas</Nav.Link>
                            {token
                            ?<>
                                <Nav.Link href="/citas" className="navlink-admin">Citas</Nav.Link>
                                <Nav.Link href="/listaTerapeutas" className="navlink-admin">Informacion Terapeutas</Nav.Link>
                                <Nav.Link href="/clientes" className="navlink-admin">Pacientes</Nav.Link>
                                <Nav.Link href="/registrarse" className="navlink-admin">Alta Terapeutas</Nav.Link>
                                <span className="navlink-admin sep">|</span>
                                <NavDropdown title={saludo} autoClose={false}>
                                    {tipousuario==='administrador'
                                    ?<NavDropdown.Item href="/servicios">Servicios</NavDropdown.Item>
                                    :<></>}
                                    <NavDropdown.Item href="/" onClick={() => logout()}>Salir</NavDropdown.Item>
                                </NavDropdown>
                            </>
                            :<>
                            <span className={classAdminSep}>|</span>
                            <NavDropdown title="Iniciar Sesión" autoClose={false} >
                                    <NavDropdown.Item style={{width:'30vw'}}  >
                                        <FormLogin className='w-300px'/>
                                    </NavDropdown.Item>
                                </NavDropdown>
                             </>
                            }
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        </>
    )

}