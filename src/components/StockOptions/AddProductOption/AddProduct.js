import{useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import './AddProductOption.css'
import { CreateProductModal } from './CreateProductModal'; 



export const AddProductOption = ({setArrayProductsIds,setArrayProductsPrices,setArrayProductsAmounts}) => {


   
    const [productName, setProductName] = useState(null);
    const [price, setPrice] = useState(null);
    const [amount, setAmount] = useState(null);
    const [category, setCategory] = useState(null);
    const [subcategory, setSubcategory] = useState("");
    const [created, setCreated] = useState(false);
    const [allInputs, setAllInputs] = useState(false);
    const [apiError, setApiError] = useState(false);
    const [unAvailableCategory, setUnAvailableCategory] = useState(false);
    const availableCategories = ['coches','moda','tecnologia','decoracion']
    //modal
    const [open, setOpen] = useState(false);
    const handleClose = () =>{

        setOpen(false);
        setCreated(false);
        setAllInputs(false);
        setPrice(null);
        setAmount(null);
        setProductName(null);
        setCategory(null);
        setSubcategory("");
        setUnAvailableCategory(false);
}

    const createProduct = (event) =>{
        event.preventDefault();
        
        let inputName= event.target.querySelector('input[name="nombre"]').value;
        let inputPrice=event.target.querySelector("input[name='precio']").value;
        let inputAmount= event.target.querySelector("input[name='cantidad']").value;
        let inputCategory=(event.target.querySelector("input[name='categoria']").value).toLowerCase();
        
        console.log(availableCategories.some(elem => elem===inputCategory ))
        if(availableCategories.some(elem =>elem===inputCategory )){ 
           setUnAvailableCategory(false);
        }
        else{
            setUnAvailableCategory(true);
        }
        if(inputCategory ==='cuidado de tu ser'){ 
           inputCategory = 'cuidado'
       };
        let inputSubcategory= (event.target.querySelector("input[name='subcategoria']").value).toLowerCase();

        if(inputAmount !=="" && inputName !=="" && inputPrice !=="" && inputCategory !=="") {

        setProductName(inputName);
        setPrice(inputPrice);
        setAmount(inputAmount);
        setCategory(inputCategory);
        setSubcategory(inputSubcategory);
        console.log(typeof price);
        setAllInputs(true);
        }
        setOpen(true);
         const reset = () => {
            event.target.querySelector('input[name="nombre"]').value="";
            event.target.querySelector("input[name='precio']").value="";
            event.target.querySelector("input[name='cantidad']").value="";
            event.target.querySelector("input[name='categoria']").value="";
            event.target.querySelector("input[name='subcategoria']").value="";
         }
         reset()
    }

    

   
    useEffect(() => {
       const urlAPI= "https://danugarri.000webhostapp.com/proyectos%20web/api-personal/api/index.php";
        //const local= "http://localhost/sinag/index.php";
            //body to be converted into json
        const bodyData = {
                nombre: productName,
                precio: price,
                cantidad: amount,
                categoria: category,
                subcategoria: subcategory || ""
        }
        const setArraysForProducts= async() => {
                await fetch(urlAPI)
                    .then(response => response.json())
                    .then(data => {
                        let arrayIds= [];
                        let arrayAmounts= [];
                        let arrayPrices= [];

                        for (let x= 0; x<data.length;x++){
                        arrayIds.push(data[x].id);
                        arrayAmounts.push(data[x].cantidad);
                        arrayPrices.push(data[x].precio);
                        }   
                        console.log(arrayIds)
                        setArrayProductsIds(arrayIds);
                        setArrayProductsAmounts(arrayAmounts);
                        setArrayProductsPrices(arrayPrices);
                    })
                .catch(error => console.log(error))
        }
            
        const sendPostMethod = async() => {
        
            await fetch(urlAPI,{
                method : 'POST',
                body: JSON.stringify(bodyData)
            }
                )
            .then(response =>{
                console.log(response)
                if(response.ok === true){
                    setCreated(true);
                    setArraysForProducts();
                }
                
            })
            .catch(error => {
                console.log(error);
                setCreated(false);
                setApiError(true);
            });
        }
        if(allInputs && !unAvailableCategory) {

            sendPostMethod()
        }
    },[allInputs,amount,productName,price,setArrayProductsIds,setArrayProductsAmounts,setArrayProductsPrices,category,subcategory,unAvailableCategory])
        

    return(
       <main>
       <h1>Añade Productos a tu stock</h1>
       <form id ="crear" onSubmit={createProduct}>
           <label htmlFor="nombre">Nombre</label>
           <input type="textarea" name="nombre" />
           <label htmlFor="nombre">Precio</label>
           <input id="cantidad"type="number" name="precio" step="0.01" min="0"/>
           <label htmlFor="cantidad">Cantidad</label>
           <input id="cantidad" type="number" name="cantidad" min="1"/>
           <label htmlFor="categoria">Categoría</label>
           <input type="textarea" name="categoria" />
           <label htmlFor="subcategoria">Subcategoría</label>
           <input type="textarea" name="subcategoria" />
           <input type="submit" value="Añadir"/>
       </form>
       {
       <CreateProductModal
        productName={productName}
        price={price}
        amount={amount}
        category= {category}
        subcategory= {subcategory}
        created={created}
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        setProductName= {setProductName}
        setPrice= {setPrice}
        setAmount= {setAmount}
        setCategory= {setCategory}
        setSubcategory= {setSubcategory}
        allInputs= {allInputs}
        apiError= {apiError}
        unAvailableCategory= {unAvailableCategory}
       />}
        
        <button><NavLink to ="StockOptions">Volver a opciones de stock</NavLink></button>
       </main>
    )
}