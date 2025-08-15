
/*********** FUNCION PEDIR CARTAS ********
 * 
 * @param {Array<string>} Cards es un ARREGLO de String 
 * @returns {String} RETORNA EXTRAE Elemento del array, siempre y cuando tengo elementos el Array de cartas
 */
  export const askCards = ( carta ) =>( carta.length === 0 ) ? alert( 'NO HAY MAS CARTAS' ) : carta.pop(); 
