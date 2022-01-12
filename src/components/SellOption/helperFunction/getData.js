//available amounts 
export const getAmounts = () => {
    const urlGet="https://danugarri.000webhostapp.com/proyectos%20web/API_sinag/index.php";
    let amountsArray = [];
    fetch(urlGet,
        {method:"GET"})
    .then(response => response.json())
    .then(data => {
       console.log(data)
        for (let x= 0; x<data.length;x++){
            amountsArray.push(data[x].cantidad)
        }
    })
    return amountsArray;
}
//available ids from the data base
export const getIds = () => {
    const urlGet="https://danugarri.000webhostapp.com/proyectos%20web/API_sinag/index.php";
    let amountsArray = [];
    fetch(urlGet)
    .then(response => response.json())
    .then(data => {
       
        for (let x= 0; x<data.length;x++){
            amountsArray.push(data[x].id)
        }
    })
    return amountsArray;
}
