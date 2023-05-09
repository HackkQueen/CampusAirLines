let empleado=document.querySelector('#empleado');
empleado.addEventListener('submit', (x)=>{
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
    let res=await (await fetch("http://localhost:4020/empleado", config)).json(); //los datos que se envian al servidor
    getlistar();
}