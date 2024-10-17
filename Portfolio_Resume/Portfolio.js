document.addEventListener('DOMContentLoaded', function () {
    // About Me Section Toggle
    const aboutToggle = document.getElementById('about-toggle');
    const aboutContent = document.getElementById('about-content');

    aboutToggle.addEventListener('click', function () {
        aboutContent.classList.toggle('hidden');
        aboutToggle.textContent = aboutContent.classList.contains('hidden') ? 'Show About Me' : 'Hide About Me';
    });

    // Interests Section Toggle
    const interestToggle = document.getElementById('interest-toggle');
    const interestContent = document.getElementById('interest-content');

    interestToggle.addEventListener('click', function () {
        interestContent.classList.toggle('hidden');
        interestToggle.textContent = interestContent.classList.contains('hidden') ? 'Show Interests' : 'Hide Interests';
    });

    // Sidebar Toggle for Contact Information
    const sidebarBtn = document.querySelector("[data-sidebar-btn]");
    const sidebarMore = document.querySelector(".sidebar-info_more");

    sidebarBtn.addEventListener("click", function () {
        sidebarMore.classList.toggle("hidden");
        sidebarBtn.querySelector("span").textContent = sidebarMore.classList.contains('hidden') ? "Show Contacts" : "Hide Contacts";
    });

    // Contact Form Toggle
    const contactToggle = document.getElementById('contact-toggle');
    const contactContent = document.getElementById('contact-content');

    contactToggle.addEventListener('click', function () {
        contactContent.classList.toggle('hidden');
        contactToggle.textContent = contactContent.classList.contains('hidden') ? 'Show Contact' : 'Hide Contact';
    });

    // Projects Filter
    const filterBtns = document.querySelectorAll("[data-filter-btn]");
    const projectItems = document.querySelectorAll("[data-filter-item]");

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const category = this.textContent.trim().toLowerCase();

            filterBtns.forEach(button => button.classList.remove('active'));
            this.classList.add('active');

            projectItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category').toLowerCase();

                if (category === 'all' || itemCategory.includes(category)) {
                    item.classList.add('active');
                    item.style.display = 'block'; // Ensure item is visible
                } else {
                    item.classList.remove('active');
                    item.style.display = 'none'; // Hide non-active items
                }
            });
        });
    });

    // Project Image Modal (Zoom)
    const galleryImages = document.querySelectorAll(".zoomable-project img");
    const modal = document.createElement("div");
    modal.classList.add("modal");
    document.body.appendChild(modal);

    galleryImages.forEach(img => {
        img.addEventListener('click', function () {
            const imgSrc = this.src;
            const modalImg = document.createElement("img");
            modalImg.src = imgSrc;
            modalImg.classList.add("modal-img");
            modal.innerHTML = ''; // Clear modal content
            modal.appendChild(modalImg);

            const closeModal = document.createElement("span");
            closeModal.innerHTML = "&times;";
            closeModal.classList.add("close-modal");
            modal.appendChild(closeModal);

            modal.style.display = "block";

            // Close modal on click of close button
            closeModal.addEventListener('click', function () {
                modal.style.display = "none";
            });

            // Close modal when clicking outside the image
            window.addEventListener('click', function (event) {
                if (event.target === modal) {
                    modal.style.display = "none";
                }
            });
        });
    });

    // Right Sidebar - Random Quote Slideshow
    const quotes = [
        "The best time to plant a tree was 20 years ago. The second best time is now.",
        "Success is not the key to happiness. Happiness is the key to success.",
        "Don't watch the clock; do what it does. Keep going.",
        "Success usually comes to those who are too busy to be looking for it.",
        "Opportunities don't happen, you create them.",
        "The harder you work for something, the greater you'll feel when you achieve it."
    ];

    const quoteDisplay = document.querySelector('.quote-display');

    function displayRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteDisplay.textContent = quotes[randomIndex];
    }

    // Change quote every 10 to 15 seconds (randomly between those times)
    function getRandomInterval() {
        return Math.random() * 5000 + 10000; // Generates random time between 10,000ms (10s) and 15,000ms (15s)
    }

    function scheduleNextQuote() {
        displayRandomQuote();
        setTimeout(scheduleNextQuote, getRandomInterval()); // Recursively schedule next quote with random interval
    }
    

    // Initialize the first quote and schedule the rest
    scheduleNextQuote();

    // Contact Link Redirection from Experience or Projects pages
    const contactLink = document.getElementById('contact-link');

    if (contactLink) {
        contactLink.addEventListener('click', function (event) {
            const currentPage = window.location.pathname;

            // If user is on Experience or Projects pages, redirect to Portfolio.html#contact-section
            if (currentPage.includes('Experience.html') || currentPage.includes('Projects.html')) {
                event.preventDefault();
                window.location.href = 'Portfolio.html#contact-section';
            }
        });
    }
});
