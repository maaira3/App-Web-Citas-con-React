
import { useEffect,useState } from "react";
import {requestPost} from "../../helpers/Request";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import logo from './../../logo.svg'
import Loading from "../Loading";


import axios from 'axios';
import CardTerapeuta from "../CardTerapeuta";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Terapeutas()
{
    const [terapeutas,setTerapeutas] = useState([]);
    const [loading,setLoading] = useState(false);

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        cssEase: "linear"
    }

    async function rutaImagenes (listaterapeutas){
    for (var i=0; i<listaterapeutas.length; i++) 
        { 
            var imgblob= listaterapeutas[i].rutaImagen;
            const resb = await fetch(`terapeutas/bringImgs/${imgblob}`);
            const datab = await resb.blob();
            var url= URL.createObjectURL(datab)
            listaterapeutas[i].rutaImagen=url
        }
        setTerapeutas(listaterapeutas)
    }

    useEffect( () => {
        let url = "/obtenerTerapeutas";
        let parameters = {tipo:"cliente"};

        const accionThen = (response)=>{
            if( response.data.status === "success" )
            {
                rutaImagenes( response.data.terapeutas )
                //setTerapeutas( response.data.terapeutas )
            }
        }

        requestPost( url , parameters , accionThen, undefined , setLoading );

    }  ,[]) 


    return(
        <>
           <Loading loading={loading} />
        <Slider {...settings}>
            { terapeutas.map( (terapeuta,index) =>{

                return <div  className="card-wrapper" key={index}>
                <CardTerapeuta
                    nombre={terapeuta.nombre}
                    imagen={terapeuta.rutaImagen}
                    descripcion={terapeuta.descripcion}
                />
                </div>

            })}
            </Slider>

        </>
    )
} 