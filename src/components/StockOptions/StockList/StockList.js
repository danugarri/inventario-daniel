import  {useState} from 'react';
import {NavLink} from 'react-router-dom';
import './StockList.css';
import { Spinner } from '../../Spinner/Spinner';
import { Filters } from '../../shared/Filters/Filters.js';
import { TableStock } from '../../shared/TableStock/TableStock';



export const StockList = () => {
     
    const [stock, setStock] = useState(null);
    // spinner
    const [renderSpinner,setRenderSpinner] = useState(true);
    // api
    const urlServidor= 'https://danugarri.000webhostapp.com/proyectos%20web/api-personal/'
    const endPoint = 'api-stockList'
    const urlAPI= urlServidor+endPoint+'/';
    //const local= "http://localhost/sinag/index.php";
     const [search, setSearch]= useState(false);
    //const parameters="";

    const getAllProducts = async (parameters) => {
        await fetch(urlAPI+parameters,{
            method : 'GET',
        }
            )
        .then(response =>{
          
            return response.json();
        }).then(data => {
           
         console.log(data)
           let array =[];
            for (let x= 0; x<data.length;x++){
               array.push(<tbody key= {x}><tr>
                   <td>{data[x].id}</td><td>{data[x].nombre}</td><td>{`${data[x].precio}€`}</td><td>{data[x].cantidad}</td>
                   </tr></tbody>);
            }
            setStock(array)
            setRenderSpinner(false);
        })
        .catch(error => console.log(error))
    }
   /*
    useEffect(() => {
         
    getAllProducts(parameters);
    },[])
  */

    return(
       <>
       <Filters setSearch= {setSearch} url={urlAPI} callToApi= {getAllProducts} setRenderSpinner={setRenderSpinner}/>
      {
       search && renderSpinner && <Spinner/> 
       }
       {
        !renderSpinner && search &&
        <>
        <TableStock stock= {stock} />
        </>
       }
        <button><NavLink to ="/">Volver a opciones de stock </NavLink></button>
       </>
    )
}