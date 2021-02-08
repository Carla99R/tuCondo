import { Formik, Field } from "formik";
import React from 'react';
import Layout from "../components/Layout"

export default () =>{
    return(
        <Layout>
            <Formik
               onSubmit ={() =>{}}
               initialValues={{
                   correo: "",
                   password: ""
               }}
            >
                {({values, handleSubmit}) => <form onSubmit={handleSubmit}>
                    <input />
                <Field name: "correo"/>
                </form>}
            </Formik>
        </Layout>
    );
}