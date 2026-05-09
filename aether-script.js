class AetherPortfolio {
  constructor() {
    this.loader = document.querySelector('.aether-loader');
    this.tiltElements = document.querySelectorAll('[data-tilt]');
    
    this.init();
    this.bindEvents();
  }

  init() {
    setTimeout(() => {
      this.loader.classList.add('fade');
    }, 2000);
  }

  bindEvents() {
    // Stats counter
    this.initCounters();
    
    // Skill bars
    this.initSkillBars();
    
    // Tilt effects
    this.initTilt();
    
    // Form handler
    document.querySelector('.contact-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.showFormSuccess();
    });
    
    // Nav progress
    window.addEventListener('scroll', () => {
      this.updateNavProgress();
    });
  }

  initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.dataset.count;
          const increment = target / 50;
          let current = 0;
          
          const timer = setInterval(() => {
            current += increment;
            if (current < target) {
              counter.textContent = Math.floor(current);
            } else {
              counter.textContent = target;
              clearInterval(timer);
            }
          }, 30);
        }
      });
    });
    
    counters.forEach(counter => observer.observe(counter));
  }

  initSkillBars() {
    const bars = document.querySelectorAll('.skill-fill[data-width]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.dataset.width;
          bar.style.width = width + '%';
        }
      });
    });
    
    bars.forEach(bar => observer.observe(bar));
  }

  initTilt() {
    this.tiltElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        
        el.style.transform = `
          perspective(1000px)
          rotateX(${y * 10}deg)
          rotateY(${x * -10}deg)
        `;
      });
      
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    });
  }

  updateNavProgress() {
    const scroll = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;
    const progress = (scroll / height) * 100;
    document.querySelector('.nav-progress').style.transform = `scaleX(${progress / 100})`;
  }

  showFormSuccess() {
    const btn = document.querySelector('.contact-form button');
    const original = btn.textContent;
    
    btn.textContent = 'Sent! ✨';
    btn.style.background = '#10b981';
    
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      document.querySelector('.contact-form').reset();
    }, 2000);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AetherPortfolio();
});
