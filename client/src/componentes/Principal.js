
import BarraPrincipalAdministrador from "./administrador/BarraPrincipalAdministrador";
import BarraPrincipal from "./cliente/BarraPrincipal";
import BarraPrincipalTerapeuta from "./terapeuta/BarraPrincipalTerapeuta";
import image1 from "../images/happiness.png"
import image2 from "../images/imagen2.jpg"
import image3 from "../images/imagen3.jpg"
import image4 from "../images/imagen4.webp"
import emailjs from 'emailjs-com' //npm i emailjs-com 
import  { useState } from 'react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'

const tipousuario = localStorage.getItem('tipo')

export default function Principal()
{

    const [ comentario, setComentario ] = useState('')
    const [mensaje, setMensaje] = useState('')


    function sendEmail(){
        console.log(comentario)
        emailjs.send('service_vvmlhv5','template_80673b6',{ email: 'mjimenezh.398@gmail.com',
          message: "Comentario: "+ comentario,
          name: 'Psicoelemental'}, 'user_vE01873KnIdtHQnqhpb3Q', )
        .then((response) => {
               console.log('SUCCESS!', response.status, response.text);
               setComentario('')
               setMensaje('Sugerencia enviada')

        }, (err) => {
               console.log('FAILED...', err);
               setMensaje('No se pudo enviar la sugerencia, vuelva a intentar')
               
        });
    }

    return (
        <div className="bgcolor-general">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>

            <div className="section bg-purple" >
                <div className="row">
                    <div className="col col-image">
                        <img src={image1} width="66%" height="100%" alt="imagen 1" className="image img-purple" align="right"  />
                    </div>
                    <div className="col border-text">
                        <div className="margin-text">
                            <br></br>
                            <div  className="title" align="center">¿Por qué esperar más tiempo para vivir la vida que deseas tener? </div>
                            <br/><br/>
                            <p align="justify" className="text-white-75">Psicoelemental te acompaña con profesionales de salud mental graduados en psicología y especialistas en clínica que pueden guiarte en un proceso basado en la evidencia hacia el cambio. Ofrecemos citas desde cualquier parte del mundo de forma virtual, talleres de formación en habilidades blandas, asesoramiento en crianza respetuosa para familias y acompañamiento para empresas.</p>
                            <div align="center">
                                <button className='btn btn-primary' onClick={(e)=> {window.location.replace('/verTerapeutas')}} >Conoce nuestro equipo</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="section bg-white" >
            <div className="cont-sub">
                <div className="row">
                    <div className="col col-image">
                        <img src={image2} width="66%" height="67%" alt="imagen 1" className=" image image-orange" align="right"  />
                    </div>
                    <div className="col ">
                        <div className="margin-text-sub text">
                            <div  className="title" align="center">Terapia online </div>
                            <br/><br/>
                            <p align="justify" className="text-white-75">La terapia cognitivo-conductual, ha sido la que más evidencia ha mostrado tener en el mundo. De la mano de un equipo de profesionales construimos un plan de intervención que se ajuste a tus necesidades personales y en el que veas cambios en poco tiempo. </p>
                            <br/><br/>
                            <button className='btn btn-primary btn-sub' onClick={(e)=> {window.location.replace('/reservar')}} >¡Reserva ya!</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <div className="section bg-gray" >
            <div className="cont-sub-2">
                <div className="row">
                    <div className="col col-image">
                        <img src={image1} width="66%" height="100%" alt="imagen 1" className=" image image-blue" align="right"  />
                    </div>
                    <div className="col ">
                        <div className="margin-text-sub text">
                            <div  className="title" align="center">Autoconocimiento y desarrollo de habilidades blandas </div>
                            <br/><br/>
                            <p align="justify" className="text-white-75">Las habilidades blandas son habilidades para la vida. Es decir, son aquellas habilidades como la comunicación, la resolución de conflictos y la regulación de emociones que nos permiten entablar relaciones más saludables a nivel personal, familiar y laboral.</p>
                            <br/><br/>
                            <button className='btn btn-primary btn-sub' onClick={(e)=> {window.location.replace('/reservar')}} >¡Reserva ya!</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <div className="section bg-white" >
            <div className="cont-sub-2">
                <div className="row">
                    <div className="col col-image">
                        <img src={image3} width="66%" height="100%" alt="imagen 1" className=" image image-green" align="right"  />
                    </div>
                    <div className="col ">
                        <div className="margin-text-sub text">
                            <div  className="title" align="center">Crianza positiva y acompañamiento para familias </div>
                            <br/><br/>
                            <p align="justify" className="text-white-75">La crianza respetuosa es otra forma de entender la relación entre los niños, niñas y sus familias. La evidencia sugiere que es posible incluir disciplina con respeto. Así, tendremos niños y niñas que estén más seguros junto a sus familias. </p>
                            <br/><br/>
                            <button className='btn btn-primary btn-sub' onClick={(e)=> {window.location.replace('/reservar')}} >¡Reserva ya!</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <div className="section bg-gray" >
            <div className="cont-sub-2">
                <div className="row">
                    <div className="col col-image">
                        <img src={image4} width="66%" height="100%" alt="imagen 1" className=" image image-pink" align="right"  />
                    </div>
                    <div className="col ">
                        <div className="margin-text-sub text">
                            <div  className="title" align="center">Acompañamiento para empresas y proyectos sociales </div>
                            <br/><br/>
                            <p align="justify" className="text-white-75">Preguntanos por nuestro acompañamiento especializado para desarrollar proyectos educativos que fomenten las habilidades emocionales de tu equipo. Adicionalmente, acompañamos a las empresas para mejorar su liderazgo o desarrollar proyectos sociales encaminados a formentar el cuidado de la salud mental. Además de los beneficios humanos, las empresas más felices se traducen en indicadores de productividad más alto. </p>
                            <br/><br/>
                            <button className='btn btn-primary btn-sub' onClick={(e)=> {window.location.replace('/reservar')}} >¡Reserva ya!</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
                <div className="subsection bg-white">
                 <div className="cont">
                    <div className="row">
                        <div className="col-md-4">
                            <h1 align="center">Contactanos</h1>
                            <div className="wrapper" align="center">
                                <div className="button">
                                    <div className="icon">
                                    <a href="https://www.facebook.com/elementalmente-112443743889896
            "><i className="fab fa-facebook-f"></i></a>
                                    </div>
                                    <span>elemental.mente</span>
                                </div>

                                <div className="button">
                                    <div className="icon">
                                    <a href="https://www.instagram.com/psicoterapiaonline_col/"><i className="fab fa-instagram"></i></a>
                                    </div>
                                    <span>psicoterapiaonline_col</span>
                                </div>
                                <div className="button">
                                    <div className="icon">
                                    <a href="https://open.spotify.com/show/5OZo8NyDDAgyx2tTSzSC8H?si=8cb9cc8476824291"><i className="fab fa-spotify"></i></a>
                                    </div>
                                    <span>Podcast elemental</span>
                                </div>
                                <div className="button">
                                    <div className="icon">
                                    <a href="https://open.spotify.com/show/5OZo8NyDDAgyx2tTSzSC8H?si=8cb9cc8476824291"><i className="fab fa-youtube"></i></a>
                                    </div>
                                    <span>Youtube</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <br></br>
                            <br></br>
                            <h1 align="center">Dejanos saber tu opinión</h1>
                            <br></br>
                            <div align="center">
                                <OverlayTrigger
                                trigger="click"
                                key="bottom"
                                placement="bottom"
                                overlay={
                                    <Popover id={'popover-positioned-bottom'}>
                                    
                                    <Popover.Body>
                                        <textarea className="form-control" value={comentario} onChange={e=> setComentario(e.target.value)} />
                                        {mensaje && <p>{mensaje}</p>}
                                        <div align="right">
                                            <button className="btn btn-primary" onClick={sendEmail} > Enviar </button>
                                        </div>
                                    </Popover.Body>
                                    </Popover>
                                }
                                >
                                <button className="btn-suger" onClick={e=> setMensaje('')} > Sugerencias </button>
                                </OverlayTrigger>
                            </div>
                        </div> 
                    </div>
                 </div>
                </div>

                </div>
    );
}