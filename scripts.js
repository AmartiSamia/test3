// ===== Utilities =====
const $ = (sel, root = document) => root.querySelector(sel);

// Set current year in footer
$("#year").textContent = new Date().getFullYear();

// ===== Mobile menu =====
const menuBtn = $("#menuToggle");
const nav = $("#siteNav");
menuBtn?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

// Close menu on nav link click (mobile)
nav?.addEventListener("click", (e) => {
  if (e.target.tagName === "A" && nav.classList.contains("open")) {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

// ===== Theme toggle (with persistence) =====
const themeToggle = $("#themeToggle");
const root = document.documentElement;
const THEME_KEY = "prefers-dark";

function applyTheme(isDark) {
  root.classList.toggle("dark", isDark);
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.textContent = isDark ? "☀️" : "🌙";
}

const saved = localStorage.getItem(THEME_KEY);
if (saved !== null) {
  applyTheme(saved === "true");
} else {
  // Respect system preference on first load
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark);
}

themeToggle?.addEventListener("click", () => {
  const isDark = !root.classList.contains("dark");
  applyTheme(isDark);
  localStorage.setItem(THEME_KEY, String(isDark));
});

// ===== Contact form (front-end validation demo) =====
const form = $("#contactForm");
const statusEl = $("#formStatus");

function setError(input, msg = "") {
  const holder = input.closest("label");
  holder.querySelector(".error").textContent = msg;
  if (msg) { input.setAttribute("aria-invalid", "true"); }
  else { input.removeAttribute("aria-invalid"); }
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = form.elements["name"];
  const email = form.elements["email"];
  const message = form.elements["message"];

  let ok = true;

  if (!name.value.trim()) { setError(name, "Please enter your name."); ok = false; } else setError(name);
  if (!email.validity.valid) { setError(email, "Please enter a valid email."); ok = false; } else setError(email);
  if (!message.value.trim()) { setError(message, "Please enter a message."); ok = false; } else setError(message);

  if (!ok) return;

  // Simulate a send, since we don’t have a backend here.
  statusEl.textContent = "Sending…";
  setTimeout(() => {
    statusEl.textContent = "Thanks! Your message was sent (demo).";
    form.reset();
  }, 700);
});
