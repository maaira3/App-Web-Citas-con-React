
import { useEffect,useState } from "react";
import {requestPost} from "../../helpers/Request";
import Loading from "../Loading";
import image1 from "../../images/happiness.png"
import CardTerapeuta from "../CardTerapeuta";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const baseURL = process.env.REACT_APP_API_URL

export default function Terapeutas()
{
    const [terapeutas,setTerapeutas] = useState([]);
    const [loading,setLoading] = useState(false);

    async function rutaImagenes (listaterapeutas){
    for (var i=0; i<listaterapeutas.length; i++) 
        { 
            var imgblob= listaterapeutas[i].rutaImagen;
            const resb = await fetch(baseURL + `api/terapeutas/bringImgs/${imgblob}`);
            const datab = await resb.blob();
            var url= URL.createObjectURL(datab)
            listaterapeutas[i].rutaImagen=url
        }
        setTerapeutas(listaterapeutas)
    }

    useEffect( () => {
        let url = baseURL + "api/obtenerTerapeutas";
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
           <div className="section bg-orange" >
                <div className="row">
                    <div className="col col-image">
                        <img src={image1} width="66%" height="100%" alt="imagen 1" className="image image-oran" align="right"  />
                    </div>
                    <div className="col border-text-oran">
                        <div className="margin-text">
                            <br></br>
                            <div  className="title" align="center">¿Quienes somos? </div>
                            <br/><br/>
                            <p align="justify" className="text-white-75">PsicoElemental es una startup colombiana enfocada en la promoción de una buena salud mental fundamentada en tres ejes: atención clínica, investigación y educación para alcanzar mayores niveles de bienestar. Para esto, contamos con un equipo de psicólogos y psicólogas especializados en psicología clínica con enfoque basado en la evidencia. Es decir, el enfoque que tiene más resultados en la recuperación de distintos problemas en salud mental en todo el mundo. Y adicionalmente, con talleres, conferencias y ejercicios de equipo para fortalecer la crianza de tus hijos, apoyar en la promoción de habilidades blandas y mejorar las relaciones sociales y laborales que vives a diario.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container px-4 px-lg-5 h-100">
            <div className="p-2 mb-2 cont-terapeutas" >
            { terapeutas.map( (terapeuta,index) =>{

                return <div  className="card-terapeuta post" key={index}>
                <CardTerapeuta
                    nombre={terapeuta.nombre}
                    imagen={terapeuta.rutaImagen}
                    descripcion={terapeuta.descripcion}
                />
                </div>

            })}
            </div>
            </div>

        </>
    )
} 