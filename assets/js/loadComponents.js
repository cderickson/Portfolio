window.onload = function () {
    let cachedHeader = localStorage.getItem("header");
    let cachedSidebar = localStorage.getItem("sidebar");

    if (cachedHeader && cachedSidebar) {
        console.log("Using cached components");
        insertComponents(cachedHeader, cachedSidebar);
    } else {
        console.log("Fetching components...");
        Promise.all([
            fetch("/components/header.html").then(response => response.text()),
            fetch("/components/sidebar.html").then(response => response.text())
        ])
        .then(([headerData, sidebarData]) => {
            console.log("Fetched header:", headerData);
            console.log("Fetched sidebar:", sidebarData);
            
            localStorage.setItem("header", headerData);
            localStorage.setItem("sidebar", sidebarData);
            insertComponents(headerData, sidebarData);
        })
        .catch(error => console.error("Error loading components:", error));
    }
};

function insertComponents(headerData, sidebarData) {
    if (document.querySelector("#header-template")) {
        console.log("Inserting header content...");
        document.querySelector("#header").innerHTML = headerData;
    } else {
        console.error("Header element not found!");
    }

    if (document.querySelector("#sidebar")) {
        console.log("Inserting sidebar content...");
        document.querySelector("#sidebar").innerHTML = sidebarData;
    } else {
        console.error("Sidebar element not found!");
    }
}