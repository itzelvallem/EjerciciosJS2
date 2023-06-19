//JavaScript sincrono
console.log("Inicia sincrono");
function doSync(){
    console.log("Se ejecuta la funcion dos");
}

function unoSync(){
    console.log("Se ejecuta la funcion uno");
    doSync();
    console.log("Se ejecuta el codigo tres");
}

unoSync();
console.log("Fin de SIncrono");

/*

Ejemplos de tareas sincronas

- Ciclos
- Invocaciones a funciones
- EventListener (especificamente cuando necesito el click)
- Condicionales y todo lo que tenga que ver con toma de decisiones
- Prompts y alerts


*/

//JavaScript asincrono
console.log("inicio de Asincrono");

function dosAsync(){
    setTimeout(function(){
        console.log("Dos");
    }, 5000); //tiempo es en milisegundos
}

function unoAsync(){
    dosAsync();
    console.log("Tres");
}

unoAsync();
console.log("Fin de Asincrono");

/*

Ejemplos de tareas asincronas

- Funcion setTimeout
- Notificaciones de cierre de sesion en apps bancarias
- Spotify  con su cola de reproduccion
- Conexiones a servidor
- Cargas de APIs

*/

/*

Ya que tendeemos que la asincronia nos servira para conectarnos a un servidor, y que sin importar la respuesta que este nos de (exitosa o no), o incluso el tiempo que tarde en responder (milisengundos o segundos), es necesario saber que hay varios mecanismos para maneras operaciones asincronas en JS-

    - Callbacks (llamadas de vuelta): La forma mas clasica de gestionar la asincronia
    - Promises (promesas): forma moderna
    - Async/Await: forma moderna con una sintaxis mas ligera

*/

/*

Que es un callback (llamada de vuelta)

Un callback es una funcion que se pasa como argumento a otra funcion. Esta funcion se ejecutara despues de que otra lo haga. Este mecanismo nos ayuda a controlar que cierto codigo no se ejecute antes de que el otro termine.

Para que las necesitamos?
Sabemos que JS trabaj de forma descendete, entonces habra casos que queramos hacer que un codigo se ejecute despues de que ocurra otra cosa, y tambien de forma no secuencial.

*/

// function hazClick(){
//     console.log("Le hiciste click al boton");
// }

// const boton = document.getElementById("boton");
// boton.addEventListener("click", hazClick);

//Ejemplo de Callback

//Defino una funcion que toma un numero y un callback(funcion) como parametros

//Creamos una funcion llamada dobleNumero, que toma un numero y un callback como argumentos (el callback es una funcion)
function dobleNumero(num,callback){
    const resultado = num * 2; //operacion comun y corriente
    callback(resultado); // invocacion de ese callback con e lresultado como parametro
}

//Definir una funcion para mostrar el resultado 
function mostrarResultado(resultado){
    console.log("El resultado es: ", resultado);
}

dobleNumero(5, mostrarResultado);

/*

Promises (promesas)

Son otro mecanismo para manejar la asincronia. Utilizar promesas hace que el codigo sea mas legible y practica que el usar callbacks, y como su nombre lo indica una promesa es algo que en un principio no sabemos si  se va a cumplir, pero en el futuro pueden pasar varias cosas. La gran ventaja de utilizar promesas es que evitamos anidar muchas funciones, y usamos una sola funcion (metodo) para manejar callbacks

promise.then

promisa.catch

Las promesas tienen estados

    - Pendiente (pending): Es el estado inicial de nuestra promesa, qui aun no tenemos resultado

    - Fullfilled: Cuando la operacion asincrona se completo con exito (resolve)

    - Rejected (rechazo): Cuando la operacion falla (reject)

Tambien las promesas, al ser un objeto, tiene metodos

    - then (function resolve): Ejecuta un callback llamado resolve

    - catch(function reject): Ejecuta un callback llamado reject cuando la promesa se rechaza.

    - then (resolve reject): Puedo ejecutar las dos funciones en el mismo metodo then.

*/

//Creo una funcion llamada obtenerProductos para poder utilizar promesas y hacer la conexion a mi url para obtener datos
function obtenerProductos(){
    //cuando se ejecute la funcion, quiero que retorne un nuevo objeto del tipo promesa
    //Especifico que este objeto promise tiene dos funciones: una cuando se resuelve, y otra cuando se rechaza
    return new Promise(function(resolve, reject){ //el objeto maneja dos funciones (resuelto, rechazo)
        fetch ('https://fakestoreapi.com/products') //direccion a donde me voy a conectar y buscar
        .then(function(response){ //espero respuestas...
            if (response.ok){ //propiedad booleana (si o no hay respuesta)
                return response.json();//metodo para convertir la respuesta a un objeto .json
            }else{ //si no...
                throw new Error("Error al obtener los productos. Error 404! Servidor no encontrado"); //lanzo un nuevo error (404)
            }
        })
        .then(function(data){ //Si hay una respuesta, resuelvo la promesa (exitosa) y ya tengo mis datos para despues jugar con ellos
            resolve(data);
        })
        .catch(function(error){ //Si no hay una respuesta, resulvo con un rechazo.
            reject(error);
        });
    });
};

// Uso de la promesa

obtenerProductos()
    .then(function(resultado){
    console.log(resultado);
})

    .catch(function(error){
    console.log(error);
});

//Otro ejemplo de promesa para validar un nombre. Si el nombre que estoy evaluando coincide con un valor ya guardado previamente, entonces la promesa  se resuelve correctamente. Si no, la promesa se rechaza y me muestra mensaje de error.

let nombre = "Felipe";

//que el objeto promesa tiene dos posibles soluciones
const promesaNombre = new Promise(function(resolve, reject){
    if(nombre !== "Felipe"){
        reject("Error, el nombre no es Felipe");
    }else{
        resolve()
    }
});

console.log(promesaNombre); 

/*Ejemplo de la PokeApi

Necesito

    - URL
    - Promise  (Con dos posible caminos rechazo y resolucion)
        - Si se resuelve me traigo los datos de la api
        - Si no, nuestro error
        
*/

const obtenerPokemon = new Promise((resolve, reject) =>{
    fetch('https://pokeapi.co/api/v2/pokemon/mudkip') //me conecto y busco
    .then(respuesta =>{ //cuando se conecte...
        if(respuesta.ok){ //si la conexion es ok
            return respuesta.json(); //guardo el dato en .json
        } else { // si no me conecto---
            throw new Error("Error 404"); //muestra un error 
        }
    })

    //Segundo bloque (cuando ya me conecte al servidor)
    .then(datos =>{
        resolve(datos);
    })

    //tercer bloque (solo en caso de que no se encuentre informacion)
    .catch(error =>{
        reject("Mensaje de error, no encontramos tu pokemon" + error);
    });
});

//Ya que le dij el emnsaje a mi mesero (creacion de la promesa), ahora voy a poder mostrar la informacion si la promesa se resuelve (encuentra la info), o si se rechaza (no encuentral a info)

obtenerPokemon
.then(pokemon =>{ //el valor pokemon = datos obtenidos del servidor en .json
    console.log("Pokemon obtenido", pokemon.name);
})

.catch(error =>{
    console.log(error);
})

/*

Fetch API

Es una interfaz en JS, que nos da un metodo llamado fetch, el cual nos permite manejar solicitudes HTTP (GET, POST, PUT, DELETE).

Cuando usamos fetch API sabemos que de forma implicita estamos usando promesas, tambien de forma implicita sabemos que esa promesa se puede resolver o rechazar 

El metodo fetch toma una URL como argumento y devuelve una promesa que se resuelve como un objeto llamado "response", que incluye la respues de la solicitud (a parte de decirnos que la conexion es ok, "pega" la informacion de lo que estamos consultando).

Ya que tenemos el objeto llamado "response", vamos a poder hacer un monton de cosas como acceder a la info, leer el contenido, verificandolo, etc.

*/

//Realizamos la peticion al servidor
fetch('https://pokeapi.co/api/v2/pokemon/mudkip')
    .then(pokeRespuesta =>{ //cuando la promesa se resuelve, ejecutamos esta funcion
        return pokeRespuesta.json(); //esta funcion retorna la pokeinfo en un .json
    })

    .then(pokeInfo =>{ //cuando la promesa de la conexion se resuelve, entonces ejecutamos esta otra funcion. Esta funcion guarda la informacion de la respuesta, y lo guarda en una variable llamada pokeInfo.
        console.log("El nombre del pokemon es: ", pokeInfo.name, " su numero de la pokedex es: ", pokeInfo.id);
    
    })

    .catch(pokeError =>{
        console.log("No encontramos nada de informacion", + pokeError)
    })

//Manipulacion del DOM + Fetch API

const input = document.getElementById("inputPokemon");
const button = document.getElementById("botonPokemon");
const pokemonContainer = document.querySelector("#pokemonContainer");

button.addEventListener("click", (e) => {
    e.preventDefault(); //prevenir que el navegador se actualice
    traerPokemon(input.value); //ejecuta la funcion traerPokemon
})

//Manipulacion del DOM + Fetch API

function traerPokemon(nombrePokemon){
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`)

    //guardo la respuesta en .json
    .then(respuesta => respuesta.json()) //Se resuelve la promesa

    //ese .json lo asigno a una variable llamda datos, que usare para alimentar una funcion llamada crearPokemon
    .then((datos) =>{
        crearPokemon(datos);
    });
}

function crearPokemon(nombrePokemon){
    const pokeImg = document.createElement("img"); //creo una etiqueta img
    pokeImg.src = nombrePokemon.sprites.front_default; //front_default es el nombre de la propiedad donde esta la imagen de mi pokemon
    const h2 = document.createElement("h2"); //creo una etiqueta h2
    h2.innerHTML = nombrePokemon.name; //le pongo el nombre del pokemon a ese h2
    const pokeDiv = document.createElement("div"); //crearmos un div para poner mi pokemon
    //Inserto los elementos imagen y h2 a un div particular de cada pokemon
    pokeDiv.appendChild(pokeImg);
    pokeDiv.appendChild(h2);
    //inserto ese div particular en un div general que estan en el html
    pokemonContainer.appendChild(pokeDiv);

}