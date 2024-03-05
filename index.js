const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');


let editTodo = null;

//Function to add todo
const addTodo = ()=>{
    const inputText = inputBox.value.trim();
    if(inputText.lenght <= 0){
        alert('You must write something in your to do');
        return false;
    }

// Passing the original text to editLocalTodos function before edit it in the todoList
    if(addBtn.value === 'Edit'){
        editTodo.target.previousElementSibling.innerHTML = inputText;
        editLocalTodos(inputText);
        addBtn.value = 'Add';
        inputBox.value = '';
    }else{
        //Creating p tag
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.innerHTML = inputText;
        li.appendChild(p);

        
        //creating the edit button
        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.classList.add('btn','editBtn');
        li.appendChild(editBtn);
        
        //creating the remove button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add('btn','deleteBtn');
        li.appendChild(deleteBtn);


        todoList.appendChild(li);
        inputBox.value = '';

        saveLocalTodos(inputText);
    }
}


//Function to update : (Edete/Delete) todo
const updateTodo = (e)=>{
    //console.log(e.target.innerHTML);
    if(e.target.innerHTML === 'Delete'){
       // console.log(e.target.parentElement);
       todoList.removeChild(e.target.parentElement);
       deleteLocalTodos(e.target.parentElement);
    }

    if(e.target.innerHTML === 'Edit'){
        inputBox.value = e.target.previousElementSibling.innerHTML;
        inputBox.focus();
        addBtn.value = 'Edit';
        editTodo = e;
    }
}

//Function to save local todo
const saveLocalTodos = (todo) =>{
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //todos = JSON.parse(localStorage.getItem('todos'));
    todos.push(todo);
    //console.log(todos);
    localStorage.setItem('todos',JSON.stringify(todos));
   
}

//Function to get local todo
const getLocalTodos = () =>{
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
        todos.forEach(todo =>{

            //Creating p tag
        const li = document.createElement('li');
        const p = document.createElement('p');
        p.innerHTML = todo;
        li.appendChild(p);

        
        //creating the edit button
        const editBtn = document.createElement('button');
        editBtn.innerText = 'Edit';
        editBtn.classList.add('btn','editBtn');
        li.appendChild(editBtn);
        
        //creating the remove button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'Delete';
        deleteBtn.classList.add('btn','deleteBtn');
        li.appendChild(deleteBtn);


        todoList.appendChild(li);
        });

    }
}

//Function to delete local todo
const deleteLocalTodos = (todo) =>{
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    let todoText = todo.children[0].innerHTML;
    let todoIndex = todos.indexOf(todoText);
    //Array functions Slice / Splice
    todos.splice(todoIndex,1);
    localStorage.setItem('todos',JSON.stringify(todos));

    console.log(todoIndex);
}

const editLocalTodos = (todo) =>{
    let todos = JSON.parse(localStorage.getItem('todos'));
    let todoIndex = todos.indexOf(todo);
    todos[todoIndex] = inputBox.value;
    localStorage.setItem('todos',JSON.stringify(todos));
}
document.addEventListener('DOMContentLoaded',getLocalTodos);
addBtn.addEventListener('click',addTodo);
todoList.addEventListener('click',updateTodo);