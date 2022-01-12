import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import { useState, useEffect } from "react";
import './App.css';
import { AddProductOption } from "./components/StockOptions/AddProductOption/AddProduct";
import { Home } from './components/Home/Home';
import { SellOption } from "./components/SellOption/SellOption";
import { StockOptions } from "./components/StockOptions/StockOptions";
import { StockList } from "./components/StockOptions/StockList/StockList";
import { UpdateOption } from "./components/StockOptions/UpdateOption/UpdateOption";
import { DeleteOption } from "./components/StockOptions/DeleteOption/DeleteOption";
import { ProductToUpdate } from "./components/StockOptions/UpdateOption/ProductToUpdate/ProductToUpdate";
import { Context } from "./components/Context/Context";

 const App = () => {
  
  const [arrayProductsIds, setArrayProductsIds] = useState([]);
  const [arrayProductsAmounts, setArrayProductsAmounts] = useState([]);
  const [arrayProductsPrices, setArrayProductsPrices] = useState([]);
  
 // first time the app loads
  useEffect(() => {
    const urlAPI='https://danugarri.000webhostapp.com/proyectos%20web/api-personal/api/index.php';
    const callToApi = () => {
      fetch(urlAPI,{
                  method : 'GET',
              }
      )
      .then(response =>{
      
          return response.json();
      }).then(data => {
      
      //console.log(data)
      let idsArray =[];
      let amountsArray= [];
      let pricesArray = [];
          for (let x= 0; x<data.length;x++){
          idsArray.push(data[x].id);
          amountsArray.push(data[x].cantidad);
          pricesArray.push(data[x].precio);
          }  
          setArrayProductsIds(idsArray);
          setArrayProductsAmounts(amountsArray);
          setArrayProductsPrices(pricesArray);
          console.log(idsArray)
      })
      .catch(error => console.log(error))
    }
      callToApi();
    
    },[])


  return (

    <Router>
       <Switch>
       <Context.Provider value= {
          {arrayProductsIds, setArrayProductsIds, arrayProductsAmounts,setArrayProductsAmounts,arrayProductsPrices,setArrayProductsPrices
          }
      } >
        <Route  exact path= '/'>
         <Home />  
        </Route>
        <Route  path='/sellOption' >
          <SellOption />
        </Route>
         <Route  path='/StockOptions'>
          <StockOptions/>
         </Route>
         <Route  path='/stocklist'>
          <StockList/>
         </Route>
         <Route  path='/addProduct'>
          <AddProductOption 
            setArrayProductsIds= {setArrayProductsIds} 
            setArrayProductsAmounts={setArrayProductsAmounts}
            setArrayProductsPrices= {setArrayProductsPrices}
          />
         </Route>
          <Route  path='/updateOption'>
          <UpdateOption 
            arrayProductsIds= {arrayProductsIds}
            arrayProductsAmounts= {arrayProductsAmounts} 
            arrayProductsPrices= {arrayProductsPrices} />
         </Route>
         <Route  path='/deleteOption'>
          <DeleteOption 
          setArrayProductsIds= {setArrayProductsIds} 
          arrayProductsIds= {arrayProductsIds} 
          setArrayProductsAmounts= {setArrayProductsAmounts}
          setArrayProductsPrices= {setArrayProductsPrices}
          />
         </Route>
         <Route  path='/productToUpdate'>
          <ProductToUpdate />
         </Route>
    </Context.Provider>
       </Switch>
      </Router>
  );
}
export default App;
