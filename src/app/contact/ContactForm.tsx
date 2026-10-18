"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Please enter a valid email address"),
  service: z.enum(["website", "ai-agents", "software", "mobile", "web", "other"]),
  budget: z.string().optional(),
  message: z
    .string()
    .min(5, "Please briefly describe what you need")
    .max(2000),
});

type FormData = z.infer<typeof schema>;

const fieldStyle: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  background: "color-mix(in srgb, var(--color-bg-surface) 60%, transparent)",
  border: "1px solid var(--color-border)",
  borderRadius: "var(--radius-lg)",
  fontSize: "15px",
  color: "var(--color-text-primary)",
  fontFamily: "var(--font-body)",
  outline: "none",
  transition: "border-color 150ms ease, box-shadow 150ms ease, background 150ms ease",
};

const labelStyle: React.CSSProperties = {
  fontSize: "13px",
  fontWeight: 600,
  color: "var(--color-text-primary)",
  marginBottom: "8px",
  display: "block",
};

const serviceOptions = [
  { id: "website",   label: "Website" },
  { id: "ai-agents", label: "AI Agents" },
  { id: "mobile",    label: "Mobile App" },
  { id: "software",  label: "Software" },
  { id: "other",     label: "Other" },
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedService, setSelectedService] = useState<string>("website");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service: "website" },
  });

  const handleServiceSelect = (val: (typeof serviceOptions)[number]["id"]) => {
    setSelectedService(val);
    setValue("service", val);
  };

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
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="apple-card"
        style={{
          padding: "56px 40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "color-mix(in srgb, var(--color-system-green) 15%, transparent)",
            color: "var(--color-system-green)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            fontSize: "24px",
          }}
        >
          ✓
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "24px",
            fontWeight: 700,
            color: "var(--color-text-primary)",
            marginBottom: "10px",
            letterSpacing: "-0.02em",
          }}
        >
          Message Dispatched
        </h3>
        <p
          style={{
            fontSize: "15px",
            color: "var(--color-text-secondary)",
            maxWidth: "380px",
            margin: "0 auto 28px",
            lineHeight: 1.55,
          }}
        >
          We have received your specifications. An engineer will review your requirements and reach out within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="btn-apple-secondary"
          style={{ fontSize: "14px" }}
        >
          Send another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="apple-card"
      style={{
        padding: "36px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* Service Segmented Selector */}
      <div>
        <label style={labelStyle}>What are you looking to build?</label>
        <div
          style={{
            display: "flex",
            gap: "6px",
            flexWrap: "wrap",
            padding: "4px",
            borderRadius: "var(--radius-lg)",
            background: "color-mix(in srgb, var(--color-bg-surface) 60%, transparent)",
            border: "1px solid var(--color-border)",
          }}
        >
          {serviceOptions.map((opt) => {
            const isSelected = selectedService === opt.id;
            return (
              <button
                type="button"
                key={opt.id}
                onClick={() => handleServiceSelect(opt.id)}
                style={{
                  flex: "1 0 auto",
                  padding: "8px 16px",
                  borderRadius: "var(--radius-md)",
                  border: "none",
                  background: isSelected ? "var(--color-accent)" : "transparent",
                  color: isSelected ? "#FFFFFF" : "var(--color-text-secondary)",
                  fontSize: "13.5px",
                  fontWeight: isSelected ? 600 : 500,
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  fontFamily: "var(--font-body)",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Name + Email Row */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}
        className="form-row"
      >
        <div>
          <label style={labelStyle}>Your Name *</label>
          <input
            {...register("name")}
            placeholder="Alex Morgan"
            style={{
              ...fieldStyle,
              borderColor: errors.name ? "var(--color-system-red)" : "var(--color-border)",
            }}
          />
          {errors.name && (
            <span style={{ fontSize: "12px", color: "var(--color-system-red)", marginTop: "4px", display: "block" }}>
              {errors.name.message}
            </span>
          )}
        </div>

        <div>
          <label style={labelStyle}>Email Address *</label>
          <input
            {...register("email")}
            type="email"
            placeholder="alex@company.com"
            style={{
              ...fieldStyle,
              borderColor: errors.email ? "var(--color-system-red)" : "var(--color-border)",
            }}
          />
          {errors.email && (
            <span style={{ fontSize: "12px", color: "var(--color-system-red)", marginTop: "4px", display: "block" }}>
              {errors.email.message}
            </span>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <label style={labelStyle}>Tell us about your project *</label>
        <textarea
          {...register("message")}
          rows={4}
          placeholder="Briefly describe what you'd like to build, any key features, timeline goals, or reference links..."
          style={{
            ...fieldStyle,
            resize: "vertical",
            minHeight: "110px",
            borderColor: errors.message ? "var(--color-system-red)" : "var(--color-border)",
          }}
        />
        {errors.message && (
          <span style={{ fontSize: "12px", color: "var(--color-system-red)", marginTop: "4px", display: "block" }}>
            {errors.message.message}
          </span>
        )}
      </div>

      <AnimatePresence>
        {status === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              padding: "12px 16px",
              background: "color-mix(in srgb, var(--color-system-red) 12%, transparent)",
              border: "1px solid color-mix(in srgb, var(--color-system-red) 25%, transparent)",
              borderRadius: "var(--radius-md)",
              fontSize: "13px",
              color: "var(--color-system-red)",
            }}
          >
            Connection error while dispatching form. Please verify connection and retry.
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-apple-primary"
          style={{
            width: "100%",
            padding: "14px 28px",
            fontSize: "15px",
            cursor: status === "loading" ? "not-allowed" : "pointer",
            marginBottom: "12px",
          }}
        >
          {status === "loading" ? "Transmitting..." : "Send project inquiry ›"}
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            fontSize: "12px",
            color: "var(--color-text-muted)",
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span>Response within 24 hours · Direct engineer review · No spam</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 520px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}
