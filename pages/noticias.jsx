import React, { useEffect, useState} from 'react';
import {
    Avatar,
    Button,
    Card, CardActions,
    CardContent,
    CardHeader,
    CardMedia, Collapse,
    IconButton,
    makeStyles,
    TextField,
    Typography
} from "@material-ui/core";
import styles from '../styles/adminCondominios.module.css'
import {ApolloClient, gql, InMemoryCache} from "@apollo/client";
import {useForm} from "react-hook-form";
import NavbarInicio from "../components/navbarInicio";
import Image from "next/image";
import {red} from "@material-ui/core/colors";
import classnames from "classnames";

class MoreVertIcon extends React.Component {
    render() {
        return null;
    }
}


const Noticias =()=> {

    const useStyles = makeStyles((theme) => ({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }));

    const [ nombre, setNombre ] = useState(localStorage.getItem('nombre'));
    const [ apellido, setApellido ] = useState(localStorage.getItem('apellido'));
    const [ cedula, setCedula ] = useState(localStorage.getItem('cedula'));
    const [ correo, setCorreo ] = useState(localStorage.getItem('correo'));
    const [ usuario_id, setUsuario_id ] = useState(localStorage.getItem('usuario_id'));
    const [ titulo, setTitulo ] = useState(localStorage.getItem('titulo'));
    const [ mensaje, setMensaje ] = useState(localStorage.getItem('mensaje'));
    const [ noticia_id, setNoticia_id ] = useState(localStorage.getItem('noticia_id'));
    const [ usuarioN_id, setUsuarioN_id ] = useState(localStorage.getItem('usuarioN_id'));
    const [ usuarioN, setUsuarioN ] = useState(localStorage.getItem('usuarioN'));


    useEffect(()=>{
        setNombre(localStorage.getItem('nombre'));
        setApellido(localStorage.getItem('apellido'));
        setCedula(localStorage.getItem('cedula'));
        setCorreo(localStorage.getItem('correo'));
        setUsuario_id(localStorage.getItem('usuario_id'));

        setTitulo(localStorage.getItem('titulo'));
        setMensaje(localStorage.getItem('mensaje'));
        setNoticia_id(localStorage.getItem('noticia_id'));
        setUsuarioN_id(localStorage.getItem('usuarioN_id'));
        setUsuarioN(localStorage.getItem('usuarioN'));


    },[]);


    const [dato, setData] = useState({
        correo:correo,
        apellido:apellido,
        nombre:nombre,
        cedula: cedula,
        usuario_id: usuario_id,
        titulo:titulo,
        mensaje:mensaje,
        noticia_id:noticia_id,
        usuarioN_id: usuarioN_id,
        usuarioN: usuarioN

    });

    const {register, handleSubmit, errors} = useForm({
        reValidateMode:'onSubmit'
    });


    // const onSubmit = async() =>{
    //
    //     const info = await updateUsuario(dato.nombre, dato.apellido, dato.correo);
    //
    //     console.log(info.updateUsuario.nombre)
    //     console.log(info.updateUsuario)
    //
    //     localStorage.setItem('nombre', info.updateUsuario.nombre);
    //     localStorage.setItem('apellido', info.updateUsuario.apellido);
    //     localStorage.setItem('correo', info.updateUsuario.correo);
    //     localStorage.setItem('cedula', info.updateUsuario.cedula);
    //
    //     setLoading(false);
    //
    // }

    const inicial = async() =>{

        const info = await getNoticias();

        console.log(info.getNoticias.titulo)
        console.log(info.getNoticias)
        console.log(info.getNoticias.length)

        let i = 0;
        let tit;

        while (info.getNoticias.length > i){

             tit = info.getNoticias.map(function(title) {
                i++;
                return title;
            });
        }

        console.log(tit.noticia_id)

        localStorage.setItem('titulo', info.getNoticias.titulo);
        localStorage.setItem('mensaje', info.getNoticias.mensaje);
        localStorage.setItem('noticia_id', info.getNoticias.noticia_id);
        localStorage.setItem('usuarioN_id', info.getNoticias.usuario_id);

        const info_extra = await getUsuario(info.getNoticias.usuario_id);

        localStorage.setItem('usuarioN', info_extra.getUsuario.nombre);

        console.log(info_extra.getUsuario.nombre)
    }

    const handleChange = e =>{
        setData({
            ...dato,
            [e.target.name] : e.target.value
        })

    }

    async function getNoticias() { //Función asincrona para consumir datos de la API

        console.log(nombre)
        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9600/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.query({ // Query de graphql
            query: gql`
                        query{
                            getNoticias{
                                titulo
                                mensaje
                                eliminado
                                usuario_id
                                noticia_id
                                }
                          }
                        `,
        });
        console.log('////////////////////////')
        console.log('data:', data)

        return data;

    };

    async function getUsuario(usuario_id) { //Función asincrona para consumir datos de la API

        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9600/graphql`,
            cache: new InMemoryCache()
        });

        // async function getStaticsPropss(correo, psw, res) {

        // try{
        const {dat} = await client.query({ // Query de graphql
            query: gql`
                        query{
                            getUsuario(usuario_id: "${usuario_id}"){
                              nombre
                              apellido
                            }
                          }
                        `,
        });
        console.log('////////////////////////')
        console.log('data:', dat)

        return dat;

    };

    const classes = useStyles();

    return (

        <div className={styles.toda}>

            <div className={styles.orden}>
                <Image className={styles.fondo}
                       src="/fondoInicio.jpg"
                       alt="imagen"
                       layout="fill"
                />
                <NavbarInicio/>
            </div>

            <div className={styles.tod}>
                <label className={styles.labelI}
                       content={inicial()}
                />
                <Card className={styles.carta}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {usuarioN.substring(0)}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={titulo}
                        //subheader={localStorage.getItem("fecha")}
                    />

                    <div className={styles.scroll}>
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    {mensaje}
                                </Typography>
                            </CardContent>
                    </div>


                </Card>

            </div>



        </div>

    )

}

export default Noticias;
