function loadTodos() {
    try {
      return JSON.parse(localStorage.getItem(storageKeys.todos) || "[]");
    } catch {
      return [];
    }
  }

  let todos = loadTodos();

  function saveTodos() {
    localStorage.setItem(storageKeys.todos, JSON.stringify(todos));
  }

  function renderTodos() {
    listEl.textContent = "";

    if (!todos.length) {
      const emptyState = document.createElement("li");
      emptyState.className = "todo-item";
      const emptyCopy = document.createElement("span");
      emptyCopy.className = "todo-copy";
      emptyCopy.textContent = "No tasks yet. Add one to get started.";
      emptyState.appendChild(emptyCopy);
      listEl.appendChild(emptyState);
      return;
    }

    todos.forEach((todo) => {
      const item = document.createElement("li");
      item.className = todo-item${todo.done ? " done" : ""};

      const copy = document.createElement("span");
      copy.className = "todo-copy";
      copy.textContent = todo.text;

      const actions = document.createElement("div");
      actions.className = "todo-actions";

      const toggle = document.createElement("button");
      toggle.className = "todo-toggle";
      toggle.type = "button";
      toggle.setAttribute("aria-label", `Mark ${todo.text} as ${todo.done ? "not done" : "done"}`);
      toggle.addEventListener("click", () => {
        todos = todos.map((entry) =>
          entry.id === todo.id ? { ...entry, done: !entry.done } : entry
        );
        saveTodos();
        renderTodos();
      });

      const remove = document.createElement("button");
      remove.className = "todo-delete";
      remove.type = "button";
      remove.setAttribute("aria-label", `Delete ${todo.text}`);
      remove.textContent = "×";
      remove.addEventListener("click", () => {
        todos = todos.filter((entry) => entry.id !== todo.id);
        saveTodos();
        renderTodos();
      });

      actions.append(toggle, remove);
      item.append(copy, actions);
      listEl.appendChild(item);
    });
  }

  inputEl.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") {
      return;
    }

    const text = inputEl.value.trim();

    if (!text) {
      return;
    }

    todos = [
      {
        id: Date.now(),
        text,
        done: false
      },
      ...todos
    ];

    inputEl.value = "";
    saveTodos();
    renderTodos();
  });

  setBackground();
  setQuote();
  updateTime();
  renderTodos();
  window.setInterval(updateTime, 1000);
});