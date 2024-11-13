// adding configuration
const firebaseConfig = {
    apiKey: "AIzaSyAGzEJQdCUwX8MXZ91_SEWHOV20cIWsc1A",
    authDomain: "todo-db434.firebaseapp.com",
    databaseURL: "https://todo-db434-default-rtdb.firebaseio.com",
    projectId: "todo-db434",
    storageBucket: "todo-db434.firebasestorage.app",
    messagingSenderId: "638072884711",
    appId: "1:638072884711:web:e134f40d761809b8210142"
  };
 
 // Initialize Firebase
 var app = firebase.initializeApp(firebaseConfig);
 
 firebase.database().ref('todo-Items').on('child_added', function (data) {
    var liElement = document.createElement("li");
    var listText = document.createTextNode(data.val().value);
    liElement.appendChild(listText);
    liElement.setAttribute("class", "list")
 
    var delbtn = document.createElement("button");
    var delbtnText = document.createTextNode("Delete");
    delbtn.appendChild(delbtnText);
    var firebaseId = data.key;
    delbtn.setAttribute("id", firebaseId);
    delbtn.setAttribute("onclick", "del(this)");
    delbtn.setAttribute("class", "btn3")
    liElement.appendChild(delbtn)
 
    var editbtn = document.createElement("button");
    var editbtnText = document.createTextNode("Edit");
    editbtn.appendChild(editbtnText);
    editbtn.setAttribute("id", firebaseId);
    editbtn.setAttribute("onclick", "edit(this)");
    editbtn.setAttribute("class", "btn4")
    liElement.appendChild(editbtn);
 
    var ulList = document.getElementById("unorderList");
    ulList.appendChild(liElement);
    input.value = ""
 })
 
 function add() {
    var input = document.getElementById("input");
 
    var todoObj = {
       value: input.value
    }
 
    var newItemRef = firebase.database().ref('todo-Items').push(todoObj);
    var firebaseId = newItemRef.key;
 }
 
 function deleteAll() {
    var ulList = document.getElementById("unorderList");
    firebase.database().ref('todo-Items').remove()
    ulList.innerHTML = ""
 }
 
 function del(list) {
    firebase.database().ref('todo-Items').child(list.id).remove()
    list.parentNode.remove()
 }
 
 function edit(Edit) {
    var userInput = prompt("Enter The Text you want to Edit.");
    var editObj = {
       value : userInput
    }
    firebase.database().ref('todo-Items').child(Edit.id).set(editObj)
    Edit.parentNode.firstChild.nodeValue = userInput   
 }
 