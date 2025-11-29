// Hamburger menu toggle
const menuToggle = document.getElementById("menu-toggle");
const navLinksContainer = document.getElementById("nav-links");
if (menuToggle) {
  menuToggle.addEventListener("click", () =>
    navLinksContainer.classList.toggle("show")
  );
}

// Smooth scrolling untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Active navigation highlighting using IntersectionObserver
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const obsOptions = {
  root: null,
  rootMargin: "-30% 0px -60% 0px",
  threshold: 0,
};
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) =>
        link.classList.toggle(
          "active",
          link.getAttribute("href").slice(1) === id
        )
      );
    }
  });
}, obsOptions);
sections.forEach((s) => observer.observe(s));

// Progress Bar
window.addEventListener("scroll", () => {
  const winScroll =
    document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  const progressBar = document.getElementById("progress-bar");
  if (progressBar) progressBar.style.width = scrolled + "%";
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById("scrollTop");
if (scrollTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) scrollTopBtn.classList.add("show");
    else scrollTopBtn.classList.remove("show");
  });
  scrollTopBtn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );
}

// Animated Counter (utility) - safe to call if counters added
function animateCounter(element) {
  const target = parseInt(element.getAttribute("data-target") || "0", 10);
  if (!target) return;
  const duration = 1500;
  const start = 0;
  const startTime = performance.now();
  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    element.textContent = Math.floor(progress * (target - start) + start);
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// initialize any counters if present
document.querySelectorAll("[data-target]").forEach((el) => animateCounter(el));
