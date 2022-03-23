import BeatLoader from "react-spinners/BeatLoader";

export default function Loading(props){


    return(
        <>
            {props.loading === true 
            ? 
            (
                <div className="loading d-flex justify-content-center align-items-center" id="cargascreen">
                    <div>
                        <BeatLoader size={30} color={"#123adc"} loading={props.loading} />
                    </div>
                </div>                
            ) 
            : 
            (
                <>
                </>
            ) 
            }

        </>
    )
}