import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import FormLogin from './../FormLogin';
import logo from './../../logoblanco.png'
import { useNavigate } from "react-router-dom";
const token = localStorage.getItem('token')
const nombre = localStorage.getItem('nombre')

export default function BarraPrincipalTerapeuta()
{
    const saludo = "¡Hola "+ nombre +"!";
    let history = useNavigate();

    function logout(){
        localStorage.removeItem("token")
        localStorage.removeItem('nombre')
        localStorage.removeItem('id')
        localStorage.removeItem('tipo')
        history.push("/");
    }

    return (
        <>
            <div className='background-red'>
                <Navbar collapseOnSelect expand="lg" fixed="top"  bg="navbar" className="py-3">
                    <div></div>
                    <Container  className="px-4 px-lg-5">
                        <Navbar.Brand href="/" className="mlnav-4"> 
                        <img
                            alt=""
                            src={logo}
                            width="60"
                            height="30"
                            className="d-inline-block align-top"
                        />{'  '}&nbsp;<font color="white"><b>PSICOELEMENTAL</b></font>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto margin-nav">
                            <Nav.Link href="/" className="navlink">Inicio</Nav.Link>
                            <Nav.Link href="/blog" className="navlink">Blog</Nav.Link>
                            <Nav.Link href="/verTerapeutas" className="navlink">Terapeutas</Nav.Link>
                            {token
                            ?<>
                                <Nav.Link href="/crearCitas" className="navlink">Horarios</Nav.Link>
                                <Nav.Link href="/Consultas" className="navlink">Consultas</Nav.Link>
                                <NavDropdown title={saludo} autoClose={false}>
                                    <NavDropdown.Item href="/perfil">Perfil</NavDropdown.Item>
                                    <NavDropdown.Item href="/" onClick={() => logout()}>Salir</NavDropdown.Item>
                                </NavDropdown>
                            </>
                            :<><NavDropdown title="Iniciar Sesión" autoClose={false}>
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
            </div>
        </>
    )

}