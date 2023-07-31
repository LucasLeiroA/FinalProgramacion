import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { setDoc,collection , addDoc , getFirestore , getDocs , deleteDoc , doc , updateDoc,query } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCek021AE5eQMkxET8zbhDWriSarCRB474",
    authDomain: "multibase-3bb61.firebaseapp.com",
    projectId: "multibase-3bb61",
    storageBucket: "multibase-3bb61.appspot.com",
    messagingSenderId: "557891763759",
    appId: "1:557891763759:web:b66deaab8178d6737c10da",
    measurementId: "G-27MYPBQ3DZ"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);


 // Aca se deben escribir todas las funciones para exportarlas


 // Funcion para traer los datos de la DB
  export async function getItems(coleccion) {

    const miCollecion = collection(db, `${coleccion}`);
    
    let respuesta = await getDocs(miCollecion);

    let dataDocs = respuesta.docs.map((documento) => {
      let docFormateado = { ...documento.data(), id: documento.id };
      return docFormateado;
    });

    return dataDocs;

  }

 //FUncion para ingresar datos a la base de datos

 export async function IngresarDatos(coleccion , oderData){
  
  const collectionRef = collection(db , `${coleccion}`);

  let respuesta = await addDoc(collectionRef,oderData);

  return respuesta.id;
}

export async function setiarDatos(id , subcolec,nombrecole,data){
  
  await setDoc(doc(db, `user/${id}/${subcolec}`, nombrecole), {
    data
});
}

export async function crearDb(coleccion , oderData){
  
  const collectionRef = collection(db , `${coleccion}`);
  
  let respuesta = await addDoc(collectionRef,oderData);
  

  return localStorage.setItem("idCreacion", respuesta.id);
}


  export async function prueba(id,nombre_colection,nombre_sub,data){

    const q = query(collection(db, "user"));
    const querySnapshot = await getDocs(q);
    const queryData = querySnapshot.docs.map((detail) => ({
        ...detail.data(),
        id: detail.id,
    }));

    queryData.map(async (v) => {
        await setDoc(doc(db, `user/${id}/${nombre_colection}`, nombre_sub), data);
    })
  }
  //Funcion para traer un solo item

  export async function getSingleItem(coleccion,id) {
    try {
      const docRef = doc(db, `${coleccion}`, id);
      const docSnapshot = await getDoc(docRef);
  
      const docFormateado = { ...docSnapshot.data(), id: docSnapshot.id };
      return docFormateado;
    } catch (error) {
      console.log(error);
    }
  }

  export async function getItemsByCategoty(coleccion , id){
    const collectionRef = collection(db,`${coleccion}`) ;
    const queryCategory = query(collectionRef , where("id" , "==" , id));

    const respuesta = await getDocs(queryCategory);
    
    let dataDocs = respuesta.docs.map((documento) => {
        let docFormateado = {...documento.data(), id: documento.id}
        return docFormateado;
    })


    return dataDocs;
}

export const deleteSingleItem = (coleccion , id) => deleteDoc(doc(db, `${coleccion}`, id));

export const modificarItem = (coleccion , id ,  nuevaData) =>

  updateDoc(doc(db, `${coleccion}` , id), nuevaData);