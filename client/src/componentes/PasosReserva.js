import BarraPrincipalAdministrador from "./administrador/BarraPrincipalAdministrador";
import BarraPrincipal from "./cliente/BarraPrincipal";
import BarraPrincipalTerapeuta from "./terapeuta/BarraPrincipalTerapeuta";
import imagereservar from "../images/reservar.webp"

const tipousuario = localStorage.getItem('tipo')

export default function PasosReserva() {
  return (
    <div className="bgcolor-general">
            <div  className="row gx-4 gx-lg-5 justify-content-center mb-5 "></div>
                {tipousuario==='cliente'
                ?<BarraPrincipal/>
                :<>
                {tipousuario==='terapeuta'
                    ?<BarraPrincipalTerapeuta/>
                    :<BarraPrincipalAdministrador/>
                    }
                </>
                }

                <div className="container px-4 px-lg-5 h-100 ">
                 <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div> 
                 <div className="container">
                 <div className="container">
                    <div className="row">
                        <div className="col">
                                <img src={imagereservar} width="100%" height="100%" className="rounded" alt="imagen 1"/>
                        </div>
                        <div className="col bgcolor-content-card ">
                            <h1 align="center">¡Reserva ahora!</h1>
                            <br/>
                            <p align="center">Agenda tu cita siguiendo estos simples pasos.</p>
                                <div className="row">
                                    <div className="col" align="right">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square icon-list" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                    </div>
                                    <div className="col">
                                        <b>Registrarse</b>
                                        <p>Ingresa tus datos en el formulario de registro.</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col" align="right">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash-coin icon-list" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
                                        <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
                                        <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
                                        <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
                                    </svg>
                                    </div>
                                    <div className="col">
                                        <b>Realizar Pago</b>
                                        <p>Inicia sesión y realiza el pago de la cita a través de Mercado Pago.</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col" align="right">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-check icon-list" viewBox="0 0 16 16">
                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                        <path fill-rule="evenodd" d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                    </svg>
                                    </div>
                                    <div className="col">
                                        <b>Asignar Terapeuta</b>
                                        <p>Después de haber realizado el pago, nosotros te asignaremos un terapeuta.</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col" align="right">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-date icon-list" viewBox="0 0 16 16">
                                        <path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"/>
                                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                                    </svg>
                                    </div>
                                    <div className="col">
                                        <b>Elige el horario para tu cita</b>
                                        <p>Una vez que te hayamos asignado un terapeuta podrás seleccionar el horario que mejor se te acomode para tu cita.</p>
                                    </div>
                                </div>
                                <br/>
                            <div align="center">
                                <button className='btn btn-primary' onClick={(e)=> {window.location.replace('/registrarse')}} >Registrarse</button>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
    </div>
  )
}
