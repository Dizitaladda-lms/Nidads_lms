"use client";

import { useState } from "react";
import styles from "@/components/ContactSection/contactSection.module.css";

export default function ContactSection() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    enquiryTypes: []
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckboxChange = (value) => {
    let updated = [...form.enquiryTypes];

    if (updated.includes(value)) {
      updated = updated.filter((item) => item !== value);
    } else {
      updated.push(value);
    }

    setForm({ ...form, enquiryTypes: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBlocked) return;
    setSubmitError("");

    if (!form.firstName || !form.email) {
      alert("Please fill required fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.firstName + " " + form.lastName,
          email: form.email,
          mobile: form.phone,
          course: "Contact Form",
          message: form.message,
          enquiryTypes: form.enquiryTypes.join(", "),
          source: "Contact Section"
        })
      });

      const payload = await response.json().catch(() => null);

      if (response.status === 429 || payload?.blocked) {
        setIsBlocked(true);
        throw new Error(
          payload?.error ||
            "Aapki IP address se maximum requests limit (3) exceed ho chuki hai. Is IP ko block kar diya gaya hai."
        );
      }

      if (!response.ok || !payload?.success) {
        throw new Error(payload?.error || "Unable to submit form");
      }

      setSubmitted(true);
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        enquiryTypes: []
      });
    } catch (err) {
      console.error("Submission failed:", err);
      setSubmitError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>Get in touch</h1>
          <p className={styles.subtitle}>
            Have questions about our courses, admissions, or career support? We&apos;re here to help.
            Reach out to our student counsellors and we&apos;ll guide you through the next steps.
          </p>
        </div>

        <div className={styles.content}>
          <form className={styles.form} onSubmit={handleSubmit}>
            {submitted && (
              <p style={{ color: "green", marginBottom: "10px" }}>
                Message sent successfully!
              </p>
            )}

            {submitError && (
              <p
                style={{
                  color: "#991b1b",
                  backgroundColor: "#fee2e2",
                  border: "1px solid #f87171",
                  borderRadius: "6px",
                  padding: "10px 14px",
                  marginBottom: "14px",
                  fontSize: "14px",
                  lineHeight: "1.4"
                }}
              >
                ⚠ {submitError}
              </p>
            )}

            <div className={styles.nameRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>First name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className={styles.input}
                  required
                  disabled={loading || isBlocked}
                />
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>Last name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className={styles.input}
                  disabled={loading || isBlocked}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@company.com"
                className={styles.input}
                required
                disabled={loading || isBlocked}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Phone number</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 9876543210"
                className={styles.input}
                disabled={loading || isBlocked}
              />
            </div>

            <div className={styles.inputGroup}>
              <label className={styles.label}>Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Leave us a message..."
                className={styles.textarea}
                rows={4}
                disabled={loading || isBlocked}
              />
            </div>

            <div className={styles.inputGroup}>
              {/* Optional enquiry types if needed in future */}
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading || isBlocked}
            >
              {isBlocked ? "Submissions Blocked" : loading ? "Sending..." : "Send message"}
            </button>
          </form>

          <div className={styles.contactInfo}>
            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>Chat with us</h3>
              <p className={styles.infoText}>Speak to our admission team via live chat.</p>
              <div className={styles.links}>
                <a href="#" className={styles.link}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                  Start a live chat
                </a>
                <a href="mailto:info@nidads.com" className={styles.link}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>
                  Email us
                </a>
                <a href="https://www.instagram.com/nidads_official/" className={styles.link} target="_blank" rel="noopener noreferrer">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                  Instagram
                </a>
              </div>
            </div>

            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>Call us</h3>
              <p className={styles.infoText}>Call our admissions desk Mon‑Fri from 9am to 6pm.</p>
              <a href="tel:+919205436796" className={styles.link}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                +91 92054 36796
              </a>
            </div>

            <div className={styles.infoBlock}>
              <h3 className={styles.infoTitle}>Visit us</h3>
              <p className={styles.infoText}>Come see our campus and meet the team in person.</p>
              <a href="#" className={styles.link}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                Spacetime Management Pvt Ltd Design House, behind Savitri Cinema Complex, Greater Kailash II, Chittaranjan Park, New Delhi, Delhi 110048
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
