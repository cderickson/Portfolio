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
                
                // Initialize the menu functionality after sidebar is loaded
                initializeMenu();
            }
        }
    };
    
    // Send the request
    xhr.send();
}

// Function to initialize menu functionality
function initializeMenu() {
    // Get all menu openers
    const openers = document.querySelectorAll('#menu .opener');
    
    // Add click event listeners to each opener
    openers.forEach(opener => {
        opener.addEventListener('click', function() {
            // Toggle the 'active' class on the opener
            this.classList.toggle('active');
            
            // Get the next sibling (the ul element)
            const submenu = this.nextElementSibling;
            
            // Toggle the display of the submenu
            if (submenu.style.display === 'none') {
                submenu.style.display = 'block';
            } else {
                submenu.style.display = 'none';
            }
        });
        
        // Initially hide all submenus
        const submenu = opener.nextElementSibling;
        if (submenu) {
            submenu.style.display = 'none';
        }
    });
}

// Load the sidebar when the page loads
document.addEventListener('DOMContentLoaded', loadSidebar); 