import React from 'react';
import { TableHead } from '../TableHead/TableHead';
import PropTypes from 'prop-types';

export const TableStock = ({stock}) => {
  
    return(
        <>
        <table id ="table-stock">
            <TableHead />
            {stock}
        </table>
        </>
    )
}
TableStock.propTypes= {
/**
 * Stock api: data reveived from the api
 */
stock : PropTypes.array,
}