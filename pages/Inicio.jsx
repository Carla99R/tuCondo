import Navbar from '../components/navbar';
import Image from 'next/image'

const Inicio=()=>{

    return(
        <>
            <Navbar/>
            
                
            <Image 
                src = "/unnamed.jpg" 
                alt ="imagen"
            />

            <p>Comodidad para tu hogar</p>

        </>
    )

}


export default Inicio