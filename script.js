// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Ignora se for apenas "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();

            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== INTERSECTION OBSERVER PARA ANIMAÇÕES =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Anima cards e seções quando aparecem na tela
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(`
        .pain-card,
        .agent-card,
        .process-step,
        .testimonial-card,
        .metric-card
    `);

    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        animateOnScroll.observe(el);
    });
});

// ===== CONTADOR ANIMADO PARA MÉTRICAS =====
const animateCounter = (element, target, suffix = '') => {
    const duration = 2000; // 2 segundos
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    };

    updateCounter();
};

// Observa quando as métricas aparecem na tela para iniciar a animação
const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');

            const value = entry.target.textContent.trim();

            // Detecta o tipo de métrica e anima
            if (value.includes('X')) {
                const num = parseInt(value);
                animateCounter(entry.target, num, 'X');
            } else if (value.includes('%')) {
                const num = parseInt(value.replace('-', '').replace('%', ''));
                const isNegative = value.includes('-');
                animateCounter(entry.target, num, '%');
                if (isNegative) {
                    entry.target.textContent = '-' + entry.target.textContent;
                }
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const metricValues = document.querySelectorAll('.metric-value');
    metricValues.forEach(metric => metricsObserver.observe(metric));
});

// ===== BOTÃO WHATSAPP FLUTUANTE (OPCIONAL) =====
const createFloatingWhatsApp = () => {
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/5511999999999?text=Olá!%20Quero%20conhecer%20os%20agentes%20de%20IA';
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.setAttribute('aria-label', 'Contato WhatsApp');
    whatsappBtn.innerHTML = `
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
    `;

    // Estilos do botão flutuante
    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-float {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
            z-index: 1000;
            transition: all 0.3s ease;
            text-decoration: none;
        }

        .whatsapp-float:hover {
            transform: scale(1.1) translateY(-2px);
            box-shadow: 0 6px 28px rgba(37, 211, 102, 0.5);
        }

        .whatsapp-float svg {
            animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }

        @media (max-width: 768px) {
            .whatsapp-float {
                bottom: 20px;
                right: 20px;
                width: 55px;
                height: 55px;
            }
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(whatsappBtn);
};

// Cria o botão flutuante após o carregamento da página
document.addEventListener('DOMContentLoaded', createFloatingWhatsApp);

// ===== LAZY LOADING DE IMAGENS (SE HOUVER) =====
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ===== RASTREAMENTO DE EVENTOS (OPCIONAL - GOOGLE ANALYTICS) =====
const trackEvent = (category, action, label) => {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
};

// Rastreia cliques nos CTAs
document.addEventListener('DOMContentLoaded', () => {
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent.trim();
            trackEvent('CTA', 'Click', buttonText);
        });
    });
});

// ===== PREVENÇÃO DE SCROLL DURANTE LOADING =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== PARALLAX SUAVE NOS ORBS DO HERO =====
document.addEventListener('DOMContentLoaded', () => {
    const orbs = document.querySelectorAll('.gradient-orb');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        orbs.forEach((orb, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            orb.style.transform = `translateY(${yPos}px)`;
        });
    });
});

// ===== MENSAGEM DE CONSOLE PARA DESENVOLVEDORES =====
console.log('%c🚀 Landing Page Agentes de IA', 'font-size: 20px; font-weight: bold; color: #15a69e;');
console.log('%cDesenvolvido com foco em conversão e performance', 'font-size: 12px; color: #94a3b8;');
console.log('%cProcurando por talentos? Entre em contato!', 'font-size: 12px; color: #ff6b35;');

// ===== VALIDAÇÃO DE FORMULÁRIOS (SE ADICIONAR FORMULÁRIO) =====
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePhone = (phone) => {
    const re = /^[\d\s\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
};

// ===== DETECÇÃO DE DISPOSITIVO =====
const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Ajusta comportamento para mobile
if (isMobile()) {
    document.body.classList.add('mobile-device');
}

// ===== PERFORMANCE MONITORING =====
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Página carregada em ${pageLoadTime}ms`);
    }
});