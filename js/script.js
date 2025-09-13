// Modern Website JavaScript - Enhanced Version

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all features
  initLoading();
  initScrollEffects();
  initSmoothScrolling();
  initHeaderScroll();
  initFormHandling();
  initScrollToTop();
  initAnimations();
  initCounters();
  initTechNodes();
});

// Loading Animation
function initLoading() {
  const loading = document.querySelector(".loading");
  if (loading) {
    setTimeout(() => {
      loading.classList.add("hidden");
    }, 1000);
  }
}

// Header Scroll Effect
function initHeaderScroll() {
  const header = document.querySelector("header");
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      header.style.transform = "translateY(0)";
      if (scrollTop > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    lastScrollTop = scrollTop;
  });
}

// Smooth Scrolling for Navigation
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Account for fixed header

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Update active navigation link
        updateActiveNavLink(targetId);
      }
    });
  });
}

// Update Active Navigation Link
function updateActiveNavLink(activeId) {
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === activeId) {
      link.classList.add("active");
    }
  });
}

// Scroll Effects and Animations
function initScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");

        // Add bounce effect for feature cards
        if (entry.target.classList.contains("feature-card")) {
          entry.target.classList.add("bounce-in");
        }
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });
}

// Advanced Animations
function initAnimations() {
  // Remove parallax effect to prevent white space issues
  // Keeping other animations intact
  const hero = document.querySelector(".hero");
  if (hero) {
    // Reset any transform that might have been applied
    hero.style.transform = "none";
  }

  // Typing effect for hero text (optional)
  const heroText = document.querySelector(".hero-content h1");
  if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = "";
    let i = 0;

    const typeWriter = () => {
      if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    setTimeout(typeWriter, 500);
  }

  // Particle effect (simple)
  createParticles();
}

// Create Floating Particles
function createParticles() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            pointer-events: none;
        `;

    hero.appendChild(particle);
  }
}

// Add particle animation to CSS dynamically
const particleStyle = document.createElement("style");
particleStyle.textContent = `
    @keyframes float {
        0% { transform: translateY(0px) rotate(0deg); }
        100% { transform: translateY(-100vh) rotate(360deg); }
    }
`;
document.head.appendChild(particleStyle);

// Form Handling
function initFormHandling() {
  const form = document.querySelector(".contact-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Validate form
      if (validateForm(data)) {
        // Show success message
        showNotification(
          "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.",
          "success"
        );

        // Reset form
        this.reset();

        // Simulate sending data
        console.log("Form data:", data);
      }
    });

    // Real-time validation
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this);
      });
    });
  }
}

// Form Validation
function validateForm(data) {
  let isValid = true;

  if (!data.name || data.name.trim().length < 2) {
    showFieldError("name", "Vui lòng nhập tên hợp lệ");
    isValid = false;
  }

  if (!data.email || !isValidEmail(data.email)) {
    showFieldError("email", "Vui lòng nhập email hợp lệ");
    isValid = false;
  }

  if (!data.message || data.message.trim().length < 10) {
    showFieldError("message", "Vui lòng nhập tin nhắn ít nhất 10 ký tự");
    isValid = false;
  }

  return isValid;
}

function validateField(field) {
  const value = field.value.trim();
  const fieldName = field.name;

  // Remove previous error
  removeFieldError(fieldName);

  switch (fieldName) {
    case "name":
      if (!value || value.length < 2) {
        showFieldError(fieldName, "Tên phải có ít nhất 2 ký tự");
      }
      break;
    case "email":
      if (!value || !isValidEmail(value)) {
        showFieldError(fieldName, "Email không hợp lệ");
      }
      break;
    case "message":
      if (!value || value.length < 10) {
        showFieldError(fieldName, "Tin nhắn phải có ít nhất 10 ký tự");
      }
      break;
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showFieldError(fieldName, message) {
  const field = document.querySelector(`[name="${fieldName}"]`);
  const formGroup = field.closest(".form-group");

  // Remove existing error
  removeFieldError(fieldName);

  // Add error message
  const errorDiv = document.createElement("div");
  errorDiv.className = "field-error";
  errorDiv.textContent = message;
  errorDiv.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.5rem;
        animation: slideInDown 0.3s ease;
    `;

  formGroup.appendChild(errorDiv);
  field.style.borderColor = "#ef4444";
}

function removeFieldError(fieldName) {
  const field = document.querySelector(`[name="${fieldName}"]`);
  const formGroup = field.closest(".form-group");
  const errorDiv = formGroup.querySelector(".field-error");

  if (errorDiv) {
    errorDiv.remove();
  }

  field.style.borderColor = "#e5e7eb";
}

// Notification System
function showNotification(message, type = "info") {
  // Remove existing notification
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${
              type === "success" ? "fa-check-circle" : "fa-info-circle"
            }"></i>
            <span>${message}</span>
        </div>
    `;

  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === "success" ? "#10b981" : "#3b82f6"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto remove
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Scroll to Top Button
function initScrollToTop() {
  const scrollButton = document.createElement("div");
  scrollButton.className = "scroll-to-top";
  scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollButton.onclick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  document.body.appendChild(scrollButton);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollButton.classList.add("show");
    } else {
      scrollButton.classList.remove("show");
    }
  });
}

// Update active navigation on scroll
function updateActiveNavOnScroll() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    const scrollY = window.pageYOffset;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  });
}

// Initialize scroll-based navigation updates
updateActiveNavOnScroll();

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
window.addEventListener(
  "scroll",
  debounce(() => {
    // Any scroll-based functions can be called here
  }, 16)
); // ~60fps

// Add loading animation styles dynamically
const loadingStyles = document.createElement("style");
loadingStyles.textContent = `
    .loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease, visibility 0.5s ease;
    }

    .loading.hidden {
        opacity: 0;
        visibility: hidden;
    }

    .spinner {
        width: 50px;
        height: 50px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .field-error {
        animation: slideInDown 0.3s ease;
    }
`;
document.head.appendChild(loadingStyles);

// Add loading screen to body
const loadingScreen = document.createElement("div");
loadingScreen.className = "loading";
loadingScreen.innerHTML = '<div class="spinner"></div>';
document.body.insertBefore(loadingScreen, document.body.firstChild);

// Counter Animation for Statistics
function initCounters() {
  const counters = document.querySelectorAll(
    ".stat-number[data-target], .about-stat .stat-number"
  );

  counters.forEach((counter) => {
    const target = parseInt(
      counter.getAttribute("data-target") ||
        counter.textContent.replace(/[^\d]/g, "")
    );
    const text = counter.textContent;
    const isDecimal = text.includes(".");
    const duration = 2000; // 2 seconds
    const step = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        if (isDecimal) {
          counter.textContent = current.toFixed(1);
        } else {
          counter.textContent = Math.floor(current);
        }
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = isDecimal ? target.toFixed(1) : target;
      }
    };

    // Start animation when element is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(counter);
  });
}

// Tech Nodes Animation
function initTechNodes() {
  const nodes = document.querySelectorAll(
    ".tech-nodes .node, .team-member circle"
  );
  const dataParticles = document.querySelectorAll(".data-particles circle");

  // Animate tech nodes
  nodes.forEach((node, index) => {
    node.style.animation = `pulse 2s ease-in-out ${index * 0.2}s infinite`;
  });

  // Animate data particles
  dataParticles.forEach((particle, index) => {
    particle.style.animation = `floatParticle 3s ease-in-out ${
      index * 0.3
    }s infinite`;
  });

  // Add CSS animations dynamically
  const techAnimations = document.createElement("style");
  techAnimations.textContent = `
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
        opacity: 0.8;
      }
      50% {
        transform: scale(1.1);
        opacity: 1;
      }
    }

    @keyframes floatParticle {
      0%, 100% {
        transform: translateY(0px) translateX(0px);
        opacity: 0.6;
      }
      25% {
        transform: translateY(-10px) translateX(5px);
        opacity: 0.8;
      }
      50% {
        transform: translateY(-5px) translateX(-5px);
        opacity: 1;
      }
      75% {
        transform: translateY(-15px) translateX(3px);
        opacity: 0.7;
      }
    }

    .tech-nodes line {
      animation: linePulse 3s ease-in-out infinite;
    }

    @keyframes linePulse {
      0%, 100% {
        opacity: 0.6;
        stroke-width: 2;
      }
      50% {
        opacity: 1;
        stroke-width: 3;
      }
    }
  `;
  document.head.appendChild(techAnimations);
}

// Enhanced Scroll Effects for New Sections
function initEnhancedScrollEffects() {
  const observerOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;

        // Add stagger animation for service cards
        if (element.classList.contains("service-card")) {
          const cards = element.parentElement.querySelectorAll(".service-card");
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.animation = "slideInUp 0.6s ease-out forwards";
            }, index * 200);
          });
        }

        // Add stagger animation for testimonial cards
        if (element.classList.contains("testimonial-card")) {
          const cards =
            element.parentElement.querySelectorAll(".testimonial-card");
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.animation = "slideInLeft 0.6s ease-out forwards";
            }, index * 150);
          });
        }

        // Add stagger animation for tech items
        if (element.classList.contains("tech-item")) {
          const items = element.parentElement.querySelectorAll(".tech-item");
          items.forEach((item, index) => {
            setTimeout(() => {
              item.style.animation = "bounceIn 0.5s ease-out forwards";
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);

  // Observe new section elements
  document
    .querySelectorAll(".service-card, .testimonial-card, .tech-item")
    .forEach((el) => {
      observer.observe(el);
    });
}

// Initialize enhanced scroll effects
initEnhancedScrollEffects();

// Smooth reveal animations for new sections
function initSectionReveals() {
  const sections = document.querySelectorAll("section:not(.hero)");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    revealObserver.observe(section);
  });
}

// Initialize section reveals
initSectionReveals();

// Enhanced form handling for better UX
function initEnhancedFormHandling() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const inputs = form.querySelectorAll("input, textarea");

  inputs.forEach((input) => {
    // Add focus effects
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("focused");
    });

    input.addEventListener("blur", function () {
      this.parentElement.classList.remove("focused");
    });

    // Real-time character count for textarea
    if (input.tagName === "TEXTAREA") {
      const charCount = document.createElement("div");
      charCount.className = "char-count";
      charCount.style.cssText = `
        font-size: 0.8rem;
        color: #6b7280;
        text-align: right;
        margin-top: 0.25rem;
      `;
      input.parentElement.appendChild(charCount);

      input.addEventListener("input", function () {
        const count = this.value.length;
        const max = 500;
        charCount.textContent = `${count}/${max}`;
        charCount.style.color = count > max * 0.9 ? "#ef4444" : "#6b7280";
      });
    }
  });
}

// Initialize enhanced form handling
initEnhancedFormHandling();
