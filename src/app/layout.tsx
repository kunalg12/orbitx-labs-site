import type { Metadata } from "next";
import { spaceGrotesk, inter } from "@/lib/fonts";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/sections/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "OrbitX Labs — AI Agents, Software & Mobile Apps",
    template: "%s — OrbitX Labs",
  },
  description:
    "We build AI agents, software, and mobile applications. Small, founder-led agency. Ship in weeks, not months.",
  keywords: [
    "AI agents",
    "software development",
    "mobile apps",
    "web development",
    "React",
    "Next.js",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "OrbitX Labs",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <head>
        {/* Anti-flash theme script — runs before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('theme');
                if (!t) {
                  t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                document.documentElement.dataset.theme = t;
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <SmoothScrollProvider>
            <CustomCursor />
            <Nav />
            <main>{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
