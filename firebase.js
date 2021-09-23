import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js'
import { getFirestore, addDoc, collection, doc, onSnapshot, query } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js'


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

window.addTodo = (event) => {
  event.preventDefault()
  todo = document.getElementById('create-todo-input')
  addDoc(collection(db, 'items-list'), {
    status: "active",
    text: todo.value
  })
  todo.value = ""
}

function getItems() {
  const q = query(collection(db, 'items-list'))
  let items = []
  const allDocs = onSnapshot(q, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data()   //spread syntax
      })
    })
    generateItems(items)
  })
}

function generateItems(items) {
  let itemHTML = ""

  items.forEach((item) => {
    itemHTML += `
      <div class="todo-item">
          <div class="check">
                <div class="check-mark">
                    <img src="./assets/icon-check.svg" alt="">
                </div>
          </div>
          <div class="todo-text">
                ${item.text}
          </div>
      </div>
`
  })
  document.querySelector('.todo-items').innerHTML = itemHTML
}

getItems()