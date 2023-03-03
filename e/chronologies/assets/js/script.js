const insert = document.getElementById('insert');
const checkbox = document.getElementById('checkbox');
const html = document.querySelector('html');

// Check if dark mode is enabled from previous session
const darkMode = localStorage.getItem('darkMode');

// If dark mode is enabled, add the class to the body
if (darkMode) {
    html.classList.add('dark');
    checkbox.checked = true;
}

// Listen for a click on the checkbox
checkbox.addEventListener('change', (e) => {
    // If the checkbox is checked, add the dark class and save the dark mode preference to local storage
    if (e.target.checked) {
        html.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
    } else {
        // If the checkbox is not checked, remove the dark class and remove the dark mode preference from local storage
        html.classList.remove('dark');
        localStorage.removeItem('darkMode');
    }
});

// Listen for a keydown event on the window object
window.addEventListener('keydown', (e) => {
    // Insert the key code into the div
    insert.innerHTML = `
        <div class="key">
            ${e.key === ' ' ? 'Space' : e.key}
            <small>event.key</small>
            <span class="tooltip">Copy</span>
        </div>
        <div class="key">
            ${e.code}
            <small>event.code</small>
            <span class="tooltip">Copy</span>
        </div>
        <div class="key deprecated">
            ${e.keyCode}
            <small>event.keyCode</small>
            <span class="tooltip">Copy</span>
        </div>
        `
    
    // Get all the keys
    const keys = document.querySelectorAll('.key');

    // Loop through all the keys
    keys.forEach((key) => {
        // Listen for a click on the key
        key.addEventListener("click", (e) => {
            // Get the text of the key and copy it to the clipboard
            const text = key.innerText.split('\n')[0];
            copyToClipboard(text);

            // Change the tooltip text to "Copied!"
            const tooltip = key.querySelector(".tooltip");
            tooltip.innerText = "Copied!";

            // Change the tooltip styles to hide it after 1 second
            setTimeout(() => {
                tooltip.style = "top: 50px; opacity: 0; pointer-events: none;";
            }, 1000);

            // Change the tooltip text back to "Copy" after 3 seconds and remove the tooltip styles
            setTimeout(() => {
                tooltip.innerText = "Copy";
                tooltip.removeAttribute("style");
            }, 3000);
        });
    });
});


// Function to copy text to clipboard
function copyToClipboard(text) {
    // copy text to clipboard using the new Clipboard API
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log('Copied to clipboard');
        })
        .catch(err => {
            console.error('Failed to copy!', err);
        });
}