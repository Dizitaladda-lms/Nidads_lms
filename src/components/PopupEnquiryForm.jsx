import React, { useState, useEffect } from "react";
import styles from "./SimpleNamePopup.module.css";
import { courses } from "@/data/courses";

const SimpleNamePopup = ({ open, onClose, selectedCourseId, lockCourse }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    course: selectedCourseId || ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const courseOptions = courses.map((c) => ({
    value: c.id,
    label: c.title
  }));

  const selectedCourseLabel = courseOptions.find(
    (opt) => opt.value === form.course
  )?.label;

  const validate = () => {
    const errs = {};

    if (!form.name.trim()) {
      errs.name = "Name is required";
    } else if (form.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters";
    }

    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!form.email.match(/^\S+@\S+\.\S+$/)) {
      errs.email = "Please enter a valid email";
    }

    if (!form.mobile.trim()) {
      errs.mobile = "Mobile number is required";
    } else if (!form.mobile.match(/^\d{10}$/)) {
      errs.mobile = "Enter a valid 10 digit mobile number";
    }

    if (!form.course) {
      errs.course = "Please select a course";
    }

    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isBlocked) return;
    setSubmitError("");

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
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
          ...form,
          course: selectedCourseLabel || form.course,
          source: "Popup Enquiry"
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
        throw new Error(payload?.error || "Unable to submit enquiry");
      }

      setSubmitted(true);

      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (error) {
      console.error("Submission failed:", error);
      setSubmitError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm({
      name: "",
      email: "",
      mobile: "",
      course: selectedCourseId || ""
    });
    setErrors({});
    setSubmitted(false);
    setSubmitError("");
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Close"
        >
          ×
        </button>

        {submitted ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>
            <div className={styles.successText}>
              Thank you, {form.name}!
            </div>
            <div className={styles.successSubtext}>
              We&apos;ll contact you soon at {form.email}
            </div>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>Enquire Now</h2>

            {submitError && (
              <div
                className={styles.errorMsg}
                style={{
                  marginBottom: "14px",
                  padding: "10px 12px",
                  borderRadius: "6px",
                  backgroundColor: isBlocked ? "#fee2e2" : "#fef2f2",
                  color: isBlocked ? "#991b1b" : "#dc2626",
                  border: isBlocked ? "1px solid #f87171" : "none",
                  fontSize: "13px",
                  lineHeight: "1.4"
                }}
              >
                ⚠ {submitError}
              </div>
            )}

            <div className={styles.formGrid}>
              {/* Name */}
              <div className={styles.fieldWrapper}>
                <label className={styles.label}>Name</label>
                <input
                  type="text"
                  name="name"
                  className={`${styles.input} ${
                    errors.name ? styles.inputError : ""
                  }`}
                  placeholder="Enter your name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={loading || isBlocked}
                  autoFocus
                />
                {errors.name && (
                  <div className={styles.errorMsg}>
                    ⚠ {errors.name}
                  </div>
                )}
              </div>

              {/* Email */}
              <div className={styles.fieldWrapper}>
                <label className={styles.label}>Email</label>
                <input
                  type="email"
                  name="email"
                  className={`${styles.input} ${
                    errors.email ? styles.inputError : ""
                  }`}
                  placeholder="your.email@gmail.com"
                  value={form.email}
                  onChange={handleChange}
                  disabled={loading || isBlocked}
                />
                {errors.email && (
                  <div className={styles.errorMsg}>
                    ⚠ {errors.email}
                  </div>
                )}
              </div>

              {/* Mobile */}
              <div className={styles.fieldWrapper}>
                <label className={styles.label}>Mobile Number</label>
                <div className={styles.mobileWrapper}>
                  <span className={styles.countryCode}>+91</span>
                  <input
                    type="tel"
                    name="mobile"
                    className={`${styles.input} ${styles.mobileInput} ${
                      errors.mobile ? styles.inputError : ""
                    }`}
                    placeholder="10 digit number"
                    value={form.mobile}
                    onChange={handleChange}
                    maxLength={10}
                    inputMode="numeric"
                    disabled={loading || isBlocked}
                  />
                </div>
                {errors.mobile && (
                  <div className={styles.errorMsg}>
                    ⚠ {errors.mobile}
                  </div>
                )}
              </div>

              {/* Course */}
              <div className={styles.fieldWrapper}>
                <label className={styles.label}>Select Course</label>

                {lockCourse ? (
                  <input
                    type="text"
                    className={styles.input}
                    value={selectedCourseLabel || ""}
                    disabled
                  />
                ) : (
                  <select
                    name="course"
                    className={`${styles.select} ${
                      errors.course ? styles.inputError : ""
                    }`}
                    value={form.course}
                    onChange={handleChange}
                    disabled={loading || isBlocked}
                  >
                    <option value="">Choose a course</option>
                    {courseOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}

                {errors.course && (
                  <div className={styles.errorMsg}>
                    ⚠ {errors.course}
                  </div>
                )}
              </div>
            </div>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading || isBlocked}
            >
              {isBlocked ? "Submissions Blocked" : loading ? "Submitting..." : "Submit Enquiry"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SimpleNamePopup;
