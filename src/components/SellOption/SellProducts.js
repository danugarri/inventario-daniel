import React, {useState,useEffect, useContext} from 'react';
import {NavLink} from 'react-router-dom';
//import {NavLink} from 'react-router-dom';
import { InputAmount } from './InputAmount/InputAmount';
import { BasicModal } from './Modal/BasicModal';
import { Spinner } from '../Spinner/Spinner';
import '../StockOptions/StockList/StockList.css';
import { ClearFilters } from './TableToSell/ClearFilters/ClearFilters';
import { Context } from '../../components/Context/Context';  
     
export  const SellProducts = () => {
    const contextProps = useContext(Context);
    const arrayWithIds= contextProps.arrayProductsIds;
    const [stock, setStock] = useState(null);
    // spinner
    const [renderSpinner,setRenderSpinner] = useState(true);
   
    // inputAmount
    const [amountToSell, setAmountToSell] = useState(null);
    const [introducedAmount, setIntroducedAmount] = useState(false);
    // product selected
    const [productToSell, setProductToSell]= useState(null);
    const [isChecked, setIsChecked]= useState(false);
    const [productIndex, setProductIndex] = useState(null);
    
    // available amount from the database for the selected product
    const [availableAmount,setAvailableAmount]= useState(null);


    let definitiveProductIndex;
    let productId;
    if(productIndex !==null) {
        definitiveProductIndex = productIndex;
        productId = arrayWithIds[productIndex];
       
    }
    
    let checkboxSelected= document.getElementsByClassName("checkbox");
    const resetAmount = () => {
       
        let inputElemnt =  document.getElementsByTagName("input")
        for(let x=0;x<inputElemnt.length;x++){
                inputElemnt[x].value="";// reset the value for each input html tag with the id cantidad
        }
    }
 
    const sellProduct = (event) => {
    event.preventDefault();
    let inputAmount = event.target.value;
    console.log(inputAmount)
    if(inputAmount !==0) {

    setAmountToSell(inputAmount)
    setIntroducedAmount(true);
    }
   }

    const urlAPI= "https://danugarri.000webhostapp.com/proyectos%20web/api-personal/api/index.php";
    //const local= "http://localhost/sinag/index.php";
   
    // filter
    const clear = () => {
        setIntroducedAmount(false);
        setAmountToSell(null);
        setProductIndex(null);
        resetAmount();
        setIsChecked(false);
        setProductToSell(null);
          
        
        for(let x=0;x<checkboxSelected.length;x++){
        checkboxSelected[x].checked= false;
        document.getElementsByClassName("checkbox")[x].style.display= 'inline-block';
        }
    }
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
                          <td>{data[x].cantidad}</td>
                        <td id={"keyAmount"}><InputAmount sellProduct={sellProduct}/></td>
                        <td><BasicModal 
                        amountToSell={amountToSell}
                        introducedAmount={introducedAmount}
                        setIntroducedAmount={setIntroducedAmount}
                        setAmountToSell= {setAmountToSell}
                        resetAmount= {resetAmount}
                        productToSell= {productToSell}
                        isChecked= {isChecked}
                        setIsChecked= {setIsChecked}
                        checkboxSelected= {checkboxSelected}
                        productIndex= {definitiveProductIndex}
                        setProductIndex= {setProductIndex}
                        setProductToSell= {setProductToSell}
                        resetChecked= {resetChecked}
                        productId= {productId}
                        availableAmount= {availableAmount}
                        setAvailableAmount={setAvailableAmount}
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
    },[
        amountToSell,
        introducedAmount,
        renderSpinner,
        productToSell,isChecked,checkboxSelected,productIndex,definitiveProductIndex,productId,availableAmount])
   
   
     
     return(
       <>
       {
        renderSpinner && <Spinner/> 
       }
       {
        !renderSpinner && 
        <>
              <ClearFilters clear= {clear}/>
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
                            Stock
                        </th>
                        <th>
                            Cantidad 
                        </th>
                        <th>
                        Vender
                        </th>
                        </tr>
                    </thead>
                {stock}
            </table>
            <button><NavLink to = './'>Volver</NavLink></button>
        </>
       }  
       </>
    )
}
  