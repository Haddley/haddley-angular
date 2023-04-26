import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user = this.auth.currentUser;

  constructor(private auth: Auth) { }

  ngOnInit(): void {
    console.log(this.auth.currentUser);
  }

}
