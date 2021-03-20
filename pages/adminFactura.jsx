import React, { useEffect, useState } from 'react';
import styles from '../styles/adminCondominios.module.css';
import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { useForm } from "react-hook-form";
import NavbarAdmin from "../components/navbarAdmin";
import Table from "@material-ui/core/Table";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { TextField } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";



const AdminFactura = () => {

	const [usuario_id, setUsuario_id] = useState(localStorage.getItem('usuario_id'));


	useEffect(() => {
		setUsuario_id(localStorage.getItem('usuario_id'))
		gastoEdf()
		gastoApt();
	}, []);


	const [dato, setData] = useState({
		usuario_id: usuario_id,
		apartamento_id: "",
		descripcion: "",
		monto_apartamento: ""

	});

	const useStyles = makeStyles((theme) => ({
		modal: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},
		paper: {
			backgroundColor: theme.palette.background.paper,
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
			width: 900,
			maxHeight: '80vh',
			overflowY: 'auto',
		},
	}));

	const classes = useStyles();

	const { register, handleSubmit, errors } = useForm({
		reValidateMode: 'onSubmit'
	});

	const handleChange = e => {
		setData({
			...dato,
			[e.target.name]: e.target.value
		})

	}

	const handleClose = () => {
		setOpenAddApt(false);
		setOpenAddEdf(false);
	};

	async function getGastos() { //Función asincrona para consumir datos de la API

		const client = new ApolloClient({ // Cliente de Apolo
			uri: `http://localhost:9900/graphql`,
			cache: new InMemoryCache()
		});

		// try{
		const { data } = await client.query({ // Query de graphql
			query: gql`
                        query{
                            getGastos{
                                gasto_id
								descripcion
                                }
                          }
                        `,
		});
		console.log('////////////////////////')
		console.log('data:', data)

		return data;

	};

	async function getGastoEdificios() { //Función asincrona para consumir datos de la API

		const client = new ApolloClient({ // Cliente de Apolo
			uri: `http://localhost:9900/graphql`,
			cache: new InMemoryCache()
		});

		// try{
		const { data } = await client.query({ // Query de graphql
			query: gql`
                        query{
                            getGastoEdificios{
                                gasto_id
								edificio_id
								monto_edificio
                                }
                          }
                        `,
		});
		console.log('////////////////////////')
		console.log('data:', data)

		return data;

	};

	async function getGastoApartamentos() { //Función asincrona para consumir datos de la API

		const client = new ApolloClient({ // Cliente de Apolo
			uri: `http://localhost:9900/graphql`,
			cache: new InMemoryCache()
		});

		// try{
		const { data } = await client.query({ // Query de graphql
			query: gql`
                        query{
                            getGastoApartamentos{
                                gasto_id
								apartamento_id
								monto_apartamento
                                }
                          }
                        `,
		});
		console.log('////////////////////////')
		console.log('data:', data)

		return data;

	};

	async function deleteGastoEdificio(gasto_id, edificio_id) { //Función asincrona para consumir datos de la API

		const client = new ApolloClient({ // Cliente de Apolo
			uri: `http://localhost:9900/graphql`,
			cache: new InMemoryCache()
		});

		const { data } = await client.mutate({ // Query de graphql
			mutation: gql`
                            mutation{
                                deleteGastoEdificio(gasto_id: ${gasto_id}, edificio_id: ${edificio_id}){
                                    eliminado
                                }
                              }
                            `,
		});

		console.log('////////////////////////')
		console.log('data:', data)

		return data;

	};

	async function deleteGastoApartamento(gasto_id, apartamento_id) { //Función asincrona para consumir datos de la API

		const client = new ApolloClient({ // Cliente de Apolo
			uri: `http://localhost:9900/graphql`,
			cache: new InMemoryCache()
		});

		const { data } = await client.mutate({ // Query de graphql
			mutation: gql`
                            mutation{
                                deleteGastoApartamento(gasto_id: ${gasto_id}, apartamento_id: ${apartamento_id}){
                                    eliminado
                                }
                              }
                            `,
		});

		console.log('////////////////////////')
		console.log('data:', data)

		return data;

	};

	async function createFactura(apartamento_id, monto_total) { //Función asincrona para consumir datos de la API

		const client = new ApolloClient({ // Cliente de Apolo
			uri: `http://localhost:9900/graphql`,
			cache: new InMemoryCache()
		});

		const { data } = await client.mutate({ // Query de graphql
			mutation: gql`
                            mutation{
                                createFactura(apartamento_id: ${apartamento_id}, monto_total: ${monto_total}){
                                    factura_id
                                }
                              }
                            `,
		});

		console.log('////////////////////////')
		console.log('data:', data)

		return data;

	};

	async function createGasto(descripcion, factura_id) { //Función asincrona para consumir datos de la API

		const client = new ApolloClient({ // Cliente de Apolo
			uri: `http://localhost:9900/graphql`,
			cache: new InMemoryCache()
		});

		const { data } = await client.mutate({ // Query de graphql
			mutation: gql`
                            mutation{
                                createGasto(descripcion: "${descripcion}", factura_id: ${factura_id}){
									gasto_id
                                }
                              }
                            `,
		});

		console.log('////////////////////////')
		console.log('data:', data)

		return data;

	};

	async function createGastoEdificio(gasto_id, edificio_id) { //Función asincrona para consumir datos de la API

		const client = new ApolloClient({ // Cliente de Apolo
			uri: `http://localhost:9900/graphql`,
			cache: new InMemoryCache()
		});

		const { data } = await client.mutate({ // Query de graphql
			mutation: gql`
                            mutation{
                                deleteGastoEdificio(gasto_id: ${gasto_id}, edificio_id: ${edificio_id}){
                                    eliminado
                                }
                              }
                            `,
		});

		console.log('////////////////////////')
		console.log('data:', data)

		return data;

	};

	async function createGastoApartamento(gasto_id, apartamento_id, monto_apartamento) { //Función asincrona para consumir datos de la API

		const client = new ApolloClient({ // Cliente de Apolo
			uri: `http://localhost:9900/graphql`,
			cache: new InMemoryCache()
		});

		const { data } = await client.mutate({ // Query de graphql
			mutation: gql`
                            mutation{
                                createGastoApartamento(gasto_id: ${gasto_id}, apartamento_id: ${apartamento_id}, monto_apartamento: ${monto_apartamento}){
                                    gasto_id
									apartamento_id
									monto_apartamento
                                }
                              }
                            `,
		});

		console.log('////////////////////////')
		console.log('data:', data)

		return data;

	};

	const [gastoEdificio, setgastoEdificio] = useState([]);

	const gastoEdf = async () => {
		const gastoE = await getGastoEdificios();
		const gasto = await getGastos();
		let g = gastoE.getGastoEdificios.map(alq => {
			const res = gasto.getGastos.find(r => r.gasto_id === alq.gasto_id).descripcion
			return {
				...alq,
				gasto_desc: res
			}
		})

		setgastoEdificio(g)

	};

	const [gastoApartamento, setgastoApartamento] = useState([]);

	const gastoApt = async () => {
		const gastoA = await getGastoApartamentos();
		const gasto = await getGastos();
		let g = gastoA.getGastoApartamentos.map(alq => {
			const res = gasto.getGastos.find(r => r.gasto_id === alq.gasto_id).descripcion
			return {
				...alq,
				gasto_desc: res
			}
		})

		setgastoApartamento(g)

	};

	const eliminarGastoEdificio = async (gasto_id, edificio_id) => {
		const e = await deleteGastoEdificio(gasto_id, edificio_id);
		console.log(e)
	}

	const eliminarGastoApartamento = async (gasto_id, apartamento_id) => {
		const e = await deleteGastoApartamento(gasto_id, apartamento_id);
		console.log(e)
	}

	const gEdf = (gastoEdificio) => (

		gastoEdificio.map((gasto) => (
			<>
				<tbody>
					<tr key={gasto.gasto_id} >
						<td className={styles.borde} key={gasto.gasto_id}>{gasto.gasto_id}</td>
						<td className={styles.borde} key={gasto.edificio_id}>{gasto.edificio_id}</td>
						<td className={styles.borde} key={gasto.gasto_desc}>{gasto.gasto_desc}</td>
						<td className={styles.borde} key={gasto.monto_edificio}>{gasto.monto_edificio}</td>
						<button
							className={styles.bot}
							onClick={(e) => eliminarGastoEdificio(gasto.gasto_id, gasto.edificio_id, e)}
							type="submit"
						>
							Eliminar
                        </button>

					</tr>
				</tbody>

			</>

		)

		))

	const gApt = (gastoApartamento) => (

		gastoApartamento.map((gasto) => (
			<>
				<tbody>
					<tr key={gasto.gasto_id} >
						<td className={styles.borde} key={gasto.gasto_id}>{gasto.gasto_id}</td>
						<td className={styles.borde} key={gasto.apartamento_id}>{gasto.apartamento_id}</td>
						<td className={styles.borde} key={gasto.gasto_desc}>{gasto.gasto_desc}</td>
						<td className={styles.borde} key={gasto.monto_apartamento}>{gasto.monto_apartamento}</td>
						<button
							className={styles.bot}
							onClick={(e) => eliminarGastoApartamento(gasto.gasto_id, gasto.apartamento_id, e)}
							type="submit"
						>
							Eliminar
                        </button>

					</tr>
				</tbody>

			</>

		)

		))

	const agregarGastoEdf = async () => {
		const edificios = await deleteCondominio();
		console.log(edificios)
	}

	const agregarGastoApt = async () => {
		const facturaA = await createFactura(dato.apartamento_id, dato.monto_apartamento);
		console.log(facturaA.createFactura.factura_id);
		const gasto = await createGasto(dato.descripcion, facturaA.createFactura.factura_id);
		const gastoA = await createGastoApartamento(gasto.createGasto.gasto_id, dato.apartamento_id, dato.monto_apartamento);
		
	}

	const [openAddApt, setOpenAddApt] = React.useState(false);
	const [openAddEdf, setOpenAddEdf] = React.useState(false);

	const formApt = () => {
		setOpenAddApt(true)
	}

	return (
		<div className={styles.toda}>

			<div className={styles.orden}>
				<NavbarAdmin />
			</div>


			<div className={styles.gastos}>
				<div className={styles.tablaGastos}>
					<div className={styles.add} ><AddCircleIcon className={styles.agregar} fontSize={"large"} /></div>
					<Table striped bordered hover>
						<thead>
							<tr className={styles.border}>
								<th className={styles.border}>Gasto ID</th>
								<th className={styles.border}>Edificio ID</th>
								<th className={styles.border}>Descripción</th>
								<th className={styles.border}>Monto</th>
							</tr>
						</thead>
						{gastoEdificio && gEdf(gastoEdificio)}
					</Table>
				</div>
				<div className={styles.tablaGastos}>
					<div className={styles.add} ><AddCircleIcon className={styles.agregar} fontSize={"large"} onClick={formApt}/></div>

					<Table striped bordered hover>
						<thead>
							<tr className={styles.border}>
								<th className={styles.border}>Gasto ID</th>
								<th className={styles.border}>Apartamento ID</th>
								<th className={styles.border}>Descripción</th>
								<th className={styles.border}>Monto</th>
							</tr>
						</thead>
						{gastoApartamento && gApt(gastoApartamento)}
					</Table>

					<Modal
						aria-labelledby="transition-modal-title"
						aria-describedby="transition-modal-description"
						className={classes.modal}
						open={openAddApt}
						onClose={handleClose}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{
							timeout: 500,
						}}
					>
						<Fade in={openAddApt}>
							<div className={classes.paper}>
								<h2 id="transition-modal-title">Agregar Gastos</h2>

								<form
									onSubmit={handleSubmit(agregarGastoApt)}
									className={`${classes.root} ${styles.form}`}
								>
									<div>

										<TextField
											label="Apartamento ID:"
											className={"col s12"}
											name="apartamento_id"
											inputRef={register({
												required: { value: true, message: "Apartamento ID obligatorio" }
											})}
											onChange={handleChange}
										/>
										<div style={{ display: "block", color: "red", visibility: errors?.apartamento_id ? "visible" : "hidden" }}>{`${errors?.apartamento_id && errors?.apartamento_id?.message} `}</div>
									</div>

									<div>

										<TextField
											label="Descripción:"
											className={"col s12"}
											name="descripcion"
											inputRef={register({
												required: { value: true, message: "Descripción obligatorio" }
											})}
											onChange={handleChange}
										/>
										<div style={{ display: "block", color: "red", visibility: errors?.descripcion ? "visible" : "hidden" }}>{`${errors?.descripcion && errors?.descripcion?.message} `}</div>
									</div>

									<div>
										<TextField label="Monto:"
											className={"col s12"}
											name={"monto_apartamento"}
											inputRef={register({
												required: { value: true, message: "Monto obligatorio" }
											})}
											onChange={handleChange}
										/>
										<div style={{ display: "block", color: "red", visibility: errors?.monto_apartamento ? "visible" : "hidden" }}>{`${errors?.monto_apartamento && errors?.monto_apartamento?.message} `}</div>

									</div>

									<div className={styles.inicio}>
										<button
											className={styles.boton}
										>
											Crear gastos
								</button>
									</div>

								</form>
							</div>
						</Fade>
					</Modal>
				</div>
			</div>
		</div>



	)

}



export default AdminFactura;

