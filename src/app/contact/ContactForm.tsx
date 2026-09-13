"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  service: z.enum(["ai-agents", "software", "mobile", "web", "other"]),
  budget: z.string().optional(),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(2000),
});

type FormData = z.infer<typeof schema>;

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  background: "var(--color-bg-base)",
  border: "1.5px solid var(--color-border)",
  borderRadius: "12px",
  fontSize: "15px",
  color: "var(--color-text-primary)",
  fontFamily: "var(--font-body)",
  outline: "none",
  transition: "border-color 200ms ease, box-shadow 200ms ease",
};

const labelStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 600,
  color: "var(--color-text-secondary)",
  marginBottom: "8px",
  display: "block",
};

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setStatus("success");
        reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          padding: "48px",
          background: "var(--color-bg-base)",
          border: "1px solid var(--color-border)",
          borderRadius: "20px",
          textAlign: "center",
          boxShadow: "var(--shadow-raised)",
        }}
      >
        <div style={{ fontSize: "48px", marginBottom: "20px" }}>🎉</div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "24px",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            marginBottom: "12px",
          }}
        >
          Message received!
        </h3>
        <p style={{ fontSize: "16px", color: "var(--color-text-secondary)" }}>
          We&apos;ll get back to you within 24 hours with an honest assessment.
        </p>
        <button
          onClick={() => setStatus("idle")}
          style={{
            marginTop: "24px",
            padding: "12px 24px",
            background: "var(--color-accent)",
            color: "#fff",
            border: "none",
            borderRadius: "9999px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "var(--font-body)",
          }}
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        background: "var(--color-bg-base)",
        border: "1px solid var(--color-border)",
        borderRadius: "20px",
        padding: "40px",
        boxShadow: "var(--shadow-raised)",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* Name + Email row */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
        className="form-row"
      >
        <div>
          <label style={labelStyle}>Name *</label>
          <input
            {...register("name")}
            placeholder="Jane Smith"
            style={{
              ...fieldStyle,
              borderColor: errors.name ? "#E11D48" : "var(--color-border)",
            }}
          />
          {errors.name && (
            <span style={{ fontSize: "12px", color: "#E11D48", marginTop: "4px", display: "block" }}>
              {errors.name.message}
            </span>
          )}
        </div>
        <div>
          <label style={labelStyle}>Email *</label>
          <input
            {...register("email")}
            type="email"
            placeholder="jane@company.com"
            style={{
              ...fieldStyle,
              borderColor: errors.email ? "#E11D48" : "var(--color-border)",
            }}
          />
          {errors.email && (
            <span style={{ fontSize: "12px", color: "#E11D48", marginTop: "4px", display: "block" }}>
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      {/* Service */}
      <div>
        <label style={labelStyle}>What do you need? *</label>
        <select
          {...register("service")}
          style={{
            ...fieldStyle,
            borderColor: errors.service ? "#E11D48" : "var(--color-border)",
          }}
        >
          <option value="">Select a service...</option>
          <option value="ai-agents">AI Agents</option>
          <option value="software">Software Development</option>
          <option value="mobile">Mobile App</option>
          <option value="web">Web Platform / Site</option>
          <option value="other">Something else</option>
        </select>
        {errors.service && (
          <span style={{ fontSize: "12px", color: "#E11D48", marginTop: "4px", display: "block" }}>
            Please select a service
          </span>
        )}
      </div>

      {/* Budget */}
      <div>
        <label style={labelStyle}>Budget range (optional)</label>
        <select {...register("budget")} style={fieldStyle}>
          <option value="">Prefer not to say</option>
          <option value="under-5k">Under $5,000</option>
          <option value="5k-15k">$5,000 – $15,000</option>
          <option value="15k-50k">$15,000 – $50,000</option>
          <option value="50k+">$50,000+</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label style={labelStyle}>Tell us about your project *</label>
        <textarea
          {...register("message")}
          rows={5}
          placeholder="What are you building? What problem does it solve? Any timeline constraints?"
          style={{
            ...fieldStyle,
            resize: "vertical",
            minHeight: "120px",
            borderColor: errors.message ? "#E11D48" : "var(--color-border)",
          }}
        />
        {errors.message && (
          <span style={{ fontSize: "12px", color: "#E11D48", marginTop: "4px", display: "block" }}>
            {errors.message.message}
          </span>
        )}
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              padding: "12px 16px",
              background: "#FFF1F2",
              border: "1px solid #FECDD3",
              borderRadius: "10px",
              fontSize: "14px",
              color: "#E11D48",
            }}
          >
            Something went wrong. Please try again or email us directly.
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          padding: "16px 32px",
          background: status === "loading" ? "var(--color-text-muted)" : "var(--color-accent)",
          color: "#fff",
          border: "none",
          borderRadius: "9999px",
          fontSize: "16px",
          fontWeight: 700,
          cursor: status === "loading" ? "not-allowed" : "pointer",
          fontFamily: "var(--font-body)",
          transition: "background 200ms ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        {status === "loading" ? (
          <>
            <span
              style={{
                width: "16px",
                height: "16px",
                border: "2px solid rgba(255,255,255,0.4)",
                borderTopColor: "#fff",
                borderRadius: "50%",
                animation: "spin 0.7s linear infinite",
                display: "inline-block",
              }}
            />
            Sending...
          </>
        ) : (
          "Send message →"
        )}
      </button>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 480px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
