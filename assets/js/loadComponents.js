window.onload = function () {
    let cachedHeader = localStorage.getItem("header");
    let cachedSidebar = localStorage.getItem("sidebar");

    if (cachedHeader && cachedSidebar) {
        insertComponents(cachedHeader, cachedSidebar);
    } else {
        Promise.all([
            fetch("/components/header.html").then(response => response.text()),
            fetch("/components/sidebar.html").then(response => response.text())
        ])
        .then(([headerData, sidebarData]) => {
            localStorage.setItem("header", headerData);
            localStorage.setItem("sidebar", sidebarData);
            insertComponents(headerData, sidebarData);
        })
        .catch(error => console.error("Error loading components:", error));
    }
};

function insertComponents(headerData, sidebarData) {
    const headerElement = document.querySelector("#header");
    const sidebarElement = document.querySelector("#sidebar");

    if (headerElement) {
        headerElement.innerHTML = headerData; // Replaces only the inner content of <header id="header">
    }
    if (sidebarElement) {
        sidebarElement.innerHTML = sidebarData; // Replaces only the inner content of <div id="sidebar">
    }
}