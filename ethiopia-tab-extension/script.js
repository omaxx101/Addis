document.addEventListener("DOMContentLoaded", () => {
  const backgrounds = [
    {
      url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ethiopian%20Landscape%20%285065722585%29.jpg",
      title: "Ethiopian highlands",
      source: "https://commons.wikimedia.org/wiki/File:Ethiopian_Landscape_(5065722585).jpg"
    },
    {
      url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ethiopian%20Landscape%20%285071832239%29.jpg",
      title: "Road through the Ethiopian landscape",
      source: "https://commons.wikimedia.org/wiki/File:Ethiopian_Landscape_(5071832239).jpg"
    },
    {
      url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Simien%20Mountains%20Landscape%2C%20Ethiopia%20%282466094405%29.jpg",
      title: "Simien Mountains",
      source: "https://commons.wikimedia.org/wiki/File:Simien_Mountains_Landscape,_Ethiopia_(2466094405).jpg"
    },
    {
      url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Lalibela%20Ethiopia%20landscape%20%281a%29.jpg",
      title: "Lalibela landscape",
      source: "https://commons.wikimedia.org/wiki/File:Lalibela_Ethiopia_landscape_(1a).jpg"
    },
    {
      url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Ethiopian%20Landscape%20%285065810666%29.jpg",
      title: "Northern Ethiopia view",
      source: "https://commons.wikimedia.org/wiki/File:Ethiopian_Landscape_(5065810666).jpg"
    },
    {
      url: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Landscape%20in%20Ethiopia.jpg",
      title: "Pastoral landscape in Ethiopia",
      source: "https://commons.wikimedia.org/wiki/File:Landscape_in_Ethiopia.jpg"
    }
  ];

  const quotes = [
    {
      am: "ትዕግስት ወርቅ ነው።",
      en: "Patience is gold."
    },
    {
      am: "ትንሽ በትንሽ ታላቅ ይሆናል።",
      en: "Little by little becomes something great."
    },
    {
      am: "የታገሰ ይበረታል።",
      en: "The one who endures grows strong."
    },
    {
      am: "እውነት ይበልጣል።",
      en: "Truth rises above."
    },
    {
      am: "ስራ ከተማ ያበጃል።",
      en: "Work is what builds a city."
    }
  ];

  const timeEl = document.getElementById("time");
  const dateEl = document.getElementById("date");
  const quoteEl = document.getElementById("quote");
  const translationEl = document.getElementById("translation");
  const photoTitleEl = document.getElementById("photoTitle");
  const photoLinkEl = document.getElementById("photoLink");
  const inputEl = document.getElementById("todoInput");
  const listEl = document.getElementById("todoList");

  const storageKeys = {
    photo: "ethiopia-tab:last-photo",
    todos: "ethiopia-tab:todos"
  };

  function selectIndex(items, key) {
    const lastIndex = Number.parseInt(localStorage.getItem(key) || "-1", 10);
    let index = Math.floor(Math.random() * items.length);

    if (items.length > 1) {
      while (index === lastIndex) {
        index = Math.floor(Math.random() * items.length);
      }
    }

    localStorage.setItem(key, String(index));
    return index;
  }

  function setBackground() {
    const background = backgrounds[selectIndex(backgrounds, storageKeys.photo)];

    document.body.style.backgroundImage = [
      "linear-gradient(120deg, rgba(8, 17, 24, 0.76), rgba(8, 17, 24, 0.26))",
      "radial-gradient(circle at top left, rgba(216, 177, 93, 0.28), transparent 30%)",
      `url("${background.url}")`
    ].join(", ");

    photoTitleEl.textContent = background.title;
    photoLinkEl.href = background.source;
  }

  function updateTime() {
    const now = new Date();

    timeEl.textContent = now.toLocaleTimeString("en-US", {
      timeZone: "Africa/Addis_Ababa",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    dateEl.textContent = now.toLocaleDateString("en-US", {
      timeZone: "Africa/Addis_Ababa",
      weekday: "long",
      month: "long",
      day: "numeric"
    });
  }

  function setQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEl.textContent = quote.am;
    translationEl.textContent = quote.en;
  }

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
      item.className = `todo-item${todo.done ? " done" : ""}`;

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
