import  { React, useEffect, useState } from 'react'
import { requestGetAwait} from "../../helpers/Request";

import Loading from "../Loading";




export default function SeleccionTerapeuta() {
    const [ idterapeuta, setIdTerapeuta] = useState("0")
    const [listaterapeutas, setListaTerapeutas] = useState([])
    const [loading,setLoading] = useState(false);
    
    async function getTerapeutas(){
        const { data } = await requestGetAwait("api/terapeutas",{},setLoading)
        setListaTerapeutas(data.data)
    }

    useEffect(() => {
        getTerapeutas()
    },[])

    async function handleChangeTerapeuta(e){
        /*setFormProduct({
            ...props.formproduct,
            ['categoryproduct']: e.target.value
        });
        props.setNewCategory(false)
        if(e.target.value==='0'){
            props.setNewCategory(true)
        }*/
      }
    return (
        <td>
            <Loading loading={loading} />
            <select className="form-select" id="floatingSelect" aria-label="Floating label select example" name="nombreterapeuta" value={idterapeuta} onChange={handleChangeTerapeuta}>
                <option value="0">Seleccione un terapeuta</option>
                {listaterapeutas.map((terapeuta) => (
                <option
                    value={terapeuta.idusuario}
                    key={terapeuta.idusuario}
                >
                    {terapeuta.nombre}
                </option>
                ))
                }
            </select>
        </td>
    )
}
