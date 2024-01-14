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

    tasks.forEach(task => {
      const taskDiv = document.createElement('div');
      taskDiv.classList.add('task');

      const createDivElement = (className, textContent) => {
        const div = document.createElement('div');
        div.classList.add(className);
        div.textContent = textContent;
        return div;
      };

      const taskTextDiv = createDivElement('task-text');
      taskTextDiv.appendChild(createDivElement('task-title', task.title));
      taskTextDiv.appendChild(createDivElement('task-desc', task.description));
      taskDiv.appendChild(taskTextDiv);

      const taskBarDiv = document.createElement('div');
      taskBarDiv.classList.add('task-bar');

      const taskInfoDiv = createDivElement('task-info');
      taskInfoDiv.appendChild(createDivElement('task-category', task.category));
      taskInfoDiv.appendChild(createDivElement('task-date', task.date));

      const taskStatusDiv = createDivElement('task-status-new', task.status);

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
