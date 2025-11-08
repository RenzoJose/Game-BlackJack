   import _ from 'underscore';
  
  // ********** FUNCION CREAR CARTAS ALEATORIAS **********//
   /**
    * 
    * @param {Array<String>} typeCards Example: ['C', 'D', 'H', 'S']
    * @param {Array<String>} specialCards Example: [ 'A', 'J', 'K', 'Q']
    * @returns {Array<String>} RETORNA una Baraja de Cartas
    */
 export const createCards = (typeCards, specialCards) =>{

    if (!typeCards || typeCards.length == 0) throw new Error('Tipos de Cartas es Obligatorio');
    
    let cards = [];

    // cartas del 2 al 10 por tipo de carta
    for ( let i = 2; i <= 10 ; i++ ){
        
        for ( let typeCard of typeCards ){ 
            
            cards.push( `${i}${typeCard}`); 
                            
        } 
                    
    }

    // crear cartas especiales
    for ( let specialCard of specialCards){ 

        for ( let typeCard of typeCards){

            cards.push( `${specialCard}${typeCard}` ); 
    
        }
        
    }

    return _.shuffle( cards );
    
  }

