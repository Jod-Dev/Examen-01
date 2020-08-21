import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  public user: User;

  constructor( private userService: UserService) {
    this.user = userService.user;
  }
  ngOnInit(): void {
  }

}
