document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll("[data-filter-btn]");
    const projectItems = document.querySelectorAll("[data-filter-item]");
    const schoolProjectsGallery = document.querySelector('.school-projects-gallery');
    const ecommerceGallery = document.querySelector('.ecommerce-projects-gallery');
    const allGalleries = [schoolProjectsGallery, ecommerceGallery];

    // Hide all project items initially
    allGalleries.forEach(gallery => gallery.style.display = 'none');

    // Handle filter navigation
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Remove active class from all buttons
            filterBtns.forEach(button => button.classList.remove('active'));
            this.classList.add('active');

            // Hide all galleries initially
            allGalleries.forEach(gallery => gallery.style.display = 'none');

            // Show the correct gallery based on the clicked button
            if (this.textContent.includes('School Projects')) {
                schoolProjectsGallery.style.display = 'grid';
            } else if (this.textContent.includes('Ecommerce Web Development')) {
                ecommerceGallery.style.display = 'grid';
            } else {
                allGalleries.forEach(gallery => gallery.style.display = 'grid');
            }
        });
    });

    // Project Image Modal (Zoom) with next/prev navigation
    const galleryImages = document.querySelectorAll(".gallery img");
    const modal = document.createElement("div");
    modal.classList.add("modal");
    document.body.appendChild(modal);

    let currentIndex = 0;
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function () {
            currentIndex = index;
            openModal(img.src);
        });
    });
    

    function openModal(src) {
        modal.innerHTML = `
            <img class="modal-img" src="${src}">
            <span class="close-modal">&times;</span>
            <span class="prev">&#10094;</span>
            <span class="next">&#10095;</span>
        `;
        modal.style.display = "block";

        document.querySelector('.close-modal').addEventListener('click', closeModal);
        document.querySelector('.next').addEventListener('click', nextImage);
        document.querySelector('.prev').addEventListener('click', prevImage);
    }

    function closeModal() {
        modal.style.display = "none";
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryImages.length;
        modal.querySelector('.modal-img').src = galleryImages[currentIndex].src;
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        modal.querySelector('.modal-img').src = galleryImages[currentIndex].src;
    }

    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });
});
