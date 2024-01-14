// $('.mail-choice').change(function() {
//     if($(this).is(":checked")) {
//         $(this).parent().addClass('selected-bg');
//   } else {
//     $(this).parent().removeClass('selected-bg');
//   }
// });

// const colorInput = document.getElementById("colorpicker");

// colorInput.addEventListener("input", (e) => {
//  document.body.style.setProperty("--button-color", e.target.value);
// });

// $('.inbox-calendar').click(function(){
//   $('.calendar-container').toggleClass('calendar-show');
//  $('.inbox-container').toggleClass('hide');
//  $('.mail-detail').toggleClass('hide');
// });

// Функция для загрузки задач с бэкенда и отображения на странице
async function loadTasks() {
  try {
    const response = await fetch('https://tg-crm-backend.onrender.com/task/');
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    
    const tasks = await response.json();
    console.error('Error loading tasks:', tasks);
    const tasksList = document.querySelector('.tasks-list');
    
    // Очищаем содержимое блока tasks-list перед добавлением новых задач
    tasksList.innerHTML = '';

    function createElementWithClass(elementType, className) {
        const element = document.createElement(elementType);
        element.classList.add(className);
        return element;
      }
      
      function createImageElement(srcset, className) {
        const imgElement = createElementWithClass('img', className);
        imgElement.setAttribute("loading", "lazy");
        imgElement.setAttribute("srcset", srcset);
        return imgElement;
      }
      
      function createTextElementWithClass(text, className) {
        const element = createElementWithClass('div', className);
        element.textContent = text;
        return element;
      }
      
      function createTaskDiv() {
        const taskDiv = createElementWithClass('div', 'task');
        const taskTextDiv = createElementWithClass('div', 'task-text');
      
        const taskTitleDiv = createTextElementWithClass(task.title, 'task-title');
        const taskDescDiv = createTextElementWithClass(task.description, 'task-desc');
      
        taskTextDiv.appendChild(taskTitleDiv);
        taskTextDiv.appendChild(taskDescDiv);
      
        taskDiv.appendChild(taskTextDiv);
      
        const taskBarDiv = createElementWithClass('div', 'task-bar');
        const taskInfoDiv = createElementWithClass('div', 'task-info');
      
        const taskCategoryDiv = createElementWithClass('div', 'task-category');
        const categoryImgElement = createImageElement(task.categoryImageSrcset, 'task-category-img');
        const taskCategoryTextDiv = createTextElementWithClass(task.category, 'task-category-text');
      
        taskCategoryDiv.appendChild(categoryImgElement);
        taskCategoryDiv.appendChild(taskCategoryTextDiv);
        taskInfoDiv.appendChild(taskCategoryDiv);
      
        const taskDateDiv = createElementWithClass('div', 'task-date');
        const dateImgElement = createImageElement(task.dateImageSrcset, 'task-date-img');
        const taskCategoryDateDiv = createTextElementWithClass(task.date, 'task-date-text');
      
        taskDateDiv.appendChild(dateImgElement);
        taskDateDiv.appendChild(taskCategoryDateDiv);
        taskInfoDiv.appendChild(taskDateDiv);
      
        const taskStatusDiv = createTextElementWithClass(task.status, 'task-status-new');
      
        taskTextDiv.appendChild(taskInfoDiv);
        taskTextDiv.appendChild(taskStatusDiv);
      
        taskDiv.appendChild(taskBarDiv);
      
        return taskDiv;
      }
      
      // Получаем ссылку на элемент, в который будем добавлять задачи
      var tasksList = document.getElementById("tasksList"); // Замените "tasksList" на актуальный ID вашего контейнера
      
      // Проходимся по каждой задаче и добавляем их в общий список
      tasks.forEach(task => {
        tasksList.appendChild(createTaskDiv());
      });
  } catch (error) {
    console.error('Error loading tasks:', error);
  }
}

// Вызываем функцию loadTasks() при загрузке страницы
window.addEventListener('DOMContentLoaded', loadTasks);
