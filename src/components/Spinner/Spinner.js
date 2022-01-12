import React from "react";
import './Spinner.css';
import PropTypes from 'prop-types';


export const Spinner = (props) => {
    const{colorFigure1,colorFigure2} = props;
    //accessing the styleSheets array
    const styleSheet = document.styleSheets[1];
    console.log(styleSheet)
    //inserting the wanted style 
    // transition color for the spinner
    styleSheet.insertRule(` @keyframes new_insert{0%{transform: rotate(0deg);}10%{border-right: 10px solid ${colorFigure1};}100% {transform: rotate(360deg);}} `,1)
    styleSheet.insertRule(` @keyframes new_insert2{0%{transform: rotate(0deg);}20%{border-left: 10px solid ${colorFigure2};}100% {transform: rotate(360deg);}} `,3)
   

   const loader1 = {
    width: '30px',
    height: '30px',
    backgroundColor:'white',
    margin :' 0 -40px',
    border: `10px solid ${colorFigure1}`,
    borderRight: `10px solid white`,
    borderRadius:'50%',
    animation:` new_insert 0.8s linear infinite`,
    transitionProperty:'border',
    zIndex: 0,
    position: 'fixed'

} 
 const loader2 = {
    width: '30px',
    height: '30px',
    backgroundColor:'white',
    border: `10px solid ${colorFigure2}`,
    borderLeft: `10px solid white`,
    borderRadius:'50%',
    animation:` new_insert2 0.8s linear infinite`,
    position: 'fixed'
 }

    return(
        <section id="container">
        <div  style={loader1} ></div>
        <div style= {loader2}></div>
        </section>

    )
}
Spinner.propTypes= {
    colorFigure1: PropTypes.string,
    colorFigure2: PropTypes.string
}
Spinner.defaultProps = {
    colorFigure1: 'blue',
    colorFigure2: 'blue'
}