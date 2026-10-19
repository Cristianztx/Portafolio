// ===== ACTUALIZAR AÑO EN FOOTER =====
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// ===== VALIDACIÓN Y ENVÍO DE FORMULARIO =====
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener valores
        const nombre = document.getElementById('nombre').value.trim();
        const email = document.getElementById('email').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();

        // Validación básica
        if (!nombre || !email || !mensaje) {
            showMessage('Por favor completa todos los campos obligatorios.', 'danger');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage('Por favor ingresa un email válido.', 'danger');
            return;
        }

        // Simular envío (reemplazar con servicio real como Formspree, EmailJS, etc.)
        showMessage('¡Gracias por tu mensaje! Te contactaré pronto. 🚀', 'success');
        contactForm.reset();

        // Opcional: Redirigir a mailto si no hay backend
        // window.location.href = `mailto:cristiansorw@gmail.com?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(`Nombre: ${nombre}\nEmail: ${email}\n\n${mensaje}`)}`;
    });
}

// ===== VALIDAR EMAIL =====
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== MOSTRAR MENSAJES =====
function showMessage(text, type) {
    formMessage.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${text}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
        const alert = formMessage.querySelector('.alert');
        if (alert) {
            alert.classList.remove('show');
            setTimeout(() => formMessage.innerHTML = '', 300);
        }
    }, 5000);
}

// ===== EFECTO SCROLL NAVBAR =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow');
            navbar.style.background = 'rgba(33, 37, 41, 0.95)';
        } else {
            navbar.classList.remove('shadow');
            navbar.style.background = '';
        }
    }
});

// ===== SMOOTH SCROLL PARA ENLACES INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Cerrar menú móvil si está abierto
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    bsCollapse?.hide();
                }
            }
        }
    });
});

// ===== ANIMACIÓN AL HACER SCROLL (Intersection Observer) =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__fadeInUp');
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar observador a elementos con clase 'animate-on-scroll'
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// ===== TRACKING DE CLICS EN ENLACES EXTERNOS (OPCIONAL) =====
document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Clic en enlace externo:', link.href);
        // Aquí puedes integrar Google Analytics u otro servicio de tracking
        // Ej: gtag('event', 'click', { event_category: 'external', event_label: link.href });
    });
});

// ===== EFECTO PARALLAX SUAVE EN HERO (OPCIONAL) =====
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero-section');
    if (hero) {
        const scrolled = window.scrollY;
        hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
    }
});
/* ===== OBSERVADOR DE SCROLL (REVEAL) ===== */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target); // Solo anima una vez
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal, .timeline-item').forEach(el => {
    revealObserver.observe(el);
});

/* ===== EFECTO DE ESCRITURA EN HERO ===== */

const typingElement = document.getElementById('typing-text');

if (typingElement) {
    const phrases = [
        "Desarrollador Web",
        "Analista de Sistemas",
        "Entusiasta de la Tecnología"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        // ESCRIBIR
        if (!isDeleting) {
            charIndex++;
            typingElement.textContent = currentPhrase.substring(0, charIndex);
        }
        // BORRAR
        else {
            charIndex--;
            typingElement.textContent = currentPhrase.substring(0, charIndex);
        }

        let typeSpeed = isDeleting ? 50 : 100;

        // Cuando termina de escribir
        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 1800; // pausa
            isDeleting = true;
        }

        // Cuando termina de borrar
        else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 400;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}


/* ===== PARALLAX SUTIL EN HERO (RENDIMIENTO OPTIMIZADO) ===== */
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.scrollY;
            const hero = document.querySelector('.hero-section');
            if (hero && scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = `${scrolled * 0.3}px`;
            }
            ticking = false;
        });
        ticking = true;
    }
})