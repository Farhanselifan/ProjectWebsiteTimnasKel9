// ===================================
// 1. ScrollSpy: Update Nav Active State (Untuk index.html)
// ===================================
// Memastikan kode hanya berjalan jika ada section
if (document.querySelector('section[id]')) { 
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav a.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Hapus state aktif dari semua tautan
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                });
                
                // Set state aktif pada tautan yang sesuai
                const activeLink = document.querySelector(`.navbar-nav a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    activeLink.setAttribute('aria-current', 'page');
                }
            }
        });
    }, {
        // Offset (margin atas) agar tidak tumpang tindih dengan Fixed Navbar
        rootMargin: "-100px 0px -50% 0px", 
        threshold: 0.01 
    });

    sections.forEach(section => {
        observer.observe(section);
    });
}


// ===================================
// 2. Smooth Scroll (Kode Anda yang sudah ada, diperbaiki untuk cross-page link)
// ===================================
document.querySelectorAll('a.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Cek jika tautan adalah in-page (hash) DAN berada di halaman yang sama
        if(this.hash !== "" && this.pathname === window.location.pathname) {
            e.preventDefault();
            const hash = this.hash;
            document.querySelector(hash).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


// ===================================
// 3. Validasi Form Register (Untuk register.html)
// ===================================
function validateRegistration() {
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Clear previous validation status
    document.getElementById('password').classList.remove('is-invalid');
    document.getElementById('confirm-password').classList.remove('is-invalid');

    if (password !== confirmPassword) {
        alert('Kesalahan: Password dan Konfirmasi Password tidak cocok!');
        document.getElementById('password').classList.add('is-invalid');
        document.getElementById('confirm-password').classList.add('is-invalid');
        return false; 
    }

    alert('Registrasi berhasil! (Simulasi)');
    return true; 
}