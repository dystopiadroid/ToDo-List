import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js'
import { getFirestore, addDoc, collection } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js'


const firebaseConfig = {
  apiKey: "AIzaSyAdPf4lB-kLarNpch0FOymdPyO27ErtPtI",
  authDomain: "todo-list-adeca.firebaseapp.com",
  projectId: "todo-list-adeca",
  storageBucket: "todo-list-adeca.appspot.com",
  messagingSenderId: "321161769762",
  appId: "1:321161769762:web:cc6e522581c4f56f026b7b",
  measurementId: "G-9W0HWQVTNJ"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

let todo = document.getElementById('create-todo-input')
window.addTodo = async (event) => {
  event.preventDefault()
  todo = document.getElementById('create-todo-input')
  await addDoc(collection(db, 'items-list'), {
    status: "active",
    text: todo.value
  })
  todo.value = ""
}