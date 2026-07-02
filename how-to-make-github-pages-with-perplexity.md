# How to Make GitHub Pages with Perplexity

A practical guide for building and deploying a static website to GitHub Pages using Perplexity as your AI coding and content assistant.

> **Real session note:** This guide was updated based on an actual session where Perplexity built and deployed [uutisseuranta.github.io](https://uutisseuranta.github.io) and configured the custom domain `uutisseuranta.net` — step by step, entirely through conversation.

---

## Overview

[GitHub Pages](https://pages.github.com/) is a free static site hosting service built into every GitHub repository. Combined with [Perplexity](https://www.perplexity.ai/), you can generate HTML, CSS, and JavaScript entirely through conversation — no local build tools required.

**What you need:**
- A GitHub account
- A public repository (or GitHub Pro/Team for private repos)
- A Perplexity account (free tier works)

---

## Step 1: Prepare Your Repository

For a GitHub Pages site served directly at `https://username.github.io`, the repository **must be named `username.github.io`**.

| Source | Use case |
|---|---|
| `main` branch root (`/`) | Simple sites — all files in repo root |
| `main` branch `/docs` folder | Keeps source and site files separate |
| `gh-pages` branch | CI/CD workflows, generated static builds |

---

## Step 2: Generate Your Site with Perplexity

Open Perplexity and describe what you want to build.

**Example prompt:**

```
Make this into a github pages:
https://github.com/jaakkokorhonen/uutisseuranta
```

**Key constraints to always mention:**
- "Single static HTML file" or "pure HTML/CSS/JS"
- "No server-side code"
- "Must work on GitHub Pages"
- "CDN libraries only" if you want external dependencies

---

## Step 3: Refine the Output

Perplexity generates code iteratively. After the first output, test locally and ask follow-up questions:

```
The nav bar overlaps the hero section on mobile (375px width).
Fix the CSS so the nav stacks vertically below 768px.
```

---

## Step 4: Push the File to GitHub

Perplexity can push files directly to GitHub using its MCP GitHub integration — no local git required.

```bash
# Via git CLI (alternative)
git clone https://github.com/uutisseuranta/uutisseuranta.github.io.git
cd uutisseuranta.github.io
cp ~/path/to/generated-site.html index.html
git add index.html
git commit -m "Initial GitHub Pages site"
git push origin main
```

---

## Step 5: Enable GitHub Pages

> **GitHub Pages isn’t enabled automatically — you need to turn it on in your repo settings.**

1. Go to **Settings → Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose branch: `main`, folder: `/ (root)`
4. Click **Save**

---

## Step 6: Verify the Deployment

**Common issues:**

| Symptom | Cause | Fix |
|---|---|---|
| 404 on root | No `index.html` in deploy folder | Rename entry file to `index.html` |
| CSS/JS not loading | Absolute paths (`/style.css`) | Use relative paths (`./style.css`) |
| Blank white page | JS error on load | Open DevTools Console |
| Old version showing | Browser cache | Hard-refresh |

---

## Step 7: Add a Custom Domain (with Cloudflare)

### 7a. Add DNS records in Cloudflare

**Four A records** (Proxy status = DNS only — grey cloud):

| Type | Name | Content |
|------|------|---------|
| A | @ | `185.199.108.153` |
| A | @ | `185.199.109.153` |
| A | @ | `185.199.110.153` |
| A | @ | `185.199.111.153` |

**One CNAME record:**

| Type | Name | Content |
|------|------|---------|
| CNAME | www | `uutisseuranta.github.io` |

### 7b. Push the CNAME file

```
uutisseuranta.net
```

### 7c. Set the custom domain in GitHub Pages settings

1. Go to **Settings → Pages**
2. Type `uutisseuranta.net` under **Custom domain** and click **Save**
3. Wait 5–30 minutes for DNS propagation
4. Tick **Enforce HTTPS**

---

## Step 8: Iterate with Perplexity

**Accessibility:**
```
Audit this HTML for WCAG AA compliance. Check heading hierarchy,
alt text, color contrast, and keyboard navigation. Fix all issues.
```

**SEO:**
```
Add proper Open Graph meta tags, a <title>, and a <meta description>
for this news tracker site. Include Finnish-language og:locale.
```

---

## Resources

- [GitHub Pages documentation](https://docs.github.com/en/pages)
- [uutisseuranta.github.io repository](https://github.com/uutisseuranta/uutisseuranta.github.io)
- [Perplexity](https://www.perplexity.ai/)
- [HTML Preview for GitHub](https://htmlpreview.github.io/)

*Guide created and updated with Perplexity AI — June 2026*
