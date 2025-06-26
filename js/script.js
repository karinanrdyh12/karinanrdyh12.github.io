document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-links a, .btn-primary').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (document.querySelector('.navbar').offsetHeight), // Sesuaikan dengan tinggi navbar
                    behavior: 'smooth'
                });
            }

            // Close mobile menu after clicking link
            if (window.innerWidth <= 768) {
                document.querySelector('.nav-links').classList.remove('active');
                document.querySelector('.hamburger').classList.remove('active');
            }
        });
    });

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'block'; // Or 'grid' if you prefer for grid layout
                    setTimeout(() => item.style.opacity = '1', 10); // Simple fade in
                } else {
                    item.style.opacity = '0'; // Simple fade out
                    setTimeout(() => item.style.display = 'none', 300); // Hide after fade
                }
            });
        });
    });

    // Video Modal Functionality
    const videoModal = document.getElementById('videoModal');
    const closeButton = document.querySelector('.modal .close-button');
    const videoContainer = document.querySelector('.modal .video-container');

    document.querySelectorAll('.view-project-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const videoId = this.dataset.videoId; // Ambil ID video dari data-video-id
            // Untuk YouTube, format URL: https://www.youtube.com/embed/[VIDEO_ID]?autoplay=1&modestbranding=1&rel=0
            // Untuk Vimeo, format URL: https://player.vimeo.com/video/[VIDEO_ID]?autoplay=1&loop=0&byline=0&portrait=0
            const videoEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`; // Contoh YouTube

            videoContainer.innerHTML = `<iframe src="${videoEmbedUrl}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
            videoModal.style.display = 'flex'; // Tampilkan modal
            document.body.style.overflow = 'hidden'; // Mencegah scrolling di belakang modal
        });
    });

    closeButton.addEventListener('click', () => {
        videoModal.style.display = 'none'; // Sembunyikan modal
        videoContainer.innerHTML = ''; // Hapus iframe video untuk menghentikan putar
        document.body.style.overflow = 'auto'; // Aktifkan scrolling kembali
    });

    window.addEventListener('click', (event) => {
        if (event.target === videoModal) {
            videoModal.style.display = 'none';
            videoContainer.innerHTML = '';
            document.body.style.overflow = 'auto';
        }
    });

    // Navbar sticky on scroll (optional, already fixed)
    // You can add a class to the navbar if you want it to change style on scroll
    // window.addEventListener('scroll', () => {
    //     const navbar = document.querySelector('.navbar');
    //     if (window.scrollY > 50) { // When scrolled down 50px
    //         navbar.classList.add('scrolled'); // Add a class for different style
    //     } else {
    //         navbar.classList.remove('scrolled');
    //     }
    // });
});