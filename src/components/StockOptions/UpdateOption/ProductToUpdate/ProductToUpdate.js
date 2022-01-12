import{useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import './ProductToUpdate.css'
import { UpdateProductModal } from '../modals/UpdateProductModal';



export const ProductToUpdate = () => {

    const [productName, setProductName] = useState(null);
    const [price, setPrice] = useState(null);
    const [amount, setAmount] = useState(null);
    const [created, setCreated] = useState(false);
    const [newInputs, setnewInputs] = useState(false);
    const [apiError, setApiError] = useState(false);
    //modal
    const [open, setOpen] = useState(false);
    const handleClose = () =>{

        setOpen(false);
        setCreated(false);
        setnewInputs(false);
        setPrice(null);
        setAmount(null);
        setProductName(null);
}

    // get product from url
    const url= window.location.href;
    const newUrl = new URL(url);
    const productParameter= 'product';
    const productSelected= newUrl.searchParams.get(productParameter);
    const productId= newUrl.searchParams.get('id');
    const currentPrice= newUrl.searchParams.get('price');
    const currentAmount= newUrl.searchParams.get('amount');
    

   
    const createProduct = (event) =>{
        event.preventDefault();
        
        let inputName= event.target.querySelector('input[name="nombre"]').value;
        let inputPrice=event.target.querySelector("input[name='precio']").value;
        let inputAmount= event.target.querySelector("input[name='cantidad']").value;

        if(inputAmount !=="" || inputPrice !=="" || inputName !=="") {
        setnewInputs(true);
        
            if( inputName !==""){
                setProductName(inputName);
            }
            if( inputPrice !==""){
                
                setPrice(inputPrice);
            }
            if( inputAmount !==""){
                
                setAmount(inputAmount);
            }
        }
        setOpen(true);
         const reset = () => {
            event.target.querySelector('input[name="nombre"]').value="";
            event.target.querySelector("input[name='precio']").value="";
            event.target.querySelector("input[name='cantidad']").value="";
         }
         reset()
    }

    

   
    useEffect(() => {
        //const urlAPI= `https://danugarri.000webhostapp.com/proyectos%20web/API_sinag/index.php?id=${productId}`;
        const urlUpdate = `https://danugarri.000webhostapp.com/proyectos%20web/api-personal/update-product-api/index.php?id=${productId}`;
            //body to be converted into json
        const bodyData = {
                nombre: productName || productSelected,
                precio: price || currentPrice,
                cantidad: amount || currentAmount
        }
    
         const sendPutMethod = async() => {
        
        await fetch(urlUpdate,{
            method : 'POST',
            body: JSON.stringify(bodyData)
        }
            )
        .then(response =>{
            console.log(response)
            if(response.ok === true){

                setCreated(true);
            }
         
        })
        .catch(error => {
            console.log(error);
             setCreated(false);
             setApiError(true);
        });
        }
        if(newInputs) {

            sendPutMethod()
        }
    },[newInputs,amount,productName,price,productId,currentAmount,currentPrice,productSelected])
        

    return(
       <main>
       <h1>Estás modificando:</h1> 
       <h2 id='product-selected' >{productSelected}</h2>
       <h3>
           Introduce sólo los campos que quieras modificar
       </h3>
       <form id ="crear" onSubmit={createProduct}>
           <label htmlFor="nombre">Nuevo Nombre</label>
           <input type="textarea" name="nombre" />
           <label htmlFor="nombre">Nuevo Precio</label>
           <input id="cantidad"type="number" name="precio" step="0.01" min="0"/>
           <label htmlFor="cantidad">Nueva Cantidad</label>
           <input id="cantidad" type="number" name="cantidad" min="1"/>
           <input type="submit" value="Modificar"/>
       </form>
       {
       <UpdateProductModal
        newProductName={productName}
        NewPrice={price}
        NewAmount={amount}
        created={created}
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        setProductName= {setProductName}
        setPrice= {setPrice}
        setAmount= {setAmount}
        newInputs= {newInputs}
        apiError= {apiError}
       />}
        
        <button><NavLink to ="updateOption">Volver a modificar Stock</NavLink></button>
       </main>
    )
}