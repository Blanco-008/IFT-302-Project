# IFT 302 Group 1 — Student Portfolio (Nile University of Nigeria)

A responsive, shared student portfolio website for **IFT 302 Group 1** at **Nile University of Nigeria**.

Built with **pure HTML, CSS, and JavaScript** — no PHP, no database, no backend, no build step.

## 📁 Files

```
IFT 302 Project/
├── index.html   # Page layout (nav, hero, members, edit, contact, footer)
├── styles.css   # All styling (Nile blue + white, gold accent, responsive)
├── script.js    # Renders members, handles edit/preview/save, contact validation
└── data.js      # ALL member data lives here (array of objects)
```

## 🚀 How to Run

1. Open `index.html` directly in any browser — no server needed.
2. Or run a local server:
   ```bash
   cd "/Users/macpro/Desktop/IFT 302 Project"
   python3 -m http.server 8000
   ```
   Then visit: `http://localhost:8000`

3. Or host via **MAMP**:
   - Copy the 4 files into `/Applications/MAMP/htdocs/portfolio/`
   - Visit: `http://localhost:8888/portfolio/`

## ✏️ How to Edit

### Edit a member via the website (Edit/Update section)
1. Open the site → **Edit Profile**.
2. Select a member from the dropdown.
3. Update fields: Full Name, Role/Course, Year/Level, Bio, Skills (comma separated), GitHub URL, Projects (one per line: `Title — Description`), Email.
4. Click **Preview Changes** → live preview updates instantly.
5. Click **Save Changes** → writes updated JSON back to `data.js` (copy from the box to save permanently).

### Add a new member
- Click **Add New Member** → new member is added and appears in the directory instantly.

### Edit a member directly in `data.js`
- Change the fields inside a member object (`name`, `role`, `year`, `photo`, `bio`, `skills[]`, `projects[]`, `email`, `github`).
- Save → refresh the page.

## ✉️ Contact Form

- Fields: Full Name, Email, Message.
- JavaScript validation: name ≥ 2 chars, valid email, message ≥ 10 chars.
- On success: dynamic success message shown in the form.

## 🎨 Design

- Nile University dark blue (`#0b2a5b`) + white, accent gold (`#f5b942`).
- Fully responsive (desktop / tablet / mobile).
