window.onload = principal;

import {getItems} from "./firebase.js"


function principal() {
  document
    .getElementById("btn_incio")
    .addEventListener("click", loginFormulario);
    document
    .getElementById("registrar")
    .addEventListener("click", registro);
}



let url = window.location.href;

localStorage.setItem("urlInicio", url);
function registro(){
  window.location = "./RegistrarUsuario/registrarUsuario.html"
}
async function loginFormulario() {
  
  const usuarios = await getItems("user");

  //constantes donde se guardos los datos del usuario


  let usuario = document.getElementById("input_usuario").value;
  let contrasena = document.getElementById("input_contrasena").value;

  try {
  for (const item of usuarios) {
    if((item.correoUser == usuario || item.usernameUser == usuario) && item.passwordUser == contrasena){
      swal({
        title: "Acceso Permitido!",
        icon: "success",
      });
      localStorage.setItem('id', item.id);
      
      window.location = "./PantallaInicial/principal.html"
    }else {
      swal({
        title: "Usuario o Contraseña Incorrectos!",
        icon: "error",
      });
      
    }

  }} catch (err) {
    alert(err);
  }



}



