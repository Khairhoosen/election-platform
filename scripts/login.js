// Access Firebase Auth from the global object
const auth = firebase.auth();

document.addEventListener("DOMContentLoaded", () => {
  const loadingIndicator = document.getElementById("loading");

  if (!loadingIndicator) {
    console.error("Loading indicator element not found!");
    return; // Exit if the element doesn't exist
  }

  document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Show loading indicator
    loadingIndicator.style.display = "block";


    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Log in user with Firebase
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Successfully logged in
        const user = userCredential.user;
        alert("Login successful!");
        console.log("User:", user);

        // Redirect to voting page or check voting status
        checkVotingStatus(user);
      })
      .catch((error) => {
        alert(`Error: ${error.message}`);
        console.error(error);
      })
      .finally(() => {

        loadingIndicator.style.display = "none";
      });
  });
});

function checkVotingStatus(user) {
  const userRef = db.collection("users").doc(user.uid);
  userRef.get().then((doc) => {
    if (doc.exists && doc.data().hasVoted) {
      alert("You have already voted.");
      // Prevent voting or redirect to results page
      window.location.href = "results.html";  
      // Allow user to vote
      window.location.href = "vote.html"; 
    }
  });
}
