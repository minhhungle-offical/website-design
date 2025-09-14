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
  initMobileMenu();
  initHeroAnimations();
  initParticleEffects();
  initThemeTransition();
  initProgressIndicator();
});

// Enhanced Loading Animation
function initLoading() {
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    const tips = loadingScreen.querySelectorAll(".tip-item");
    let currentTip = 0;

    // Show tips sequentially
    const showNextTip = () => {
      if (currentTip > 0) {
        tips[currentTip - 1].classList.remove("active");
      }
      if (currentTip < tips.length) {
        tips[currentTip].classList.add("active");
        currentTip++;
        setTimeout(showNextTip, 800);
      }
    };

    // Start showing tips
    setTimeout(showNextTip, 500);

    // Simulate loading time
    setTimeout(() => {
      loadingScreen.classList.add("hide");
      // Remove from DOM after animation
      setTimeout(() => {
        loadingScreen.remove();
      }, 500);
    }, 3000); // Show loading for 3 seconds
  }
}

// Header Scroll Effect
function initHeaderScroll() {
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Always keep header visible, just add scrolled class for styling
    if (scrollTop > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
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

        // Handle scroll reveal animations
        if (entry.target.classList.contains("scroll-reveal")) {
          entry.target.classList.add("revealed");
        }

        // Handle text reveal animations
        if (entry.target.classList.contains("text-reveal")) {
          const spans = entry.target.querySelectorAll("span");
          spans.forEach((span, index) => {
            setTimeout(() => {
              span.style.animation =
                "textReveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards";
            }, index * 100);
          });
        }
      }
    });
  }, observerOptions);

  // Observe all elements with animate-on-scroll class
  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });

  // Observe scroll reveal elements
  document.querySelectorAll(".scroll-reveal").forEach((el) => {
    observer.observe(el);
  });

  // Observe text reveal elements
  document.querySelectorAll(".text-reveal").forEach((el) => {
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

// Enhanced Form Handling
function initFormHandling() {
  const form = document.querySelector(".contact-form");

  if (form) {
    // Add focus/blur effects
    const inputs = form.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.closest(".form-group").classList.add("focused");
        this.closest(".form-group").classList.remove("error", "success");
      });

      input.addEventListener("blur", function () {
        this.closest(".form-group").classList.remove("focused");
        validateField(this);
      });

      input.addEventListener("input", function () {
        // Real-time validation feedback
        if (this.value.trim() !== "") {
          this.closest(".form-group").classList.remove("error");
          hideFieldError(this.name);
        }
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Validate form
      if (validateForm(data)) {
        // Add loading state
        const submitBtn = this.querySelector(".form-submit");
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML =
          '<span>Đang gửi...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
          // Show success message
          showNotification(
            "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.",
            "success"
          );

          // Reset form
          this.reset();

          // Reset button
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;

          // Reset validation states
          inputs.forEach((input) => {
            input
              .closest(".form-group")
              .classList.remove("error", "success", "focused");
            hideFieldError(input.name);
          });

          // Log data
          console.log("Form submitted:", data);
        }, 2000);
      } else {
        // Show error notification
        showNotification(
          "Vui lòng kiểm tra lại thông tin và thử lại.",
          "error"
        );
      }
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
  const errorDiv = formGroup.querySelector(".field-error");

  // Remove existing error
  hideFieldError(fieldName);

  // Add error class to form group
  formGroup.classList.add("error");
  formGroup.classList.remove("success");

  // Show or create error message
  if (errorDiv) {
    errorDiv.textContent = message;
    errorDiv.classList.add("show");
  } else {
    const newErrorDiv = document.createElement("div");
    newErrorDiv.className = "field-error show";
    newErrorDiv.textContent = message;
    newErrorDiv.setAttribute("role", "alert");
    newErrorDiv.setAttribute("aria-live", "polite");
    formGroup.appendChild(newErrorDiv);
  }

  // Add shake animation
  field.classList.add("shake");
  setTimeout(() => {
    field.classList.remove("shake");
  }, 500);
}

function hideFieldError(fieldName) {
  const field = document.querySelector(`[name="${fieldName}"]`);
  if (!field) return;

  const formGroup = field.closest(".form-group");
  const errorDiv = formGroup.querySelector(".field-error");

  // Remove error class
  formGroup.classList.remove("error");

  // Hide error message
  if (errorDiv) {
    errorDiv.classList.remove("show");
  }
}

// Add shake animation CSS dynamically
const shakeStyle = document.createElement("style");
shakeStyle.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }
  .shake {
    animation: shake 0.5s ease-in-out;
  }
`;
document.head.appendChild(shakeStyle);

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

// Hero Animations - Premium Interactive Effects
function initHeroAnimations() {
  const hero = document.querySelector(".hero");
  const heroTitle = document.querySelector(".hero-title");
  const heroDescription = document.querySelector(".hero-description");
  const heroButtons = document.querySelector(".hero-buttons");
  const heroStats = document.querySelector(".hero-stats");
  const heroSvg = document.querySelector(".hero-svg");

  if (!hero) return;

  // Intersection Observer for hero animations
  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Staggered animation sequence
          setTimeout(() => animateHeroTitle(), 200);
          setTimeout(() => animateHeroDescription(), 600);
          setTimeout(() => animateHeroStats(), 1000);
          setTimeout(() => animateHeroButtons(), 1400);
          setTimeout(() => animateHeroSvg(), 800);

          heroObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  heroObserver.observe(hero);

  // Mouse movement parallax effect
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;

    updateParallax();
  });

  function updateParallax() {
    const parallaxElements = document.querySelectorAll(
      ".floating-circle, .tech-stack-showcase"
    );

    parallaxElements.forEach((element, index) => {
      const speed = (index + 1) * 0.5;
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;

      element.style.transform = "translate(" + x + "px, " + y + "px)";
    });
  }
}

function animateHeroTitle() {
  const title = document.querySelector(".hero-title");
  if (!title) return;

  title.style.opacity = "0";
  title.style.transform = "translateY(30px)";

  setTimeout(() => {
    title.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
    title.style.opacity = "1";
    title.style.transform = "translateY(0)";
  }, 100);
}

function animateHeroDescription() {
  const description = document.querySelector(".hero-description");
  if (!description) return;

  description.style.opacity = "0";
  description.style.transform = "translateY(20px)";

  setTimeout(() => {
    description.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    description.style.opacity = "1";
    description.style.transform = "translateY(0)";
  }, 100);
}

function animateHeroStats() {
  const stats = document.querySelectorAll(".hero-stats .stat-item");
  if (!stats.length) return;

  stats.forEach((stat, index) => {
    stat.style.opacity = "0";
    stat.style.transform = "translateY(20px)";

    setTimeout(() => {
      stat.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
      stat.style.opacity = "1";
      stat.style.transform = "translateY(0)";
    }, index * 150);
  });
}

function animateHeroButtons() {
  const buttons = document.querySelectorAll(".hero-buttons .btn");
  if (!buttons.length) return;

  buttons.forEach((button, index) => {
    button.style.opacity = "0";
    button.style.transform = "translateY(20px)";

    setTimeout(() => {
      button.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
      button.style.opacity = "1";
      button.style.transform = "translateY(0)";
    }, index * 100);
  });
}

function animateHeroSvg() {
  const svg = document.querySelector(".hero-svg");
  if (!svg) return;

  svg.style.opacity = "0";
  svg.style.transform = "scale(0.8) translateY(30px)";

  setTimeout(() => {
    svg.style.transition = "all 1s cubic-bezier(0.4, 0, 0.2, 1)";
    svg.style.opacity = "1";
    svg.style.transform = "scale(1) translateY(0)";
  }, 100);
}

// Particle Effects - Dynamic Background Animation
function initParticleEffects() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  // Create particle container
  const particleContainer = document.createElement("div");
  particleContainer.className = "particle-container";
  particleContainer.style.position = "absolute";
  particleContainer.style.top = "0";
  particleContainer.style.left = "0";
  particleContainer.style.width = "100%";
  particleContainer.style.height = "100%";
  particleContainer.style.pointerEvents = "none";
  particleContainer.style.zIndex = "1";
  particleContainer.style.overflow = "hidden";

  hero.appendChild(particleContainer);

  // Create particles
  const particleCount = window.innerWidth < 768 ? 15 : 25;

  for (let i = 0; i < particleCount; i++) {
    createParticle(particleContainer, i);
  }

  // Animate particles
  animateParticles();
}

function createParticle(container, index) {
  const particle = document.createElement("div");
  particle.className = "floating-particle";

  const size = Math.random() * 6 + 2;
  const colors = ["#6366f1", "#8b5cf6", "#f59e0b", "#10b981", "#ef4444"];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const left = Math.random() * 100;
  const top = Math.random() * 100;
  const duration = Math.random() * 20 + 15;
  const delay = Math.random() * 5;
  const opacity = Math.random() * 0.6 + 0.2;

  particle.style.position = "absolute";
  particle.style.width = size + "px";
  particle.style.height = size + "px";
  particle.style.background = color;
  particle.style.borderRadius = "50%";
  particle.style.opacity = opacity.toString();
  particle.style.left = left + "%";
  particle.style.top = top + "%";
  particle.style.animation = "floatParticle " + duration + "s linear infinite";
  particle.style.animationDelay = delay + "s";

  container.appendChild(particle);
}

function animateParticles() {
  // Add particle animation styles dynamically
  if (!document.getElementById("particle-styles")) {
    const particleStyles = document.createElement("style");
    particleStyles.id = "particle-styles";
    particleStyles.textContent =
      "@keyframes floatParticle {" +
      "  0% {" +
      "    transform: translateY(0px) translateX(0px) rotate(0deg);" +
      "    opacity: 0.2;" +
      "  }" +
      "  25% {" +
      "    transform: translateY(-20px) translateX(10px) rotate(90deg);" +
      "    opacity: 0.6;" +
      "  }" +
      "  50% {" +
      "    transform: translateY(-10px) translateX(-10px) rotate(180deg);" +
      "    opacity: 0.8;" +
      "  }" +
      "  75% {" +
      "    transform: translateY(-30px) translateX(5px) rotate(270deg);" +
      "    opacity: 0.4;" +
      "  }" +
      "  100% {" +
      "    transform: translateY(-100vh) translateX(0px) rotate(360deg);" +
      "    opacity: 0;" +
      "  }" +
      "}";
    document.head.appendChild(particleStyles);
  }
}

// Theme Transition Effects - Smooth Theme Switching
function initThemeTransition() {
  // Listen for theme changes
  window.addEventListener("themeChange", handleThemeChange);

  // Add transition styles
  addThemeTransitionStyles();
}

function handleThemeChange(event) {
  const { theme, animate } = event.detail;

  if (animate) {
    // Add transition class
    document.body.classList.add("theme-transitioning");

    // Play transition sound (optional)
    playThemeTransitionSound(theme);

    // Remove transition class after animation
    setTimeout(() => {
      document.body.classList.remove("theme-transitioning");
    }, 400);
  }

  // Update meta theme-color for mobile browsers
  updateMetaThemeColor(theme);

  // Log theme change
  console.log("🎨 Theme switched to: " + theme);
}

function addThemeTransitionStyles() {
  if (!document.getElementById("theme-transition-styles")) {
    const transitionStyles = document.createElement("style");
    transitionStyles.id = "theme-transition-styles";
    transitionStyles.textContent =
      ".theme-transitioning * {" +
      "  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;" +
      "}" +
      ".theme-transitioning {" +
      "  position: relative;" +
      "}" +
      ".theme-transitioning::before {" +
      '  content: "";' +
      "  position: fixed;" +
      "  top: 0;" +
      "  left: 0;" +
      "  width: 100%;" +
      "  height: 100%;" +
      "  background: var(--bg-primary);" +
      "  z-index: 9998;" +
      "  opacity: 0.8;" +
      "  animation: themeFlash 0.4s ease;" +
      "  pointer-events: none;" +
      "}" +
      "@keyframes themeFlash {" +
      "  0% { opacity: 0; }" +
      "  50% { opacity: 0.3; }" +
      "  100% { opacity: 0; }" +
      "}";
    document.head.appendChild(transitionStyles);
  }
}

function updateMetaThemeColor(theme) {
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    metaThemeColor.setAttribute(
      "content",
      theme === "dark" ? "#0f172a" : "#6366f1"
    );
  }
}

function playThemeTransitionSound(theme) {
  // Optional: Add subtle sound effect for theme change
  // This is commented out as it requires user interaction to play audio
  /*
  try {
    const audio = new Audio();
    audio.src = theme === 'dark' ? 'sounds/dark-mode.mp3' : 'sounds/light-mode.mp3';
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Silently fail if audio can't be played
    });
  } catch (error) {
    // Silently fail if audio is not supported
  }
  */
}

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
    node.style.animation = "pulse 2s ease-in-out " + index * 0.2 + "s infinite";
  });

  // Animate data particles
  dataParticles.forEach((particle, index) => {
    particle.style.animation =
      "floatParticle 3s ease-in-out " + index * 0.3 + "s infinite";
  });

  // Add CSS animations dynamically
  const techAnimations = document.createElement("style");
  techAnimations.textContent =
    "@keyframes pulse {" +
    "  0%, 100% {" +
    "    transform: scale(1);" +
    "    opacity: 0.8;" +
    "  }" +
    "  50% {" +
    "    transform: scale(1.1);" +
    "    opacity: 1;" +
    "  }" +
    "}" +
    "@keyframes floatParticle {" +
    "  0%, 100% {" +
    "    transform: translateY(0px) translateX(0px);" +
    "    opacity: 0.6;" +
    "  }" +
    "  25% {" +
    "    transform: translateY(-10px) translateX(5px);" +
    "    opacity: 0.8;" +
    "  }" +
    "  50% {" +
    "    transform: translateY(-5px) translateX(-5px);" +
    "    opacity: 1;" +
    "  }" +
    "  75% {" +
    "    transform: translateY(-15px) translateX(3px);" +
    "    opacity: 0.7;" +
    "  }" +
    "}" +
    ".tech-nodes line {" +
    "  animation: linePulse 3s ease-in-out infinite;" +
    "}" +
    "@keyframes linePulse {" +
    "  0%, 100% {" +
    "    opacity: 0.6;" +
    "    stroke-width: 2;" +
    "  }" +
    "  50% {" +
    "    opacity: 1;" +
    "    stroke-width: 3;" +
    "  }" +
    "}";
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

// Progress Indicator
function initProgressIndicator() {
  const progressIndicator = document.getElementById("progress-indicator");
  const progressFill = document.querySelector(".progress-fill");
  const progressText = document.querySelector(".progress-text");

  if (!progressIndicator) return;

  let isVisible = false;

  function updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    const clampedPercent = Math.min(100, Math.max(0, scrollPercent));

    // Update progress bar
    progressFill.style.height = clampedPercent + "%";
    progressText.textContent = Math.round(clampedPercent) + "%";

    // Show/hide indicator based on scroll position
    if (scrollTop > 200 && !isVisible) {
      progressIndicator.classList.add("show");
      isVisible = true;
    } else if (scrollTop <= 200 && isVisible) {
      progressIndicator.classList.remove("show");
      isVisible = false;
    }
  }

  // Throttle scroll events for better performance
  let ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Initial update
  updateProgress();
}

// Mobile Menu Functionality
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  if (hamburger && navMenu) {
    // Toggle mobile menu
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("active");

      // Prevent body scroll when menu is open
      document.body.style.overflow = navMenu.classList.contains("active")
        ? "hidden"
        : "auto";
    });

    // Close menu when clicking on a link
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "auto";
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (e) {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  }
}
