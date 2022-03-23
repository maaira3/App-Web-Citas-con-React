import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import FormLogin from './../FormLogin';
import logo from './../../logo.svg'
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
                <Navbar collapseOnSelect expand="lg" fixed="top"  bg="light" className="py-3">
                    <Container  className="px-4 px-lg-5">
                        <Navbar.Brand href="/"> 
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}PSICOELEMENTAL
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto ">
                            <Nav.Link href="/">Inicio</Nav.Link>
                            <Nav.Link href="/blog">Blog</Nav.Link>
                            <Nav.Link href="/verTerapeutas">Terapeutas</Nav.Link>
                            {token
                            ?<>
                                <Nav.Link href="/crearCitas">Horarios</Nav.Link>
                                <Nav.Link href="/Consultas">Consultas</Nav.Link>
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