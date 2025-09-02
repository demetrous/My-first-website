// Small site interactivity: theme toggle + contact form validation
document.addEventListener("DOMContentLoaded", () => {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const htmlRoot = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const saved = localStorage.getItem("theme");
  if (saved === "dark") htmlRoot.classList.add("dark");
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = htmlRoot.classList.toggle("dark");
      themeToggle.setAttribute("aria-pressed", String(isDark));
      localStorage.setItem("theme", isDark ? "dark" : "light");
    });
  }

  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (form) {
    const endpoint = form.getAttribute("data-endpoint");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.textContent = "";
      const submitButton = form.querySelector('button[type="submit"]');
      const formData = new FormData(form);
      const name = formData.get("name")?.toString().trim();
      const email = formData.get("email")?.toString().trim();
      const message = formData.get("message")?.toString().trim();
      if (!name || !email || !message) {
        status.textContent = "Please fill name, email and message.";
        return;
      }

      // Provide immediate feedback
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      try {
        if (!endpoint || endpoint.includes("YOUR_ID")) {
          // Local demo mode when no endpoint configured
          await new Promise((r) => setTimeout(r, 700));
          status.textContent =
            "Demo: message simulated (no endpoint configured).";
          form.reset();
          return;
        }

        // Send as JSON — many endpoints accept form-encoded, adjust if needed
        const payload = Object.fromEntries(formData.entries());
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          status.textContent = "Thanks — I received your message.";
          form.reset();
        } else {
          const txt = await res.text().catch(() => res.statusText || "error");
          status.textContent = `Send failed: ${txt}`;
        }
      } catch (err) {
        status.textContent = "Network error while sending message.";
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Send message";
        }
      }
    });
  }
});
