# IFT 302 Group 1 — Student Portfolio (Nile University of Nigeria)

A responsive, shared student portfolio website for **IFT 302 Group 1** at **Nile University of Nigeria**.

Built with **pure HTML, CSS, and JavaScript** — no PHP, no database, no backend, no build step.

## Files

```
IFT 302 Project/
├── index.html    # Home page
├── members.html  # Member directory
├── edit.html     # Profile preview and editing
├── contact.html  # Contact details and form
├── styles.css    # Simple responsive styling shared by all pages
├── script.js     # Shared page behavior
└── data.js       # Group member profiles
```

## How to Run

1. Open `index.html` directly in any browser — no server needed.
2. Use the navigation links to visit Home, Members, Edit Profile, and Contact.
3. Or run a local server:
   ```bash
   cd "/Users/macpro/Desktop/IFT 302 Project"
   python3 -m http.server 8000
   ```
   Then visit: `http://localhost:8000`

4. Or host via **MAMP**:
   - Copy the 4 files into `/Applications/MAMP/htdocs/portfolio/`
   - Visit: `http://localhost:8888/portfolio/`

## How to Edit

### Edit a member via the website
1. Open the site → **Edit Profile**.
2. Select a member from the dropdown.
3. Update fields: Full Name, Role/Course, Year/Level, Bio, Skills (comma separated), GitHub URL, Projects (one per line: `Title — Description`), Email.
4. Click **Preview Changes** to see a preview.
5. Click **Save Changes**, then copy the JSON from the box into `data.js` to keep it permanently. Browser-only edits are temporary.

### Add a new member
- Click **Add New Member** → new member is added and appears in the directory instantly.

### Edit a member directly in `data.js`
- Change the fields inside a member object (`name`, `role`, `year`, `photo`, `bio`, `skills[]`, `projects[]`, `email`, `github`).
- Save → refresh the page.

## Contact Page

- Fields: Full Name, Email, Message.
- JavaScript validation: name ≥ 2 chars, valid email, message ≥ 10 chars.
- The form validates the fields in the browser; it does not send email.

## Design

- Plain white background, simple typography, and basic borders.
- Responsive navigation, profile directory, and forms for mobile screens.
