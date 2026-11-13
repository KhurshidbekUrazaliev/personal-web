# Khurshidbek Urazaliev — Personal Website

> 🌐 **Live:** [khurshidbek.site](https://www.khurshidbek.site/)

My personal site: who I am, what I have built, and how to reach me. One page, with a few things to play with along the way.

---

## Stack

- **Framework** — Next.js 16 (App Router)
- **Language** — TypeScript
- **Styling** — Tailwind CSS 4 + CSS variables
- **Animations** — Framer Motion
- **Icons** — Lucide React
- **Deployment** — Vercel

---

## Sections

| Section | What is in it |
|---------|---------------|
| Hero | Name, role, links, a particle background and a session timer |
| Projects | Work at Jinie EduTech and my own projects, with live and GitHub links |
| About | My story, a journey timeline, languages and values |
| Languages | An interactive language tree with samples, a vocabulary quiz and a pronunciation check (Web Speech API) |
| Scanner | Tells which of my six languages each word of a text is in. No API, plain JavaScript |
| Resume | Tools by project, education, experience and a playable chess board with legal-move checking |
| Contact | Contact links and a contact form |

---

## Where things live

| What | File |
|------|------|
| Name, role, emails, social links, the form's access key | `src/lib/site.ts` |
| Languages and their levels | `src/lib/languages.ts` |
| Project cards | `src/components/sections/projects.tsx` |
| Skills, education, experience | `src/components/sections/resume.tsx` |
| Page title, description, share tags | `src/app/layout.tsx` |
| Share image and icons | `src/app/opengraph-image.tsx`, `src/app/icon.tsx`, `src/app/apple-icon.tsx` |

---

## Contact form

The form sends through [Web3Forms](https://web3forms.com).

1. Make a free access key on web3forms.com with the email that should receive the messages.
2. Paste it into `WEB3FORMS_ACCESS_KEY` in `src/lib/site.ts`. The key is made to be public.

While the key is empty, the Send button opens the visitor's own mail app with the message filled in.

---

## Easter Eggs

- Type `sudo hire khurshidbek` anywhere on the page
- Press `Cmd+K` / `Ctrl+K` for the command palette

---

## Run Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

| Command | What it does |
|---------|--------------|
| `npm run dev` | Starts the dev server |
| `npm run build` | Builds the site for production |
| `npm run lint` | Checks the code with ESLint |

---

## Contact

**Khurshidbek Urazaliev**
[khurshidbek.site](https://www.khurshidbek.site/) · [LinkedIn](https://www.linkedin.com/in/khurshidbekurazaliev/) · [Telegram](https://t.me/lu3frv) · ummahfaris@gmail.com · khurshidbekurazaliev@gmail.com
