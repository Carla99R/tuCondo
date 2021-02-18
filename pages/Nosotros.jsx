import Navbar from "../components/navbar";


const Nosotros=()=>{

    return(
        <>
            <Navbar/>
            
            <div className={styles.orden}>
                <figure className={styles.logo}>
                    <Image src="/todos.jpg" alt="logo" className={styles.imagen}
                           width={120}
                           height={120}
                    />
                    
                </figure>
               
                <h1 className = {styles.titulo}>Nosotros</h1>
          
                <Text className={styles.texto}>
                    ¡ Bienvenid@! =D ~{"\n"}
                    Aquí podrás registrar tus pagos y te haremos notificaciones desde tus gastos hasta de si van a cortar el agua ~{"\n"}
                    En esta App nos adaptamos a las necesidades venezolanas de usuario.
                </Text>
                        
            </div>

            {/* TODO Acá va la información de nosotros*/}

        </>
    )

}

export default Nosotros;