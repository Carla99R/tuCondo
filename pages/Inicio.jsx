import Navbar from '../components/navbar';
import Image from 'next/image'

const Inicio=()=>{

    return(
        <>
            <Navbar/>
            
                
            <Image 
                src = "/unnamed.jpg" 
                alt ="imagen"
                height = "100vh"
            />

            <p>Comodidad para tu hogar</p>

        </>
    )

}


export default Inicio