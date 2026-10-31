"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const hintId = "admin-login-hint";

const AdminLoginForm = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({ username: "", password: "" });
  const [status, setStatus] = useState({ type: null, message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isBlocked) return;

    setSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/admin/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });
      const result = await response.json().catch(() => ({}));

      if (response.status === 429 || result.blocked) {
        setIsBlocked(true);
        throw new Error(
          result.error ||
            "Too many requests. Your IP address has been blocked after exceeding 3 attempts."
        );
      }

      if (!response.ok) {
        throw new Error(result.error || "Invalid credentials");
      }

      setStatus({ type: "success", message: "Signed in" });
      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit} aria-busy={submitting}>
      <h2>Welcome back</h2>
      <p id={hintId} className="auth-form__hint">
        Use the administrator credentials from your environment configuration.
      </p>

      <label>
        Username
        <input
          type="text"
          name="username"
          autoComplete="username"
          value={formValues.username}
          onChange={handleChange}
          required
          disabled={submitting || isBlocked}
          aria-describedby={hintId}
        />
      </label>

      <label>
        Password
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={formValues.password}
          onChange={handleChange}
          required
          disabled={submitting || isBlocked}
          aria-describedby={hintId}
        />
      </label>

      {status.message ? (
        <p
          className={`form-status form-status--${status.type}`}
          role={status.type === "error" ? "alert" : "status"}
          aria-live={status.type === "error" ? "assertive" : "polite"}
          style={isBlocked ? { backgroundColor: "#fee2e2", color: "#991b1b", borderColor: "#f87171" } : undefined}
        >
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        className="btn btn--primary"
        disabled={submitting || isBlocked}
      >
        {isBlocked ? "Access Blocked" : submitting ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
};

export default AdminLoginForm;
