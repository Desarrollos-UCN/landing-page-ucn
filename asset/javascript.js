const track = document.getElementById('carouselTrack');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let index = 0;
  let visibleCards = 4;

  function updateVisibleCards() {
    if (window.innerWidth < 576) visibleCards = 1;
    else if (window.innerWidth < 992) visibleCards = 2;
    else visibleCards = 4;
  }

  function slideTo(index) {
    const cardWidth = track.querySelector('.carousel-card').offsetWidth + 20;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  }

  function slideNext() {
    const totalCards = track.querySelectorAll('.carousel-card').length;
    console.log(totalCards);
    updateVisibleCards();
    index++;
    if (index > totalCards - visibleCards) index = 0;
    slideTo(index);
  }

  function slidePrev() {
    const totalCards = track.querySelectorAll('.carousel-card').length;
    updateVisibleCards();
    index--;
    if (index < 0) index = totalCards - visibleCards;
    slideTo(index);
  }

  nextBtn.addEventListener('click', slideNext);
  prevBtn.addEventListener('click', slidePrev);
  window.addEventListener('resize', updateVisibleCards);

//   setInterval(slideNext, 5000); // Auto deslizamiento cada 1 segundo

const navbar = document.getElementById('miNavbar');

window.addEventListener('scroll', () => {
const scrollY = window.scrollY || window.pageYOffset;
const threshold = window.innerHeight / 2;

if (scrollY > threshold) {
    navbar.classList.add('fixed-visible');
} else {
    navbar.classList.remove('fixed-visible');
}
});

/*Footer */
document.addEventListener('DOMContentLoaded', function() {
    
    const contactItems = document.querySelectorAll('.footer-contact-item');
    
    contactItems.forEach(item => {
        const iconBox = item.querySelector('.icon-box');
        
        item.addEventListener('mouseenter', () => {
            iconBox.style.transform = 'scale(1.1)';
            iconBox.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            iconBox.style.transform = 'scale(1)';
            iconBox.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
    });
    
    
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-3px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });
});

/* contacto */
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
       
        const firstName = document.getElementById('firstName');
        const email = document.getElementById('email');
        const topic = document.getElementById('topic');
        const message = document.getElementById('message');
        let isValid = true;
        
        
        document.querySelectorAll('.error').forEach(el => el.remove());
        
        
        if (!firstName.value.trim()) {
            showError(firstName, 'Por favor ingresa tu nombre');
            isValid = false;
        }
        
        if (!email.value.trim() || !isValidEmail(email.value)) {
            showError(email, 'Por favor ingresa un email válido');
            isValid = false;
        }
        
        if (topic.value === '') {
            showError(topic, 'Por favor selecciona un tema');
            isValid = false;
        }
        
        if (!message.value.trim()) {
            showError(message, 'Por favor ingresa tu mensaje');
            isValid = false;
        }
        
        if (isValid) {
            
            alert('Formulario enviado correctamente. Nos pondremos en contacto contigo pronto.');
            contactForm.reset();
        }
    });
    
    function showError(input, message) {
        const error = document.createElement('div');
        error.className = 'error';
        error.style.color = 'red';
        error.style.fontSize = '0.8rem';
        error.style.marginTop = '5px';
        error.textContent = message;
        
        input.parentNode.appendChild(error);
        input.style.borderColor = 'red';
        
        input.addEventListener('input', function() {
            error.remove();
            input.style.borderColor = '#ddd';
        });
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});

/* nosotros */ 
document.addEventListener('DOMContentLoaded', function() {
    
    const header = document.querySelector('.about-header h1');
    
    header.addEventListener('mouseenter', () => {
        header.style.color = 'var(--primary-color)';
        header.style.transition = 'color 0.3s ease';
    });
    
    header.addEventListener('mouseleave', () => {
        header.style.color = 'var(--dark-gray)';
    });
    
    
    const paragraphs = document.querySelectorAll('.about-content p');
    
    paragraphs.forEach(p => {
        p.addEventListener('mouseenter', () => {
            p.style.transform = 'scale(1.02)';
            p.style.transition = 'transform 0.3s ease';
        });
        
        p.addEventListener('mouseleave', () => {
            p.style.transform = 'scale(1)';
        });
    });
});