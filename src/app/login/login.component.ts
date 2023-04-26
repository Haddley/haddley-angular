import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: Auth, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: formBuilder.control('', [Validators.required, Validators.email]),
      password: formBuilder.control('', [Validators.required, Validators.minLength(6)]),
    })
  }

  public onSubmit(): void {
    signInWithEmailAndPassword(this.auth, this.loginForm.value.email, this.loginForm.value.password)
      .then((res: any) => 
      {
        console.log(res);
        this.router.navigate(['/dashboard']);
      })
      .catch((err: any) => console.log(err));
  }


  ngOnInit(): void {
  }

}
