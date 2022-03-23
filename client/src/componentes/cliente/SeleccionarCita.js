import BarraPrincipal from "./BarraPrincipal";
import Horarios from "./Horarios";


export default function SeleccionarCita()
{
    return(
        <>
            <BarraPrincipal/>
            <div className="mt-10">
                <Horarios/>
            </div>  
        </>
    )
}