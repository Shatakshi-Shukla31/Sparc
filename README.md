# SPARC 2026 · Indo–US International Workshop & Conference

**Live website:** [https://sparc-orcin.vercel.app](https://sparc-orcin.vercel.app)

Responsive React website for the IIT Ropar event on **Medical Devices in Wound Healing**, scheduled for **20–21 December 2026**.

## Run locally

Install Node.js 22.12+ (or Node.js 20.19+), then run:

```sh
git clone https://github.com/Shatakshi-Shukla31/Sparc.git
cd Sparc
npm ci
npm run dev
```

Open **http://127.0.0.1:5173** while the development server is running.

## Run in VS Code

Open the repository folder in VS Code. After installing dependencies with `npm ci`, press **F5** to start the website and open Chrome. The same task is available under **Terminal → Run Task → SPARC: Run website**.

Press **Ctrl+Shift+B** to build, or run:

```sh
npm run build
npm run preview
```

The production files are generated in `dist/` and can be deployed to a static hosting service. Build output and installed dependencies are excluded from Git.

## Host on Vercel

1. Open [Vercel New Project](https://vercel.com/new) and sign in with GitHub.
2. Import `Shatakshi-Shukla31/Sparc` and use the `main` branch for production.
3. Keep **Root Directory** as `./` (the repository root). Do not enter `mdwh-2026`, because the application files are already at the repository root.
4. Use **Vite** as the framework preset, **npm ci** as the install command, **npm run build** as the build command, and **dist** as the output directory.
5. Select **Deploy**. Open the production URL that Vercel returns after the deployment is ready.

The tracked `vercel.json` already declares the framework, install command, build command, and output directory. No environment variables are required for the current website. Future pushes to the connected production branch trigger new deployments through Vercel's GitHub integration.

## Website features

- Responsive layouts with an enlarged SPARC logo, readable typography, and circular speaker portraits.
- A single directory of 26 invited speakers, all with portraits.
- Speaker category filters, name/institution search, and profile dialogs.
- Programme and theme tabs, FAQ accordion, and mobile navigation.
- Calendar download, Google Form registration, organiser contact links, directions, and downloadable flyer.
- Six organisers, a chief patron card for Professor Rajeev Ahuja, and enlarged workshop convenor cards.

Registration buttons open the [Google Form supplied by the organisers](https://forms.gle/ymvCvh3U4PeGdzfbA). Responses are collected through Google Forms; this website does not store them. Google currently asks visitors to sign in before opening the form. Update `event.registrationUrl` in `src/event.js` if the form changes.

## Edit the website

| File | Purpose |
| --- | --- |
| `src/event.js` | Event details, speakers, activities, themes, contacts, and FAQs |
| `src/main.jsx` | React components and interactions |
| `src/styles.css` | Typography, branding, layouts, and responsive styling |
| `public/images/` | Logos, speaker portraits, and device imagery |
| `public/downloads/` | Original downloadable flyer |
| `index.html` | Page title and metadata |

## Content and image references

The chief patron photograph was supplied by the user. Event content and other supplied artwork come from these presentations:

- `SPARC_Wound_Healing_Flyer-final (5).pptx`
- `INTERNATIONAL WORKSHOP (A2 (Landscape)) (1).pptx`
- `present speaker.pptx`

The current flyer is `public/downloads/SPARC-2026-flyer-23-10-2026.pdf`; both website download links use this PDF. Device and wound-care imagery appears throughout the page. Detailed session timings, fees, and accommodation arrangements await organiser confirmation.

Additional portrait sources:

- [Pratik Baldota — Improvians](https://improvians.com/about-us.html)
- [Dr. Bharat Kotru](https://drbharatkotru.com/about-us/)
- [Dr. Sanjeev Soni — CSIR-CSIO](https://icsio.csio.res.in/csio.ems/emp_profile.aspx?id=931)

The retained campus asset originated from [IIT Ropar](https://iitrpr.ac.in/nsm/Useful_Info.htm). Navigation was informed by the [Biomanthan event site](https://sites.google.com/iitrpr.ac.in/biomanthan/home).

Typography uses Google Fonts; icons use Lucide. Event logos and photographs remain the property of their respective owners.

## Build compatibility

Vite uses the official Rollup WebAssembly package through an npm alias and override for compatibility with Windows systems that restrict native Node modules.

## October 2026 photos, flyer and student presentations

All five additional speakers now have the supplied portraits. All six organisers have portrait cards, matched to the labelled organising team image. All 26 speakers appear in one grid, followed by the chief patron, workshop convenors, and organising team.

The current flyer download is `public/downloads/SPARC-2026-flyer-23-10-2026.pdf`, copied unchanged from the supplied flyer. New portrait sources are `new speaker photo.pdf` and the supplied organising team image. Speaker and organiser names follow the supplied labels.

A student abstract invitation announces awards for the top 10 student oral research presentations. Workshop registration opens the existing Google Form. The abstract submission button opens an email to `sparciitropar@gmail.com` with a relevant subject; no email is sent automatically. No award amounts, deadlines or acceptance guarantees are stated.

The speaker directory uses one grid without an additional-speakers heading. Flyer links are labelled Download flyer. Organiser portraits use larger circular frames, soft green image panels, and consistent name and institution panels.

Desktop speaker cards use four columns, with two columns on tablets and one on phones. Fine-pointer hover effects add subtle card lift, portrait accents, button shadows, and arrow movement. Reduced-motion preferences disable movement.
