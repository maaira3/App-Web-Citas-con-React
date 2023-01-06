import  { React} from 'react'

const tipousuario = localStorage.getItem('tipo')

function TablaHistorial(props) {
    
    return (
        <div className="col-12 table-responsive">
        <table className="table rounded shadow-sm table-hover ">
          <thead className="table-dark">
            <tr>
              <th scope="col">Fecha y hora </th>
              {tipousuario==='cliente'
              ?<th scope="col">Terapeuta</th>
              :<th scope="col">Paciente</th>
              }
            </tr>
          </thead>
          <tbody>
            {tipousuario==='cliente'
            ?<>
            {  props.HistorialSesiones.map((item) => (
                  <tr key={item.idhistorialsesiones}>
                    <td>{item.horarioSesion} hrs</td>
                    <td>{item.terapeuta}</td>
                  </tr>
                ))
            }
            </>
            :<>
            {  props.HistorialSesiones.map((item) => (
                  <tr key={item.idhistorialsesiones}>
                    <td>{item.horarioSesion} hrs</td>
                    <td>{item.cliente}</td>
                  </tr>
                ))
            }

            </>
            }
            
          </tbody>
        </table>
      </div>
    )
}

export default TablaHistorial
