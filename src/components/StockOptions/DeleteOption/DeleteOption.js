import React, {useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import { Spinner } from '../../Spinner/Spinner';
import '../../StockOptions/StockOptions.css'
import { DeleteModal } from './DeleteModals';
import './DeleteOption.css';
     
     
export const DeleteOption = ({setArrayProductsIds, arrayProductsIds,setArrayProductsPrices,setArrayProductsAmounts}) => {
     
    const [stock, setStock] = useState(null);
    // spinner
    const [renderSpinner,setRenderSpinner] = useState(true);
   
    
    // product selected
    const [productToSell, setProductToSell]= useState(null);
    const [isChecked, setIsChecked]= useState(false);
    const [productIndex, setProductIndex] = useState(null);
    let productId;
    if(productIndex !==null) {
        productId = arrayProductsIds[productIndex]
        //console.log(productId)
        
    }
    let checkboxSelected= document.getElementsByClassName("checkbox");


    const urlAPI= "https://danugarri.000webhostapp.com/proyectos%20web/api-personal/api/index.php";
    //const local= "http://localhost/sinag/index.php";
   
    useEffect(() => {

         // onClick for checkbox

        let checkbox =  document.getElementsByClassName("checkbox");
        const hancleCheckedProduct = () => {
        //console.log(document.querySelector('input[type="checkbox"]').checked);

        // let counter= 0;
            let productsArray= [];
        
            for(let x=0;x<checkbox.length;x++){
                //console.log(checkbox[x])
                if(checkbox[x].checked === true){
                    console.log(checkbox[x] )
                    // counter++;
                    setIsChecked(true);

                    //console.log(checkbox[x].value);
                    //if(counter ===1) {
                        productsArray.push(checkbox[x].value);
                        //so far i only want to add 1 product at a time
                        setProductToSell(checkbox[x].value);
                        //this tells the exact position of that product inside the array
                        setProductIndex(x);
            }
                    //}
                
                else{
                    //los que sean false
                    checkbox[x].style.display= 'none';
                }
                
                
            }
            resetChecked();
    }

  //reset checkBox.checked
  const resetChecked = () => {
       if(isChecked){
            for(let x=0;x<checkboxSelected.length;x++){
                checkboxSelected[x].checked= false;
                  checkbox[x].style.display= 'inline-block';
            }
            setIsChecked(false);
            setProductToSell(null);
            setProductIndex(null);
                    }
  }
  console.log(isChecked)
        const callToApi = async () => {
            await fetch(urlAPI,{
                method : 'GET',
            }
                )
            .then(response =>{
            
                return response.json();
            }).then(data => {
                
            //console.log(data)
            let array =[
               
                     
                    <thead key='thead'>
                       
                        <tr>
                        <th>
                            Selecciona
                        </th>
                        <th>
                            Id
                        </th>
                        <th>
                            Producto
                        </th>
                         <th>
                            Stock
                        </th>
                        <th>
                        Eliminar
                        </th>
                        </tr>
                    </thead>
            
            ];
            let arrayIds = [];
            let arrayAmounts= [];
            let arrayPrices= [];
                for (let x= 0; x<data.length;x++){
                    // setting the arrayIds withe ids if one is deleted
                    arrayIds.push(data[x].id);
                    arrayAmounts.push(data[x].cantidad);
                    arrayPrices.push(data[x].precio);
                    array.push(
                        <tbody key= {x}>
                            <tr>
                                <td><input type= "checkbox"  className= "checkbox" value= {data[x].nombre}  onClick= {hancleCheckedProduct}/></td>
                                <td>{data[x].id}</td>
                                <td>{data[x].nombre}</td>
                                <td>{data[x].cantidad}</td>
                            
                                <td><DeleteModal 
                                productToSell= {productToSell}
                                isChecked= {isChecked}
                                setIsChecked= {setIsChecked}
                                checkboxSelected= {checkboxSelected}
                                productId= {productId}
                                setProductToSell= {setProductToSell}
                                setProductIndex={setProductIndex}
                                resetChecked={resetChecked}
                                />
                                </td>
                            </tr>
                        </tbody>
                    );
                }
                setStock(array);
                setRenderSpinner(false);
                setArrayProductsIds(arrayIds);
                setArrayProductsAmounts(arrayAmounts);
                setArrayProductsPrices(arrayPrices);
               //  console.log(array)
                
            })
            .catch(error => console.log(error))
        }
       
    callToApi();
    },[renderSpinner,productToSell,isChecked,productIndex,checkboxSelected,productId,setArrayProductsIds,setArrayProductsAmounts,setArrayProductsPrices])
   
   
     
     return(
       <>
       {
        renderSpinner && <Spinner/> 
       }
       {
        !renderSpinner && 
        <section id= 'deleteOption-container'>
        <h1>Elimina productos de tu Stock</h1>
            <table id ="table-stock">
                {stock}
            </table>
            <button><NavLink to = 'stockOptions'>Volver a opciones de Stock</NavLink></button>
        </section>
       }  
       </>
    )
}