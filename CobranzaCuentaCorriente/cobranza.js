window.onload=principal;

import { getItems, IngresarDatos, modificarItem } from "../firebase.js";
import {barra,pasa} from "../navega.js"
barra();
pasa();
var id_user = localStorage.getItem('id');
function principal(){
    document.getElementById("btnpagar").addEventListener("click", pagaoDeuda)
    document.getElementById("btn-buscador").addEventListener("click",filtroCliente)
    document.getElementById("btn-detalle").addEventListener("click" ,detalleCliente)
    document.getElementById("btn-volver").addEventListener("click",volver)
}
var var_id;

const fecha = new Date();
var day = fecha.getDate()
var month = 1 + fecha.getMonth();
var years = fecha.getFullYear();
var now = fecha.toLocaleTimeString('en-US');


const cuerpoTabla = document.getElementById("cuerpoTabla");

window.addEventListener("DOMContentLoaded",async (e) => {
    document.getElementById("cuerpoTabla").innerHTML="";
   let cuentaCorriente = await getItems("user/"+id_user+"/cuentaCorriente");
   let cliente=await getItems("user/"+id_user+"/clientes");

   for (let item2 of cuentaCorriente) {
       for (let item of cliente) {
            if (item2.clientesId==item.id && item2.deuda > 0) {
            document.getElementById("cuerpoTabla").innerHTML+=
            `
            <td><button id="btn-seleccionar" class="btn btn-outline-dark" data-id="${item.id}"">${item.nomYape}</button></td><br>
            `
          }
   }
   }

   const btnsSeleccionar =
   cuerpoTabla.querySelectorAll("#btn-seleccionar");
 btnsSeleccionar.forEach((btn) =>
   btn.addEventListener("click", async (e) => {
     try {
       let id = e.target.dataset.id;

       var_id=id;

       let cli=await getItems("user/"+id_user+"/clientes");
       let cc=await getItems("user/"+id_user+"/cuentaCorriente");
       let deuda;
   
       for (let item of cc) {
           if (item.clientesId==var_id) {
           deuda=parseInt(item.deuda)       
           }
       }
   
       for (let item of cli) {
           if (item.id==var_id) {
               document.getElementById("inpu").value=item.nomYape;
               document.getElementById("inpu1").value=item.dni;
               document.getElementById("inpu2").value=item.direccion;
               document.getElementById("inpu3").value=deuda ;
           }
       }
   
     } catch (error) {
       console.log(error);
     }
   })
 );

  
 } )

async function filtroCliente(){
    document.getElementById("cuerpoTabla").innerHTML="";
   let cuentaCorriente = await getItems("user/"+id_user+"/cuentaCorriente");
   let cliente=await getItems("user/"+id_user+"/clientes");

    let nombreSolicitado = document.getElementById("input-buscador").value;
    let texto = nombreSolicitado.toLowerCase();
    let nombre;



   for (let item2 of cuentaCorriente) {
       for (let item of cliente) {
        nombre = item.nomYape.toLowerCase();
        if (nombre.indexOf(texto) != -1) {
            
            if (item2.clientesId==item.id && item2.deuda > 0) {
            document.getElementById("cuerpoTabla").innerHTML+=
            `
            <td><button id="btn-seleccionar" class="btn btn-outline-dark" data-id="${item.id}"">${item.nomYape}</button></td><br>
            `
          }
        }
   }
   }

   const btnsSeleccionar =
   cuerpoTabla.querySelectorAll("#btn-seleccionar");
 btnsSeleccionar.forEach((btn) =>
   btn.addEventListener("click", async (e) => {
     try {
       let id = e.target.dataset.id;

       var_id=id;

       let cli=await getItems("user/"+id_user+"/clientes");
       let cc=await getItems("user/"+id_user+"/cuentaCorriente");
       let deuda;
   
       for (let item of cc) {
           if (item.clientesId==var_id) {
           deuda=parseInt(item.deuda)       
           }
       }
   
       for (let item of cli) {
           if (item.id==var_id) {
               document.getElementById("inpu").value=item.nomYape;
               document.getElementById("inpu1").value=item.dni;
               document.getElementById("inpu2").value=item.direccion;
               document.getElementById("inpu3").value=deuda ;
           }
       }
   
     } catch (error) {
       console.log(error);
     }
   })
 );

}

async function pagaoDeuda(){
    try {
           let pago = parseInt(document.getElementById("inpu4").value);
           let cliente;
           let clienteId;
           let deuda;
           let idCuentaCorriente;
           let cc = await getItems("user/"+id_user+"/cuentaCorriente");

    for (let item of cc) {
        if (item.clientesId==var_id) {
            cliente=item.cliente;
            clienteId=item.clientesId;
            deuda=item.deuda;
           idCuentaCorriente=item.id;
        }
    }

    let nuevaDeuda=deuda-pago;
    if (deuda>=pago) {
         await modificarItem("user/"+id_user+"/cuentaCorriente" , idCuentaCorriente,{
        cliente:cliente ,
        clientesId:clienteId,
        deuda: nuevaDeuda
      },
    );

    await IngresarDatos("user/"+id_user+"/pagosCuentaCorriente",{
        clientesId:clienteId,
        pago:pago,
        dia:day,
        mes:month,
        ano:years,
        hora:now
    })

    let totalEfec;
    let final=0;
    let efec=await getItems("user/"+id_user+"/EstadoDeCaja");
    for (let item of efec) {
        if (item.id==1) {
            totalEfec=item.efectivo;
        }
    }
    final=parseInt(totalEfec)+pago;

    await modificarItem("user/"+id_user+"/EstadoDeCaja", "1" , {
        efectivo:final
    })

    let cc= await getItems("user/"+id_user+"/EstadoDeCaja");
    let valorcc;
    let finalCC=0;
    for (let item of cc) {
        if (item.id==2) {
            valorcc=item.ventasEnCuentaCorriente;
        }
    }
    finalCC=parseInt(valorcc)-pago;

    await modificarItem("user/"+id_user+"/EstadoDeCaja", "2" ,{
        ventasEnCuentaCorriente:finalCC
    })

    swal({
        title: "Pago Realizado Correctamente",
        icon: "success",
      });
      document.getElementById("inpu").value="";
      document.getElementById("inpu1").value="";
      document.getElementById("inpu2").value="";
      document.getElementById("inpu3").value="";
      document.getElementById("inpu4").value="";
    }else{
        swal({
            title: "No puede pagar mas de lo que debe",
            icon: "error",
          });
    }
   

    } catch (err) {
        swal({
            title: err,
            icon: "error",
          });
    }
 

}

async function detalleCliente(){
  document.getElementById("btn-volver").style.display="block"
  document.getElementById("cuerpoTabla").innerHTML="";
  document.getElementById("cuerpoTabla").innerHTML=`
  <tr id="cabeza-detalle">
  <th scope="col">Fecha</th>
  <th scope="col">Articulo</th>
  <th scope="col">Cantidad</th>
</tr>
  `
  let nombreCliente = document.getElementById("inpu").value;
  
  let idCliente;
  let clientes = await getItems("user/"+id_user+"/clientes");


  for (const item of clientes) {
    if(item.nomYape == nombreCliente){
      idCliente = item.id
    }
  }

  let ventas = await getItems("user/"+id_user+"/ventas")
  let articulos = await getItems("user/"+id_user+"/articulo")
  for (const item of ventas) {
          if (item.tipoVentaId == "2") {
            
                      if(item.clientesId == idCliente){
                        for (const item2 of articulos) {
                           if (item.articuloId == item2.id) {
                            
                             document.getElementById("cuerpoTabla").innerHTML+= `
                             <tr id="cuerpo-detalle">
                             <td>${item.dia}/${item.mes}/${item.ano}</td>
                             <td >${item2.nombre}</td>
                             <td >${item.cantidad}</td>
                           </tr>
                           
                           
                                 `
                                
                           }
                        }
                      }
          }
    }





}

function volver() {
  document.getElementById("cuerpoTabla").innerHTML="";
  location.reload()
}