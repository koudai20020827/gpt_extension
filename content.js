
// Function to send message to ChatGPT
function sendMessageToChatGPT(message) {
    // Find the input placeholder element
    const inputBox = document.querySelector('p[data-placeholder="ChatGPT にメッセージを送信する"]');

    if (inputBox) {
        console.log("Input box found, inserting message...");

        // Simulate typing by setting the innerHTML or text content of the element
        inputBox.innerHTML = message;

        // Find the send button using aria-label or data-testid
        const sendButton = document.querySelector('button[aria-label="プロンプトを送信する"]');

        if (sendButton) {
            console.log("Send button found, clicking...");
            sendButton.click();
        } else {
            console.error("Send button not found.");
        }
    } else {
        console.error("Input box not found.");
    }
}

// Listening for messages from popup.js to send the message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'sendMessage') {
        console.log("Received message to send:", request.message);
        sendMessageToChatGPT(request.message);
        sendResponse({ status: 'Message sent' });
    }
});
