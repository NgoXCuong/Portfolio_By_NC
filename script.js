// ===== NAVIGATION ===== //
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navbar = document.getElementById("navbar");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when clicking on nav links
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// ===== SCROLL EFFECTS ===== //
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// ===== SMOOTH SCROLLING ===== //
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  const headerHeight = 70;
  const elementPosition = element.offsetTop - headerHeight;

  window.scrollTo({
    top: elementPosition,
    behavior: "smooth",
  });
}

// Add click events to nav links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    scrollToSection(targetId);
  });
});

// ===== TYPING EFFECT ===== //
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// ===== INTERSECTION OBSERVER ===== //
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");

      // Animate counters
      if (entry.target.classList.contains("stat-number")) {
        animateCounter(entry.target);
      }

      // Animate skill bars
      if (entry.target.classList.contains("skill-level")) {
        animateSkillBar(entry.target);
      }
    }
  });
}, observerOptions);

// Observe elements
document
  .querySelectorAll(
    ".stat-number, .skill-level, .project-card, .skill-category"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// ===== COUNTER ANIMATION ===== //
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target"));
  const duration = 2000;
  const start = performance.now();

  function updateCounter(currentTime) {
    const elapsed = currentTime - start;
    const progress = Math.min(elapsed / duration, 1);

    const current = Math.floor(progress * target);
    element.textContent = current;

    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }

  requestAnimationFrame(updateCounter);
}

// ===== SKILL BAR ANIMATION ===== //
function animateSkillBar(element) {
  element.style.setProperty("--animate", "1");
}

// ===== TYPING ANIMATION FOR HERO ===== //
document.addEventListener("DOMContentLoaded", () => {
  const typingElement = document.querySelector(".typing-text");
  const texts = [
    "Full Stack Developer",
    "UI/UX Designer",
    "Frontend Specialist",
    "Backend Developer",
  ];

  let currentTextIndex = 0;
  let currentText = "";
  let isDeleting = false;

  function type() {
    const fullText = texts[currentTextIndex];

    if (isDeleting) {
      currentText = fullText.substring(0, currentText.length - 1);
    } else {
      currentText = fullText.substring(0, currentText.length + 1);
    }

    typingElement.textContent = currentText;

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && currentText === fullText) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && currentText === "") {
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % texts.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  // Start typing animation
  setTimeout(type, 1000);

  // Code typing animation
  const codeElement = document.querySelector(".typing-code");
  if (codeElement) {
    const codeText = `const developer = {
  name: "Nguyễn Văn A",
  skills: ["JavaScript", "React", "Node.js"],
  passion: "Creating amazing experiences",
  currentFocus: "Full Stack Development"
};`;

    setTimeout(() => {
      typeWriter(codeElement, codeText, 50);
    }, 2000);
  }
});

// ===== FORM HANDLING ===== //
document.querySelector(".contact-form form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(e.target);
  const name = e.target.querySelector('input[type="text"]').value;
  const email = e.target.querySelector('input[type="email"]').value;
  const message = e.target.querySelector("textarea").value;

  // Simple validation
  if (name && email && message) {
    // Show success message
    showNotification("Tin nhắn đã được gửi thành công!", "success");
    e.target.reset();
  } else {
    showNotification("Vui lòng điền đầy đủ thông tin!", "error");
  }
});

// ===== NOTIFICATION SYSTEM ===== //
function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Add styles
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "1rem 2rem",
    borderRadius: "8px",
    color: "white",
    fontSize: "14px",
    fontWeight: "500",
    zIndex: "10000",
    opacity: "0",
    transform: "translateX(100%)",
    transition: "all 0.3s ease",
  });

  if (type === "success") {
    notification.style.background = "linear-gradient(135deg, #00d4ff, #7c3aed)";
  } else {
    notification.style.background = "linear-gradient(135deg, #ff6b35, #f093fb)";
  }

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.opacity = "1";
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// ===== PARALLAX EFFECT ===== //
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll(".floating-element");

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});

// ===== MOUSE CURSOR EFFECT ===== //
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".cursor");
  if (!cursor) {
    const newCursor = document.createElement("div");
    newCursor.className = "cursor";
    Object.assign(newCursor.style, {
      position: "fixed",
      width: "20px",
      height: "20px",
      background: "var(--primary-color)",
      borderRadius: "50%",
      pointerEvents: "none",
      zIndex: "9999",
      opacity: "0.5",
      transition: "transform 0.1s ease",
    });
    document.body.appendChild(newCursor);
  }

  const cursorElement = document.querySelector(".cursor");
  cursorElement.style.left = e.clientX - 10 + "px";
  cursorElement.style.top = e.clientY - 10 + "px";
});

// ===== PERFORMANCE OPTIMIZATION ===== //
let ticking = false;

function updateAnimations() {
  // Update any scroll-based animations here
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateAnimations);
    ticking = true;
  }
});

// ===== PROJECT MODAL (Optional Enhancement) ===== //
document.querySelectorAll(".project-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const projectCard = e.target.closest(".project-card");
    const projectTitle =
      projectCard.querySelector(".project-title").textContent;
    showNotification(`Xem chi tiết dự án: ${projectTitle}`, "success");
  });
});

// ===== LAZY LOADING FOR IMAGES ===== //
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll(".project-image").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ===== THEME PERSISTENCE ===== //
function initTheme() {
  // Add any theme initialization code here
  document.body.classList.add("theme-loaded");
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initTheme);
