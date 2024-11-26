import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = 3000;
const apiKey = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzIyOTQ4MjYsImF1ZCI6Imh0dHBzOi8vbWFpbGNoZWNrLmVuZHBvaW50cy5tYWlsY2hlY2stMi1wcm9kLmNsb3VkLmdvb2ciLCJpc3MiOiJodHRwczovL2FwcC5tYWlsY2hlY2suY28iLCJzdWIiOiJjdzJua1NsZ3JwVnA5YUg3VmpScUlWSTFGMHYyIiwianRpIjoiZTg4N2U1ZWMtMjJlNy00ZjgyLTg5Y2YtZDc4MTY0MWY2ZDdmIn0.ich6YrTuxSp39yMl47Q9wE3rcbvGS4cNC14r2O6ooK9Cq2m4zNOxansU0Kgk775ksEAVp3cMynLdqZPaTMFsCDFogLzNU8SsleTKHLC_G7eKm7zCnddcZRzy0d2BgD6yHlui_gRMvAGTgtF5YO2OiXjc58h-yZkljPfT1cKZW4Rpj_NP0VYeqG6XQJsb0hOoCSuusQP9UAdAIIqIeclvTjblxP34BHi5g4RhSWEmrIa7fslOQfPoS8rt42I-oqJGt8TRtYgFLmkJczN06QxcvOwBP5-Aj6d5M40dWR-lx_77T_A3ODJWrrwfbtIn6tHgc9D6hZ1jMoLoUlye2DOK0Q"; // Replace with your MailCheck API key

app.use(cors({ origin: '*' })); 
app.use(express.json()); // Parse JSON request bodies

// Endpoint to validate email
app.post("/validate-email", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const url = "https://api.mailcheck.co/v1/singleEmail:check";
  console.log("Validation URL:", url);

  const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json"
  };

  const body = JSON.stringify({
    email: email
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: body
    });

    const data = await response.json();

    console.log("Response Status:", response.status);  // Log the status code
    console.log("Response Data:", data);  // Log the data from MailCheck API

    if (!response.ok) {
      throw new Error(`Failed to validate email with MailCheck: ${data.error?.message || 'Unknown error'}`);
    }

    res.json({
      trustRate: data.trustRate,
      isNotDisposable: data.isNotDisposable,
      isNotSmtpCatchAll: data.isNotSmtpCatchAll
    });
  } catch (error) {
    console.error("Error validating email:", error.message);
    res.status(500).json({ error: "Server error validating email" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
