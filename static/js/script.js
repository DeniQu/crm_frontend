console.log('success')
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
    const response = await fetch('https://crm-backend-91cy.onrender.com//api/data');
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    
    const tasks = await response.json();
    const tasksList = document.querySelector('.tasks-list');
    
    // Очищаем содержимое блока tasks-list перед добавлением новых задач
    tasksList.innerHTML = '';

    // Создаем HTML элементы для каждой задачи и добавляем их на страницу
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
      tasksList.appendChild(taskDiv);
    });
  } catch (error) {
    console.error('Error loading tasks:', error);
  }
}

// Вызываем функцию loadTasks() при загрузке страницы
window.addEventListener('DOMContentLoaded', loadTasks);
