import  { React } from 'react'

function TablaHistorial(props) {
    
    return (
        <div className="col-12 table-responsive">
        <table className="table rounded shadow-sm table-hover">
          <thead>
            <tr>
              <th scope="col">Fecha y hora </th>
              <th scope="col">Terapeuta</th>
            </tr>
          </thead>
          <tbody>
            {  props.HistorialSesiones.map((item) => (
                  <tr key={item.idhistorialsesiones}>
                    <td>{item.horarioSesion}</td>
                    <td>{item.terapeuta}</td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    )
}

export default TablaHistorial
