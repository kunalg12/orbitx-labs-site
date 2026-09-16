import type { Metadata } from "next";
import Script from "next/script";
import { spaceGrotesk, inter } from "@/lib/fonts";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/sections/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.orbitxlabs.in"
  ),
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
      {/* Cal.com embed — loads after page is interactive */}
      <Script
        id="cal-embed"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(C,A,L){let p=function(a,ar){a.q.push(ar)};let d=C.document;C.Cal=C.Cal||function(){let cal=C.Cal;let ar=arguments;if(!cal.loaded){cal.ns={};cal.q=cal.q||[];d.head.appendChild(d.createElement("script")).src=A;cal.loaded=true}if(ar[0]===L){const api=function(){p(api,arguments)};const namespace=ar[1];api.q=api.q||[];typeof namespace==="string"?(cal.ns[namespace]=api)&&p(api,ar):p(cal,ar);return}p(cal,ar)};})(window,"https://app.cal.com/embed/embed.js","init");
            Cal("init", { origin: "https://cal.com" });
            Cal("ui", { styles: { branding: { brandColor: "#C96500" } }, hideEventTypeDetails: false });
          `,
        }}
      />
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
