import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBKWj1As-nnkcX8aZ7B0AbtzZoQ-56qTjc",
    authDomain: "delavilla-43a2a.firebaseapp.com",
    projectId: "delavilla-43a2a",
    storageBucket: "delavilla-43a2a.firebasestorage.app",
    messagingSenderId: "567143397487",
    appId: "1:567143397487:web:19d7c005bf966d475f759a",
    measurementId: "G-XB6BTBJGND"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// --- Función para cerrar sesión ---
export function logout() {
  signOut(auth).then(() => {
    window.location.href = "/DeLaVilla/pages/login.html";
  });
}

// --- Protección de páginas según rol ---
export function protectPage(role = "any") {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      // Si no está autenticado, lo redirige al login
      window.location.href = "/DeLaVilla/pages/login.html";
    } else {
      // Control por rol
      if (role === "admin" && user.email !== "admin@tusitio.com") {
        window.location.href = "/DeLaVilla/pages/cliente.html";
      } else if (role === "cliente" && user.email === "admin@tusitio.com") {
        window.location.href = "/DeLaVilla/pages/admin.html";
      }
    }
  });
}
