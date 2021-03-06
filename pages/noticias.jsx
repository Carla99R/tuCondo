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


    useEffect(()=>{
        setNombre(localStorage.getItem('nombre'));
        setApellido(localStorage.getItem('apellido'));
        setCedula(localStorage.getItem('cedula'));
        setCorreo(localStorage.getItem('correo'));
        setUsuario_id(localStorage.getItem('usuario_id'));


    },[]);


    const [dato, setData] = useState({
        correo:correo,
        apellido:apellido,
        nombre:nombre,
        cedula: cedula,
        usuario_id: usuario_id

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

        const info = await getInitialProps(dato.usuario_id);

        console.log(info.getApartamento.nombre)
        console.log(info.getApartamento)

        localStorage.setItem('nombreA', info.getApartamento.nombre);
        localStorage.setItem('alicuota', info.getApartamento.alicuota);
        localStorage.setItem('dimensiones', info.getApartamento.dimensiones);

        if(info.getApartamento.is_alquilado === true){
            localStorage.setItem('is_alquilado', "Sí");
        }else{
            localStorage.setItem('is_alquilado', "No");
        }

    }

    const handleChange = e =>{
        setData({
            ...dato,
            [e.target.name] : e.target.value
        })

    }

    async function getInitialProps() { //Función asincrona para consumir datos de la API

        console.log(nombre)
        const client = new ApolloClient({ // Cliente de Apolo
            uri: `http://localhost:9500/graphql`,
            cache: new InMemoryCache()
        });

        // try{
        const {data} = await client.query({ // Query de graphql
            query: gql`
                        query{
                            getApartamento(usuario_id: ${usuario_id}){
                                nombre
                                alicuota
                                is_alquilado
                                dimensiones
                                }
                          }
                        `,
        });
        console.log('////////////////////////')
        console.log('data:', data)

        return data;

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
                <Card className={classnames(`${classes.root}, ${styles.carta}`)}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                R
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title="Shrimp and Chorizo Paella"
                        subheader="September 14, 2016"
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
                        </Typography>
                    </CardContent>

                    <div className={styles.scroll}>
                            <CardContent>
                                <Typography paragraph>Method:</Typography>
                                <Typography paragraph>
                                    Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                                    minutes.
                                </Typography>
                                <Typography paragraph>
                                    Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
                                    heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
                                    browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
                                    and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
                                    pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
                                    saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
                                </Typography>
                                <Typography paragraph>
                                    Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
                                    without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                                    medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
                                    again without stirring, until mussels have opened and rice is just tender, 5 to 7
                                    minutes more. (Discard any mussels that don’t open.)
                                </Typography>
                                <Typography>
                                    Set aside off of the heat to let rest for 10 minutes, and then serve.
                                </Typography>
                            </CardContent>
                    </div>


                </Card>

            </div>



        </div>

    )

}

export default Noticias;
