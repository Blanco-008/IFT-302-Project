const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", function () {
    const isOpen = navMenu.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function appendText(parent, tag, text, className) {
  const element = document.createElement(tag);
  element.textContent = text;
  if (className) element.className = className;
  parent.appendChild(element);
  return element;
}

function createMemberCard(member) {
  const card = document.createElement("article");
  card.className = "member-card";
  appendText(card, "h3", member.name);
  appendText(card, "p", [member.role, member.year].filter(Boolean).join(" · "), "member-meta");
  appendText(card, "p", member.bio, "member-bio");

  if (member.skills.length) {
    appendText(card, "h4", "Skills");
    appendText(card, "p", member.skills.join(", "));
  }

  if (member.projects.length) {
    appendText(card, "h4", "Projects");
    const projects = document.createElement("ul");
    member.projects.forEach(function (project) {
      appendText(projects, "li", project.description
        ? project.title + " — " + project.description
        : project.title);
    });
    card.appendChild(projects);
  }

  const contact = document.createElement("p");
  if (member.email) {
    const email = document.createElement("a");
    email.href = "mailto:" + member.email;
    email.textContent = "Email";
    contact.appendChild(email);
  }
  if (member.github) {
    if (contact.childNodes.length) contact.append(" | ");
    const github = document.createElement("a");
    github.href = member.github;
    github.target = "_blank";
    github.rel = "noopener";
    github.textContent = "GitHub";
    contact.appendChild(github);
  }
  if (contact.childNodes.length) card.appendChild(contact);
  return card;
}

const membersGrid = document.getElementById("membersGrid");
if (membersGrid && typeof groupMembers !== "undefined") {
  groupMembers.forEach(function (member) {
    membersGrid.appendChild(createMemberCard(member));
  });
}

const memberSelect = document.getElementById("memberSelect");
if (memberSelect && typeof groupMembers !== "undefined") {
  const fields = {
    name: document.getElementById("memberName"),
    role: document.getElementById("memberRole"),
    year: document.getElementById("memberYear"),
    bio: document.getElementById("memberBio"),
    skills: document.getElementById("memberSkills"),
    projects: document.getElementById("memberProjects"),
    email: document.getElementById("memberEmail"),
    github: document.getElementById("memberGithub")
  };
  const previewCard = document.getElementById("editPreviewCard");
  const savedCode = document.getElementById("editSavedCode");

  function populateForm() {
    const member = groupMembers[Number(memberSelect.value)];
    if (!member) return;
    fields.name.value = member.name;
    fields.role.value = member.role;
    fields.year.value = member.year || "";
    fields.bio.value = member.bio;
    fields.skills.value = member.skills.join(", ");
    fields.projects.value = member.projects.map(function (project) {
      return project.title + " — " + project.description;
    }).join("\n");
    fields.email.value = member.email;
    fields.github.value = member.github;
  }

  function readForm() {
    const current = groupMembers[Number(memberSelect.value)];
    const name = fields.name.value.trim();
    const projects = fields.projects.value.split("\n").map(function (line) {
      const separator = line.indexOf("—");
      return {
        title: (separator === -1 ? line : line.slice(0, separator)).trim(),
        description: separator === -1 ? "" : line.slice(separator + 1).trim()
      };
    }).filter(function (project) {
      return project.title;
    });

    return {
      id: current.id,
      name: name,
      role: fields.role.value.trim(),
      year: fields.year.value.trim() || "300 Level",
      photo: name.split(/\s+/).map(function (part) { return part[0] || ""; }).join("").slice(0, 2).toUpperCase(),
      bio: fields.bio.value.trim(),
      skills: fields.skills.value.split(",").map(function (skill) { return skill.trim(); }).filter(Boolean),
      projects: projects,
      email: fields.email.value.trim(),
      github: fields.github.value.trim()
    };
  }

  function showPreview(member) {
    previewCard.replaceChildren(createMemberCard(member || readForm()));
  }

  groupMembers.forEach(function (member, index) {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = member.name;
    memberSelect.appendChild(option);
  });

  memberSelect.addEventListener("change", function () {
    populateForm();
    showPreview();
    savedCode.textContent = "";
  });
  document.getElementById("btnPreview").addEventListener("click", function () {
    showPreview();
  });
  document.getElementById("btnSave").addEventListener("click", function () {
    if (!fields.name.value.trim()) {
      fields.name.focus();
      return;
    }
    const index = Number(memberSelect.value);
    const member = readForm();
    groupMembers[index] = member;
    showPreview(member);
    savedCode.textContent = JSON.stringify(member, null, 2);
  });
  document.getElementById("btnAddMember").addEventListener("click", function () {
    const newId = groupMembers.reduce(function (highest, member) {
      return Math.max(highest, member.id);
    }, 0) + 1;
    const member = {
      id: newId,
      name: "New Member",
      role: "Computer Science Student",
      year: "300 Level",
      photo: "NM",
      bio: "",
      skills: [],
      projects: [],
      email: "",
      github: ""
    };
    groupMembers.push(member);
    const option = document.createElement("option");
    option.value = groupMembers.length - 1;
    option.textContent = member.name;
    memberSelect.appendChild(option);
    memberSelect.value = option.value;
    populateForm();
    showPreview(member);
    savedCode.textContent = "";
  });

  populateForm();
  showPreview();
}

const contactForm = document.getElementById("contactForm");
if (contactForm) {
  function validateField(input, errorElement) {
    const value = input.value.trim();
    const valid = input.name === "name" ? value.length >= 2
      : input.name === "email" ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
      : value.length >= 10;

    input.classList.toggle("invalid", !valid);
    errorElement.textContent = valid ? "" : input.name === "name"
      ? "Please enter your full name (at least 2 characters)."
      : input.name === "email" ? "Please enter a valid email address."
      : "Please enter a message (at least 10 characters).";
    return valid;
  }

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const fields = [
      [contactForm.elements.name, document.getElementById("cNameError")],
      [contactForm.elements.email, document.getElementById("cEmailError")],
      [contactForm.elements.message, document.getElementById("cMessageError")]
    ];
    let firstInvalid;
    fields.forEach(function (field) {
      if (!validateField(field[0], field[1]) && !firstInvalid) firstInvalid = field[0];
    });
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    let status = contactForm.querySelector("[role='status']");
    if (!status) {
      status = document.createElement("p");
      status.setAttribute("role", "status");
      contactForm.appendChild(status);
    }
    status.textContent = "Your details look good. This demonstration form does not send email.";
  });

  contactForm.addEventListener("input", function (event) {
    const input = event.target;
    if (!input.name) return;
    input.classList.remove("invalid");
    const error = input.parentElement.querySelector(".error-message");
    if (error) error.textContent = "";
  });
}
