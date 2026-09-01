import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Arm the scroll-reveal entrances. Gating the hidden start state on this class
// (set before first paint) means content is only ever hidden when the reveal
// engine is live to bring it back — if JS fails, the page renders visible.
document.documentElement.classList.add("reveal-ready");

createRoot(document.getElementById("root")!).render(<App />);
