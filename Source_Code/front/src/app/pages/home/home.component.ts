import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  public user: User;

  constructor( private userService: UserService) {
    this.user = userService.user;
  }

  ngOnInit(): void {
  }

}
