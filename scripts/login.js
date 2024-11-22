// Access Firebase Auth from the global object
const auth = firebase.auth();

document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission
  
  // Get user input
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
      // Handle errors
      alert(`Error: ${error.message}`);
      console.error(error);
    });
});

function checkVotingStatus(user) {
  const userRef = db.collection("users").doc(user.uid);
  userRef.get().then((doc) => {
    if (doc.exists && doc.data().hasVoted) {
      alert("You have already voted.");
      // Prevent voting or redirect to results page
    } else {
      // Allow user to vote
      window.location.href = "vote.html"; // Redirect to vote page
    }
  });
}