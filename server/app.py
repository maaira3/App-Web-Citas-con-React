from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "Hello from flask"


from controladores.RegistrarseControlador import *
from controladores.LoginControlador import * 
from controladores.PerfilControlador import *
from controladores.SeleccionarCitaControlador import *
from controladores.VerTerapeutasControlador import *
from controladores.CrearCitasControlador import *
from controladores.VerCitasTerapeutaControlador import *
from controladores.CitasAdministradorControlador import *
from controladores.ClientesAdministradorControlador import *
from controladores.BlogControlador import *

if __name__ == "__main__":
    app.run( debug=True )  


#python3 -m venv venv
#activar entorno virtual
#venv\Scripts\activate