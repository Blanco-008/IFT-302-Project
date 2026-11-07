# Online Student Portfolio Website — IFT 302 Group 1

A complete, ready-to-run **student portfolio website** built with **pure HTML, CSS and JavaScript**.
No PHP, no database, no build tools, no framework — just open it in any browser.

## 📁 Files in this folder

```
your-portfolio/
├── index.html    # The whole page (all sections live here)
├── css/
│   └── style.css # All styles (colors, layout, responsive rules)
└── js/
    └── script.js # All behavior (mobile menu, animations, form validation)
```

## 🚀 How to use it (2 minutes)

1. **Open it:** Double-click `index.html` (or right-click → Open With → your browser).
   - Works offline, straight from the folder.
2. **Optional local server** (only needed if you want clean URLs):
   ```bash
   # from the project folder
   python3 -m http.server 8000
   # then visit http://localhost:8000
   ```

That's it. No installation, no database, no backend.

## ✏️ How to edit the content

### Change the student's name / hero text
- `index.html` → Hero section (`<h1 class="hero-title">…</h1>`, hero text, badge).
- `index.html` → Navigation logo and footer.

### Change skills
- `index.html` → inside `#skills`, each `.skill-card` holds `.skill` blocks.
- Each bar: `<div class="skill-header"><span>JavaScript</span><span>90%</span></div>`
  and `<div class="skill-bar"><div class="skill-bar-fill" style="--level: 90%;"></div></div>`
- Change the name, the `%` value, or add/remove whole `.skill` blocks.

### Change projects
- `index.html` → inside `#projects`, each `<article class="project-card">` is one project.
- Edit: tech tags (`.tech-tag`), title (`h3`), description (`p`) and links.

### Change contact info / social links / stats
- `index.html` → Contact details, hero social links, stats grid, footer.

### Change colors / fonts / spacing
- `css/style.css` → CSS variables at the top of the file (`--color-primary`, `--radius`, etc.).

### Fix typos / wording
- `index.html` → copy text directly; `js/script.js` → validation/success messages.

## ✅ Features included

- Sticky navigation with mobile hamburger menu (animated).
- Hero / intro with call-to-action buttons and social links.
- About section with photo placeholder, bio and statistics.
- Skills section with animated progress bars.
- Projects section with cards and tech tags.
- Contact form with **JavaScript validation** (name, email, message) and a
  **dynamically created success message** (thank-you popup in the form).
- Footer with quick links and auto-updating copyright year.
- Fully **responsive** (desktop → tablet → mobile → small phones).
- Scroll-reveal animations and reduced-motion support.

## 👥 For Group 1 members

- Member 1: edit hero name & intro → `index.html`.
- Member 2: edit skills & projects → `index.html`.
- Member 3: edit contact form behaviour/messages → `js/script.js`.
- Everyone: review copy, photos and project links before submission.

---

*Built for IFT 302 — Group 1. Pure HTML/CSS/JS, ready to run in any browser.*
