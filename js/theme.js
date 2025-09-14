// =============================================================================
// THEME MANAGEMENT SYSTEM - Dark Mode Toggle
// =============================================================================
// Author: Senior Frontend Developer
// Description: Advanced theme switching with smooth transitions,
//              localStorage persistence, and system preference detection
// =============================================================================

// Theme Configuration
const THEME_CONFIG = {
  light: {
    name: "light",
    icon: "fas fa-sun",
    label: "Chế độ sáng",
  },
  dark: {
    name: "dark",
    icon: "fas fa-moon",
    label: "Chế độ tối",
  },
};

// DOM Elements
const themeToggle = document.getElementById("theme-toggle");
const html = document.documentElement;

// Current Theme State
let currentTheme = localStorage.getItem("theme") || "light";

// -----------------------------------------------------------------------------
/**
 * Initialize Theme System
 * Sets up theme toggle button, loads saved theme, and handles system preferences
 */
function initThemeSystem() {
  // Set initial theme
  setTheme(currentTheme, false);

  // Setup theme toggle button
  if (themeToggle) {
    updateToggleButton();
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Listen for system theme changes
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", handleSystemThemeChange);

  console.log("🎨 Theme system initialized:", currentTheme);
}

// -----------------------------------------------------------------------------
/**
 * Toggle between light and dark themes
 */
function toggleTheme() {
  const newTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(newTheme, true);
}

// -----------------------------------------------------------------------------
/**
 * Set theme with smooth transition
 * @param {string} theme - Theme name ('light' or 'dark')
 * @param {boolean} animate - Whether to animate the transition
 */
function setTheme(theme, animate = true) {
  // Validate theme
  if (!THEME_CONFIG[theme]) {
    console.warn("Invalid theme:", theme);
    return;
  }

  // Update current theme
  currentTheme = theme;

  // Apply theme to HTML element
  html.setAttribute("data-theme", theme);

  // Save to localStorage
  localStorage.setItem("theme", theme);

  // Update toggle button
  if (themeToggle) {
    updateToggleButton();
  }

  // Handle transition
  if (animate) {
    playThemeTransition();
  }

  // Dispatch custom event
  window.dispatchEvent(
    new CustomEvent("themeChange", {
      detail: { theme, animate },
    })
  );

  console.log("🎨 Theme changed to:", theme);
}

// -----------------------------------------------------------------------------
/**
 * Update theme toggle button appearance
 */
function updateToggleButton() {
  if (!themeToggle) return;

  const themeData = THEME_CONFIG[currentTheme];
  const nextTheme = currentTheme === "light" ? "dark" : "light";
  const nextThemeData = THEME_CONFIG[nextTheme];

  // Update button attributes
  themeToggle.setAttribute("aria-label", `Switch to ${nextThemeData.label}`);

  // Update icons
  const icons = themeToggle.querySelectorAll("i");
  if (icons.length >= 2) {
    icons[0].className = themeData.icon; // Current theme icon
    icons[1].className = nextThemeData.icon; // Next theme icon
  }

  // Update button state
  themeToggle.setAttribute("data-current-theme", currentTheme);
}

// -----------------------------------------------------------------------------
/**
 * Play smooth theme transition animation
 */
function playThemeTransition() {
  // Add transition class to body
  document.body.classList.add("theme-transitioning");

  // Remove transition class after animation
  setTimeout(() => {
    document.body.classList.remove("theme-transitioning");
  }, 300);
}

// -----------------------------------------------------------------------------
/**
 * Handle system theme preference changes
 * @param {MediaQueryListEvent} e - System theme change event
 */
function handleSystemThemeChange(e) {
  // Only auto-switch if no manual preference is saved
  if (!localStorage.getItem("theme")) {
    const newTheme = e.matches ? "dark" : "light";
    setTheme(newTheme, true);
  }
}

// -----------------------------------------------------------------------------
/**
 * Get current theme
 * @returns {string} Current theme name
 */
function getCurrentTheme() {
  return currentTheme;
}

// -----------------------------------------------------------------------------
/**
 * Check if dark mode is active
 * @returns {boolean} True if dark mode is active
 */
function isDarkMode() {
  return currentTheme === "dark";
}

// -----------------------------------------------------------------------------
/**
 * Force theme refresh (useful for dynamic content)
 */
function refreshTheme() {
  setTheme(currentTheme, false);
}

// -----------------------------------------------------------------------------
// Initialization
// -----------------------------------------------------------------------------

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThemeSystem);
} else {
  initThemeSystem();
}

// Export functions for global use
window.ThemeSystem = {
  setTheme,
  getCurrentTheme,
  isDarkMode,
  toggleTheme,
  refreshTheme,
};

// =============================================================================
// END OF THEME MANAGEMENT SYSTEM
// =============================================================================
