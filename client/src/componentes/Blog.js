import  { React, useEffect, useState } from 'react'
import {requestGetAwait} from "../helpers/Request"
import BarraPrincipalAdministrador from "./administrador/BarraPrincipalAdministrador";
import BarraPrincipal from "./cliente/BarraPrincipal";
import BarraPrincipalTerapeuta from "./terapeuta/BarraPrincipalTerapeuta";
import Post from './Post';
import NuevoPost from './NuevoPost';
import Loading from "./Loading";

const tipousuario = localStorage.getItem('tipo')

export default function Blog() {
    const [ listposts, setListPosts] = useState([])
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        getPosts()
    },[])

    async function getPosts(){
        //Obtiene los posts del blog
        const { data } = await requestGetAwait("posts",{},setLoading);
        const listapost = data.data
        for (var i=0; i<listapost.length; i++) 
        { 
            var imgblob= listapost[i].imagenpost;
            const resb = await fetch(`blog/bringImgs/${imgblob}`);
            const datab = await resb.blob();
            var url= URL.createObjectURL(datab)
            listapost[i].imagenpost=url
        }
        
        setListPosts(listapost)
    }
    

    return (
    <>
        <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
        <div className="container px-4 px-lg-5 h-100 border">
        <Loading loading={loading} />
        <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
        <div  className="row gx-4 gx-lg-5 justify-content-center mb-5"></div>
            {tipousuario==='cliente'
                ?<BarraPrincipal/>
                :<>
                {tipousuario==='terapeuta'
                    ?<BarraPrincipalTerapeuta/>
                    :<BarraPrincipalAdministrador/>
                    }
                </>
            }
            <div className="p-3 mb-2" >
            <div className='row'>
            { listposts.map(item => (
                 <div className="col-md-4" key={item.idpost}>
                        <Post
                        idpost={item.idpost}
                        titulo={item.titulo}
                        imagenpost={item.imagenpost}
                        contenido={item.contenido}
                        />
                </div>
            ))}
            {tipousuario=='administrador'
            ?<>
            <div className="col-md-4">
                <NuevoPost/>
            </div>
            </>
            :<></>
            }
            </div>
            </div>
        </div>
    </>
    )
}
