import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js'
import { getFirestore, addDoc, collection, doc, onSnapshot, query, updateDoc, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js'


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
  const allDocs = onSnapshot(q, (querySnapshot) => {
  let items = []
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
                <div data-id="${item.id}" class="check-mark ${item.status == "Completed" ? "checked" : ""}">
                    <img src="./assets/icon-check.svg" alt="">
                </div>
          </div>
          <div class="todo-text ${item.status == "Completed" ? "checked" : ""}">
                ${item.text}
          </div>
      </div>
`
  })
  document.querySelector('.todo-items').innerHTML = itemHTML
  createEventListeners()
}

function createEventListeners() {
  let todoCheckMarks = document.querySelectorAll('.todo-item .check-mark')
  todoCheckMarks.forEach((checkMark) => {
    checkMark.addEventListener('click', () => {
      markCompleted(checkMark.dataset.id)
    })
  })
}

async function markCompleted(id) {
  const refDoc = doc(db, 'items-list', id)
  const snapDoc = await getDoc(refDoc)
  
    if (snapDoc.data().status == 'active') {
      updateDoc(refDoc, {
        status: 'Completed'
      })
    }
    else if (snapDoc.data().status == 'Completed') {
      updateDoc(refDoc, {
        status: 'active'
      })
    }
  }

getItems()