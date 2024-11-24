document.getElementById("askButton").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value;
    const responseDiv = document.getElementById("response");
    responseDiv.innerHTML = "Processing your request...";

    const apiKey = "AIzaSyBgv5aiytRXfsBiY3hEY9G08QfIFc8xEs0";
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const requestBody = {
        contents: [
            {
                parts: [
                    {
                        text: userInput,
                    },
                ],
            },
        ],
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const aiResponse = data.contents[0].parts[0].text;
        responseDiv.innerHTML = aiResponse;
    } catch (error) {
        responseDiv.innerHTML = `Error: ${error.message}`;
    }
});
