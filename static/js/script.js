let tasksData = []; // Хранение данных о задачах

async function loadTasks() {
  try {
    const response = await fetch('https://tg-crm-backend.onrender.com/task/');
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }

    tasksData = await response.json();

    const tasksList = document.querySelector('.tasks-list');
    tasksList.innerHTML = '';

    displayTasks(tasksData);
  } catch (error) {
    console.error('Error loading tasks:', error);
  }
}

function displayTasks(tasks) {
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
    taskCategoryDiv.appendChild(createImageElement(task.categoryImageSrcset, 'task-category-img'));
    taskCategoryDiv.appendChild(createDivElement('task-category-text', task.category));
    taskInfoDiv.appendChild(taskCategoryDiv);

    const taskDateDiv = createDivElement('task-date');
    taskDateDiv.appendChild(createImageElement(task.dateImageSrcset, 'task-date-img'));
    taskDateDiv.appendChild(createDivElement('task-date-text', task.date));
    taskInfoDiv.appendChild(taskDateDiv);

    const taskStatusDiv = createDivElement('task-status', task.status);
    taskStatusDiv.classList.add(getStatusClass(task));

    taskBarDiv.appendChild(taskInfoDiv);
    taskBarDiv.appendChild(taskStatusDiv);

    taskDiv.appendChild(taskBarDiv);

    tasksList.appendChild(taskDiv);
  });
}

function getStatusClass(task) {
  switch (task.status) {
    case 'In progress':
      return 'progress';
    case 'Done':
      return 'completed';
    default:
      return 'new';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadTasks();

  const statusDivs = document.querySelectorAll('.status');
  statusDivs.forEach(statusDiv => {
    statusDiv.addEventListener('click', () => {
      const filterClass = statusDiv.classList[1];
      console.error('Error loading tasks:', filterClass);
      statusDivs.forEach(div => div.classList.remove('status-active'));
      statusDiv.classList.add('status-active');

      switch (filterClass) {
        case 'all':
          displayTasks(tasksData);
          console.error('IT SHOULD WORK', filterClass);
        default:
          const filteredTasks = tasksData.filter(task => getStatusClass(task) === filterClass);
          displayTasks(filteredTasks);
      }
    });
  });
});
