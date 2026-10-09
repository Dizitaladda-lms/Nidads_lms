"use client";

import { useState } from "react";

const BlogEnquiryForm = ({ compact = false, courseOptions = [] }) => {
  const defaultCourse = courseOptions[0] || "Data Science";
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    course: defaultCourse,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = () => {
    const validation = {};
    if (!form.name.trim()) {
      validation.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      validation.name = "Name must be at least 2 characters";
    }
    if (!form.email.trim()) {
      validation.email = "Email is required";
    } else if (!form.email.match(/^\S+@\S+\.\S+$/)) {
      validation.email = "Please enter a valid email";
    }
    if (!form.mobile.trim()) {
      validation.mobile = "Mobile number is required";
    } else if (!form.mobile.match(/^\d{10}$/)) {
      validation.mobile = "Enter a valid 10 digit mobile number";
    }
    if (!form.course.trim()) {
      validation.course = "Course name is required";
    }
    return validation;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        <div className="beform__error-banner">{submitError}</div>
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
          />
          {errors.email && <span className="beform__field-error">⚠ {errors.email}</span>}
        </div>

        <div className="beform__field">
          <label className="beform__label" htmlFor="beform-mobile">Mobile</label>
          <div className="beform__mobile-wrap">
            <span className="beform__country-code">+91</span>
            <input
              id="beform-mobile"
              className={`beform__input beform__input--mobile${errors.mobile ? " beform__input--err" : ""}`}
              type="tel"
              name="mobile"
              placeholder="10-digit number"
              value={form.mobile}
              onChange={handleChange}
              maxLength={10}
              inputMode="numeric"
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
          disabled={loading}
        >
          {loading ? "Submitting…" : "Submit Enquiry"}
        </button>
      </form>
    </div>
  );
};

export default BlogEnquiryForm;
