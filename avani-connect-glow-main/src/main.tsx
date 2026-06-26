import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const mountApp = () => {
  createRoot(document.getElementById("root")!).render(<App />);
};

// Check if dev environment OR if main CSS has already loaded
if (import.meta.env.DEV || (window as any).mainCssLoaded) {
  mountApp();
} else {
  let mounted = false;
  const onCssLoaded = () => {
    if (mounted) return;
    mounted = true;
    mountApp();
  };

  // Listen for the custom event dispatched when the stylesheet loads
  document.addEventListener("css-loaded", onCssLoaded);

  // Fallback mount after 1.5 seconds in case of load issues
  setTimeout(onCssLoaded, 1500);
}

