import React, {useEffect, useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Spinner} from "react-bootstrap";
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";


     function CollapsibleTable() {

         const [ usuario_id, setUsuario_id ] = useState('');
         const [ loading, setLoading ] = useState('');


         useEffect(()=>{
             setLoading(true);
             setUsuario_id(localStorage.getItem('usuario_id'));

         },[]);

         const usuario = async(interdata) => {

             const info = await infoAdmin(usuario_id);
             return info.getCondominios;
         }

             return (
            <>
                {loading ?
                    <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                    </Spinner>: null}

                <div>
                    <Table responsive="sm">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>{usuario.nombre}</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>ID</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>

                        </tbody>
                    </Table>
                    <Table responsive="md">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                            <th>Table heading</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>1</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                            <td>Table cell</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </>
        );
     }
    export default CollapsibleTable

    async function infoAdmin(usuario_id) { //Función asincrona para consumir datos de la API

        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9500/graphql`,
            cache: new InMemoryCache()
        });

        const {data} = await client.query({ // Query de graphql
            query: gql`
                            query{
                                getCondominios("${usuario_id}"){
                                  usuario_id
                                  condominio_id
                                  nombre
                                  eliminado
                                }
                              }
                            `,
        });
        console.log('////////////////////////')
        console.log('data:', data)

        setLoading(false);

        return data;

};

