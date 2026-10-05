"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// Dynamic import to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

// ── TOOLBAR ID ──
// We render the toolbar as a SEPARATE div before the editor.
// Quill is told to use "#blog-toolbar" as its toolbar container.
// This prevents the editor blur event from firing when the user
// clicks a toolbar dropdown (the root cause of dropdowns closing instantly).
const TOOLBAR_ID = "blog-toolbar";

// Modules reference "#blog-toolbar" instead of an inline array.
// Must be defined outside the component for a stable reference.
const modules = {
  toolbar: {
    container: `#${TOOLBAR_ID}`,
  },
  clipboard: {
    matchVisual: false,
  },
  table: true,
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "size",
  "list",
  "align",
  "indent",
  "blockquote",
  "code-block",
  "link",
  "image",
  "table",
];

// ── CUSTOM TOOLBAR JSX ──
// Rendered as a plain div — Quill picks it up by ID and wires the buttons.
// Using onMouseDown + e.preventDefault() on the wrapper stops focus loss.
function BlogToolbar() {
  return (
    <div
      id={TOOLBAR_ID}
      onMouseDown={(e) => e.preventDefault()} // key fix: prevents editor blur
    >
      {/* Heading select — H1 → H4 + Normal paragraph */}
      <span className="ql-formats">
        <select className="ql-header" defaultValue="">
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
          <option value="4">H4</option>
          <option value="">Normal</option>
        </select>
      </span>

      {/* Font size */}
      <span className="ql-formats">
        <select className="ql-size" defaultValue="">
          <option value="small">Small</option>
          <option value="">Normal</option>
          <option value="large">Large</option>
          <option value="huge">Huge</option>
        </select>
      </span>

      {/* Text formatting */}
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
      </span>

      {/* Color */}
      <span className="ql-formats">
        <select className="ql-color" />
        <select className="ql-background" />
      </span>

      {/* Lists */}
      <span className="ql-formats">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
      </span>

      {/* Alignment */}
      <span className="ql-formats">
        <select className="ql-align" />
      </span>

      {/* Indent */}
      <span className="ql-formats">
        <button className="ql-indent" value="-1" />
        <button className="ql-indent" value="+1" />
      </span>

      {/* Blocks */}
      <span className="ql-formats">
        <button className="ql-blockquote" />
        <button className="ql-code-block" />
      </span>

      {/* Media */}
      <span className="ql-formats">
        <button className="ql-link" />
        <button className="ql-image" />
      </span>

      {/* Clean */}
      <span className="ql-formats">
        <button className="ql-clean" />
      </span>
    </div>
  );
}

const BlogEditor = ({ value, onChange }) => {
  const [editorReady, setEditorReady] = useState(false);
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    async function registerTableModule() {
      const QuillModule = await import("quill");
      const TableModule = await import("quill/modules/table");
      const Quill = QuillModule.default || QuillModule;
      const Table = TableModule.default || TableModule;
      if (Quill && Table && typeof Quill.register === "function") {
        Quill.register("modules/table", Table, true);
      }
      if (isMounted) {
        setEditorReady(true);
      }
    }
    void registerTableModule();
    return () => {
      isMounted = false;
    };
  }, []);

  // Override Quill's default image handler so it opens a local file picker
  useEffect(() => {
    if (!editorReady) return;
    const editor = quillRef.current?.getEditor?.();
    if (!editor) return;

    const toolbar = editor.getModule("toolbar");
    if (toolbar) {
      toolbar.addHandler("image", () => {
        fileInputRef.current?.click();
      });
    }
  }, [editorReady]);

  // Called when the user selects a file from the picker
  const handleImageFileChange = useCallback(async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const editor = quillRef.current?.getEditor?.();
    if (!editor) return;

    // Reset so the same file can be re-selected if needed
    e.target.value = "";

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          const range = editor.getSelection(true);
          const index = range ? range.index : editor.getLength();
          editor.insertEmbed(index, "image", data.url, "user");
          editor.setSelection(index + 1, 0);
          return;
        }
      }
    } catch (err) {
      console.warn("Upload endpoint failed, falling back to local embed:", err);
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const range = editor.getSelection(true);
      const index = range ? range.index : editor.getLength();
      editor.insertEmbed(index, "image", dataUrl, "user");
      editor.setSelection(index + 1, 0);
    };
    reader.readAsDataURL(file);
  }, []);

  const handlePaste = (event) => {
    const clipboardData = event.clipboardData;
    const html = clipboardData?.getData("text/html");
    if (!html) {
      return;
    }

    const editor = quillRef.current?.getEditor?.();
    if (!editor) {
      return;
    }

    const shouldPreserve = /<h[1-6]|<table|<tr|<td|<th|<tbody|<thead|<ul|<ol|<li>/i.test(html);
    if (!shouldPreserve) {
      return;
    }

    event.preventDefault();
    const selection = editor.getSelection(true);
    const index = selection ? selection.index : editor.getLength();
    editor.clipboard.dangerouslyPasteHTML(index, html);
  };

  if (!editorReady) {
    return (
      <div className="editor">
        <BlogToolbar />
      </div>
    );
  }

  return (
    <div className="editor">
      {/* Hidden file input — triggered by the toolbar image button */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/webp,image/png,image/jpeg,image/gif,image/svg+xml"
        style={{ display: "none" }}
        onChange={handleImageFileChange}
      />

      {/* Toolbar rendered OUTSIDE ReactQuill — avoids blur-on-click issue */}
      <BlogToolbar />

      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value || ""}
        onChange={onChange}
        onPaste={handlePaste}
        modules={modules}
        formats={formats}
        placeholder="Write your blog content..."
        className="blog-editor-quill"
      />
    </div>
  );
};

export default BlogEditor;
