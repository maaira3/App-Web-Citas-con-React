from flask import Flask, send_from_directory
from flask_cors import CORS, cross_origin

app = Flask(__name__, static_folder='client/build', static_url_path='')
CORS(app)

@app.route("/api", methods=['GET'])
@cross_origin()
def index():
    return "Hello from flask"

@app.route("/")
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

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
from controladores.PagoControlador import *

if __name__ == "__main__":
    app.run( )  


#python3 -m venv venv
#activar entorno virtual
#venv\Scripts\activate