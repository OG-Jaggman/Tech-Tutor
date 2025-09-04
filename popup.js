let device = null;

document.addEventListener("DOMContentLoaded", () => {
  const messages = document.getElementById("messages");
  const questionInput = document.getElementById("question");
  const sendBtn = document.getElementById("send");
  const changeDeviceBtn = document.getElementById("change-device");
  const deviceSelection = document.getElementById("device-selection");

  document.querySelectorAll(".device-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      device = btn.dataset.device;
      messages.innerHTML += `<div class="message tutor">Tutor: Great! I’ll help you with ${device}.</div>`;
      deviceSelection.style.display = "none";
      changeDeviceBtn.style.display = "block";
    });
  });

  changeDeviceBtn.addEventListener("click", () => {
    deviceSelection.style.display = "block";
    changeDeviceBtn.style.display = "none";
  });

  sendBtn.addEventListener("click", async () => {
    const question = questionInput.value.trim();
    if (!question) return;
    messages.innerHTML += `<div class="message student">Student: ${question}</div>`;
    questionInput.value = "";
    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, device })
      });
      const data = await response.json();
      messages.innerHTML += `<div class="message tutor">Tutor: ${data.answer}</div>`;
      messages.scrollTop = messages.scrollHeight;
    } catch {
      messages.innerHTML += `<div class="message tutor">Tutor: Error contacting AI service.</div>`;
    }
  });
});
