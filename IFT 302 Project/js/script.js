"use strict";

document.documentElement.classList.add("js");

function initializeNavigation() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  if (!toggle || !menu) {
    return;
  }

  function setMenuOpen(isOpen) {
    menu.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  }

  toggle.addEventListener("click", () => {
    setMenuOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  menu.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });
}

function initializeRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((element) => observer.observe(element));
}

function initializeFooterYear() {
  const year = document.getElementById("year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
}

function setFieldError(field, errorElement, message) {
  field.setAttribute("aria-invalid", String(Boolean(message)));
  errorElement.textContent = message;
}

function validateContactForm(form) {
  const name = form.elements.namedItem("name");
  const email = form.elements.namedItem("email");
  const subject = form.elements.namedItem("subject");
  const message = form.elements.namedItem("message");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const subjectError = document.getElementById("subjectError");
  const messageError = document.getElementById("messageError");
  let isValid = true;

  const errors = [
    [name, nameError, name.value.trim() ? "" : "Please enter your name."],
    [email, emailError, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? "" : "Please enter a valid email address."],
    [subject, subjectError, subject.value.length <= 100 ? "" : "Subject must be 100 characters or fewer."],
    [message, messageError, message.value.trim() ? "" : "Please enter a message."]
  ];

  errors.forEach(([field, errorElement, errorText]) => {
    setFieldError(field, errorElement, errorText);
    if (errorText) {
      isValid = false;
    }
  });

  return isValid;
}

function initializeContactForm() {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (!form || !status) {
    return;
  }

  form.addEventListener("input", (event) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      event.target.removeAttribute("aria-invalid");
      const errorElement = document.getElementById(`${event.target.id}Error`);
      if (errorElement) {
        errorElement.textContent = "";
      }
      status.textContent = "";
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "";

    if (!validateContactForm(form)) {
      const firstInvalidField = form.querySelector('[aria-invalid="true"]');
      firstInvalidField?.focus();
      return;
    }

    status.textContent = "Your form is valid, but this portfolio does not have an email service connected yet.";
  });
}

function initializePortfolio() {
  initializeNavigation();
  initializeRevealAnimations();
  initializeFooterYear();
  initializeContactForm();
}

initializePortfolio();
