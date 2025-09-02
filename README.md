# My First Website (static scaffold)

This is a minimal static website scaffold (HTML, CSS, JS) intended to be deployed to AWS Amplify via GitHub.

Quick steps to get it live:

1. Initialize git, commit, and push to a GitHub repo.

````powershell
cd "c:\0myFiles\Aramco\Fundamentals of Cloud Computing\Day 2\My first website"
git init
# Dmitrii Karaulanov — Portfolio (static)

This is a minimal personal portfolio for Dmitrii Karaulanov — a software engineer focusing on enterprise solutions, cloud, and AI. It's a static site suitable for deployment to AWS Amplify, GitHub Pages, or any static host.

Getting live (short)

1. Initialize git, commit, and push to a GitHub repo.

```powershell
cd "c:\0myFiles\Aramco\Fundamentals of Cloud Computing\Day 2\My first website"
git init
git add .
git commit -m "Initial portfolio"
# create a repo on GitHub and add remote, e.g.:
git remote add origin https://github.com/<your-username>/<repo>.git
git branch -M main
git push -u origin main
````

2. Connect repo in AWS Amplify

- In the Amplify Console choose "Connect app" → GitHub, select repository and branch.
- Amplify will use the supplied `amplify.yml` (no build step).

Configuring the contact form

- The contact form is in `index.html` and contains a `data-endpoint` attribute. Replace the placeholder with a Formspree endpoint (recommended quick option) or your own API endpoint.

  Example (Formspree):

  1.  Create a free form at https://formspree.io/ and get your form ID.
  2.  Update the form element in `index.html`:

   <form id="contact-form" data-endpoint="https://formspree.io/f/your_id">

  The client-side script (`js/main.js`) sends JSON to the endpoint. If your endpoint expects form-encoded data, adjust the fetch call accordingly.

Local demo mode

- If you leave the `data-endpoint` value unchanged (the placeholder), the contact form will run in demo mode and simulate a successful send.

Notes & next improvements

- Add social links, CV/portfolio pages, or GitHub project lists.
- If you need server-side validation or to keep messages private, use a simple serverless function (AWS Lambda) or a backend endpoint and point the form to that URL.
