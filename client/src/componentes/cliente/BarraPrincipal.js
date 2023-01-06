import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import FormLogin from './../FormLogin';
import logo from './../../logoblanco.png'
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem('token')
const nombre = localStorage.getItem('nombre')
const pagoServicio = localStorage.getItem('pagoServicio')

export default function BarraPrincipal()
{
    const saludo = "¡Hola "+ nombre +"!";

    let history = useNavigate();

    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem('nombre')
        localStorage.removeItem('id')
        localStorage.removeItem('pagoServicio')
        localStorage.removeItem('tipo')
        history.push("/");
    }

    return (
            <Navbar collapseOnSelect expand="lg" fixed="top"  bg="navbar" className="py-3">
                <Container  className="px-4 px-lg-5">
                    <Navbar.Brand href="/" className="mlnav-4"> 
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
                        <Nav.Link href="/" className="navlink">Inicio</Nav.Link>
                        <Nav.Link href="/blog" className="navlink">Blog</Nav.Link>
                        <Nav.Link href="/verTerapeutas" className="navlink">Terapeutas</Nav.Link>
                        {token
                        ?<>
                            {pagoServicio === "1" 
                            ? <Nav.Link href="/seleccionarCita" className="navlink">Cita</Nav.Link> 
                            : <Nav.Link href="/orden" className="navlink">Pago</Nav.Link>
                            } 
                            <span className="navlink sep">|</span>
                            <NavDropdown title={saludo} autoClose={false} className="navlink">
                                <NavDropdown.Item href="/perfil" className="navlink" >Perfil</NavDropdown.Item>
                                <NavDropdown.Item href="/" onClick={() => logout()} className="navlink">Salir</NavDropdown.Item>
                            </NavDropdown>
                        </>
                        :<>
                            <span className="navlink sep">|</span>
                            <NavDropdown title="Iniciar Sesión" autoClose={false}>
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
    )

}