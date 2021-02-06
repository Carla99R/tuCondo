import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@material-ui/icons'
import {Navbar} from "react-bootstrap";
import HomePage from "./index";

function MyApp({ Component, pageProps })
{
    return (
        <>
            <HomePage>
                <Component {...pageProps} />
            </HomePage>

        </>

    )
}


export default MyApp;