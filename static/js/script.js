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

    tasks.forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task');

      
      const taskTextDiv = document.createElement('div');
      taskTextDiv.classList.add('task-text');

      const taskTitleDiv = document.createElement('div');
      taskTitleDiv.classList.add('task-title');
      taskTitleDiv.textContent = task.title;

      const taskDescDiv = document.createElement('div');
      taskDescDiv.classList.add('task-desc');
      taskDescDiv.textContent = task.description;

      taskTextDiv.appendChild(taskTitleDiv);
      taskTextDiv.appendChild(taskDescDiv);

      taskDiv.appendChild(taskTextDiv);


      const taskBarDiv = document.createElement('div');
      taskBarDiv.classList.add('task-bar');

      const taskInfoDiv = document.createElement('div');
      taskInfoDiv.classList.add('task-info');

      const taskCategoryDiv = document.createElement('div');
      taskCategoryDiv.classList.add('task-category');
      const categoryImgElement = document.createElement("img");
      categoryImgElement.setAttribute("loading", "lazy");
      categoryImgElement.setAttribute("srcset", "https://cdn.builder.io/api/v1/image/assets/TEMP/1efaa102-478c-47f5-b4a7-115f3c51dbe3?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1efaa102-478c-47f5-b4a7-115f3c51dbe3?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1efaa102-478c-47f5-b4a7-115f3c51dbe3?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1efaa102-478c-47f5-b4a7-115f3c51dbe3?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1efaa102-478c-47f5-b4a7-115f3c51dbe3?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1efaa102-478c-47f5-b4a7-115f3c51dbe3?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1efaa102-478c-47f5-b4a7-115f3c51dbe3?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1efaa102-478c-47f5-b4a7-115f3c51dbe3?apiKey=eaec1f28c47f4f7186367d053711b635&amp;");
      categoryImgElement.setAttribute("class", "task-category-img");
      const taskCategoryTextDiv = document.createElement('div');
      taskCategoryTextDiv.classList.add('task-category-text');
      taskCategoryTextDiv.textContent = task.category;
      
      taskCategoryDiv.appendChild(categoryImgElement);
      taskCategoryDiv.appendChild(taskCategoryTextDiv);
      taskInfoDiv.appendChild(taskCategoryDiv);

      const taskDateDiv = document.createElement('div');
      taskDateDiv.classList.add('task-date');
      const dateImgElement = document.createElement("img");
      dateImgElement.setAttribute("loading", "lazy");
      dateImgElement.setAttribute("srcset", "https://cdn.builder.io/api/v1/image/assets/TEMP/d8b9c1f4-2296-4770-b77f-79473f3fe01f?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8b9c1f4-2296-4770-b77f-79473f3fe01f?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8b9c1f4-2296-4770-b77f-79473f3fe01f?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8b9c1f4-2296-4770-b77f-79473f3fe01f?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8b9c1f4-2296-4770-b77f-79473f3fe01f?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8b9c1f4-2296-4770-b77f-79473f3fe01f?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8b9c1f4-2296-4770-b77f-79473f3fe01f?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8b9c1f4-2296-4770-b77f-79473f3fe01f?apiKey=eaec1f28c47f4f7186367d053711b635&amp;");
      dateImgElement.setAttribute("class", "task-date-img");
      const taskCategoryDateDiv = document.createElement('div');
      taskCategoryTextDiv.classList.add('task-date-text');
      taskCategoryTextDiv.textContent = task.date;
      
      taskDateDiv.appendChild(dateImgElement);
      taskDateDiv.appendChild(taskCategoryDateDiv);
      taskInfoDiv.appendChild(taskDateDiv);

      const taskStatusDiv = document.createElement('div');
      taskStatusDiv.classList.add('task-status-new');
      taskStatusDiv.textContent = task.status;
      
      taskBarDiv.appendChild(taskInfoDiv);
      taskBarDiv.appendChild(taskStatusDiv);

      taskDiv.appendChild(taskBarDiv);
      
            
      tasksList.appendChild(taskDiv);
    });
  } catch (error) {
    console.error('Error loading tasks:', error);
  }
}

// Вызываем функцию loadTasks() при загрузке страницы
window.addEventListener('DOMContentLoaded', loadTasks);
