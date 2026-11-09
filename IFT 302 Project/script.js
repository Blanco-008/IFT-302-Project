/* ============================================================
   SCRIPT.JS — IFT 302 Group 1 (Nile University of Nigeria)
   ------------------------------------------------------------
   Responsibilities:
   1. Render the member directory from the `groupMembers` array
      that lives in data.js.
   2. Handle the mobile navigation menu.
   3. Handle the Edit/Update profile form (preview + save).
   4. Handle the Contact form (validation + dynamic success message).

   NOTE: This file expects `data.js` to be loaded first because it
   reads the global `groupMembers` array.
   ============================================================ */

/* ---------- Mobile navigation toggle ---------- */
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

function setNavOpen(open) {
  navMenu.classList.toggle("open", open);
  menuToggle.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
}

menuToggle.addEventListener("click", function () {
  setNavOpen(!navMenu.classList.contains("open"));
});

navMenu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    setNavOpen(false);
  });
});

/* ---------- Header background on scroll ---------- */
const siteHeader = document.getElementById("siteHeader");
window.addEventListener("scroll", function () {
  siteHeader.classList.toggle("scrolled", window.scrollY > 10);
}, { passive: true });

/* ============================================================
   MEMBER DIRECTORY — render cards from data.js
   ============================================================ */
function renderMembers() {
  const grid = document.getElementById("membersGrid");
  grid.innerHTML = "";

  groupMembers.forEach(function (member, index) {
    const card = document.createElement("article");
    card.className = "member-card";

    card.innerHTML = `
      <div class="member-photo"><span>${member.photo}</span></div>
      <div class="member-body">
        <h3>${member.name}</h3>
        <p class="member-role">${member.role}</p>
        <p class="member-year">${member.year}</p>
        <p class="member-bio">${member.bio}</p>
        <div class="member-skills">
          ${member.skills.map(function (s) { return `<span class="tech-tag">${s}</span>`; }).join("")}
        </div>
        <div class="member-projects">
          ${member.projects.map(function (p) {
            return `<div class="member-project"><h4>${p.title}</h4><p>${p.description}</p></div>`;
          }).join("")}
        </div>
        <div class="member-contact">
          <a href="mailto:${member.email}">Email</a>
          <a href="${member.github}" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });

  // Populate the "Select Member" dropdown in the edit form
  const select = document.getElementById("memberSelect");
  select.innerHTML = "";
  groupMembers.forEach(function (member, index) {
    const opt = document.createElement("option");
    opt.value = index;
    opt.textContent = member.name;
    select.appendChild(opt);
  });
}

/* Call once on page load so the directory is populated */
renderMembers();

/* ============================================================
   EDIT / UPDATE PROFILE — preview + save
   ============================================================ */
const memberSelect = document.getElementById("memberSelect");
const memberForm = {
  name: document.getElementById("memberName"),
  role: document.getElementById("memberRole"),
  year: document.getElementById("memberYear"),
  bio: document.getElementById("memberBio"),
  skills: document.getElementById("memberSkills"),
  projects: document.getElementById("memberProjects"),
  email: document.getElementById("memberEmail"),
  github: document.getElementById("memberGithub")
};
const editPreviewCard = document.getElementById("editPreviewCard");
const editSavedCode = document.getElementById("editSavedCode");

function getSelectedIndex() {
  return Number(memberSelect.value);
}

function populateEditForm() {
  const member = groupMembers[getSelectedIndex()];
  if (!member) return;
  memberForm.name.value = member.name;
  memberForm.role.value = member.role;
  memberForm.year.value = member.year || "";
  memberForm.bio.value = member.bio;
  memberForm.skills.value = member.skills.join(", ");
  memberForm.projects.value = member.projects.map(function (p) { return `${p.title} — ${p.description}`; }).join("\n");
  memberForm.email.value = member.email;
  memberForm.github.value = member.github;
}

function buildMemberFromForm() {
  const rawProjects = memberForm.projects.value.split("\n").map(function (l) { return l.trim(); }).filter(Boolean);
  const projects = rawProjects.map(function (line) {
    const idx = line.indexOf("—");
    const title = idx === -1 ? line : line.slice(0, idx);
    const description = idx === -1 ? "" : line.slice(idx + 1).trim();
    return { title: title.trim(), description: description };
  }).filter(function (p) { return p.title.length > 0; });

  return {
    id: getSelectedIndex() + 1,
    name: memberForm.name.value.trim(),
    role: memberForm.role.value.trim(),
    year: memberForm.year.value.trim() || "300 Level",
    photo: memberForm.name.value.trim().split(" ").map(function (w) { return w[0]; }).join("").slice(0, 2).toUpperCase(),
    bio: memberForm.bio.value.trim(),
    skills: memberForm.skills.value.split(",").map(function (s) { return s.trim(); }).filter(Boolean),
    projects: projects,
    email: memberForm.email.value.trim(),
    github: memberForm.github.value.trim()
  };
}

function previewMember() {
  const member = buildMemberFromForm();
  editPreviewCard.innerHTML = `
    <div class="member-photo"><span>${member.photo}</span></div>
    <div class="member-body">
      <h3>${member.name}</h3>
      <p class="member-role">${member.role}</p>
      <p class="member-year">${member.year}</p>
      <p class="member-bio">${member.bio}</p>
      <div class="member-skills">
        ${member.skills.map(function (s) { return `<span class="tech-tag">${s}</span>`; }).join("")}
      </div>
      <div class="member-projects">
        ${member.projects.map(function (p) {
          return `<div class="member-project"><h4>${p.title}</h4><p>${p.description}</p></div>`;
        }).join("")}
      </div>
      <div class="member-contact">
        <a href="mailto:${member.email}">Email</a>
        <a href="${member.github}" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
  `;
}

document.getElementById("btnPreview").addEventListener("click", function () {
  previewMember();
});

document.getElementById("btnSave").addEventListener("click", function () {
  const member = buildMemberFromForm();
  groupMembers[getSelectedIndex()] = member;
  renderMembers();
  editSavedCode.textContent = JSON.stringify(member, null, 2);
  alert("Profile updated! Copy the JSON from the box below and paste it into data.js to save permanently.");
});

/* Add a brand-new member to the directory */
document.getElementById("btnAddMember").addEventListener("click", function () {
  const newId = groupMembers.length
    ? Math.max.apply(null, groupMembers.map(function (m) { return m.id; })) + 1
    : 1;
  const newMember = {
    id: newId,
    name: "New Member",
    role: "Computer Science Student",
    year: "300 Level",
    photo: newId.toString().slice(0, 2).toUpperCase(),
    bio: "",
    skills: [],
    projects: [],
    email: "",
    github: ""
  };
  groupMembers.push(newMember);
  renderMembers();
  memberSelect.value = groupMembers.length - 1;
  populateEditForm();
  previewMember();
});

memberSelect.addEventListener("change", function () {
  populateEditForm();
});

/* Populate the select on load */
populateEditForm();

/* ============================================================
   CONTACT FORM — validation + dynamic success message
   ============================================================ */
const contactForm = document.getElementById("contactForm");

function validateField(input, errorEl) {
  const value = input.value.trim();
  let valid = true;

  if (input.name === "name") { valid = value.length >= 2; }
  if (input.name === "email") { valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value); }
  if (input.name === "message") { valid = value.length >= 10; }

  if (valid) {
    input.classList.remove("invalid");
    if (errorEl) errorEl.classList.remove("show");
    return true;
  }

  input.classList.add("invalid");
  if (errorEl) {
    errorEl.textContent = input.name === "name" ? "Please enter your full name (at least 2 characters)."
      : input.name === "email" ? "Please enter a valid email address."
      : "Please enter a message (at least 10 characters).";
    errorEl.classList.add("show");
  }
  return false;
}

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const fields = [
    { input: contactForm.elements.name, error: document.getElementById("cNameError") },
    { input: contactForm.elements.email, error: document.getElementById("cEmailError") },
    { input: contactForm.elements.message, error: document.getElementById("cMessageError") }
  ];

  let firstInvalid = null;
  fields.forEach(function (f) {
    if (!validateField(f.input, f.error)) { if (!firstInvalid) firstInvalid = f.input; }
  });

  if (firstInvalid) { firstInvalid.focus(); return; }

  /* VALIDATION PASSED — create success message dynamically */
  const name = contactForm.elements.name.value.trim();
  const successEl = document.createElement("div");
  successEl.className = "form-success";
  successEl.classList.add("show");
  successEl.setAttribute("role", "status");
  successEl.textContent = "Thank you, " + name + "! Your message has been sent successfully. We will get back to you soon.";
  contactForm.appendChild(successEl);

  contactForm.reset();
});

/* Clear errors as user types */
contactForm.addEventListener("input", function (e) {
  const field = e.target;
  if (field.name) {
    field.classList.remove("invalid");
    const errorEl = field.parentElement.querySelector(".error-message");
    if (errorEl) errorEl.classList.remove("show");
  }
});

/* Footer year */
document.getElementById("year").textContent = new Date().getFullYear();
