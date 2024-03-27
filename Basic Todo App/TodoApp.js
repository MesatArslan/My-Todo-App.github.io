//?Uygulama kodlarken Gerizekalı kullanıyomuş gibi yaz


//* Tüm elementleri seçmek

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#todoClearButton");
const filterinput = document.querySelector("#todoSearch");
let todos = [];

runEvents();

function runEvents(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded);
    secondCardBody.addEventListener("click", removeTodoToUI);
    clearButton.addEventListener("click",removoAllTodos);
    filterinput.addEventListener("keyup",filter);
}



function pageLoaded(){
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
        
    });
}

function filter(e){
    const filtervalue = e.target.value.toLowerCase(".list-group-item").trim();
    const todoslist = document.querySelectorAll(".list-group-item");
    if(todoslist.length>0){
    todoslist.forEach(function(todo){
        if(todo.textContent.toLowerCase().trim().includes(filtervalue)){

            todo.setAttribute("style","display : block");
        }else{
            todo.setAttribute("style","display : none !important");
            //? "!important" 'ın anlamı eğer bir durum olursa kesinlikle benim metodu kullan demek
        }

        });
        }else{  
            showAllert("warning","Filtreleme yapmak için en az bir todo girmelisiniz.");


        }
    }

function removoAllTodos(e){
    const todoslist = document.querySelectorAll(".list-group-item");
    if(todoslist.length>0){
        //? ekrandan silme
        todoslist.forEach(function(todo){
            todo.remove(todo);
        });
        //? storage'dan silme
        todos=[];
        localStorage.setItem("todos",JSON.stringify(todos));
        showAllert("success","Bütün todolar silindi.")
    }else{
        showAllert("warning", "Silmek için en az bir todo olmalıdır.");
    }
    console.log(todoslist);
}


function removeTodoToUI(e){
    if(e.target.className ==="fa fa-remove"){
        // console.log("Çarpıya basmıştır");  //* console kullanarak çalışıyormu dene ve (e.target)="i" etiketini gösterir
        //? ekrandan silme
        const todo = e.target.parentElement.parentElement;
        todo.remove();

        //? storage'dan silme
        removoTodoToStorage(todo.textContent);
        showAllert("success","Todo başarıyla silindi.");

    }
}

function removoTodoToStorage(removeTodo){
    checkTodosFromStorage(removeTodo);
    todos.forEach(function(todo,index){
        if(removeTodo===todo){
            todos.splice(index,1);  //* arraylerde değer silme diye araştırabilirsin (araştırmaları böyle yap)
        }
    })
    localStorage.setItem("todos",JSON.stringify(todos));

}



function addTodo(e){
    const inputText = addInput.value.trim();
    if(inputText == null || inputText==""){
        showAllert("warning","Lütfen boş bırakmayınız")
    }else{
        //? Arayüze ekleme
        addTodoToUI(inputText);
        //? Storage'a ekleme 
        addTodoToStorage(inputText);
        showAllert("success","Todo eklendi.");
    }

    e.preventDefault(); //* diyerek farklı bir sayfaya gitmesini engelliyoruz 

}


function addTodoToUI(newTodo){
    // <li class="list-group-item d-flex justify-content-between">Todo 1
    //     <a href="#" class="delete-item">
    //         <i class="fa fa-remove"></i>
    //     </a>
    // </li>

    let li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    let a = document.createElement("a");
    a.href = "#";
    a.className = "delete-item";

    let i = document.createElement("i");
    i.className ="fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    addInput.value = ""; //* burda text alanında yazının kalmamasını sağlıyoruz
}

function addTodoToStorage(newTodo){
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function checkTodosFromStorage(){
    if(localStorage.getItem("todos") === null){
        todos =[];
    }else{
        todos =JSON.parse(localStorage.getItem("todos"));
    }
}

function showAllert(type,message){
    // <div class="alert alert-warning" role="alert">
    //     This is a warning alert—check it out!
    // </div>
    const div = document.createElement("div");
    const hr = document.createElement("hr");
    // div.className ="alert alert-" + type;  //* 1.yol
    div.className =`alert alert-${type}`;
    div.textContent = message;
    firstCardBody.appendChild(hr);
    firstCardBody.appendChild(div);

    setTimeout(function(){      //*süre kısıtlaması koymak için
        div.remove();
        hr.remove();
    },2500);
}