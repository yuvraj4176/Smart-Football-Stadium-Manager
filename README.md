# Smart Football Stadium Manager

A GenAI-enabled solution designed to enhance stadium operations and the overall tournament experience for fans, organizers, and venue staff during the FIFA World Cup 2026.

## 🎯 Chosen Vertical
**Smart Stadiums & Tournament Operations**
This project directly addresses the challenge of managing massive crowds, ensuring safety, and providing an inclusive, premium experience for diverse international fans attending the FIFA World Cup 2026.

## 🧠 Approach and Logic
Our approach centers on combining a powerful, centralized operational dashboard with an accessible, context-aware Generative AI assistant. 
1. **Centralized Data (Zustand):** All simulated real-time data—crowd density, transit schedules, sustainability metrics, and active alerts—is managed globally.
2. **Context-Aware GenAI (Google Gemini):** Instead of simple keyword matching, the AI assistant (powered by Google's Gemini SDK) is fed the real-time stadium context alongside the user's prompt. This allows the AI to make logical decisions based on live conditions (e.g., routing a fan away from a crowded gate or warning them about weather).
3. **Multilingual Support:** The UI and AI dynamically adapt to the user's preferred language, crucial for an international tournament.
4. **Inclusive Design:** Adheres strictly to WAI-ARIA standards using Radix UI primitives.

## ⚙️ How the Solution Works
1. **The Dashboard:** Users (fans or staff) interact with a Vite + React web application. They can view interactive modules for Crowd Management, Transportation, Accessibility, and Sustainability.
2. **The AI Assistant:** A floating chat widget is available globally. When a user asks a question (e.g., "Where is the nearest restroom?"), the app packages the prompt with the current stadium state (active alerts, crowd levels at different zones) and sends it to the Gemini API.
3. **Dynamic Response:** Gemini processes the context and returns a highly relevant, localized answer (e.g., "The South Restroom is crowded, I recommend walking to the East concourse...").

## 📝 Assumptions Made
*   **Data Availability:** We assume the stadium is equipped with IoT sensors (turnstiles, cameras) that would feed the real-time crowd and sustainability data into this dashboard's backend.
*   **Connectivity:** We assume attendees have cellular or stadium Wi-Fi access to use the web application and communicate with the AI.
*   **API Limits:** The Gemini API implementation assumes standard rate limits which would need to be scaled for production/stadium-wide use.
*   **Transit Integration:** We assume local city transit APIs (Metro, Bus) are available to provide the real-time transport data shown in the app.

---

### Tech Stack
*   **Frontend:** React 19, Vite, Tailwind CSS, shadcn/ui
*   **State Management:** Zustand
*   **AI:** Google Gemini API (`@google/genai`)
*   **Testing:** Vitest, React Testing Library
