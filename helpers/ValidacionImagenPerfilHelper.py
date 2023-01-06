import os as os
from __main__ import app
from werkzeug.utils import secure_filename

os.makedirs(os.path.join(app.instance_path, 'uploads'), exist_ok=True)
IMAGE_FOLDER= os.path.join(app.instance_path, 'uploads')

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg','JPG','PNG'])

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def validarImagen(imagenfile):
    if 'file' not in imagenfile:
        print('not file in imagen file')
        return "not-success"
    file=imagenfile['file']
    if file.filename== '':
        return "not-success"
    if file and allowed_file(file.filename):
        filename=secure_filename(file.filename)
        file.save(os.path.join(app.instance_path, 'uploads', filename))
        return filename
    else:
        return "not-success"