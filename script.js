document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("task-input");
  const descInput = document.getElementById("task-desc");
  const addTaskBtn = document.getElementById("add-task-btn");
  const taskList = document.getElementById("task-list");
  const emptyImage = document.querySelector(".empty-image");
  const counter = document.createElement("div");
  counter.id = "task-counter";
  counter.style.marginTop = "15px";
  counter.style.fontWeight = "500";
  counter.style.color = "#613e3e";
  taskList.parentNode.insertBefore(counter, taskList);

  let taskBeingEdited = null;

  const showMessage = (msg) => {
    const message = document.createElement("div");
    message.className = "edit-message";
    message.innerText = msg;
    document.body.appendChild(message);
    setTimeout(() => message.remove(), 2000);
  };

  const toggleEmptyState = () => {
    emptyImage.style.display =
      taskList.children.length === 0 ? "block" : "none";
  };

  const updateCounter = () => {
    const total = taskList.children.length;
    const completed = Array.from(taskList.children).filter((t) =>
      t.classList.contains("completed")
    ).length;
    counter.innerHTML = `Total Tasks: ${total} &nbsp;&nbsp;|&nbsp;&nbsp; Completed: ${completed}`;
  };

  const getTime = () =>
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const createTask = (title, desc) => {
    const li = document.createElement("li");

    let priority = "low";
    li.classList.add(priority); 
    li.innerHTML = `
      <div class="task-content">
        <h3 class="task-title">${title}</h3>
        <h5 class="task-desc">${desc}</h5>
        <small class="task-time">⏰ ${getTime()}</small>
      </div>
      <div class="task-actions">
         <button class="priority-btn low">Low</button>
         <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
         <button class="done-btn"><i class="fa-regular fa-circle-check"></i></button>
         <button class="delete-btn"><i class="fa-solid fa-trash-can"></i></button>
      </div>
    `;
    const priorityBtn = li.querySelector(".priority-btn");
    priorityBtn.addEventListener("click", () => {
      if (priority === "low") {
        priority = "medium";
        priorityBtn.className = "priority-btn medium";
        priorityBtn.innerText = "Medium";
        li.className = "medium";
      } else if (priority === "medium") {
        priority = "high";
        priorityBtn.className = "priority-btn high";
        priorityBtn.innerText = "High";
        li.className = "high";
      } else {
        priority = "low";
        priorityBtn.className = "priority-btn low";
        priorityBtn.innerText = "Low";
        li.className = "low";
      }
    });
    li.querySelector(".done-btn").addEventListener("click", () => {
      li.classList.toggle("completed");
      updateCounter(); 
    });

   
    li.querySelector(".delete-btn").addEventListener("click", () => {
      li.remove();
      toggleEmptyState();
      updateCounter();
    });

    
    li.querySelector(".edit-btn").addEventListener("click", () => {
      taskInput.value = li.querySelector(".task-title").innerText;
      descInput.value = li.querySelector(".task-desc").innerText;
      taskBeingEdited = li;
      addTaskBtn.innerHTML = '<i class="fa-solid fa-save"></i>';
    });

    taskList.appendChild(li);
    toggleEmptyState();
    updateCounter(); 
  };

  const addOrUpdateTask = (e) => {
    e.preventDefault();

    const title = taskInput.value.trim();
    const desc = descInput.value.trim() || "—";

    if (!title) return;

    if (taskBeingEdited) {
      taskBeingEdited.querySelector(".task-title").innerText = title;
      taskBeingEdited.querySelector(".task-desc").innerText = desc;
      showMessage("✅ Task modified successfully");
      taskBeingEdited = null;
      addTaskBtn.innerHTML = '<i class="fa-solid fa-plus"></i>';
    } else {
      createTask(title, desc);
    }

    taskInput.value = "";
    descInput.value = "";
  };

  addTaskBtn.addEventListener("click", addOrUpdateTask);
  toggleEmptyState();
  updateCounter();

  const navAll = document.getElementById("nav-all");
  const navCompleted = document.getElementById("nav-completed");
  const navAbout = document.getElementById("nav-about");

  navAll.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll("#task-list li").forEach((task) => {
      task.style.display = "flex";
    });
    showMessage("📋 Showing all tasks");
  });

  navCompleted.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll("#task-list li").forEach((task) => {
      task.style.display = task.classList.contains("completed")
        ? "flex"
        : "none";
    });
    showMessage("✅ Showing completed tasks");
  });

  navAbout.addEventListener("click", (e) => {
    e.preventDefault();
    showMessage("📝 ListIt is a To-do list website");
  });
});
 const priorityFilter = document.getElementById("priority-filter");
const taskList = document.getElementById("task-list");

priorityFilter.addEventListener("change", function () {

  const filterValue = this.value;
  const tasks = taskList.querySelectorAll("li");

  tasks.forEach(task => {

    if (filterValue === "all") {
      task.style.display = "flex";
    } else if (task.classList.contains(filterValue)) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }

  });

});
