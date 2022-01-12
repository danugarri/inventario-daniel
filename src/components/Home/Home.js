import { NavLink} from "react-router-dom";
import './Home.css';

export const Home = () => {

    return(
        <div>
            <h1>Tu tienda</h1>
            <button><NavLink to = './sellOption'>Vender</NavLink></button>
            <button><NavLink to = './StockOptions'>Opciones de Stock</NavLink></button>
        </div>
    )
}