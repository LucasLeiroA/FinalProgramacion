window.onload = principal;

import { getItems, crearDb, prueba, IngresarDatos } from "../firebase.js";

function principal() {
  document
    .getElementById("btn_aceptar")
    .addEventListener("click", crearUsuario);
}

async function crearUsuario() {
  const btnAceptar = document.getElementById("btn_aceptar");
  // btnAceptar.style.display="none";
  console.log("gola");

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
  var creacion = false;
  let nuevoUsuario = {
    correoUser: correo_user1,
    passwordUser: password_user1,
    usernameUser: username1,
  };
  if (
    correo_user1 !== "" &&
    correo_user2 !== "" &&
    password_user1 !== "" &&
    password_user2 !== "" &&
    correo_admin1 !== "" &&
    correo_admin2 !== "" &&
    password_admin1 !== "" &&
    password_admin2 !== "" &&
    username1 !== "" &&
    admin_name !== ""
  ) {

    if (correo_user1 === correo_user2) {
      if (password_user1 === password_user2) {
        if (correo_admin1 === correo_admin2) {
          if (password_admin1 === password_admin2) {
           
            let user = await getItems("user");

            for (const item of user) {
              if (correo_user1 !== item.correoUser) {
                if (username1 !== item.usernameUser) {
                  await crearDb("user", nuevoUsuario).then(
                    console.log("usuario agregado")
                  );
                  creacion = true;
                } else {
                  alert("el nombre de usuario ya fue ultilizado");
                 break;
                }
              } else {
                alert("el correo de usuario ya fue utilizado");
                break;
              }
            }

            if (creacion == true) {
              try {
                let id_user_creado = localStorage.getItem("idCreacion");
                console.log(id_user_creado);

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
                await IngresarDatos(`user/${id_user_creado}/articulo`, {
                  PrecioCompra: "1",
                  PrecioVenta: "2",
                  cantidad: 3,
                  categoriaId: "2",
                  nombre: "test",
                }).then(console.log("articulo agregado"));
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

                swal({
                  icon: "success",
                  title: "Usuario creado correctamente",
                  timer: 1500,
                });
                document.getElementById("correo_user1").value = "";
                document.getElementById("correo_user2").value = "";
                document.getElementById("password_user1").value = "";
                document.getElementById("password_user2").value = "";
                document.getElementById("username1").value = "";
                document.getElementById("correo_admin1").value = "";
                document.getElementById("correo_admin2").value = "";
                document.getElementById("password_admin1").value = "";
                document.getElementById("password_admin2").value = "";
                document.getElementById("admin_name").value = "";
              } catch (error) {
                console.log(error);
              }
            }

            // el probnlema esta en que no podemos tener una creacion compl/eta cpor un problema en la id de la sentencia de arriba
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
  } else {
    console.log("debe cargar todos los campos");
  }
}
