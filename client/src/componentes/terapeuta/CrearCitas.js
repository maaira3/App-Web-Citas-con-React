import BarraPrincipalTerapeuta from "./BarraPrincipalTerapeuta";
import CalendarioCitas from "./CalendarioCitas";

const idTerapeuta = localStorage.getItem('idTerapeuta')

export default  function CrearCitas(){

    

    return(
        <>
            <BarraPrincipalTerapeuta/>
            <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
            <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
            <div className="container px-4 px-lg-5 h-100">
            <div className="p-3 mb-2 text-dark" align="center">
                <h4>Crear Horarios</h4>
                <CalendarioCitas idTerapeuta={idTerapeuta} accionDespuesGuardar={ () => window.location.replace( "/crearCitas" ) } />
            </div>
            </div>

        </>
    )

}