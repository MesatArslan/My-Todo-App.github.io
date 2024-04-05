const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");
const languageSection = document.getElementById("language-section");
const firstH1 = document.querySelector(".firsth1");
const titleText = document.querySelector(".title-text");
const dateText = document.querySelector(".date-text");
const descriptionText = document.querySelector(".description-text");
const filterInput = document.querySelector("#input-field");

const buttons = document.querySelectorAll('.language-section a');


//* Translate Part function
buttons.forEach(button =>{
  button.addEventListener('click', () => {
    const activeElement = document.querySelector('.language-section .active');
    if (activeElement) {
      activeElement.classList.remove('active');
    }

    button.classList.add('active');

    const attr = button.getAttribute("language");

    openTaskFormBtn.textContent = data[attr].addTaskBtn;
    addOrUpdateTaskBtn.textContent = data[attr].addTaskBtnText;
    cancelBtn.textContent = data[attr].editBtnText;
    discardBtn.textContent = data[attr].discardBtnText;
    firstH1.textContent = data[attr].greeting;
    dateInput.textContent = data[attr].taskFormDate;
    titleText.textContent = data[attr].taskFormTitle;
    dateText.textContent = data[attr].taskFormDate;
    descriptionText.textContent = data[attr].taskFormDescription;
    updateTaskContainer();
   
  });
});


//* Translate Part data
const data = {
  'english': {
      'greeting': 'My Todo App',
      'addTaskBtn': 'Add New Task',
      'taskFormTitle': 'Title',
      'taskFormDate': 'Date',
      'taskFormDescription': 'Description',
      'addTaskBtnText': 'Add Task',
      'discardChangesMessage': 'Discard unsaved changes?',
      'editBtnText': 'Edit',
      'discardBtnText': 'Discard'
  },
  'turkish': {
      'greeting': 'Benim Todo Uygulamam',
      'addTaskBtn': 'Yeni Görev Ekle',
      'taskFormTitle': 'Başlık',
      'taskFormDate': 'Tarih',
      'taskFormDescription': 'Açıklama',
      'addTaskBtnText': 'Görev Ekle',
      'discardChangesMessage': 'Kaydedilmemiş değişiklikleri silmek istiyor musunuz?',
      'editBtnText': 'Düzenle',
      'discardBtnText': 'Sil'
  },
  'chinese': {
      'greeting': '我的待办事项应用',
      'addTaskBtn': '添加新任务',
      'taskFormTitle': '标题',
      'taskFormDate': '日期',
      'taskFormDescription': '描述',
      'addTaskBtnText': '添加任务',
      'discardChangesMessage': '是否放弃未保存的更改？',
      'editBtnText': '编辑',
      'discardBtnText': '丢弃'
  },
  'russian': {
      'greeting': 'Мое собственное приложение для задач',
      'addTaskBtn': 'Добавить новую задачу',
      'taskFormTitle': 'Заголовок',
      'taskFormDate': 'Дата',
      'taskFormDescription': 'Описание',
      'addTaskBtnText': 'Добавить задачу',
      'discardChangesMessage': 'Отменить несохраненные изменения?',
      'editBtnText': 'Редактировать',
      'discardBtnText': 'Удалить'
  },
  'japanese': {
      'greeting': '私のToDoアプリ',
      'addTaskBtn': '新しいタスクを追加',
      'taskFormTitle': 'タイトル',
      'taskFormDate': '日付',
      'taskFormDescription': '説明',
      'addTaskBtnText': 'タスクを追加',
      'discardChangesMessage': '保存されていない変更を破棄しますか？',
      'editBtnText': '編集する',
      'discardBtnText': '破棄'
  }
};


//* filter part
filterInput.addEventListener("keyup",filter);
function filter(e){
  const filterValue = e.target.value.toLowerCase().trim();
  const todoList = document.querySelectorAll(".category-name");

  if(todoList.length > 0){
    todoList.forEach(todo => {
        if(todo.textContent.toLowerCase().trim().includes(filterValue)){
          todo.parentNode.setAttribute("style","display : block");
        }else{
          todo.parentNode.setAttribute("style","display : none");
        }
    });

  }
  
}


//* Taking Data Part
const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

const addOrUpdateTask = () => {
  addOrUpdateTaskBtn.innerText = "Add Task";
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };
  

  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataArrIndex] = taskObj;
  }

  localStorage.setItem("data", JSON.stringify(taskData));
  updateTaskContainer()
  reset()
  
};

const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";
  const activeLanguage = document.querySelector('.language-section .active');
  const attr = activeLanguage.getAttribute("language");

  taskData.forEach(
    ({ id, title, date, description }) => {
        (tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p class="category-name"><strong>${data[attr].taskFormTitle}:</strong> ${title}</p>
          <p><strong>${data[attr].taskFormDate}:</strong> ${date}</p>
          <p><strong>${data[attr].taskFormDescription}:</strong> ${description}</p>
          <button onclick="editTask(this)" type="button" class="btn">${data[attr].editBtnText}</button>
          <button onclick="deleteTask(this)" type="button" class="btn">${data[attr].discardBtnText}</button> 
        </div>
      `)
      
    }
      
  );
      

};

updateTaskContainer();



const deleteTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  buttonEl.parentElement.remove();
  taskData.splice(dataArrIndex, 1);
  localStorage.setItem("data", JSON.stringify(taskData));
}

const editTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  currentTask = taskData[dataArrIndex];

  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  addOrUpdateTaskBtn.innerText = "Update Task";

  taskForm.classList.toggle("hidden");  
}

const reset = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
}



openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
  const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;

  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset()
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addOrUpdateTask();
});