import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js";
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

try {
  getAnalytics(app);
} catch (e) {
  console.warn("Analytics no disponible (no es grave):", e.message);
}

const auth = getAuth(app);
const db   = getFirestore(app);

export function logout() {
  signOut(auth).catch((error) => {
    console.error("Error al cerrar sesión:", error);
  });
}

export function protectPage(role = "any") {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "/DeLaVilla/pages/login.html";
    }
  });
}

export function updateUserIcon() {
  const userLink = document.querySelector('a[title="Mi cuenta"]');
  if (!userLink) {
    console.warn('No se encontró <a title="Mi cuenta"> en el header.');
    return;
  }

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
      userLink.title = "Mi cuenta";
      userLink.href = "/DeLaVilla/pages/login.html";
      userLink.onclick = null;
    }
  });
}

export { app, auth, db };
