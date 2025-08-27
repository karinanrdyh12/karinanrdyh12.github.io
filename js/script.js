document.addEventListener('DOMContentLoaded', function() {
    // Fungsionalitas Smooth Scrolling & Navigasi
    // Memastikan hanya tautan internal (ke #ID) yang menggunakan e.preventDefault()
    // Ini memungkinkan tautan ke file .html lain berfungsi normal
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - (document.querySelector('.navbar').offsetHeight),
                    behavior: 'smooth'
                });
            }
        });
    });

    // Toggle Navigasi Mobile
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Portfolio Filtering (Hanya untuk halaman index.html)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (filterButtons.length > 0 && portfolioItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.dataset.filter;

                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        setTimeout(() => item.style.opacity = '1', 10);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => item.style.display = 'none', 300);
                    }
                });
            });
        });
    }
    
    // --- Fungsionalitas Modal Video ---
    // Kode ini sekarang bekerja di halaman manapun yang memiliki elemen-elemen ini.

    // Modal untuk YouTube Embed (untuk halaman index.html)
    const viewProjectButtons = document.querySelectorAll('.view-project-btn');
    const modal = document.getElementById('videoModal');
    const closeBtn = document.querySelector('.modal .close-button');
    const videoContainer = document.querySelector('.modal .video-container');

    if (viewProjectButtons.length > 0 && modal) {
        viewProjectButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const videoId = this.dataset.videoId;
                const videoEmbedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`;
                videoContainer.innerHTML = `<iframe src="${videoEmbedUrl}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
                videoContainer.innerHTML = '';
                document.body.style.overflow = 'auto';
            });
        }
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
                videoContainer.innerHTML = '';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Modal untuk HTML5 Video (untuk halaman yessherun-project.html)
    const modalVideo = document.getElementById('videoModal');
    const modalCloseButton = document.querySelector('.modal .close-button');
    const modalVideoPlayer = document.getElementById('modalVideo');
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');

    if (videoThumbnails.length > 0 && modalVideo) {
        videoThumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                const videoSrc = this.dataset.videoSrc;
                modalVideoPlayer.src = videoSrc;
                modalVideo.style.display = 'flex';
                modalVideoPlayer.play();
                document.body.style.overflow = 'hidden';
            });
        });

        if (modalCloseButton) {
            modalCloseButton.addEventListener('click', () => {
                modalVideo.style.display = 'none';
                modalVideoPlayer.pause();
                modalVideoPlayer.src = '';
                document.body.style.overflow = 'auto';
            });
        }
        window.addEventListener('click', (event) => {
            if (event.target === modalVideo) {
                modalVideo.style.display = 'none';
                modalVideoPlayer.pause();
                modalVideoPlayer.src = '';
                document.body.style.overflow = 'auto';
            }
        });
    }
    // --- Akhir Fungsionalitas Modal Video ---
});
