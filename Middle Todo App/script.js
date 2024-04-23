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
const categoryText = document.querySelector(".category-label");
const secondCategoryText = document.querySelector(".task-form-label");
const filterInput = document.querySelector("#input-field");
const categories = document.querySelectorAll(".category-section a");
const categoryLinks = document.querySelectorAll('.category-section-main a');
const buttons = document.querySelectorAll('.language-section a');
const allText = document.querySelector('#all');
const personal1Text = document.querySelector('#personal1');
const travel1Text = document.querySelector('#travel1');
const work1Text = document.querySelector('#work1');
const education1Text = document.querySelector('#education1');
const training1Text = document.querySelector('#training1');
const personalText = document.querySelector('#personal');
const travelText = document.querySelector('#travel');
const workText = document.querySelector('#work');
const educationText = document.querySelector('#education');
const trainingText = document.querySelector('#training');
const inputFieldText = document.getElementById('input-field');

//* Category filter part
categories.forEach(category => {
  category.addEventListener('click', () => {
    const activeElement = document.querySelector('.category-section .active');
    if (activeElement) {
      activeElement.classList.remove('active');
    }
    category.classList.add('active');
  });
  
});

//* Category Part and filter
categoryLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault(); 
        categoryLinks.forEach(link => link.classList.remove('active'));
        this.classList.add('active')
        
        const categoryFilter = document.querySelector(".category-section-main a.active");
        const categoryFilterValue = categoryFilter.textContent;
        const categoryTodoList = document.querySelectorAll(".category");
        const categoryLabel = document.querySelector('.category-label');
        categoryLabel.textContent = categoryFilter.textContent;
        
        if(categoryTodoList.length > 0){
          categoryTodoList.forEach(todo => {
            if(categoryFilterValue == 'All'){
              todo.parentNode.style.display = 'block';

            }else if (todo.textContent.includes(categoryFilterValue)) {
                todo.parentNode.style.display = 'block';
                console.log(todo.textContent, "=== ",categoryFilterValue);
            } else {
                todo.parentNode.style.display = 'none';
                console.log(todo.textContent ,"??",categoryFilterValue);
            }
          });
        }
    });
});


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
    categoryText.textContent = data[attr].allText;
    inputFieldText.placeholder = data[attr].inputFieldText;
    secondCategoryText.textContent = data[attr].categoryText;
    allText.textContent = data[attr].allText;
    personal1Text.textContent = data[attr].personalText;
    travel1Text.textContent = data[attr].travelText;
    work1Text.textContent = data[attr].workText;
    education1Text.textContent = data[attr].educationText;
    training1Text.textContent = data[attr].trainingText;
    personalText.textContent = data[attr].personalText;
    travelText.textContent = data[attr].travelText;
    workText.textContent = data[attr].workText;
    educationText.textContent = data[attr].educationText;
    trainingText.textContent = data[attr].trainingText;

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
      'discardBtnText': 'Discard',
      'categoryText':'Category',
      'allText': 'All',
      'personalText': 'Personal',
      'travelText': 'Travel',
      'workText': 'Work',
      'educationText': 'Education',
      'trainingText': 'Training',
      'inputFieldText':'Search Something...'
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
      'discardBtnText': 'Sil',
      'categoryText':'Kategori',
      'allText': 'Tümü',
      'personalText': 'Kişisel',
      'travelText': 'Seyahat',
      'workText': 'Çalışma',
      'educationText': 'Eğitim',
      'trainingText': 'Antrenman',
      'inputFieldText':'Bir şeyler ara...'

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
      'discardBtnText': '丢弃',
      'categoryText':'类别',
      'allText': '全部',
      'personalText': '个人',
      'travelText': '旅行',
      'workText': '工作',
      'educationText': '教育',
      'trainingText': '培训',
      'inputFieldText':'搜索一些东西...'


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
      'discardBtnText': 'Удалить',
      'categoryText':'Kатегория',
      'allText': 'Все',
      'personalText': 'Личный',
      'travelText': 'Путешествие',
      'workText': 'Работа',
      'educationText': 'Образование',
      'trainingText': 'Обучение',
      'inputFieldText':'Искать что-то...'

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
      'discardBtnText': '破棄',
      'categoryText':'カテゴリー',
      'allText': 'すべて',
      'personalText': '個人',
      'travelText': '旅行',
      'workText': '仕事',
      'educationText': '教育',
      'trainingText': 'トレーニング',
      'inputFieldText':'何かを検索...'

  }
};


//* Title filter part
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
  const categoryInput = document.querySelector(".category-section a.active");

  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    category: categoryInput.textContent,
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
    ({ id,category, title, date, description }) => {
        (tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p class="category-name"><strong>${data[attr].taskFormTitle}:</strong> ${title}</p>
          <p class="category"><strong>${data[attr].categoryText}:</strong> ${category}</p>
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
  const activeCategory = document.querySelector('.category-section .active');
  if (activeCategory) {
    activeCategory.classList.remove('active');
  }
  

  categories.forEach(categoryy => {
    if(currentTask.category === categoryy.textContent){
      categoryy.classList.add('active');
    }
  });
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
