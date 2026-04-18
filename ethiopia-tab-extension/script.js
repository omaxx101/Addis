// Addis Ababa time
function updateTime() {
    const now = new Date();
  
    const time = now.toLocaleTimeString("en-US", {
      timeZone: "Africa/Addis_Ababa",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true
    });
  
    document.getElementById("time").innerText = time;
  }
  
  setInterval(updateTime, 1000);
  updateTime();
  
  // Amharic quotes
  const quotes = [
    "የታገሰ ይበረታል",
    "ትዕግስት ወርቅ ነው",
    "እውነት ይበልጣል"
  ];
  
  document.getElementById("quote").innerText =
    quotes[Math.floor(Math.random() * quotes.length)];