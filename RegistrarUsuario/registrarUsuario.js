window.onload = principal;

import { getItems, crearDb, prueba } from "../firebase.js";

function principal() {
  document
    .getElementById("btn_aceptar")
    .addEventListener("click", crearUsuario);
}

async function crearUsuario() {

    const btnAceptar=document.getElementById("btn_aceptar");
    btnAceptar.disabled = true;
  let correo_user1 = document.getElementById("correo_user1").value;
  let correo_user2 = document.getElementById("correo_user2").value;
  let password_user1 = document.getElementById("password_user1").value;
  let password_user2 = document.getElementById("password_user2").value;
  let username1 = document.getElementById("username1").value;
  let correo_admin1 = document.getElementById("correo_admin1").value;
  let correo_admin2 = document.getElementById("correo_admin2").value;
  let password_admin1 = document.getElementById("password_admin1").value;
  let password_admin2 = document.getElementById("password_admin2").value;
  let admin_name = document.getElementById("admin_name").value;

  let nuevoUsuario = {
    correoUser: correo_user1,
    passwordUser: password_user1,
    usernameUser: username1,
  };

  if (correo_user1 == correo_user2) {
    if (password_user1 == password_user2) {
      if (correo_admin1 == correo_admin2) {
        if (password_admin1 == password_admin2) {
          let user = await getItems("user");
          for (const item of user) {
            if (item.correoUser != correo_user1) {
              if (item.usernameUser != username1) {
                try {
                  await crearDb("user", nuevoUsuario).then(
                    console.log("usuario agregado")
                  );
                  let id_user_creado = localStorage.getItem("idCreacion");
                  console.log(id_user_creado);
                  //await crearDb("user",foto).then(alert("usuario creado correctamente!!!"))
                  //let id_user_creado = localStorage.getItem('idCreacion');
                  await prueba(id_user_creado, "EstadoDeCaja", "1", {
                    efectivo: 0,
                  }).then(console.log("estad agregado"));
                  await prueba(id_user_creado, "EstadoDeCaja", "2", {
                    ventasEnCuentaCorriente: 0,
                  }).then(console.log("estad agregado"));
                  await prueba(id_user_creado, "EstadoDeCaja", "3", {
                    VentasTrasferencias: 0,
                  }).then(console.log("estado agregado"));
                  await prueba(id_user_creado, "categoria", "1", {
                    tipo: "comestibles",
                  }).then(console.log("cat agregado"));
                  await prueba(id_user_creado, "categoria", "2", {
                    tipo: "bebidas",
                  }).then(console.log("cat agregado"));
                  await prueba(id_user_creado, "categoria", "3", {
                    tipo: "cigarrillos",
                  }).then(console.log("cat agregado"));
                  await prueba(id_user_creado, "categoria", "4", {
                    tipo: "golosinas",
                  }).then(console.log("cat agregado"));
                  await prueba(id_user_creado, "articulo", "1", {}).then(
                    console.log("articulo agregado")
                  );
                  await prueba(id_user_creado, "clientes", "1", {}).then(
                    console.log("cliente creado")
                  );
                  await prueba(id_user_creado, "cuentaCorriente", "1", {}).then(
                    console.log("cuentaCorriente creado")
                  );
                  await prueba(id_user_creado, "estadoVenta", "1", {
                    estado: "habilitada",
                  }).then(console.log("estadoVEnta agregado"));
                  await prueba(id_user_creado, "estadoVenta", "2", {
                    estado: "anulada",
                  }).then(console.log("estadoVEnta agregado"));
                  await prueba(id_user_creado, "estadoCliente", "1", {
                    estado: "habilitado",
                  }).then(console.log("estadoCliente agregado"));
                  await prueba(id_user_creado, "estadoCliente", "2", {
                    estado: "inhabilitado",
                  }).then(console.log("estadoCliente agregado"));
                  await prueba(id_user_creado, "estadoCliente", "2", {
                    estado: "inhabilitado",
                  }).then(console.log("estadoCliente agregado"));
                  await prueba(id_user_creado, "ingresoDinero", "1", {}).then(
                    console.log("ingresoDInero agregado")
                  );
                  await prueba(
                    id_user_creado,
                    "pagosCuentaCorriente",
                    "1",
                    {}
                  ).then(console.log("pagosCuentaCorriente agregado"));
                  await prueba(id_user_creado, "tipoVenta", "1", {
                    tipo: "contado",
                  }).then(console.log("estadoVEnta agregado"));
                  await prueba(id_user_creado, "tipoVenta", "2", {
                    tipo: "cuentaCorriente",
                  }).then(console.log("estadoVEnta agregado"));
                  await prueba(id_user_creado, "tipoVenta", "3", {
                    tipo: "Trasferencia",
                  }).then(console.log("estadoVEnta agregado"));
                  await prueba(id_user_creado, "usuarios", "2", {
                    correoAdmin: correo_admin1,
                    passwordAdmin: password_admin1,
                    usernameAdmin: admin_name,
                  }).then(console.log("Admin agregado"));

                  alert("Usuario creado correctamente");
                  document.getElementById("correo_user1").innerHTML="";
                  document.getElementById("correo_user2").innerHTML="";
                  document.getElementById("password_user1").innerHTML="";
                  document.getElementById("password_user2").innerHTML="";
                  document.getElementById("username1").innerHTML="";
                  document.getElementById("correo_admin1").innerHTML="";
                  document.getElementById("correo_admin2").innerHTML="";
                  document.getElementById("password_admin1").innerHTML="";
                  document.getElementById("password_admin2").innerHTML="";
                  document.getElementById("admin_name").innerHTML="";
                  btnAceptar.disabled = false;

                  // el probnlema esta en que no podemos tener una creacion compl/eta cpor un problema en la id de la sentencia de arriba
                } catch (error) {
                  console.log(error);
                }
              } else {
                alert("el nombre de usuario ya fue utilizado");
              }
            } else {
              alert("el correo de usuario ya fue utilizado");
            }
          }
        } else {
          alert("las contraseñas del administrados tiene que ser iguales");
        }
      } else {
        alert("los correo del admin tiene que ser iguales");
      }
    } else {
      alert("la contraseña de el usuario no es la misma");
    }
  } else {
    alert("el correo del usuario no es el mismo");
  }
  btnAceptar.disabled = false;
}
