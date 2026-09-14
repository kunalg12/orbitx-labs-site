import { ContactForm } from "./ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with OrbitX Labs — AI agents, software, mobile apps. Get a response within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <div
        style={{
          paddingTop: "calc(var(--nav-height) + 48px)",
          paddingBottom: "60px",
          background: "var(--color-bg-base)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container">
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              marginBottom: "16px",
            }}
          >
            Let&apos;s Work Together
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 7vw, 96px)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              color: "var(--color-text-primary)",
              lineHeight: 1.05,
              marginBottom: "20px",
            }}
          >
            Start a{" "}
            <span style={{ fontWeight: 300, fontStyle: "italic" }}>project</span>
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "var(--color-text-secondary)",
              lineHeight: 1.6,
              maxWidth: "480px",
            }}
          >
            Tell us what you&apos;re building. We&apos;ll respond within 24 hours with an honest assessment and a clear proposal.
          </p>
        </div>
      </div>

      {/* Form + info */}
      <div
        style={{
          background: "var(--color-bg-surface)",
          paddingBlock: "80px",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 400px",
              gap: "80px",
              alignItems: "start",
            }}
            className="contact-layout"
          >
            {/* Form */}
            <ContactForm />

            {/* Info sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {[
                {
                  icon: "⚡",
                  title: "Fast response",
                  description: "We reply within 24 hours with an honest assessment — no boilerplate sales pitch.",
                },
                {
                  icon: "💰",
                  title: "Transparent pricing",
                  description: "Fixed-price projects or hourly — agreed upfront, no surprises on the invoice.",
                },
                {
                  icon: "🚀",
                  title: "Immediate availability",
                  description: "We can typically start within 1–2 weeks of a signed proposal.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    display: "flex",
                    gap: "16px",
                    padding: "24px",
                    background: "var(--color-bg-base)",
                    borderRadius: "16px",
                    border: "1px solid var(--color-border)",
                    boxShadow: "var(--shadow-card)",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "var(--color-bg-surface)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "15px",
                        fontWeight: 700,
                        color: "var(--color-text-primary)",
                        marginBottom: "6px",
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.5,
                      }}
                    >
                      {item.description}
                    </div>
                  </div>
                </div>
              ))}

              {/* Cal.com — book a call instead */}
              <div
                style={{
                  padding: "28px 24px",
                  background: "var(--color-bg-base)",
                  borderRadius: "16px",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-card)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "13px", color: "var(--color-text-muted)", marginBottom: "12px", fontWeight: 500 }}>
                  Prefer to talk first?
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 700,
                    color: "var(--color-text-primary)",
                    fontFamily: "var(--font-display)",
                    letterSpacing: "-0.02em",
                    marginBottom: "6px",
                  }}
                >
                  Book a 30-min intro call
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-text-muted)", marginBottom: "20px", lineHeight: 1.5 }}>
                  Pick a time that works for you — we&apos;ll scope your project live.
                </div>
                <button
                  data-cal-link="kunal-gursal-cxyibu/30min"
                  data-cal-config='{"layout":"month_view"}'
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 28px",
                    background: "var(--color-accent)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "var(--radius-full)",
                    fontSize: "14px",
                    fontWeight: 600,
                    fontFamily: "var(--font-body)",
                    cursor: "pointer",
                    width: "100%",
                    justifyContent: "center",
                    boxShadow: "0 4px 16px rgba(201,101,0,0.30)",
                  }}
                >
                  📅 Book a call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
