/* ============================================================
   Online Student Portfolio Website
   IFT 302 - Group 1

   This file contains ALL JavaScript for the website.
   - Handles the mobile navigation menu
   - Handles scroll animations / skill bars / nav highlighting
   - Handles the contact form validation and success message

   No external libraries are used, so it works by simply
   opening index.html in any modern browser.
   ============================================================ */

/* ---------- Mobile navigation toggle ---------- */
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");

// Toggle the mobile menu open/closed
function setNavOpen(open) {
  navMenu.classList.toggle("open", open);
  navToggle.classList.toggle("nav-open", open);
  navToggle.setAttribute("aria-expanded", open ? "true" : "false");
}

navToggle.addEventListener("click", function () {
  setNavOpen(!navMenu.classList.contains("open"));
});

// Close the mobile menu after clicking a link
const navLinks = navMenu.querySelectorAll("a");
navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    setNavOpen(false);
  });
});

// Close the mobile menu with the Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    setNavOpen(false);
  }
});

/* ---------- Header background on scroll ---------- */
const header = document.getElementById("siteHeader");

window.addEventListener(
  "scroll",
  function () {
    header.classList.toggle("scrolled", window.scrollY > 10);
  },
  { passive: true }
);

/* ---------- Scroll reveal animations ----------
   Any element with the class "reveal" starts hidden and fades/slides
   in when it enters the viewport (via IntersectionObserver). */
const revealObserver = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // animate only once
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach(function (el) {
  revealObserver.observe(el);
});

/* ---------- Skill bars ----------
   Skill bars start at width:0 and grow to the value defined in the
   "--level" CSS variable once the skill card scrolls into view. */
const skillObserver = new IntersectionObserver(
  function (entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

document.querySelectorAll(".skill-card").forEach(function (el) {
  skillObserver.observe(el);
});

/* ---------- Active nav link highlighting ----------
   Highlights the nav link of the section currently in view. */
const sections = ["home", "about", "skills", "projects", "contact"]
  .map(function (id) {
    return document.getElementById(id);
  })
  .filter(Boolean);

const navObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const link = entry.target.querySelector('a[href^="#"]');
        if (link) {
          document.querySelectorAll(".nav-menu a.active").forEach(function (a) {
            a.classList.remove("active");
          });
          link.classList.add("active");
        }
      }
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);

sections.forEach(function (section) {
  navObserver.observe(section);
});

/* ---------- Footer: auto-update the copyright year ---------- */
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* ============================================================
   CONTACT FORM VALIDATION
   Validates the fields on submit and shows a success message.
   The success message is CREATED DYNAMICALLY with JavaScript
   (not hardcoded in the HTML).
   ============================================================ */

const contactForm = document.getElementById("contactForm");
const submitBtn = contactForm.querySelector('button[type="submit"]');

/* Validation rules for each field: returns true if valid, else an error message */
const validators = {
  name: function (value) {
    if (value.trim().length < 2) {
      return "Please enter your full name (at least 2 characters).";
    }
    return true;
  },
  email: function (value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value.trim())) {
      return "Please enter a valid email address (e.g. name@example.com).";
    }
    return true;
  },
  subject: function (value) {
    if (value.trim().length > 100) {
      return "Subject must be 100 characters or fewer.";
    }
    return true; // subject is optional
  },
  message: function (value) {
    if (value.trim().length < 10) {
      return "Please enter a message (at least 10 characters).";
    }
    return true;
  },
};

/* Run a single field's validation; updates its error message / styling */
function validateField(input) {
  const validator = validators[input.name];
  const errorEl = input.parentElement.querySelector(".error-message");

  const result = validator ? validator(input.value) : true;

  if (result === true) {
    input.classList.remove("invalid");
    if (errorEl) errorEl.classList.remove("show");
    return true;
  }

  // Invalid: show the error message and mark the input red
  input.classList.add("invalid");
  if (errorEl) {
    errorEl.textContent = result;
    errorEl.classList.add("show");
  }
  return false;
}

/* Validate all form fields on submit */
contactForm.addEventListener("submit", function (e) {
  e.preventDefault(); // prevent real form submission (static site)

  const fields = ["name", "email", "subject", "message"];
  let firstInvalidField = null;

  fields.forEach(function (fieldName) {
    const input = contactForm.elements[fieldName];
    if (!validateField(input)) {
      if (!firstInvalidField) firstInvalidField = input;
    }
  });

  // If any field failed, focus the first invalid one and stop
  if (firstInvalidField) {
    firstInvalidField.focus();
    return;
  }

  /* VALIDATION PASSED: create the success message dynamically */
  const name = contactForm.elements.name.value.trim();
  const successEl = document.createElement("div");
  successEl.className = "form-success";
  successEl.classList.add("show");
  successEl.setAttribute("role", "status");
  successEl.textContent =
    "Thank you, " + name + "! Your message has been sent successfully. We will get back to you soon.";
  contactForm.appendChild(successEl);

  // Reset the form for the next visitor
  contactForm.reset();
});

/* Clear error messages / invalid styling as soon as the user edits a field */
contactForm.addEventListener("input", function (e) {
  const field = e.target;
  if (!field.name) return; // skip non-form elements

  field.classList.remove("invalid");
  const errorEl = field.parentElement.querySelector(".error-message");
  if (errorEl) errorEl.classList.remove("show");
});
