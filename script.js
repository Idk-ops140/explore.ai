// Select DOM elements
const askButton = document.getElementById("askButton");
const userInput = document.getElementById("userInput");
const responseDiv = document.getElementById("response");

// API key and URL
const apiKey = "AIzaSyBgv5aiytRXfsBiY3hEY9G08QfIFc8xEs0";
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

// Function to handle AI requests
async function getAIResponse(question) {
    const requestBody = {
        contents: [
            {
                parts: [
                    {
                        text: question,
                    },
                ],
            },
        ],
    };

    try {
        // Fetch the API response
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        // Check for HTTP errors
        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        // Parse JSON response
        const data = await response.json();

        // Extract the AI's response text
        if (
            data.contents &&
            data.contents[0] &&
            data.contents[0].parts &&
            data.contents[0].parts[0].text
        ) {
            return data.contents[0].parts[0].text;
        } else {
            throw new Error("Unexpected API response structure.");
        }
    } catch (error) {
        console.error("Error:", error.message);
        throw error;
    }
}

// Event listener for the button
askButton.addEventListener("click", async () => {
    const question = userInput.value.trim();

    if (!question) {
        responseDiv.innerHTML = "<p style='color: red;'>Please enter a question.</p>";
        return;
    }

    // Show loading message
    responseDiv.innerHTML = "<p>Processing your request...</p>";

    try {
        // Get the AI response
        const aiResponse = await getAIResponse(question);

        // Display the response
        responseDiv.innerHTML = `<p>${aiResponse}</p>`;
    } catch (error) {
        // Display error message
        responseDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
});

// Enable "Enter" key to trigger the button click
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        askButton.click();
    }
});
