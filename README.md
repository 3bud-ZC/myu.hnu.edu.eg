# Helwan National University (HNU) - Student Portal UI Demo

> **Disclaimer:** This project is an **UNOFFICIAL DEMONSTRATION** created for frontend engineering, UI recreation, and portfolio purposes only. It is **NOT** an official university portal, has no backend connection, and is not affiliated with, authorized by, or endorsed by Helwan National University (HNU). All student records, grades, and fee balances displayed are mock/demo data.

A high-fidelity, pixel-accurate student portal UI demonstration built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**, designed for seamless static deployment on **GitHub Pages**.

---

## 🔑 Demo Access & Credentials

The portal uses frontend-only demo authentication:

| Field | Demo Credential |
| :--- | :--- |
| **Username / Student ID** | `942250190` |
| **Password** | `942250190` |

*(A quick "Auto Fill" shortcut is also provided on the sign-in screen.)*

---

## 🚀 Features & Implemented Screens

1. **Sign In / Authentication Screen** (`#/login`):
   - Dark blue slate aesthetic with centered card
   - HNU demo branding, remember me toggle, and password visibility switcher
   - LocalStorage demo session persistence and logout handling

2. **Transcript** (`#/transcript`):
   - Summary stat cards: Cumulative GPA (computed ~2.10 / 4.00), Grade Letter (`C`), Earned Hours (`13 hrs`), and Level (`1`)
   - Interactive accordions for **GPA Scale** and **Academic Levels**
   - **Fall 2026 / 2027**: Empty state with `Grades Not Posted`
   - **Spring 2025 / 2026**: Course grade breakdown preserving required courses:
     - `THS118 - General Microbiology` (2 hrs, 58.0 marks, Grade: F, Status: Fail)
     - `THS117 - General physiology for technologists` (2 hrs, 40.0 marks, Grade: F, Status: Fail)
     - Passing demo courses (`THS1110`, `THS115`, `THS116`) with mathematically verified GPA weights
   - Prior term history mathematically consistent with the 13 earned hours total
   - Prominent **UNOFFICIAL DEMO** watermark indicator

3. **Registration** (`#/registration`):
   - Institutional financial hold banner (`Cannot Register: Did not pay any previous fee`)
   - Student info header with status badge (`REGISTRATION ON HOLD`)
   - Credit hour counters: Registered: `0`, Min: `10`, Max: `12`, Remaining: `12`
   - Semester picker and interactive `Edit Registration` modal
   - 5-day hourly timetable matrix (Saturday through Wednesday, 08:00 AM - 05:00 PM)

4. **Payments** (`#/payments`):
   - Financial overview cards:
     - **Total Fees**: `115,400.00 EGP` (8 fees)
     - **Discount**: `0.00 EGP`
     - **Total Paid**: `59,000.00 EGP`
     - **Balance Due**: `56,400.00 EGP`
   - Multi-tab navigation: `Unpaid Fees (4)`, `Installments`, `Payment History (4)`, and `All Fees`
   - Checkbox row selection and interactive `Recheck Payments` button with loading state
   - Mixed Arabic and English currency formatting

5. **Student Information** (`#/student-info`):
   - Student profile hero with Arabic initials (`رم`)
   - Arabic display name: `روناء حسن صفوت حسن محمد`
   - Personal Information card with masked National ID (`********0206`)
   - Academic Information card (Student ID `942250190`, Academic Year `2026 / 2027`, School ID `42`, Grade ID `421`)
   - Security panel with an interactive **Change Password** demo modal

---

## 🛠️ Technology Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Bundler**: Vite 5
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router (HashRouter for 100% static hosting compatibility on GitHub Pages)
- **Typography**: Google Fonts (Inter + Cairo for clean Arabic rendering)

---

## 💻 Local Development

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation
```bash
# Clone the repository
git clone https://github.com/3bud-ZC/myu.hnu.edu.eg.git
cd myu.hnu.edu.eg

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to explore the portal.

---

## 📦 Production Build

To test the production build locally:

```bash
# Typecheck & bundle
npm run build

# Preview build output
npm run preview
```

The production output will be generated inside the `dist/` directory with relative asset paths suitable for any subdirectory or static host.

---

## 🌐 GitHub Pages Deployment

A GitHub Actions workflow is provided in `.github/workflows/deploy.yml`.

### Deployment Instructions:
1. Push the repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete HNU student portal demo implementation"
   git push -u origin main
   ```
2. On GitHub, navigate to:
   **Settings** > **Pages**
3. Under **Build and deployment** > **Source**, choose:
   **GitHub Actions**
4. Once the workflow completes, the live site will be accessible at:
   `https://3bud-zc.github.io/myu.hnu.edu.eg/`

---

## 📁 Project Structure

```text
myu.hnu.edu.eg/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Automated GitHub Pages CI/CD workflow
├── src/
│   ├── components/
│   │   └── Layout/
│   │       ├── PortalLayout.tsx        # Shell wrapping sidebar, topbar, content
│   │       ├── Sidebar.tsx             # Navy navigation sidebar
│   │       ├── TopBar.tsx              # White topbar with notifications & user chip
│   │       └── UnofficialDemoBadge.tsx # Disclaimer badge components
│   ├── context/
│   │   └── AuthContext.tsx   # Demo authentication state & localStorage persistence
│   ├── data/
│   │   ├── student.ts        # Demo student profile details
│   │   ├── transcript.ts     # Academic transcript dataset & GPA calculator
│   │   └── payments.ts       # Tuition fee records & payment summary logic
│   ├── pages/
│   │   ├── LoginPage.tsx        # Sign in page
│   │   ├── TranscriptPage.tsx   # Academic transcript & grades table
│   │   ├── RegistrationPage.tsx # Course registration & timetable
│   │   ├── PaymentsPage.tsx     # Student payments & billing statement
│   │   └── StudentInfoPage.tsx  # Personal & academic details + security
│   ├── types/
│   │   ├── student.ts        # TypeScript interfaces for student profiles
│   │   ├── transcript.ts     # TypeScript interfaces for courses & terms
│   │   └── payments.ts       # TypeScript interfaces for fee items
│   ├── App.tsx               # Route declarations & route guards
│   ├── index.css             # Tailwind base styles & custom scrollbars
│   └── main.tsx              # HashRouter entry point
├── index.html                # HTML entry point with fonts & favicon
├── package.json              # Project dependencies & build scripts
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind styling theme & custom colors
├── tsconfig.json             # TypeScript compiler configuration
└── vite.config.ts            # Vite configuration with relative base path
```

---

## 🔒 Privacy & Safety Notice

This repository strictly respects privacy:
- **No sensitive personal data**: Full national IDs are masked (`********0206`).
- **No external credentials or secrets** are contained or required.
- **Client-side only**: All calculations and interactions execute locally in the browser with zero external telemetry or server transmission.
