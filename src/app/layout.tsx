import type { Metadata } from "next";
import { Urbanist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";
import { app, siteUrl } from "@/lib/brand";

// Same family the mobile app ships (src/constants/theme.js's `fontFamily`),
// so the marketing site and the app read as one product rather than two.
const urbanist = Urbanist({
  variable: "--font-urbanist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DESCRIPTION =
  "Personal finance that understands how you actually earn and spend. Net worth, financial health scoring, goals and Zakat — with bank SMS logged automatically. Offline-first, in your language.";

export const metadata: Metadata = {
  // Required for the OG/Twitter image and canonical URL to resolve to
  // absolute URLs — without it Next emits relative paths, which no scraper
  // accepts. See `siteUrl` in lib/brand.ts for how the origin is configured.
  metadataBase: new URL(siteUrl),
  title: {
    default: `${app.name} — ${app.tagline}`,
    template: `%s — ${app.name}`,
  },
  description: DESCRIPTION,
  applicationName: app.name,
  keywords: [
    "Islamic expense tracker",
    "halal budgeting app",
    "Zakat calculator",
    "Nisab",
    "Muslim personal finance",
    "net worth tracker",
    "bKash expense tracker",
    "Bangladesh budgeting app",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: app.name,
    title: `${app.name} — ${app.tagline}`,
    description: DESCRIPTION,
    url: siteUrl,
    locale: "en",
  },
  twitter: {
    card: "summary_large_image",
    title: `${app.name} — ${app.tagline}`,
    description: DESCRIPTION,
  },
  // The site is one long scroll plus two legal pages; there is nothing here
  // that shouldn't be indexed.
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${urbanist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('islamic-expense-tracker-theme');if(t==='dark')document.documentElement.setAttribute('data-theme','dark');}catch(e){}`,
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
