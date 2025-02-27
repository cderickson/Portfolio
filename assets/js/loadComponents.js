window.onload = function () {
    console.log("Forcing fresh component load...");

    // Force fresh fetch instead of using local storage
    Promise.all([
        fetch("components/header.html?v=" + new Date().getTime()).then(response => response.text()),
        fetch("components/sidebar.html?v=" + new Date().getTime()).then(response => response.text())
    ])
    .then(([headerData, sidebarData]) => {
        console.log("Fetched header:", headerData);
        console.log("Fetched sidebar:", sidebarData);
        
        insertComponents(headerData, sidebarData);
    })
    .catch(error => console.error("Error loading components:", error));
};

function insertComponents(headerData, sidebarData) {
    if (document.querySelector("#header-template")) {
        console.log("Inserting header content...");
        document.querySelector("#header-template").innerHTML = headerData;
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