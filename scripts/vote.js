import { db } from "./firebase.js";

document.getElementById("voteForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const candidateId = document.getElementById("candidateSelect").value;
  const userId = auth.currentUser.uid;

  const voteRef = db.collection("votes").doc(candidateId);
  voteRef.update({
    votes: firebase.firestore.FieldValue.increment(1),
  }).then(() => {
    // Update user record to mark as voted
    const userRef = db.collection("users").doc(userId);
    userRef.update({
      hasVoted: true,
    });

    alert("Vote successful!");
    window.location.href = "results.html"; // Redirect to results page
  }).catch((error) => {
    console.error("Error voting:", error);
  });
});
