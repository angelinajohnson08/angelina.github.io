// Shared JavaScript for The Green Table demo website.
// GA4 is loaded in each HTML page. Replace G-XXXXXXXXXX in all four pages
// with your own Measurement ID before publishing.

document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  document.querySelectorAll(".current-year").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // Mobile navigation
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
      menuToggle.textContent = isOpen ? "×" : "☰";
    });
  }

  // Product category filters
  const filterButtons = document.querySelectorAll(".filter-button");
  const menuItems = document.querySelectorAll(".menu-item");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;
      filterButtons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      menuItems.forEach((item) => {
        item.hidden = category !== "all" && item.dataset.category !== category;
      });
    });
  });

  // Product button interaction: GA4 recommended event select_item.
  document.querySelectorAll(".product-action").forEach((button) => {
    button.addEventListener("click", () => {
      const itemName = button.dataset.item || "Unknown item";
      if (typeof window.gtag === "function") {
        window.gtag("event", "select_item", {
          item_list_name: "The Green Table menu",
          items: [{ item_id: itemName.toLowerCase().replaceAll(" ", "_"), item_name: itemName }]
        });
      }
      alert(`${itemName}\n\nThis is a sample menu item. Contact us for more information.`);
    });
  });

  // Contact form is demonstration-only: no message is sent or stored.
  const contactForm = document.querySelector("#contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const feedback = document.querySelector("#contact-feedback");
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        feedback.textContent = "Please complete all fields with valid information.";
        feedback.classList.add("error");
        return;
      }
      feedback.classList.remove("error");
      feedback.textContent = "Thanks! Your demo form was validated. No message has been sent.";
      if (typeof window.gtag === "function") {
        window.gtag("event", "demo_form_submit", {
          form_name: "contact_form",
          form_type: "demonstration"
        });
      }
      contactForm.reset();
    });
  }

  // Newsletter is demonstration-only: no subscription is created.
  const newsletterForm = document.querySelector("#newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const emailInput = document.querySelector("#newsletter-email");
      const feedback = document.querySelector("#newsletter-feedback");
      if (!emailInput.checkValidity()) {
        emailInput.reportValidity();
        feedback.textContent = "Please enter a valid email address.";
        feedback.classList.add("error");
        return;
      }
      feedback.classList.remove("error");
      feedback.textContent = "Thanks! This demo recorded your interaction, but no subscription was created.";
      if (typeof window.gtag === "function") {
        window.gtag("event", "demo_form_submit", {
          form_name: "newsletter_form",
          form_type: "demonstration"
        });
      }
      newsletterForm.reset();
    });
  }
});
