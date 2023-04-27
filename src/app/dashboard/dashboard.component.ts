import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, getFirestore, query, serverTimestamp, where } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user = this.auth.currentUser;
  createMessageForm!: FormGroup;
  messages$: Observable<any[]>;

  constructor(private formBuilder: FormBuilder, private auth: Auth, firestore: Firestore) {
    this.createMessageForm = this.formBuilder.group({
      message: formBuilder.control('', [Validators.required, Validators.minLength(6)])
    })
    const uid = this.auth.currentUser?.uid;
    const result = query(collection(firestore, 'messages'), where("uid", "==", uid));
    console.log(result);
    this.messages$ = collectionData(result);
  }

  ngOnInit(): void {
    console.log(this.auth.currentUser);
  }

  public onSubmit(): void {
    this.saveMessage(this.createMessageForm.value.message)
    this.createMessageForm.reset();
  }

  // Saves a new message to Cloud Firestore.
  private async saveMessage(messageText: string) {
    try {
      const uid = this.auth.currentUser?.uid;
      await addDoc(collection(getFirestore(), 'messages'), {
        uid: uid,
        email: this.auth.currentUser?.email,
        text: messageText,
        timestamp: serverTimestamp()
      });
    }
    catch (error) {
      console.error('Error writing new message to Firebase Database', error);
    }
  }

}
