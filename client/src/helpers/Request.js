import axios from 'axios';

export function requestPost( url , parametros , accionThen,accionError,setLoading )
{
    setLoading( true );

    axios.post( url , parametros )
    .then(
        (response) =>{
            setLoading( false );

            if( accionThen!==undefined )
            {
                accionThen(response);
            }
        }
    )
    .catch(  
        (error) =>{
            setLoading( false );
            console.log(error)
            if( accionError !== undefined )
            {
                accionError();
            }
        }
    )
}

export async function requestPostAwait( url , parametros,setLoading )
{
    setLoading(true);

    const response = await axios.post(url, parametros);

    setLoading(false);

    return response;
}

export function requestGet( url , parametros , accionThen,accionError,setLoading )
{
    setLoading( true );

    axios.get( url , parametros )
    .then(
        (response) =>{
            setLoading( false );

            if( accionThen!==undefined )
            {
                accionThen(response);
            }
        }
    )
    .catch(  
        (error) =>{
            setLoading( false );
            console.log(error)
            if( accionError !== undefined )
            {
                accionError();
            }
        }
    )
}

export async function requestGetAwait( url , parametros , setLoading )
{
    setLoading(true);

    const response = await axios.get(url, parametros);

    setLoading(false);

    return response;
}


export function requestPut( url , parametros , accionThen,accionError,setLoading)
{
    setLoading( true );

    axios.put( url , parametros )
    .then(
        (response) =>{
            setLoading( false );

            if( accionThen!==undefined )
            {
                accionThen(response);
            }
        }
    )
    .catch(  
        (error) =>{
            setLoading( false );
            console.log(error)
            if( accionError !== undefined )
            {
                accionError();
            }
        }
    )
}

export async function requestPutAwait( url , parametros, setLoading )
{
    setLoading(true);

    const response = await axios.put(url, parametros);

    setLoading(false);

    return response;
}

export async function deletePost(idpost){
    const { data } = axios.post(`/blog/post/${idpost}`)
    console.log(data)
}

