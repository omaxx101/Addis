document.addEventListener("DOMContentLoaded", () => {
  const backgrounds = [
    {
      url: "https://raw.githubusercontent.com/omaxx101/Addis/main/ethiopia-tab-extension/images/axum.jpg",
      title: "Axum in Ethiopia",
      source:"https://github.com/omaxx101/Addis/blob/main/ethiopia-tab-extension/images/axum.jpg"
    },
    {
      url: "https://raw.githubusercontent.com/omaxx101/Addis/main/ethiopia-tab-extension/images/bajaj.jpg",
      title: "Bajaj in Ethiopia",
      source: "https://github.com/omaxx101/Addis/blob/main/ethiopia-tab-extension/images/bajaj.jpg"
    },
    {
      url: "https://raw.githubusercontent.com/omaxx101/Addis/main/ethiopia-tab-extension/images/buna.jpg",
      title: "Buna in Ethiopia",
      source: "https://github.com/omaxx101/Addis/blob/main/ethiopia-tab-extension/images/buna.jpg"
    },
    {
      url: "https://raw.githubusercontent.com/omaxx101/Addis/main/ethiopia-tab-extension/images/dalol.jpg",
      title: "dalol in Ethiopia",
      source: "https://github.com/omaxx101/Addis/blob/main/ethiopia-tab-extension/images/dalol.jpg"
    },
    {
      url: "https://raw.githubusercontent.com/omaxx101/Addis/main/ethiopia-tab-extension/images/highlands.jpg",
      title: "highlands in Ethiopia",
      source: "https://github.com/omaxx101/Addis/blob/main/ethiopia-tab-extension/images/highlands.jpg"
    },
    {
      url: "https://raw.githubusercontent.com/omaxx101/Addis/main/ethiopia-tab-extension/images/lalibela.jpg",
      title: "lalibela in Ethiopia",
      source: "https://github.com/omaxx101/Addis/blob/main/ethiopia-tab-extension/images/lalibela.jpg"
    },
    {
      url: "https://raw.githubusercontent.com/omaxx101/Addis/main/ethiopia-tab-extension/images/tree.jpg",
      title: "Tree in Ethiopia",
      source: "https://github.com/omaxx101/Addis/blob/main/ethiopia-tab-extension/images/tree.jpg"
    },
    {
      url: "https://raw.githubusercontent.com/omaxx101/Addis/main/ethiopia-tab-extension/images/fasilcastle.jpeg",
      title: "fasil castle in Ethiopia",
      source: "https://github.com/omaxx101/Addis/blob/main/ethiopia-tab-extension/images/fasilcastle.jpeg"
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

    if (photoTitleEl) {
      photoTitleEl.textContent = background.title;
    }

    photoLinkEl.href = background.source;
  }

  function getEthiopianDateAmharic() {
    const now = new Date();
  
    const months = [
      "መስከረም", "ጥቅምት", "ኅዳር", "ታኅሣሥ",
      "ጥር", "የካቲት", "መጋቢት", "ሚያዝያ",
      "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜን"
    ];
  
    const amharicDays = [
      "ሰኞ", "ማክሰኞ", "ረቡዕ",
      "ሐሙስ", "አርብ", "ቅዳሜ", "እሑድ"
    ];
  
    let gYear = now.getFullYear();
    let ethYear = gYear - 8;
  
    const ethNewYear = new Date(gYear, 8, 11);
  
    let diffDays = Math.floor((now - ethNewYear) / (1000 * 60 * 60 * 24));
  
    if (diffDays < 0) {
      ethYear -= 1;
      diffDays += 365;
    }
  
    const monthIndex = Math.floor(diffDays / 30);
    const day = (diffDays % 30) + 1;
  
    const safeMonth = Math.min(Math.max(monthIndex, 0), 12);
  
    const dayIndex = now.getDay(); 
  
    return `${amharicDays[dayIndex]} ${months[safeMonth]} ${day}, ${ethYear}`;
  }


  function updateTime() {
    const now = new Date();
  
    // TIME
    timeEl.textContent = now.toLocaleTimeString("en-US", {
      timeZone: "Africa/Addis_Ababa",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  
    // GREGORIAN DATE
    const gregorian = now.toLocaleDateString("en-US", {
      timeZone: "Africa/Addis_Ababa",
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  
    // ETHIOPIAN DATE (AMHARIC)
    const ethiopian = getEthiopianDateAmharic();
  
    // COMBINED DISPLAY
    dateEl.innerHTML = `
      ${gregorian}<br>
      <span style="color:rgba(247,246,242,0.65); font-size:0.9em">
        ${ethiopian}
      </span>
    `;
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
