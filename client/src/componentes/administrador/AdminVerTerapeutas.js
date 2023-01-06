import BarraPrincipalAdministrador from './BarraPrincipalAdministrador';
import ListaTerapeutas from './ListaTerapeutas';

export default function AdminVerTerapeutas(){

    return(
        <>
            <BarraPrincipalAdministrador/>
            <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
            <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
                <ListaTerapeutas/>
        </>    
    )
}