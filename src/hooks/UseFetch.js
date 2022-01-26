import { useEffect, useState } from 'react'

const UseFetch = (url) => {
    //Extraer Data
    const [state, setState] = useState({
        data: null,
        loading: true,
        error: null
    })
    //Para evitar que se renderiza a cada rato
    useEffect(() => {
        setState({ data: null, loading: true ,error: null })
        fetch(url)
            .then(resp => resp.json())
            .then(data =>{
                setState({
                    loading: false,
                    error: null,
                    data
                })
        })
    }, [url])
    
    return state;
}

export default UseFetch;