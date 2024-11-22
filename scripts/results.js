import { db } from "./firebase.js";

window.addEventListener("DOMContentLoaded", () => {
  const resultsContainer = document.getElementById("resultsContainer");

  if (!resultsContainer) {
    console.error("Results container element not found!");
    return; // Exit if the element doesn't exist
  }

  // Fetch the vote results from the database
  db.collection("votes").get().then((querySnapshot) => {
    let resultsHTML = "<h2>Poll Results</h2>";
    querySnapshot.forEach((doc) => {
      const candidate = doc.id;
      const votes = doc.data().votes;
      resultsHTML += `<p>Candidate: ${candidate} - Votes: ${votes}</p>`;
    });

    resultsContainer.innerHTML = resultsHTML;
  }).catch((error) => {
    console.error("Error fetching results:", error);
    resultsContainer.innerHTML = "<p>Failed to load results.</p>";
  });
});
