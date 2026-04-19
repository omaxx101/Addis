document.addEventListener("DOMContentLoaded", () => {

 // ----------------------------
  // 🎯 ELEMENTS (MUST BE FIRST)
  // ----------------------------
  const timeEl = document.getElementById("time");
  const dateEl = document.getElementById("date");
  const quoteEl = document.getElementById("quote");
  const translationEl = document.getElementById("translation");
  const photoTitleEl = document.getElementById("photoTitle");
  const photoLinkEl = document.getElementById("photoLink");
  const inputEl = document.getElementById("todoInput");
  const listEl = document.getElementById("todoList");

  // ----------------------------
  // 🖼️ BACKGROUND (DAILY ROTATION - STOCK STYLE)
  // ----------------------------
  function setBackground() {
    const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));

    const queries = [
      "addis ababa city",
      "ethiopia streets",
      "merkato addis ababa",
      "entoto mountain",
      "ethiopian highlands",
      "ethiopian architecture",
      "addis skyline",
      "ethiopia market life",
      "lalibela rock churches",
      "ethiopia culture"
    ];

    const query = queries[dayIndex % queries.length];

    const imageUrl = `https://source.unsplash.com/1600x900/?${encodeURIComponent(query)}`;

    document.body.style.backgroundImage = `
      linear-gradient(120deg, rgba(8, 17, 24, 0.75), rgba(8, 17, 24, 0.25)),
      url("${imageUrl}")
    `;

    photoTitleEl.textContent = `Addis Ababa • ${query}`;
    photoLinkEl.href = `https://unsplash.com/s/photos/${encodeURIComponent(query)}`;
  }

  // ----------------------------
  // ⏰ TIME + DATE
  // ----------------------------
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

  // ----------------------------
  // 💬 QUOTES
  // ----------------------------
  function setQuote() {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEl.textContent = quote.am;
    translationEl.textContent = quote.en;
  }

  // ----------------------------
  // 📝 TODO SYSTEM
  // ----------------------------
  function loadTodos() {
    try {
      return JSON.parse(localStorage.getItem("todos") || "[]");
    } catch {
      return [];
    }
  }

  function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function renderTodos() {
    listEl.innerHTML = "";

    if (!todos.length) {
      const empty = document.createElement("li");
      empty.className = "todo-item";
      empty.textContent = "No tasks yet.";
      listEl.appendChild(empty);
      return;
    }

    todos.forEach((todo) => {
      const item = document.createElement("li");
      item.className = `todo-item${todo.done ? " done" : ""}`;

      const text = document.createElement("span");
      text.className = "todo-copy";
      text.textContent = todo.text;

      const actions = document.createElement("div");
      actions.className = "todo-actions";

      const toggle = document.createElement("button");
      toggle.className = "todo-toggle";
      toggle.textContent = "✓";
      toggle.onclick = () => {
        todo.done = !todo.done;
        saveTodos();
        renderTodos();
      };

      const del = document.createElement("button");
      del.className = "todo-delete";
      del.textContent = "×";
      del.onclick = () => {
        todos = todos.filter(t => t.id !== todo.id);
        saveTodos();
        renderTodos();
      };

      actions.append(toggle, del);
      item.append(text, actions);
      listEl.appendChild(item);
    });
  }

  // ----------------------------
  // 📥 ADD TODO
  // ----------------------------
  inputEl.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    const text = inputEl.value.trim();
    if (!text) return;

    todos.unshift({
      id: Date.now(),
      text,
      done: false
    });

    inputEl.value = "";
    saveTodos();
    renderTodos();
  });


function generateQuotes() {
  const amharicRoots = [
    "ትዕግስት", "ተስፋ", "ስራ", "እውነት", "ጥረት", "ስኬት",
    "ፍቅር", "እውቀት", "ጥበብ", "ጉዞ", "ብርታት", "ሰላም"
  ];

  const englishRoots = [
    "Patience", "Hope", "Work", "Truth", "Effort", "Success",
    "Love", "Knowledge", "Wisdom", "Journey", "Strength", "Peace"
  ];

  const endingsAM = [
    "ይበረታል።",
    "ይረዳል።",
    "ወደፊት ያመራል።",
    "ሕይወትን ይቀይራል።",
    "ታላቅ ያደርጋል።"
  ];

  const endingsEN = [
    "builds strength.",
    "leads forward.",
    "changes life.",
    "creates greatness.",
    "shapes destiny."
  ];

  const quotes = [];

  for (let i = 0; i < 360; i++) {
    const amRoot = amharicRoots[i % amharicRoots.length];
    const enRoot = englishRoots[i % englishRoots.length];

    const amEnd = endingsAM[i % endingsAM.length];
    const enEnd = endingsEN[i % endingsEN.length];

    quotes.push({
      am: `${amRoot} ${amEnd}`,
      en: `${enRoot} ${enEnd}`
    });
  }

  return quotes;
}

const quotes = generateQuotes();
  let todos = loadTodos();

  // ----------------------------
  // 🚀 START APP
  // ----------------------------
  setBackground();
  setQuote();
  updateTime();
  renderTodos();

  setInterval(updateTime, 1000);
});
