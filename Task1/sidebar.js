const toggleBtn = document.getElementById("toggleBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const mainContent = document.getElementById("mainContent");

toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    mainContent.classList.toggle("shifted");
    
    // Change icon based on sidebar state
    if (sidebar.classList.contains("active")) {
    toggleBtn.classList.remove("fa-bars");
    toggleBtn.classList.add("fa-times");
    } else {
    toggleBtn.classList.remove("fa-times");
    toggleBtn.classList.add("fa-bars");
    }
});

// Close sidebar when clicking on overlay
overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    mainContent.classList.remove("shifted");
    toggleBtn.classList.remove("fa-times");
    toggleBtn.classList.add("fa-bars");
});