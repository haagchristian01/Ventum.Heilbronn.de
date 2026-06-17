(function () {
  const toggle = document.querySelector("[data-nav-toggle]");
  const links = document.querySelector("[data-nav-links]");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  const current = document.body.getAttribute("data-page");
  if (current) {
    document.querySelectorAll("[data-nav]").forEach((link) => {
      if (link.getAttribute("data-nav") === current) {
        link.classList.add("active");
      }
    });
  }

  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
