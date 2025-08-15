
/*********** Funcion Valor de las cartas *******
 * 
 * @param { String } valorCartas Recibe el string que extrajo de pedir carta a la funcion askCards
 * @returns { Number } RETORNA un Valor Numero que simboliza el VALOR de la carta 
 */

  export const valueCards = ( valorCartas ) => {

      let value = valorCartas.substring(0, valorCartas.length - 1 ); // extrae el ultimo digito de la cadena 
      console.log(value);
      
      
      return  ( !isNaN( value )  ?  value * 1 : (value === 'A' ) ? value = 11 : value = 10 ); // verfica si es un NaN 
          
      
  }

  
      