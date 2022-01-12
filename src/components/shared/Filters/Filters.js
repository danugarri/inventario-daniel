import React, {useState} from 'react';
import './Filters.css';
import PropTypes from 'prop-types';


export const Filters = ({callToApi,setRenderSpinner,setSearch}) => {
  
    // const [search, setSearch]= useState(false); //this must defined on the parent component
    const [category, setCategory] = useState(null);
    const [subcategory, setSubcategory] = useState(null);
    const parameters= `?categoria=${category || ''}&subcategoria=${subcategory || ''}`;
    
    const handleCategory = (e) => {
        e.preventDefault();
        setCategory(e.target.value);
         console.log(e.target.value);
    }
    const handleSubcategory= (e) => {
        e.preventDefault();
        setSubcategory(e.target.value);
        console.log(e.target.value);
    }

    const getProducts = async (event) => {
        event.preventDefault();
        setSearch(true);
        setRenderSpinner(true);
        await callToApi(parameters);
        // must be defined a function to handle api request
    }


    return(
        <>
        
        <form id= 'form-demo' onSubmit={getProducts}>
            <label htmlFor='category' className='label-demo'>Categoría</label>
            <select name= 'category' className='select' onChange= {handleCategory}>
                <option value= ''></option>
                <option value= 'coches'>Coches</option>
                <option value= 'moda'>Moda</option>
                <option value= 'tecnologia'>Tecnología</option>
                <option value= 'decoracion'>Decoración</option>
            </select>
            <label htmlFor='subcategory' className='label-demo'>Subcategoría</label>
            <select name= 'subcategory' className='select' onChange= {handleSubcategory}>
                <option value= ''></option>
                <option value= 'hombre'>Hombre</option>
                <option value= 'mujer'>Mujer</option>
            </select>
            <input type= 'submit' value= 'Buscar' id= 'input-demo'/>
        </form>
        </>
    )
}
Filters.propTypes= {
/**
 * Url api: string
 */
url : PropTypes.string,
/**
 * function to be passed to the form to be called when submiting
*/
callToApi: PropTypes.func,
/**
 * setSearch function to be received on get products and set the serch to true in order to show the table stock
 */
setSearch: PropTypes.func,
/**
 * setRenderSpinner to display the spinner when get products
 */
setRenderSpinner: PropTypes.func
}