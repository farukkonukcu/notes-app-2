import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyCq791r4VuiOTwG05qLeMtzudSPoQvO1as",
  authDomain: "note-app-8f2c0.firebaseapp.com",
  databaseURL: "https://note-app-8f2c0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "note-app-8f2c0",
  storageBucket: "note-app-8f2c0.appspot.com",
  messagingSenderId: "442685822433",
  appId: "1:442685822433:web:df7f1d4977951940cfeea0",
  measurementId: "G-YKZT1PDGMM"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router = inject(Router);


  login(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password).then((user) => {
      this.router.navigateByUrl('/notes');
    })
  }

  register(email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password).then(() => {
      this.router.navigateByUrl('/login');
      sendEmailVerification(auth.currentUser!).then(() => {
        alert("Email Gönderildi");
      })
    })
  }

  logout() {
    signOut(auth).then(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
