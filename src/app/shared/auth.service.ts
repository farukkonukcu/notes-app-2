import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
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
