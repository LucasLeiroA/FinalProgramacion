 window.onload=principal;

import { getItems } from "../firebase.js";

function principal(){
    document.getElementById("btn_admin").addEventListener("click",ingresoAdmin)
}
var id_user = localStorage.getItem('id');

let url = window.location.href;

localStorage.setItem("urlAdmin" , url);



 

async function ingresoAdmin(){

    const usuarios = await getItems(`user/${id_user}/usuarios`);




    let input_usuario = document.getElementById("nombre_admin").value;
    let input_password = document.getElementById("contrasena_admin").value;
    for (const item of usuarios) {
    if (item.id == "2") {
      if((item.correoAdmin == input_usuario || item.usernameAdmin == input_usuario) && item.passwordAdmin == input_password){
        swal({
          title: "Acceso Permitido!",
          icon: "success",
        });
           window.location="./RegistrarStock.html";
      }else{
          
        swal({
          title: "Usuario o Contraseña Incorrectos",
          icon: "error",
        })
        let input_usuario = document.getElementById("nombre_admin").value="";
      let input_password = document.getElementById("contrasena_admin").value="";
      }
    }
   
  }


}