const API_KEY = "HAE2u24oT5w0v7mr6d8tbHmNETZyoMvbONgHav7S"; // Ganti dengan API Key Cohere
const sendBtn = document.getElementById("send-btn");
const input = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");
const toggleBtn = document.getElementById("toggle-mode");

toggleBtn.onclick = () => {
  const isDark = document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode", !isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
  document.body.classList.toggle("dark-mode");
};

sendBtn.onclick = async () => {
  const userText = input.value.trim();
  if (!userText) return;
  appendMessage("Kamu", userText);
  input.value = "";
  try {
    const res = await fetch("https://api.cohere.ai/v1/chat", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: userText,
        model: "command-r-plus",
        temperature: 0.3
      })
    });
    const data = await res.json();
    const reply = data.text || "Maaf, terjadi kesalahan.";
    appendMessage("LyukovAI", reply);
  } catch (err) {
    appendMessage("LyukovAI", "Maaf, terjadi kesalahan koneksi.");
  }
};

function appendMessage(sender, text) {
  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
