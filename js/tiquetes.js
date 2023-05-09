let modal = document.getElementById("modal-hunters");
let btn_hunters = document.getElementById("btn-hunters");
let btnClose = document.getElementById("btn-close-hunters");
btn_hunters.onclick = function() {
    modal.style.display = "block";
  }
  btnClose.onclick = function() {
    modal.style.display = "none";
  }
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}

let tiquetes=document.querySelector('#tiquetes');
tiquetes.addEventListener('submit', (x)=>{
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
    let res=await (await fetch("http://localhost:4020/tiquete", config)).json(); //los datos que se envian al servidor
}

const getlistar=async()=>{
    config.method="GET";
    config.body=JSON.stringify();//se esta pasando con la misma data pero dejandolo vacio entonces ya no se estaria pasando
    //resEgresos y resIngresos son arreglos de objetos
    let restiquetes=await (await fetch("http://localhost:4020/tiquete", config)).json();
    //console.log(resIngresos, resEgresos);
    //console.log(resEgresos[0].ingreso, resEgresos[0].valor);
    tableDom(restiquetes)
    let sumaValor1iva=calculoIva1(restiquetes)
    let sumaValor2iva=calculoIva2(restiquetes)
    vuelo(sumaValor1iva, sumaValor2iva)
}

const tableDom=(restiquetes)=>{
    let tbody=document.querySelector('#table-content');
    tbody.innerHTML="";
    res.forEach(tiquetes=>{
        let tr=`
        <tr>
            <td>${tiquetes.id}</td>
            <td>${tiquetes.numTiquete}</td>
            <td>${tiquetes.valorTiquete}</td>
            <td>${tiquetes.valorIva}</td>
            <td>${tiquetes.valorTotal}</td>
            <td>${tiquetes.fechaTiquete}</td>
            <td>${tiquetes.idCliente}</td>
            <td>${tiquetes.idVuelo}</td>
            <td>
                <button class="btn btn-warning" data-accion="PUT" onclick="editarTiquete(${tiquetes.id})">Editar</button>
                <button class="btn btn-danger" data-accion="DELETE" onclick="eliminarTiquete(${tiquetes.id})">Eliminar</button>
            </td>
        </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', tr);
    })
    console.log(tableDom);
}

const sumaValor1iva=(valor)=>{
    let iva1=valor*0.16;
    return iva1;
}
const sumaValor2iva=(valor)=>{
    let iva2=valor*0.05;
    return iva2;
}
