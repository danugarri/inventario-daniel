import React, {useState,useEffect} from 'react';
import {NavLink} from 'react-router-dom';
import { Spinner } from '../../Spinner/Spinner'; 
import '../StockOptions.css';
import './UpdateOption.css';
import { UpdateProductModal } from './modals/UpdateProductModal';
import {ConfirmModal} from './modals/ConfirmModal';


     
     
export  const UpdateOption = ({arrayProductsIds,arrayProductsAmounts,arrayProductsPrices}) => {
    const [stock, setStock] = useState(null);
    // spinner
    const [renderSpinner,setRenderSpinner] = useState(true);
    // product selected
    const [productToSell, setProductToSell]= useState(null);
    const [isChecked, setIsChecked]= useState(false);
    const [productIndex, setProductIndex] = useState(null);
    // modal test
    const [openTest, setOpenTest] = useState(false);
    const handleOpen = () => setOpenTest(true);
    const handleClose = () => {
        setOpenTest(false);
          if(isChecked){
                    for(let x=0;x<checkboxSelected.length;x++){
                        checkboxSelected[x].checked= false;
                         document.getElementsByClassName("checkbox")[x].style.display= 'inline-block';
                    }
                    setIsChecked(false);
                    setProductToSell(null);
                    setProductIndex(null);
                            }
    }
    
    let productId;
    let currentAmount;
    let currentPrice;

    if(productIndex !==null) {
        productId = arrayProductsIds[productIndex];
        currentAmount= arrayProductsAmounts[productIndex];
        currentPrice= arrayProductsPrices[productIndex];
    }
    let checkboxSelected= document.getElementsByClassName("checkbox");

    const urlAPI= "https://danugarri.000webhostapp.com/proyectos%20web/api-personal/api/index.php";
    //const local= "http://localhost/sinag/index.php";
   

    useEffect(() => {

         // onClick for checkbox

        let checkbox =  document.getElementsByClassName("checkbox");
        const hancleCheckedProduct = () => {
        //console.log(document.querySelector('input[type="checkbox"]').checked);
        let productsArray= [];
    
        for(let x=0;x<checkbox.length;x++){
            //console.log(checkbox[x])
            if(checkbox[x].checked === true){
                console.log(checkbox[x] )
                setIsChecked(true);

                    productsArray.push(checkbox[x].value);
                    //so far i only want to add 1 product at a time
                    setProductToSell(checkbox[x].value);
                    //this tells the exact position of that product inside the array
                    setProductIndex(x);
                    handleOpen();
                
            }   
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
            let array =[];
                for (let x= 0; x<data.length;x++){
                array.push(
                <tbody key= {x}>
                    <tr>
                        <td><input type= "checkbox"  className= "checkbox" value= {data[x].nombre}  onClick= {hancleCheckedProduct}/></td>
                        <td>{data[x].id}</td>
                        <td>{data[x].nombre}</td>
                        <td>{`${data[x].precio}€`}</td>
                        <td>{data[x].cantidad}</td>
                        <td><UpdateProductModal 
                        productToSell= {productToSell}
                        isChecked= {isChecked}
                        setIsChecked= {setIsChecked}
                        checkboxSelected= {checkboxSelected}
                        setProductToSell= {setProductToSell}
                        resetChecked= {resetChecked}
                        />
                        </td>
                    </tr>
                    </tbody>);
                }
                setStock(array);
                setRenderSpinner(false);
               //  console.log(array)
                
            })
            .catch(error => console.log(error))
        }
        callToApi();
    },[renderSpinner,productToSell,isChecked,checkboxSelected,productIndex])
     
     return(
       <>
       {
        renderSpinner && <Spinner/> 
       }
       {
        !renderSpinner && 
        <section id= 'updateOption-container'>
            <h1>Modifica los productos de tu Stock</h1>
            <table id ="table-stock">
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
                             precio
                        </th>
                         <th>
                            Stock
                        </th>
                        </tr>
                    </thead>
                {stock}
            </table>
            <button><NavLink to ="StockOptions">Volver a opciones de stock</NavLink></button>
        </section>
       }  
       {
           <ConfirmModal
            openTest= {openTest}
            handleClose= {handleClose}
            productToSell={productToSell} 
            productId= {productId}
            currentAmount= {currentAmount}
            currentPrice={currentPrice}
            />
       }
       </>
    )
}
  