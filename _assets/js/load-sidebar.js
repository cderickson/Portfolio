// Function to load the sidebar template
function loadSidebar() {
    // Create a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();
    
    // Get the current page's path to determine the correct relative path to the template
    const currentPath = window.location.pathname;
    const isRoot = currentPath.endsWith('/') || currentPath.endsWith('index.html');
    const templatePath = isRoot ? '_templates/sidebar.html' : '../_templates/sidebar.html';
    
    // Open the request
    xhr.open('GET', templatePath, true);
    
    // Set up the callback
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Insert the sidebar HTML into the wrapper div
            const wrapper = document.getElementById('wrapper');
            if (wrapper) {
                wrapper.insertAdjacentHTML('afterbegin', xhr.responseText);
            }
        }
    };
    
    // Send the request
    xhr.send();
}

// Load the sidebar when the page loads
document.addEventListener('DOMContentLoaded', loadSidebar); 