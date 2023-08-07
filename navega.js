import {getItems} from "./firebase.js";

export function barra(){
    
    
    
    
    const nav = document.querySelector('nav');
    nav.innerHTML= `
    
    <ul id="contNav" class="nav-menu nav nav-tabs d-flex justify-content-end ">
       
            <li id="navList" class="nav-item">
                <a class="nav-link active" aria-current="page" href="../PantallaInicial/principal.html">Menu principal</a>
            </li>
            <li id="navList" class="nav-item">
                <a class="nav-link active" aria-current="page" href="../RegistrarStock/Admin.html">Registrar Stock</a>
            </li>
            <li id="navList" class="nav-item">
                <a class="nav-link active" aria-current="page" href="../Ventas/Ventas.html">Ventas</a>
            </li>
            <li id="navList" class="nav-item">
                <a class="nav-link active" aria-current="page" href="../AnulacionVentas/anulacion.html">Anulacion de Ventas</a>
            </li>
            <li id="navList" class="nav-item">
                <a class="nav-link active" aria-current="page" href="../MovimientosCaja/movimientos.html">Movimientos de Caja</a>
            </li>
            <li id="navList" class="nav-item">
                <a class="nav-link active" aria-current="page" href="../RegistarClientes/registrarClientes.html">Registrar Clientes</a>
            </li>
            <li id="navList" class="nav-item">
                <a class="nav-link active" aria-current="page" href="../CobranzaCuentaCorriente/cobranza.html">Cobranza CuentaCorriente</a>
            </li>
            <li id="navList" class="nav-item">
                <a class="nav-link active" aria-current="page" href="../ReportesMultiples/reportes.html">Reportes Multiples</a>
            </li>
        
     </ul>
               <div id="iconToggle">
                <li class="nav-item">
                    <button id="toogle"><i class="fas fa-bars"></i></button>
                    </li>
                <li class="nav-item">
                        <button id="btn-sesion"> <i id="icono"class="fas fa-user"></i></button> 
                </li>
                
               </div>
                    
              
                 <div id="datos-sesion">
                          <button id="btn-cerrar-ventana"><i class="fas fa-rectangle-xmark"></i></button>
             
                        <div id="nombre-correo">  

                            <h2>Datos del Usuario <i class="fas fa-user"></i></h2>
                              
                            <h2 id="nombre-sesion"></h2>
                            <h2 id="correo-sesion"></h2>

                        </div>

                        <div id="contenedor-btn-cerrar">
                            <button id="btn-cerrar-sesion">Cerrar Sesion</button>
                        </div>

                 </div>
    `;
   
  }

export  function pasa(){

   document.getElementById("btn-sesion").addEventListener("click",verSesion)
    document.getElementById("btn-cerrar-ventana").addEventListener("click",cerrarVentana)
    document.getElementById("btn-cerrar-sesion").addEventListener("click",cerrarSesion)
    document.getElementById("toogle").addEventListener("click",menuToogle)    
    
    
    var id_user = localStorage.getItem('id');
    
    
    async function verSesion(){
        
        let users = await getItems("user");
        let correo;
        let username;
        for (const item of users) {
            if (item.id == id_user) {
                correo = item.correoUser;
                username = item.usernameUser;
            }
        }
        
        
        document.getElementById("datos-sesion").style.display = "block";
        document.getElementById("nombre-sesion").innerHTML=username;
        document.getElementById("correo-sesion").innerHTML=correo;
        
    }
    
    function cerrarVentana(){
        document.getElementById("datos-sesion").style.display = "none";
    }

    function cerrarSesion(){
        localStorage.removeItem("id");
        window.location="../index.html";
    }

    function menuToogle(){
        console.log("gola");
        const navMenu = document.querySelector(".nav-menu"); 
                
        navMenu.classList.toggle("nav-menu_visible");
                
    }
  

}