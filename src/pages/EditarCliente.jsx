import Formulario from '../components/Formulario';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


const EditarCliente = () => {

    const { id } = useParams();

    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(false);

    useEffect(() =>{
        setCargando(!cargando);
        const obtenerClientesAPI = async() =>{
            try {
                const url = `http://localhost:4000/clientes/${id}`
                const respuesta = await fetch(url)
                const resultado = await respuesta.json()
                setCliente(resultado);
            } catch (e) {
                console.log(e);
            }

            setTimeout(() => {
                setCargando(false);
            }, 2000)

        }
        obtenerClientesAPI();
    },[])

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
            <p className='mt-3'>Utiliza este formulario para editar datos de un cliente</p>

            {cliente?.nombre ? (
                <Formulario 
                    cliente={cliente}
                    cargando={cargando}
                />
            ): <p>Cliente ID no valido</p>}
        </>
    )
}

export default EditarCliente