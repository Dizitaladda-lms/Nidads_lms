"use client";

import { useState } from "react";
import styles from "./formend.module.css";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

function Calendar({ selectedDate, onSelect }) {
  const today = new Date();
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });

  const firstDay = new Date(view.year, view.month, 1).getDay();
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();

  const prev = () =>
    setView((v) => {
      const d = new Date(v.year, v.month - 1, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });

  const next = () =>
    setView((v) => {
      const d = new Date(v.year, v.month + 1, 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });

  const isPast = (day) => {
    const d = new Date(view.year, view.month, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const isToday = (day) =>
    day === today.getDate() &&
    view.month === today.getMonth() &&
    view.year === today.getFullYear();

  const isSelected = (day) =>
    selectedDate &&
    day === selectedDate.getDate() &&
    view.month === selectedDate.getMonth() &&
    view.year === selectedDate.getFullYear();

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className={styles.calendar}>
      <div className={styles.calHeader}>
        <button className={styles.navBtn} onClick={prev} aria-label="Previous month">&#8249;</button>
        <span className={styles.monthLabel}>
          {MONTHS[view.month]} {view.year}
        </span>
        <button className={styles.navBtn} onClick={next} aria-label="Next month">&#8250;</button>
      </div>

      <div className={styles.dayNames}>
        {DAYS.map((d) => <span key={d}>{d}</span>)}
      </div>

      <div className={styles.grid}>
        {cells.map((day, i) => (
          <button
            key={i}
            className={[
              styles.cell,
              !day ? styles.empty : "",
              day && isToday(day) ? styles.today : "",
              day && isSelected(day) ? styles.selected : "",
              day && isPast(day) ? styles.past : "",
            ].join(" ")}
            disabled={!day || isPast(day)}
            onClick={() => day && !isPast(day) && onSelect(new Date(view.year, view.month, day))}
            aria-label={day ? `${MONTHS[view.month]} ${day}` : undefined}
          >
            {day || ""}
          </button>
        ))}
      </div>

      {selectedDate && (
        <p className={styles.selectedInfo}>
          Selected: <strong>{selectedDate.toDateString()}</strong>
        </p>
      )}
    </div>
  );
}

const INITIAL = {
  name: "", email: "", phone: "",
  program: "", domain: "", experience: "",
  description: "", preferredDate: "",
};

export default function FormEnd() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [form, setForm] = useState(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setForm((f) => ({ ...f, preferredDate: date.toDateString() }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBlocked) return;
    setSubmitError("");
    setLoading(true);

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          mobile: form.phone,
          course: form.program || "Project Consultation",
          source: "Project Journey Form",
        }),
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
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demosection" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.overline}>Book a Free Session</p>
          <h2 className={styles.title}>
            Start Your <span>Project Journey</span>
          </h2>
          <p className={styles.subtitle}>
            Pick a date that works for you and tell us about your project idea. Our mentors will reach out within 24 hours.
          </p>
        </div>

        <div className={styles.layout}>
          {/* LEFT — CALENDAR */}
          <div className={styles.leftCol}>
            <p className={styles.colLabel}>Choose a preferred date</p>
            <Calendar selectedDate={selectedDate} onSelect={handleDateSelect} />
            <div className={styles.legend}>
              <span className={styles.legendToday} /> Today
              <span className={styles.legendSelected} /> Selected
            </div>
          </div>

          {/* RIGHT — FORM */}
          <div className={styles.rightCol}>
            {submitted ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h3>We&apos;ve got your details!</h3>
                <p>Our team will contact you within 24 hours to discuss your project. Check your inbox for a confirmation.</p>
                <button className={styles.resetBtn} onClick={() => { setForm(INITIAL); setSelectedDate(null); setSubmitted(false); }}>
                  Submit another
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <p className={styles.colLabel}>Your project details</p>

                {submitError && (
                  <p
                    style={{
                      color: "#b91c1c",
                      backgroundColor: "#fee2e2",
                      border: "1px solid #f87171",
                      borderRadius: "6px",
                      padding: "10px 14px",
                      margin: "0 0 16px",
                      fontSize: "14px",
                      lineHeight: "1.4",
                    }}
                  >
                    ⚠ {submitError}
                  </p>
                )}

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="name">Full Name <span>*</span></label>
                    <input id="name" name="name" type="text" placeholder="e.g. Rahul Sharma" value={form.name} onChange={handleChange} required disabled={loading || isBlocked} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="email">Email Address <span>*</span></label>
                    <input id="email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required disabled={loading || isBlocked} />
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="phone">Phone Number <span>*</span></label>
                    <input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} required disabled={loading || isBlocked} />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="experience">Experience Level</label>
                    <select id="experience" name="experience" value={form.experience} onChange={handleChange} disabled={loading || isBlocked}>
                      <option value="">Select level</option>
                      <option>Beginner (0–1 yr)</option>
                      <option>Intermediate (1–3 yrs)</option>
                      <option>Advanced (3+ yrs)</option>
                    </select>
                  </div>
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="program">Program of Interest</label>
                    <select id="program" name="program" value={form.program} onChange={handleChange} disabled={loading || isBlocked}>
                      <option value="">Select program</option>
                      <option>Diploma in Data Science & AI</option>
                      <option>Diploma in Data Analytics & AI</option>
                      <option>Advanced Certification in DS & AI</option>
                      <option>Business Intelligence with Power BI</option>
                      <option>PG Program in AI</option>
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="domain">Project Domain</label>
                    <select id="domain" name="domain" value={form.domain} onChange={handleChange} disabled={loading || isBlocked}>
                      <option value="">Select domain</option>
                      <option>Data Science</option>
                      <option>Data Analytics</option>
                      <option>Machine Learning</option>
                      <option>Deep Learning / AI</option>
                      <option>Natural Language Processing</option>
                      <option>Computer Vision</option>
                      <option>Business Intelligence</option>
                      <option>Generative AI</option>
                    </select>
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="description">Project Idea / Brief Description</label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    placeholder="Describe your project idea, goals, or any specific topic you want to work on..."
                    value={form.description}
                    onChange={handleChange}
                    disabled={loading || isBlocked}
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="preferredDate">Preferred Start Date</label>
                  <input
                    id="preferredDate"
                    name="preferredDate"
                    type="text"
                    readOnly
                    placeholder="Pick from the calendar"
                    value={form.preferredDate}
                    className={styles.dateInput}
                    disabled={loading || isBlocked}
                  />
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading || isBlocked}>
                  {isBlocked ? "Submissions Blocked (Max 3 reached)" : loading ? <span className={styles.spinner} /> : "Book My Free Session →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
