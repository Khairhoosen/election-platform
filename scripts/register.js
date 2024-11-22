document.addEventListener("DOMContentLoaded", () => {
  const loadingIndicator = document.getElementById("loading");

  if (!loadingIndicator) {
    console.error("Loading indicator element not found!");
    return; // Exit if the element doesn't exist
  }

  document.getElementById("registerForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Show loading indicator
    loadingIndicator.style.display = "block";

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      // Validate email via the server proxy
      const response = await fetch("http://127.0.0.1:3000/validate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok || !data.isValid) {
        alert("Invalid or disposable email address. Please use a valid email.");
        loadingIndicator.style.display = "none";  // Hide loading indicator
        return;
      }

      // If email is valid, proceed with Firebase registration
      window.auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          alert("Registration successful!");
          console.log("User:", user);
        })
        .catch((error) => {
          alert(`Error: ${error.message}`);
          console.error(error);
        })
        .finally(() => {
          // Hide loading indicator after the process
          loadingIndicator.style.display = "none";
        });
    } catch (error) {
      alert("Error validating email.");
      console.error("Validation error:", error);
      loadingIndicator.style.display = "none";  // Hide loading indicator
    }
  });
});
