import { useEffect,useState } from "react";
import BarraPrincipal from "./BarraPrincipal";
import Servicio from "./Servicio"
import axios from 'axios' //npm i axios
import Pago from './Pago';
import NuevoServicio from "../administrador/NuevoServicio";

const tipousuario = localStorage.getItem('tipo')

export default function ListaServicios() {
  const [servicios,setServicios] = useState([]);
  const [compra,setCompra] = useState(false);
  const [servicio, setServicio] = useState({
    id:'',
    nombre:'',
    descripcion:'',
    precio:'0.0',
    cantidadsesiones:'',
})

useEffect(() => {
  getServices()
},[])

async function getServices(){
const { data } = await axios.get("/api/servicios")
setServicios(data.data)
}
  return (
    <>
    {compra 
    ?<Pago
      id={servicio.id}
      nombre={servicio.nombre}
      descripcion={servicio.descripcion}
      precio={servicio.precio} 
      cantidadsesiones={servicio.cantidadsesiones}
      setCompra={setCompra}
    />
    :
    <div className="shopping-cart dark">
        <div className="container" id="container">
        <br/><br/><br/>
          <div className="block-heading">
            <br/>
            <h2>Servicios</h2>
            {tipousuario==='cliente'
            ? <p>Seleccione el servicio que desea comprar.</p>
            :tipousuario==='administrador'
              ?<NuevoServicio/>
              :<></>}
          </div>
          { servicios.map( (servicio,index) =>{
            return <div className="content content-service post" key={index}>
              <div className="items">
                  <div className="product">
                    <Servicio
                      id={servicio.idservicio}
                      nombre={servicio.nomservicio}
                      descripcion={servicio.descservicio}
                      cantidadsesiones={servicio.cantidadsesiones}
                      precio={servicio.precioservicio}  
                      setCompra={setCompra}
                      setServicio={setServicio}
                      getServices={getServices}
                    />
                    </div>
                </div>
            </div>
            })}
        </div>
      </div>
}
      </>
  )
}
