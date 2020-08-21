import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css']
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
    pass: ['', Validators.required],
    remember: [false]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private userService: UserService,
              public translate: TranslateService) {
            translate.addLangs(['es', 'en']);
            translate.setDefaultLang('es');
  }

  ngOnInit(): void {
  }


  login() {
    this.userService.login(this.loginForm.value)
      .subscribe( resp => {
        if ( this.loginForm.get('remember').value ){
          localStorage.setItem('email', this.loginForm.get('email').value );
        } else {
          localStorage.removeItem('email');
        }
        // Go to home
        this.router.navigateByUrl('/');
      }, (err) => {
        // Sweet Alert Error
        Swal.fire('Error', err.error.msg, 'error');
      });
    // console.log(this.loginForm.value);
    this.router.navigateByUrl('/');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }
}
