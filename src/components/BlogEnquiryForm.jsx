"use client";

import { useState } from "react";

const DEFAULT_COURSES = [
  "Advanced Data Science & AI Course",
  "Data Analytics Master Program",
  "Python for Data Science",
  "Machine Learning & AI Bootcamp",
  "Business Analytics with Power BI & Tableau",
];

const BlogEnquiryForm = ({ defaultCourse = "", compact = false }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    course: defaultCourse || DEFAULT_COURSES[0],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);

  const courseOptions = defaultCourse && !DEFAULT_COURSES.includes(defaultCourse)
    ? [defaultCourse, ...DEFAULT_COURSES]
    : DEFAULT_COURSES;

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Valid email is required";
    }
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile.replace(/\D/g, ""))) {
      errs.mobile = "10-digit mobile number required";
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isBlocked) return;
    setSubmitError("");

    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "Blog Page Enquiry" }),
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
        throw new Error(payload?.error || "Unable to submit enquiry");
      }
      setSubmitted(true);
      setForm({ name: "", email: "", mobile: "", course: defaultCourse });
    } catch (error) {
      setSubmitError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={compact ? "beform beform--compact beform--success" : "beform beform--success"}>
        <div className="beform__success-icon">✓</div>
        <p className="beform__success-title">Thank you!</p>
        <p className="beform__success-sub">We&apos;ll reach out to you shortly.</p>
      </div>
    );
  }

  return (
    <div className={compact ? "beform beform--compact" : "beform"}>
      {!compact && (
        <div className="beform__header">
          <p className="beform__eyebrow">Free Consultation</p>
          <h2 className="beform__title">Start Your Data Career Today</h2>
          <p className="beform__subtitle">
            Fill in your details and our expert counsellors will guide you to the right course.
          </p>
        </div>
      )}

      {compact && (
        <p className="beform__compact-label">📩 Enquire Now</p>
      )}

      {submitError && (
        <div
          className="beform__error-banner"
          style={isBlocked ? { backgroundColor: "#fee2e2", color: "#991b1b", borderColor: "#f87171" } : undefined}
        >
          {submitError}
        </div>
      )}

      <form className="beform__form" onSubmit={handleSubmit} noValidate>
        <div className="beform__field">
          <label className="beform__label" htmlFor="beform-name">Name</label>
          <input
            id="beform-name"
            className={`beform__input${errors.name ? " beform__input--err" : ""}`}
            type="text"
            name="name"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            autoComplete="name"
            disabled={loading || isBlocked}
          />
          {errors.name && <span className="beform__field-error">⚠ {errors.name}</span>}
        </div>

        <div className="beform__field">
          <label className="beform__label" htmlFor="beform-email">Email</label>
          <input
            id="beform-email"
            className={`beform__input${errors.email ? " beform__input--err" : ""}`}
            type="email"
            name="email"
            placeholder="your.email@gmail.com"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
            disabled={loading || isBlocked}
          />
          {errors.email && <span className="beform__field-error">⚠ {errors.email}</span>}
        </div>

        <div className="beform__field">
          <label className="beform__label" htmlFor="beform-mobile">Mobile</label>
          <div className="beform__mobile-wrap">
            <span className="beform__mobile-prefix">+91</span>
            <input
              id="beform-mobile"
              className={`beform__input beform__input--mobile${errors.mobile ? " beform__input--err" : ""}`}
              type="tel"
              name="mobile"
              placeholder="98765 43210"
              value={form.mobile}
              onChange={handleChange}
              autoComplete="tel"
              maxLength={10}
              inputMode="numeric"
              disabled={loading || isBlocked}
            />
          </div>
          {errors.mobile && <span className="beform__field-error">⚠ {errors.mobile}</span>}
        </div>

        <div className="beform__field">
          <label className="beform__label" htmlFor="beform-course">Course Interest</label>
          <select
            id="beform-course"
            className={`beform__input beform__input--select${errors.course ? " beform__input--err" : ""}`}
            name="course"
            value={form.course}
            onChange={handleChange}
            disabled={loading || isBlocked}
          >
            {courseOptions.map((course) => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
          {errors.course && <span className="beform__field-error">⚠ {errors.course}</span>}
        </div>

        <button
          type="submit"
          className="beform__submit"
          disabled={loading || isBlocked}
        >
          {isBlocked ? "Submissions Blocked" : loading ? "Submitting…" : "Submit Enquiry"}
        </button>
      </form>
    </div>
  );
};

export default BlogEnquiryForm;
