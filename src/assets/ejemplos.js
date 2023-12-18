//EJMPLO CLOSURE (Los valores se encierran dentro del contexto lexicos)

function crearSaludo(saludo, nombre){
     let saludoTemp = saludo;
     return function(nombre) {
        console.log(saludoTemp+ ' ' +nombre);
     } 
}

let saludoGuardado = crearSaludo('Hola!');
saludoGuardado('Yonzina');

//ejmplo pregunta 1
function nivel1 () {
    var b = 2;
    var c = 4;
    function nivel2() {
        var b = 4;
        var c = 3;
        function nivel3() {
            console.log(a);
        }
        nivel3();
        console.log(b);
    }
    console.log(c);
    console.log(b);
    nivel2();
}
nivel1();


//Prototype- Funciones de Objeto
const Persona = function (nombre) {
    this.nombre = nombre;
}

Persona.prototype.decirNombre = function (params) {
    console.log('Mi nombre es: ', this.nombre);
}

const Persona1 = new Persona('Lincy');
Persona1.decirNombre();

const Persona2 = new Persona('Lucia');
Persona2.decirNombre();

// MAP Y WEAKMAP

const objetoMap = new Map();
objetoMap.set('un string', 'valor asociado a un string');
const miObjeto = {};
objetoMap.set(miObjeto, 'valor asociado a un objeto');
objetoMap.set(12, 'valor asociado a un numero');

for([key, value] of objetoMap){
console.log(value);
}

//-------- la diferencia principal entre weak y weakMap es que weakMap trabaja con objetos como keys
//---- los weakMaps ayudan a mejorar el espacio en memoria y tambien eliminan el valor si se elimina el key 

// --- [Symbol.iterator](){

//}

//DESTRUCTURACION
var libro = {
    titulo: "Fundacion",
    autor: "Achiccurt",
    genero: "Ciencia Ficcion",
    numeroPaginas: 225
};

var {titulo, autor, ...otros} = libro;
console.log(titulo, autor, otros);

//Concatenar arrays
const arr = [1,2,3,4];
const temp = [...arr, 5];
console.log(temp);

//PROXYS
// const target = function (nombre, apellido){
//    console.log(`Mi nombre es ${nombre} ${apellido}`);
// }

// const handler = {
//     apply: function(target, thisValue, args) {
//         console.log(`Se ha llamado la funcion ${target.name} con los parametros
//         ${args} `);
//         return target( ...args);
//     }
// }

// const miProxy_ = new Proxy(target, handler);
//    miProxy_('Natalia', 'Corea');

   //----
   const DateProxied = new Proxy(Date, {
    construct(target ,args){
        console.log(`Creamos un nuevo objeto Date`);
        return new target(...args)
    }
   });

   let fecha = new DateProxied();

   // --- another example
   const target = {
    titulo: "Fundacion",
    autor: "Issac Asimov",
    genero: "Ciencia Ficcion",
    numeroPaginas: 225
   }

   const handler_ = {
     get: function(target, prop, proxy){
    if (prop === 'numeroPaginas') {
        return `Tengo ${target[prop]} paginas`;
    }else{
        return prop;
    }
     },
     set(target, prop, value){
        if (prop === 'titulo' || prop == 'autor') {
            console.log(`No puedes modificar la propiedad ${prop}`);
        }else{
            target[prop] = value
        }
     }
   }

   const {proxy:miProxy, revoke} = Proxy.revocable(target, handler_)

   console.log(miProxy.titulo);
   console.log(miProxy.numeroPaginas);

   revoke();

   miProxy.titulo = 'Un titulo nuevo';


   //--- PROMESAS
   const promesa = new Promise((resolve, reject) =>{

    let allok = true;

    if (allok) {
        resolve('todo salio bien');
    }else{
        reject(new Error('hubo un error'));
    }
   });

   promesa.then(valor =>{
    console.log(valor);
   }, error => {
      console.log(error);
   });

   // ---
   const promesa_ = new Promise((resolve, reject)=>{
    setTimeout(resolve, 5000, 5);
   });

   promesa_.then(primerValor => {
    console.log('El primer valor es: ', primerValor);
     return primerValor * primerValor
   }).then(segundoValor => {
    console.log('El segundo valor es: ', segundoValor);
     return segundoValor * segundoValor;
   }).then(tercerValor => {
    console.log('El tercer valor es: ', tercerValor);
   }).catch(error =>{
      console.log(error);
   })

   // -- Promise.all
    const primerProceso = new Promise((resolve, reject) =>{
        setTimeout(resolve, 3000, 'primer valor');
    });
     
    const segundoProceso = new Promise((resolve, reject) =>{
        setTimeout(resolve, 500, 'segundo valor');
    });

    const tercerProceso = new Promise((resolve, reject) =>{
        setTimeout(resolve, 1000, 'tercer valor');
    });

    const listaPromesas = [primerProceso, segundoProceso, tercerProceso];

    Promise.all(listaPromesas).then(valores => {
        console.log(valores);
    }, error=>{
        console.log(error);
    })


    //-- Promise Race (toma en cuenta la peticion o promesa mas rapida en devolver la respuesta y esa promesa es la 
    //      retornara)
     
    Promise.race(listaPromesas).then(valor => {
        console.log(valor);
    },error =>{
        console.log(error);
    })

    // -- Promise Finally (no importa el resultado de la o las promesas, siempre va a mandar el resultado del procesos que se encuentre en la seccion finally, un error no va a impedir que se ejecute la seccion finally)


    // -- ASYNC


    // -- FUNCIONES PURAS
          // son aquellas las cuales no alteran el valor inicial y no lo anteran

   // -- COMPOSICION DE FUNCIONES:

    function estrella (str) { return str + '⭐'; }
    function feliz (str) { return str + '😇'; }
    function triste (str) { return str + '☹️'; }
    function reir (str) { return str + '🤣'; }
    function exclamacion (str) { return str + '! '; }

    console.log(reir(exclamacion('Eso fue gracioso')));

     function crearComposicion(f1, f2){
        return function(texto){
            return f1(f2(texto))
        }
     }
    

     const muyFeliz = crearComposicion(feliz, estrella);
      let frase1 = muyFeliz('Hoy es un buen dia');

      const muyTriste = crearComposicion(triste, exclamacion);
       let frase2 = muyTriste('Lo siento');

      const reirMucho = crearComposicion(reir, reir);
       let frase3 = reirMucho('LOL');

    console.log(frase1);
    console.log(frase2);
    console.log(frase3);


    // -- analizar ejemplo 
    function funcion1(mensaje1){
        return function(mensaje2){
            console.log(mensaje1 + funcion2(mensaje2));
        }
    }
    
    function funcion2(mensaje){
        return mensaje + 'd'
    }
    
    let funcion3 = funcion1('a');
    funcion3('b');
    funcion3('c');

    // -- COOKIES
    

