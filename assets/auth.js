import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-analytics.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBKWj1As-nnkcX8aZ7B0AbtzZoQ-56qTjc",
  authDomain: "delavilla-43a2a.firebaseapp.com",
  projectId: "delavilla-43a2a",
  storageBucket: "delavilla-43a2a.firebasestorage.app",
  messagingSenderId: "567143397487",
  appId: "1:567143397487:web:19d7c005bf966d475f759a",
  measurementId: "G-XB6BTBJGND"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
getAnalytics(app);

const auth = getAuth(app);
const db   = getFirestore(app);

// Cerrar sesión
export function logout() {
  signOut(auth).catch((error) => {
    console.error("Error al cerrar sesión:", error);
  });
}

// Proteger página por rol (simple: solo verificar que esté logueado)
export function protectPage(role = "any") {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "/DeLaVilla/pages/login.html";
    }
  });
}

// Actualizar icono de usuario en el header
export function updateUserIcon() {
  const userLink = document.querySelector('a[title="Mi cuenta"]');
  if (!userLink) return;

  onAuthStateChanged(auth, (user) => {
    if (user) {
      userLink.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
      userLink.title = "Cerrar sesión";
      userLink.href = "#";
      userLink.onclick = (e) => {
        e.preventDefault();
        logout();
      };
    } else {
      userLink.innerHTML = '<i class="fas fa-user"></i>';
      userLink.title = "Iniciar sesión";
      userLink.href = "/DeLaVilla/pages/login.html";
      userLink.onclick = null;
    }
  });
}

export { app, auth, db };
