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


// Вызываем функция подгрузки задач при входе
async function loadTasks() {
  try {
    const response = await fetch('https://tg-crm-backend.onrender.com/task/');
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    const tasks = await response.json();
    console.error('Error loading tasks:', tasks);

    const tasksList = document.querySelector('.tasks-list');
    tasksList.innerHTML = '';

    const createDivElement = (className, textContent) => {
      const div = document.createElement('div');
      div.classList.add(className);
      div.textContent = textContent;
      return div;
    };

    const createImageElement = (srcset, className) => {
      const img = document.createElement('img');
      img.setAttribute('loading', 'lazy');
      img.setAttribute('srcset', srcset);
      img.setAttribute('class', className);
      return img;
    };

    const getStatusClass = (status) => {
      switch (status) {
        case 'In progress':
          return 'task-status-progress';
        case 'Done':
          return 'task-status-completed';
        default:
          return 'task-status-new';
      }
    };

    tasks.forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task');

      const taskTextDiv = createDivElement('task-text');
      taskTextDiv.appendChild(createDivElement('task-title', task.title));
      taskTextDiv.appendChild(createDivElement('task-desc', task.description));
      taskDiv.appendChild(taskTextDiv);

      const taskBarDiv = document.createElement('div');
      taskBarDiv.classList.add('task-bar');

      const taskInfoDiv = createDivElement('task-info');

      const taskCategoryDiv = createDivElement('task-category');
      taskCategoryDiv.appendChild(createImageElement("https://cdn.builder.io/api/v1/image/assets/TEMP/1efaa102-478c-47f5-b4a7-115f3c51dbe3?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1efaa102-478c-47f5-b4a7-115f3c51dbe3?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1efaa102-478c-47f5-b4a7-115f3c51dbe3?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1efaa102-478c-47f5-b4a7-115f3c51dbe3?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1efaa102-478c-47f5-b4a7-115f3c51dbe3?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1efaa102-478c-47f5-b4a7-115f3c51dbe3?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1efaa102-478c-47f5-b4a7-115f3c51dbe3?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1efaa102-478c-47f5-b4a7-115f3c51dbe3?apiKey=eaec1f28c47f4f7186367d053711b635&amp;", 'task-category-img'));
      taskCategoryDiv.appendChild(createDivElement('task-category-text', task.category));
      taskInfoDiv.appendChild(taskCategoryDiv);

      const taskDateDiv = createDivElement('task-date');
      taskDateDiv.appendChild(createImageElement("https://cdn.builder.io/api/v1/image/assets/TEMP/d8b9c1f4-2296-4770-b77f-79473f3fe01f?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8b9c1f4-2296-4770-b77f-79473f3fe01f?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8b9c1f4-2296-4770-b77f-79473f3fe01f?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8b9c1f4-2296-4770-b77f-79473f3fe01f?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8b9c1f4-2296-4770-b77f-79473f3fe01f?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8b9c1f4-2296-4770-b77f-79473f3fe01f?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8b9c1f4-2296-4770-b77f-79473f3fe01f?apiKey=eaec1f28c47f4f7186367d053711b635&amp;width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d8b9c1f4-2296-4770-b77f-79473f3fe01f?apiKey=eaec1f28c47f4f7186367d053711b635&amp;", 'task-date-img'));
      taskDateDiv.appendChild(createDivElement('task-date-text', task.date));
      taskInfoDiv.appendChild(taskDateDiv);

      const taskStatusDiv = createDivElement(getStatusClass(task.status), task.status);

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
