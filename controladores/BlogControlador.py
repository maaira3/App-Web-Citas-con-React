from flask import Flask, request, send_from_directory
from modelos.GeneralRepositorio import *
from json.decoder import JSONDecodeError
from __main__ import app

os.makedirs(os.path.join(app.instance_path, 'uploads'), exist_ok=True)
IMAGE_FOLDER= os.path.join(app.instance_path, 'uploads')

@app.route("/posts", methods=['GET'])
def PostsBlog():
    try:
       
        #Valida si existen los posts       
        postsEncontrados = obtenerPosts()    
        if( postsEncontrados != None ):
            return {"status":"success","message":"posts-existe", "data": postsEncontrados}
        else:
            return {"status":"not-success","message":"posts-no-existe", "data":[]}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}

@app.route("/blog/post", methods=['POST'])
def NewPostBlog():
    try:
        post = request.json
        #Valida si se inserto el post      
        postinsertado = NuevoPost(post)   
        print(postinsertado)
        if( postinsertado != '-1' ):
            return {"status":"success","message":"posts-insertado", "data":postinsertado }
        else:
            return {"status":"not-success","message":"posts-no-insertado", "data":postinsertado}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}

@app.route('/blog/manejoImgs/<idpost>', methods=['PUT'])
def uploadimageBlog(idpost):
    try:
        print(idpost)
        imagenfile = request.files
        status = subirImagenPost( idpost, imagenfile)
        if( status == 1 ):
            return {"status":"success","message":"imagen actualizada"}
        else:
            return {"status":"not-success","message":"no se pudo actualizar la imagen"}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}

@app.route('/blog/bringImgs/<filename>')
def uploaded_fileblog(filename):
    return send_from_directory(IMAGE_FOLDER, path=filename, as_attachment=False)

@app.route("/blog/post/<idpost>", methods=['POST'])
def DeletePostBlog(idpost):
    try:
        #Valida si se eliminó el post      
        posteliminado = DeletePost(idpost)   
        print(posteliminado)
        if( posteliminado != '-1' ):
            return {"status":"success","message":"post-eliminado", "data":posteliminado }
        else:
            return {"status":"not-success","message":"post-no-eliminado", "data":posteliminado}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}

@app.route("/blog/post/update/<idpost>", methods=['POST'])
def UpdatePostBlog(idpost):
    try:
        post = request.json
        #Valida si se modificó el post      
        postmodificado = ModifyPost(idpost, post)   
        print(postmodificado)
        if( postmodificado != '-1' ):
            return {"status":"success","message":"post-eliminado", "data":postmodificado }
        else:
            return {"status":"not-success","message":"post-no-eliminado", "data":postmodificado}

    except JSONDecodeError  as e:

        return {"status":"not-success","message":str(e)}