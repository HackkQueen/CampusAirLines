
/*SECCION CLIENTE */


let cliente=document.querySelector('#cliente');
cliente.addEventListener('submit', (x)=>{
    //x es un paremetro que cuando se active el evento x se comvierte en x=submit  (x es el evento de submit)
    x.preventDefault(); //preventDefault es la prevencion del comportamiento por defecto que tiene ese evento (la pagina no recarga la pagina)
    let data=Object.fromEntries(new FormData(x.target)); //se trae los datos del formulario
    opc[x.submitter.dataset.accion](data) 
    // x.submitter ES EL BOTON QUE ACTIVA EL EVENTO 
    //x.submitter.dataset ES PARA MOSTRAR EL DATASET UTILIZADO CON EL NOMBRE QUE QUERAMOS AGREGARLE EJ (ACCION)
})

const opc={
    "POST":(data)=>postguardar(data)/*GUARDAR */ 
}
let config = {
    headers:new Headers({
        "Content-Type": "application/json"
    }), 
}; //son los datos de enlace para el json, el tipo de contenido que se va agregar es aplication json

const postguardar=async(data)=>{
    config.method="POST";
    config.body=JSON.stringify(data);
    let res=await (await fetch("http://localhost:4018/cliente", config)).json(); //los datos que se envian al servidor
}

//Buscador de clientes
const getClienteJson=async(search)=>{
    config.method="GET";
    config.body=JSON.stringify();
    let resCliente=await (await fetch(`http://localhost:4018/cliente?q=${search}`,config)).json();
    return resCliente
}

const getCliente= ()=>{
    let teclearCliente=document.querySelector('#ingresoBuscar');
    teclearCliente.addEventListener("keyup", async (e)=>{
        let valorInput = e.target.value;
        let arrayCliente = await getClienteJson(valorInput)//Estamos almacenando el conjunto de todos los clientes
        //El metodo filter nos permite filtrar los elementos de un array que cumplan con una condicion
        let ulCliente = document.querySelector("#ul-clientes");
        ulCliente.innerHTML = ""; //Se deja vacio en el dom para que se refresque y no se sobrecargue la lista ul del buscador
        if(valorInput.length != 0){
            arrayCliente.forEach(cliente => {
                let str = 
                `
                <li>
                    <p id="" onclick="eventClickCliente(${cliente.id},${cliente.numIdentClien}, '${cliente.nombreCliente}', ${cliente.apellidoCliente},'${cliente.ciudadOrigen}','${cliente.correoelectronico}',)"></p>
                </li>
                `;
                ulCliente.insertAdjacentHTML("beforeend", str)
            });
        }

    })
}

const eventClickCliente= (id, numIdentClien, nombreCliente, apellidoCliente, ciudadOrigen, correoelectronico )=>{
    let clienteSele = cliente.find(cliente.id == id)
    if (clienteSele == undefined) {
        cliente.push({id, numIdentClien, nombreCliente, apellidoCliente, ciudadOrigen, correoelectronico})
        let tbody = document.querySelector("#tableClientes-tbody");
        tbody.insertAdjacentHTML("beforeend", str)
    }
    
}


const getlistar=async()=>{
    config.method="GET";
    config.body=JSON.stringify();
    let resClientes=await (await fetch("http://localhost:4018/cliente", config)).json();
    tableClientes(resClientes)
}
const tableClientes = (resClientes) => {
    let tableClientes = document.querySelector("#tableClientes tbody")
    tableClientes.innerHTML=""
    for (let index in resClientes){
        let mensaje = resClientes[index].numIdentClien,   id=resClientes[index].id,  nombre=resClientes[index].nombreCliente, apellido= resClientes[index].apellidoCliente, ciudad= resClientes[index]. ciudadOrigen, correo= resClientes[index]. correoelectronico
        let str = 
        `
        <tr id="tr-${id}">
            <th>
                
            <button id="btnCliente-${id}" onclick="funcionEliminar(this)">x</button>
                
            </th>
            <th>
                <p>${mensaje}</p>
            </th>
            <th>
                <p>${nombre}</p>
            </th>
            <th>
                <p>${apellido}</p>
            </th>
            <th>
                <p>${ciudad}</p>
            </th>
            <th>
                <p>${correo}</p>
            </th>
        </tr>
        `;
        tableClientes.insertAdjacentHTML("beforeend", str)
    }
}

const funcionEliminar=async(x)=>{
    config.method="DELETE";
            console.log(x)
            let diferenciaeliminar=x.id.split("-")[0]
            let id=x.id.split("-")[1]
            let url
            if (diferenciaeliminar=="btnCliente"){
                url=`http://localhost:4018/cliente/${id}`
            }
    await fetch(url,config)//borrar en el json
    getlistar()//despues de borrar vuelve a listar (para que se muestre sin el dato eliminado)
}

getlistar() //vuelve a listar todos los datos y que actualice al incio

