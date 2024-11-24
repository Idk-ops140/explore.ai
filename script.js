// Select DOM elements
const askButton = document.getElementById("askButton");
const userInput = document.getElementById("userInput");
const responseDiv = document.getElementById("response");

// API key and endpoint
const apiKey = "AIzaSyBgv5aiytRXfsBiY3hEY9G08QfIFc8xEs0";
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

/**
 * Send a request to the Gemini API and return the response.
 * @param {string} question - User's input question.
 * @returns {Promise<string>} - The AI's response text.
 */
async function fetchAIResponse(question) {
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
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        const aiResponse = data?.contents?.[0]?.parts?.[0]?.text;

        if (!aiResponse) {
            throw new Error("Unexpected API response structure.");
        }

        return aiResponse;
    } catch (error) {
        console.error("Error fetching AI response:", error);
        throw new Error("Failed to fetch a response. Please try again later.");
    }
}

/**
 * Handle the button click event.
 */
async function handleAskButtonClick() {
    const question = userInput.value.trim();

    if (!question) {
        responseDiv.innerHTML = `<p style="color: red;">Please enter a question before submitting.</p>`;
        return;
    }

    // Display loading message
    responseDiv.innerHTML = `<p>Processing your request...</p>`;

    try {
        // Fetch AI response
        const aiResponse = await fetchAIResponse(question);

        // Display AI response
        responseDiv.innerHTML = `<p>${aiResponse}</p>`;
    } catch (error) {
        // Display error message
        responseDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
}

// Attach event listener to the "Ask" button
askButton.addEventListener("click", handleAskButtonClick);

// Allow pressing "Enter" to trigger the Ask button
userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        handleAskButtonClick();
    }
});
