import { Injectable } from '@angular/core';
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getFirestore, onSnapshot, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { BehaviorSubject } from 'rxjs';
import { AuthService, app, auth } from './auth.service';

const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class NoteauthService {

  constructor(auth : AuthService) {
    this.listen();
  }

  addNote(noteHeader: string, noteContent: string) {
    const user = auth.currentUser;
    if (user) {
      addDoc(collection(db, 'notes'), {
        uid: user.uid,
        header: noteHeader,
        content: noteContent
      });
    }
  }

  updateNote(nid: string, noteHeader: string, noteContent: string) {
    const user = auth.currentUser;
    if (user) {
      const noteRef = doc(db, 'notes', nid);
      updateDoc(noteRef, {
        uid: user.uid,
        header: noteHeader,
        content: noteContent
      });
    }
  }

  deleteNote(id: string) {
    deleteDoc(doc(db, 'notes', id));
  }

  private notesSubject = new BehaviorSubject<any[]>([]);
  notes$ = this.notesSubject.asObservable();

  listen() {
    onAuthStateChanged(auth, user => {
      if (user) {
        const notesQuery = query(collection(db, 'notes'), where('uid', '==', user.uid));
        onSnapshot(notesQuery, (snapshot) => {
          const notes = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          this.notesSubject.next(notes);
        });
      }
    })
  }
}
