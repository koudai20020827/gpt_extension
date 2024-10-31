
// Log function to send messages to the popup log area
function logMessage(message) {
    chrome.runtime.sendMessage({ log: message });
}

// Function to observe input box using MutationObserver with detailed logging
function observeInputBox() {
    logMessage("Start observing for input box...");
    const observer = new MutationObserver(() => {
        const inputBox = document.querySelector('textarea[placeholder="Send a message"]');
        if (inputBox) {
            logMessage("Input box found, inserting message...");
            observer.disconnect(); // Stop observing once input box is found
            sendMessageToChatGPT(inputBox);
        } else {
            logMessage("Input box not found. Retrying...");
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// Function to send a message to ChatGPT with logging
function sendMessageToChatGPT(inputBox) {
    try {
        logMessage("Attempting to send a message...");
        inputBox.value = "テストメッセージ";
        logMessage("Message inserted into input box.");

        // Dispatch input event to simulate user typing
        const event = new Event('input', { bubbles: true });
        inputBox.dispatchEvent(event);
        logMessage("Input event dispatched.");

        // Find and click the send button
        const sendButton = document.querySelector('button[aria-label="Send message"]');
        if (sendButton) {
            logMessage("Send button found, clicking...");
            sendButton.click();
            logMessage("Message sent successfully.");
        } else {
            logMessage("Send button not found.");
        }
    } catch (error) {
        logMessage("Error occurred while sending the message: " + error.message);
    }
}

// Listening for the message to send when the popup button is clicked
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'sendMessage') {
        logMessage("Send to GPT button pressed.");
        observeInputBox();
        sendResponse({ status: 'Message sent' });
    }
});

// Start observing DOM when the content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    logMessage("DOM fully loaded, waiting for user action...");
});
