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
    let itemsActive = []
    let itemsCompleted = []
    let activeClass = document.querySelector('.active').innerHTML
    querySnapshot.forEach((doc) => {
      items.push({
        id: doc.id,
        ...doc.data()   //spread syntax
      })
      if (doc.data().status == 'Completed') {
        itemsCompleted.push({
          id: doc.id,
          ...doc.data()   //spread syntax
        })
      }
      else if (doc.data().status == 'active') {
        itemsActive.push({
          id: doc.id,
          ...doc.data()   //spread syntax
        })
      }

    })
    if (activeClass == 'All') {
      generateItems(items)
    }
    else if (activeClass == 'Active') {
      generateActiveItems(itemsActive)
    }
    else {
      generateCompletedItems(itemsCompleted)
    }
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

function generateActiveItems(itemsActive) {
  let itemHTML = ""

  itemsActive.forEach((item) => {
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
}

function generateCompletedItems(itemsCompleted) {
  let itemHTML = ""

  itemsCompleted.forEach((item) => {
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

let act = document.querySelector('.items-status .Act')
let comp = document.querySelector('.items-status .Comp')
let itemsStatus = document.querySelector('.items-status')
act.addEventListener('click', () => {
  itemsStatus.innerHTML = `
          <span class="all">All</span>
          <span class="Act active">Active</span>
          <span class="Comp">Completed</span>
`
console.log(itemsStatus)
getItems()
})

comp.addEventListener('click', () => {
  itemsStatus.innerHTML = `
          <span class="all">All</span>
          <span class="Act">Active</span>
          <span class="Comp active">Completed</span>
`
console.log(itemsStatus)
getItems()
})

