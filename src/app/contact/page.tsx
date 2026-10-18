import { ContactForm } from "./ContactForm";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — OrbitX Labs",
  description:
    "Start a project with OrbitX Labs — AI agents, software, mobile apps. Get a response within 24 hours.",
};

const valueProps = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Fast 24-hour response",
    description: "Every inquiry is reviewed directly by an engineer with concrete technical feedback.",
    color: "var(--color-accent)",
    bg: "var(--color-accent-light)",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
    title: "Transparent fixed-scope bids",
    description: "Milestone-based or sprint retainers agreed upfront with zero unexpected billings.",
    color: "var(--color-system-green)",
    bg: "color-mix(in srgb, var(--color-system-green) 12%, transparent)",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Rapid onboarding",
    description: "We typically start technical sprints within 7 days of scope finalization.",
    color: "var(--color-system-purple)",
    bg: "color-mix(in srgb, var(--color-system-purple) 12%, transparent)",
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <div
        style={{
          paddingTop: "calc(var(--nav-height) + 40px)",
          paddingBottom: "48px",
          background: "var(--color-bg-base)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container">
          <SectionLabel>Let&apos;s Work Together</SectionLabel>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 6vw, 76px)",
              fontWeight: 700,
              letterSpacing: "var(--tracking-hero)",
              color: "var(--color-text-primary)",
              lineHeight: 1.05,
              marginTop: "8px",
              marginBottom: "16px",
            }}
          >
            Start a project.
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "17px",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
              maxWidth: "520px",
            }}
          >
            Tell us about your application, platform, or workflow automation. We will reply within 24 hours with an honest technical assessment.
          </p>
        </div>
      </div>

      {/* Form + Sidebar */}
      <div
        style={{
          background: "var(--color-bg-surface)",
          paddingBlock: "64px 96px",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              gap: "48px",
              alignItems: "start",
            }}
            className="contact-layout"
          >
            {/* Form */}
            <ContactForm />

            {/* Info Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {valueProps.map((item) => (
                <div
                  key={item.title}
                  className="apple-card"
                  style={{
                    display: "flex",
                    gap: "16px",
                    padding: "24px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: item.bg,
                      color: item.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: "var(--color-text-primary)",
                        marginBottom: "4px",
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}

              {/* Direct Cal.com booking card */}
              <div
                className="apple-card"
                style={{
                  padding: "28px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--color-accent)",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}
                >
                  Schedule directly
                </div>
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.015em",
                    marginBottom: "6px",
                  }}
                >
                  Book a 30-min intro call
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--color-text-secondary)",
                    marginBottom: "20px",
                    lineHeight: 1.5,
                  }}
                >
                  Pick a time on our calendar. We&apos;ll discuss scope, architecture, and milestones live.
                </div>
                <button
                  data-cal-link="kunal-gursal-cxyibu/30min"
                  data-cal-config='{"layout":"month_view"}'
                  className="btn-apple-primary"
                  style={{
                    width: "100%",
                    fontSize: "14px",
                  }}
                >
                  Schedule a call <span>›</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-layout {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
        }
      `}</style>
    </>
  );
}
