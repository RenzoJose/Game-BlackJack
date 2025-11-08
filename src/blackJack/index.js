// import { createCards  } from './usecase/create_cards';
// import { askCards  } from './usecase/askCards';
// import { valueCards  } from './usecase/valueCards';

// *note: podemos hacer varias importaciones separadas o unirlas en un solo archivo y exportalas
import { createCards, askCards, valueCards } from './usecase';


export const initGame = (() => {
   
  'use strict'

  // Entradas variables globales
let cards          = [];
let players        = [];
let pointPlayers   = [];
let playerCPU      = 0;
let turnPlayer     = 0;
const typeCards    = ['C', 'D', 'H', 'S'];
const specialCards = [ 'A', 'J', 'K', 'Q'];

const btnNewGame   = document.querySelector( '#btn_new' )
const btnPedir     = document.querySelector( '#btn_pedir' );
const btnStop      = document.querySelector('#btn_stop');

const pointScreen  = document.querySelectorAll( 'small');
const boxCartas    = document.querySelectorAll('.boxcartas');

  // FUNCION INICIO DEL JUEGO
  const startGame = ( numbPlayers = 2 ) => {
    let c        = ''; 
    cards        = [];
    pointPlayers = [];
    players      = [];
    playerCPU    = 0 ; //  incializo todas las variables para que no guarden datos anteriores
    turnPlayer   = 0 ;

    //TODO: funcion para renderizar el numero de jugadores 

    for ( let i = 0; i < numbPlayers; i++){

      c = `Jugador-${i + 1}` // LE ASIGNO UN NOMBRE AL JUGADOR
      pointPlayers.push(0);
      players.push(c);
    }
    
    boxCartas.forEach( (items) => items.innerHTML = '' ); // reinicio los div del html con las cartas
    pointScreen.forEach( items => items.innerText = 0) ;  // reinicio las etiqueta small que contiene los puntos en pantalla

    playerCPU = players.length - 1 ; // establezco el ultimo jugador es la computadora

    cards = createCards( typeCards, specialCards ); //como salida creo la cartas de nuevo 

    bloqueoBtn(false); // desbloqueo los botones de pedir cartas / stop 
                      
            
  }


  // ********Generar puntos a los Jugadores ******** //
  const puntosJugadores = ( cartas, numbJugador )=> {

    const valorCarta = askCards(cartas);  

    pointPlayers[ numbJugador ] +=  valueCards( valorCarta ); // Contador de puntos llamando a la funcion valor de la carta
    pointScreen[ numbJugador ].innerText = pointPlayers[ numbJugador ]; // inserto los puntos acumulados en el HTML en la etiqueta small

    cartasHtml( valorCarta, numbJugador );// llamo a la funcion PARA crear las cartas en el html, y le paso el valor de la carta y el numero de jugador

    return pointPlayers[ numbJugador ]; // retorno los puntos del jugador 

  } 

  // ******** Generar cartas en el HTML *********** //
  const cartasHtml = ( valorCarta, numberJugador )=>{

    const imgCards = document.createElement( 'img' ); // creo una imagen el DOM
    imgCards.src = `assets/cartas/${ valorCarta }.png`;

    imgCards.classList.add( 'cards' ); // LE AGREGO LA CLASE DEL ESTILO DEL CSS

    boxCartas[ numberJugador ].append( imgCards ); // inserto la imagen pero tengo que decirle que jugador es en el html!!

  }


  const highPoint = (pointsPlayers) => {
    let max = Math.max(...pointsPlayers)
    return max ;
  }

  // ************ Funcion turno computadora ******** //
  /**
   * 
   * @param { Number } maxPointPlayers 
   * @returns block
   */
  const turnoCpu = ( maxPointPlayers ) => {

    console.log({ maxPointPlayers });
      
    let pointCpu = 0;

    bloqueoBtn( true ) ; // BLOQUEO BOTONOES PEDIR CARTA/STOP
    

    do {
      const cartas = cards;
      pointCpu     =  puntosJugadores(cartas, playerCPU );

      if ( maxPointPlayers > 21 ) break;
     
    } while ( pointCpu <= maxPointPlayers ){

      setTimeout(() => {

        if ( pointCpu > 21){

          alert( '🎉​🎉 🏆​​ ERES UN CAMPEON GANASTE 🏆​ ✅​✅​' )

        } else if ( pointCpu > maxPointPlayers ){

          alert ('🖥️​🖥️​🖥️ Perdiste Gano la computadora jajajajajaj 💢​💢​');
          btnStop.disabled = true;
        
        }

        if ( pointCpu === 21 && maxPointPlayers === 21 ){
          alert( `Hay un Empate CPU: ${pointCpu} y Jugador: ${maxPointPlayers}` )
        }

      }, 200);
      
    }

    return

  };



  //* bloqueo de botonones
  const bloqueoBtn = ( activacion ) => ( btnStop.disabled = activacion, btnPedir.disabled = activacion ); //


  //******** Eventos con los botonos****************//
  
  // Boton Pedir carta del usuario 
  btnPedir.addEventListener('click', () => {
      
    const cartas  = cards;
    let pointUser = puntosJugadores( cartas, turnPlayer );
     
    setTimeout(() => {
            
      if (pointUser > 21){

        alert('​🚨🚨🚨 GAME OVER 🚨​🚨​🚨​ ');

        bloqueoBtn(true);
    
        turnoCpu(pointUser);
          
      }else if (pointUser === 21){

        alert( '🎊​🥇​🥇 VICTORY GAME 🥇​🥇​🎊');
        bloqueoBtn(true);
      
      }
    }, 200);

    
  });

  //***EVENTO CLICK BOTON  STOP, EL CUAL INICIA JUEGO COMPUTADORA***//
  btnStop.addEventListener( 'click', ()=>{

    turnPlayer++ // DISPARO EL TURNO DE JUGADOR;
    console.log({ turnPlayer, playerCPU });
 
    const maxpoint = highPoint(pointPlayers)

    if ( turnPlayer === playerCPU ) {
      turnoCpu(maxpoint);
    }
   
  } );

  btnNewGame.addEventListener('click', ()=>{
    console.clear();

    // FIXME: REVISAR VALIDACIONES numbJugadores 
    let numbJugadores ;
    try {

      if (isNaN(numbJugadores) ) throw new Error('Introduca un numero valido');
        
    } catch (error) {
      alert('introduzca un Numero de juegadores valido max 4 jugadores')
      console.warn(error);
    
    }finally{
      numbJugadores = parseInt(prompt('Numero de Jugadores'));
    }

    startGame(numbJugadores);
    console.log({pointPlayers}, {players});
    

  });

  return{
    NewGame   : startGame,
    lockButton: bloqueoBtn,
  }
})();
