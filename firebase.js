import {initializeApp} from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js'
import {getFirestore, collection, addDoc} from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js'
const firebaseConfig = {
  apiKey: "AIzaSyAdPf4lB-kLarNpch0FOymdPyO27ErtPtI",
  authDomain: "todo-list-adeca.firebaseapp.com",
  projectId: "todo-list-adeca",
  storageBucket: "todo-list-adeca.appspot.com",
  messagingSenderId: "321161769762",
  appId: "1:321161769762:web:cc6e522581c4f56f026b7b",
  measurementId: "G-9W0HWQVTNJ"
};

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)

const itemList = collection(db, "items-list")

window.addTodo = async (event) => {
  event.preventDefault()
  let todo = document.getElementById('create-todo-input').value;
    
  const docPosted = await addDoc(itemList, {
        status : "active",
        todo
    })

  console.log({docPosted})
}