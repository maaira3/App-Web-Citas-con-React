import { React, useEffect,useState } from "react";
import BarraPrincipalAdministrador from "./administrador/BarraPrincipalAdministrador";
import BarraPrincipal from "./cliente/BarraPrincipal";
import BarraPrincipalTerapeuta from "./terapeuta/BarraPrincipalTerapeuta";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import CardTerapeuta from "./CardTerapeuta";
import imagen from "./../images/imagen.svg"

const tipousuario = localStorage.getItem('tipo')

export default function SliderTerapeutas() {
    
    const [terapeutas,setTerapeutas] = useState([]);

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        cssEase: "linear"
    }
    
    useEffect(() => {
        getTerapeutas()
    },[])

    async function getTerapeutas(){
        //Obtiene los terapeutas
        const { data } = await axios.get(`api/terapeutas-slider`)
        const listaterapeutas = data.data
        for (var i=0; i<listaterapeutas.length; i++) 
        { 
            var imgblob= listaterapeutas[i].rutaImagen;
            const resb = await fetch(`api/terapeutas/bringImgs/${imgblob}`);
            const datab = await resb.blob();
            var url= URL.createObjectURL(datab)
            listaterapeutas[i].rutaImagen=url
        }
        console.log(listaterapeutas)
        setTerapeutas(listaterapeutas)
    }

    console.log(terapeutas)
    
    return (
        <div className="mt-10"  >
            {tipousuario==='cliente'
                ?<BarraPrincipal/>
                :<>
                {tipousuario==='terapeuta'
                    ?<BarraPrincipalTerapeuta/>
                    :<BarraPrincipalAdministrador/>
                    }
                </>
            }

            <div className="section bg-purple" >
                <div className="cont">
                    <div className="row">
                        <div className="col-md-5">
                            <img src={image1} width="350" height="100%" alt="imagen 1" className="image " />
                        </div>
                        <div className="col-md-5 text">
                            <br></br>
                            <h2 align="center">¿Por qué esperar más tiempo para vivir la vida que deseas tener? </h2>
                            <br></br>
                            <p align="justify" className="text-white-75 mb-5">Psicoelemental te acompaña con profesionales de salud mental graduados en psicología y especialistas en clínica que pueden guiarte en un proceso basado en la evidencia hacia el cambio. Ofrecemos citas desde cualquier parte del mundo de forma virtual, talleres de formación en habilidades blandas, asesoramiento en crianza respetuosa para familias y acompañamiento para empresas.</p>
                            <div align="center">
                                <button className='btn btn-primary' onClick={(e)=> {window.location.replace('/verTerapeutas')}} >Conoce nuestro equipo</button>
                            </div>
                            <br></br>
                        </div>
                    </div>
                </div>
            </div>
        <div className="container px-4 px-lg-5 h-100  ">
            <br></br>
            <Slider {...settings}>
            { terapeutas.map( (terapeuta,index) =>{
                    
                    
                <div  className="card-wrapper" key={index}>
                    <CardTerapeuta
                        nombre="Maira"
                        imagen={terapeuta.rutaImagen}
                        idterapeuta={1}
                        descripcion="holiiiii"
                    />
                    </div>
                
            })}
           </Slider>
           {terapeutas!=[]
            ?<>
            <Slider {...settings}>
            <div  className="card-wrapper">
                <CardTerapeuta
                    nombre="Maira"
                    imagen={imagen}
                    idterapeuta={1}
                    descripcion="holiiiii"
                />
                </div>
                <div  className="card-wrapper">
                <CardTerapeuta
                    nombre="Angel"
                    imagen={imagen}
                    idterapeuta={1}
                    descripcion="holiiiii"
                />
                </div>
            </Slider>
            </>
            :<>
            
            </>
            }
            
        
        </div>
        </div>
    )
}
