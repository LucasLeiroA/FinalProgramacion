

var fecha = new Date;
import {barra,pasa} from "../navega.js"
barra();
pasa();



function cierre(){
        axios.put("http://localhost:3001/login/" + 1, {
          logeado: false,
    });
}