import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: Auth, private router: Router) {
    this.registerForm = this.formBuilder.group({
      email: formBuilder.control('', [Validators.required, Validators.email]),
      password: formBuilder.control('', [Validators.required, Validators.minLength(6)]),
    })
  }

  public onSubmit(): void {
    createUserWithEmailAndPassword(this.auth, this.registerForm.value.email, this.registerForm.value.password)
      .then((res: any) => {
        console.log(res);
        this.router.navigate(['/login']);
      })
      .catch((err: any) => console.log(err));
  }

  ngOnInit(): void {
  }

}
