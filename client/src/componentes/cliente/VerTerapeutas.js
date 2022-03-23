
import BarraPrincipalAdministrador from "../administrador/BarraPrincipalAdministrador";
import BarraPrincipal from "./BarraPrincipal";
import BarraPrincipalTerapeuta from "../terapeuta/BarraPrincipalTerapeuta";
import Terapeutas from "./Terapeutas"

const tipousuario = localStorage.getItem('tipo')

export default function VerTerapeutas()
{

    return(
        <>
            {tipousuario==='cliente'
                ?<BarraPrincipal/>
                :<>
                {tipousuario==='terapeuta'
                    ?<BarraPrincipalTerapeuta/>
                    :<BarraPrincipalAdministrador/>
                    }
                </>
            }
            <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
            <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
            <div className="container px-4 px-lg-5 h-100 border ">
                <br></br>
                <Terapeutas/>
            </div>  
        </>
    )
}