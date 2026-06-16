// firebase-config.js
// تهيئة Firebase (Modular SDK v10) — يُستورد عبر CDN، لا يحتاج npm/bundler
// يُستخدم هذا الملف من قبل auth.js فقط، ولا حاجة لاستدعائه مباشرة من صفحاتك

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBVIeRlMVl7nXlrygu7l5c8ey1vWDqRHvU",
  authDomain: "omnia-ai-2f892.firebaseapp.com",
  projectId: "omnia-ai-2f892",
  storageBucket: "omnia-ai-2f892.firebasestorage.app",
  messagingSenderId: "1028678017077",
  appId: "1:1028678017077:web:716fd7b59d57a5121d917c",
  measurementId: "G-VZP2C8ZFEY"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
