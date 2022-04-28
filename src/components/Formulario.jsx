import React from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Alerta from './Alerta';
import { useNavigate } from 'react-router-dom';

const Formulario = () => {

    const navigate = useNavigate();

    const nuevoClienteSchema = Yup.object().shape({

        nombre: Yup.string()
                    .min(3, 'El nombre es muy corto')
                    .max(40, 'El nombre es muy largo')
                    .required('El nombre del cliente es obligatorio'),

        empresa: Yup.string()
                    .required('El nombre de la empresa es obligatorio'),

        email: Yup.string()
                    .email('Debes ingresar un email correcto')
                    .required('El email es obligatorio'),
        
        telefono: Yup.number()
                    .positive('Numero no valido')
                    .integer('Numero no valido')
                    .typeError('Debes ingresar un telefono correcto'),

    })

    const handleSubmit = async(values) => {
        try {

            const url = "http://localhost:4000/clientes";

            const respuesta = await fetch (url, {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const resultado = await respuesta.json();

        } catch (e) {
            console.error(e);
        }


    }

    return (
        <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
            
            <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>Agregar Cliente</h1>

            <Formik
                initialValues={{
                    nombre: '',
                    empresa: '',
                    email: '',
                    telefono: '',
                    notas: ''
                }}
                onSubmit = { async(values, {resetForm}) => {
                    await handleSubmit(values)
                    resetForm();
                    navigate('/clientes')
                }}
                validationSchema={nuevoClienteSchema}
            >
                {({errors, touched}) => {

                    return (
                <Form
                    className='mt-10'
                >
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='nombre'
                        >Nombre: </label>
                        <Field
                            id="nombre"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Nombre del Cliente"
                            name="nombre"
                        />

                        {errors.nombre && touched.nombre ? (
                            <Alerta>
                                {errors.nombre}
                            </Alerta>
                        ) : null}

                    </div>
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='empresa'
                        >Empresa: </label>
                        <Field
                            id="empresa"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Empresa del Cliente"
                            name="empresa"
                        />

                            {errors.empresa && touched.empresa ? (
                                <Alerta>
                                    {errors.empresa}
                                </Alerta>
                            ) : null}
                    </div>
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='email'
                        >Email: </label>
                        <Field
                            id="email"
                            type="email"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Email del Cliente"
                            name="email"
                        />
                            {errors.email && touched.email ? (
                                <Alerta>
                                    {errors.email}
                                </Alerta>
                            ) : null}
                    </div>
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='telefono'
                        >Telefono: </label>
                        <Field
                            id="telefono"
                            type="tel"
                            className="mt-2 block w-full p-3 bg-gray-50"
                            placeholder="Teléfono del Cliente"
                            name="telefono"
                        />
                            {errors.telefono && touched.telefono ? (
                                <Alerta>
                                    {errors.telefono}
                                </Alerta>
                            ) : null}
                    </div>
                    <div className='mb-4'>
                        <label
                            className='text-gray-800'
                            htmlFor='notas'
                        >Notas: </label>
                        <Field
                            as="textarea"
                            id="notas"
                            type="text"
                            className="mt-2 block w-full p-3 bg-gray-50 h-40"
                            placeholder="Notas del Cliente"
                            name="notas"
                        />
                    </div>

                    <input 
                        type="submit"
                        value="Agregar el cliente"
                        className='mt-5 w-full bg-blue-800 p-3 text-white font-bold text-lg'
                    />
                </Form>
                )}}
            </Formik>
            
        </div>
    )
}

export default Formulario