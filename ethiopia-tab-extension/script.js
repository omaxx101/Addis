document.addEventListener("DOMContentLoaded", () => {

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
  
    // Background images
    const images = [
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b",
      "https://images.unsplash.com/photo-1597214840166-3c0a2b0b3f76",
      "https://images.unsplash.com/photo-1576675466969-38eeae4b41f6",
      "https://images.unsplash.com/photo-1589396575653-2a0b8a0b8b8b"
    ];
  
    const img = images[Math.floor(Math.random() * images.length)];
    document.body.style.backgroundImage =
      `url(${img}?auto=format&fit=crop&w=1600&q=80)`;
  
  });