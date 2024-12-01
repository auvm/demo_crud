// Selecciona los elementos del HTML por su ID y los guarda en una variable para luego usarlos

//elementos del pedido
var btn_enviar = document.getElementById("btn_enviar");
var txt_cliente = document.getElementById("txt_cliente");
var cbox_tacos = document.getElementById("cbox_tacos");
var cbox_tortas = document.getElementById("cbox_tortas");

//tabla con la lista de pedidos
var tabla_pedidos = document.getElementById("tabla_pedidos");

//elementos para eliminar 
var txt_eliminar = document.getElementById("txt_eliminar");
var btn_eliminar = document.getElementById("btn_eliminar");

//elementos para actualizar
var txt_actualizar = document.getElementById("txt_actualizar");
var btn_actualizar = document.getElementById("btn_actualizar");

/*Creo una clase, para construir objetos tipo "Pedido" con los valores
de los inputs. Esos objetos son lo que guardaré en la lista de pedidos*/ 
class Pedido {
    constructor(num_pedido, nom_cliente, tipo_orden, fecha, total_a_pagar){
        this.num_pedido = num_pedido;
        this.nom_cliente = nom_cliente;
        this.tipo_orden = tipo_orden;
        this.fecha = fecha;
        this.total_a_pagar = total_a_pagar;
    }
}

//contador interno provisional para tener un conteo de los pedidos
let num_interno_de_orden = 1;

//arreglo que almacena los pedidos
var lista_de_pedidos = [];


//------------------- SECCIÓN DE EVENTOS ----------------------
// Añade un evento de clic al botón de enviar
btn_enviar.addEventListener("click", function() {
    guardar_pedido();//llama a la función 
});
// Añade un evento de clic al botón de eliminar
btn_eliminar.addEventListener("click", function(){
    eliminar_pedido();//llama a la función 
});
// Añade un evento de clic al botón de actualizar
btn_actualizar.addEventListener("click", function(){
    actualizar_pedido();//llama a la función 
});


//------------------- SECCIÓN DE FUNCIONES ----------------------
//función que lee los input y los guarda en el arreglo "lista_de_pedidos"
function guardar_pedido(){
    //de manera provisional uso ésta condicional para leer cuál checkbox está activo
    var tipo_orden = cbox_tacos.checked ? "Tacos" : "Tortas"; 

    /*ahora asgino como un nuevo registro en la lista, 
    un nuevo objeto, con datos provionales como en número_interno_de_orden,
    el nombre del cliente, el tipo de orden leida del checkbox, la fecha del momento,
    y un "precio" hardcodeado (que podría provenir de otro input)*/
    lista_de_pedidos[num_interno_de_orden] = new Pedido(num_interno_de_orden,
                                txt_cliente.value,
                                tipo_orden,
                                new Date,
                                "299");
    
    num_interno_de_orden++;//aumenta el contador interno provisional del número de orden
    mostrar_pedidos();//actualiza la tabla, para mostrar los pedidos actuales
}

/*función que lee la lista_de_pedidos y la pasa tabla HTML
 para que se vean todos los pedidos guardados*/
 function mostrar_pedidos(){
    var cadena_pedido = tabla_pedidos.innerHTML; //lee el estado actual de la tabla
    cadena_pedido = `<tr>
                <th>Número de pedido</th>
                <th>Cliente</th>
                <th>Tipo de orden</th>
                <th>Fecha de pedido</th>
                <th>Total a pagar</th>
            </tr>`; //asignación para mantener la cabecera de la tabla

    lista_de_pedidos.forEach(element => { //por cada elemento en la lista de pedidos, va a ir añadiendo filas de la tabla, pero con los datos de cada uno de los objetos en la lista de pedidos.
            cadena_pedido += `
            <tr>
                <td>${element.num_pedido}</td>
                <td>${element.nom_cliente}</td>
                <td>${element.tipo_orden}</td>
                <td>${element.fecha}</td>
                <td>${element.total_a_pagar}</td>
            </tr>`;
    });

    //convierte la cadena al HTML de la tabla
    tabla_pedidos.innerHTML = cadena_pedido;
    

 }


/*Esta función lee el número de pedido a eliminar y la borra 
 del arreglo "lista_de_pedidos"*/
 function eliminar_pedido(){
    var indice = txt_eliminar.value; //lee el índice a eliminar
    delete lista_de_pedidos[indice]; //lo borra
    mostrar_pedidos();//actualiza la tabla, para mostrar los pedidos actuales
 }


/*Similar a la función anterior, lee el número a actulizar y toma
 los valores de los inputs actuales, para luego reemplazar el objeto
 en el arreglo (por así decirlo, solo es para usar un número de pedido
 que ya existe).*/
 function actualizar_pedido(){
    var indice = txt_actualizar.value; //lee el indice a actulizar

    var tipo_orden = cbox_tacos.checked ? "Tacos" : "Tortas";//nuevamente de manera provisional lee los checkbox
    lista_de_pedidos[indice] = new Pedido(indice,
                                txt_cliente.value,
                                tipo_orden,
                                new Date,
                                "299");//termina reemplazando los datos viejos con los valores actuales de los input
    mostrar_pedidos();//actualiza la tabla, para mostrar los pedidos actuales

 }