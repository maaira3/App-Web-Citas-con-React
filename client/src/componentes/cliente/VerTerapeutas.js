
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
                <Terapeutas/>
        </>
    )
}