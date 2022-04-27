import React from 'react'

const Alerta = ({children}) => {

    return (
        <div className='bg-red-800 text-center my-4 text-white font-bold p-3 uppercase'>
            {children}
        </div>
    )
}

export default Alerta