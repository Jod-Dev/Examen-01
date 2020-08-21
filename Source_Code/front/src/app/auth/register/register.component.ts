import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css']
})
export class RegisterComponent  {
    public formSubmitted =  false;
    public registerForm = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    tel: ['', Validators.required],
    email: ['', Validators.required],
    pass: ['', Validators.required],
    passconfirm: ['', Validators.required],
    terms: [false, Validators.required],
  }, {
      validators: this.passwordsIquals('pass', 'passconfirm')
    });
  constructor( private fb: FormBuilder,
               private userService: UserService,
               private router: Router,
               public translate: TranslateService) {
             translate.addLangs(['es', 'en']);
             translate.setDefaultLang('es');
   }

  createUser(){
    this.formSubmitted = true ;
    if (this.registerForm.invalid){
        return;
    }
    //Post  form
    this.userService.createUser(this.registerForm.value)
      .subscribe(resp =>{
        // Go to home
        this.router.navigateByUrl('/');
      }, (err) => {
        //Sweet Alert Error
        Swal.fire('Error', err.error.msg, 'error');
      });
  }

  invalidField(field: string): boolean{
    if ( this.registerForm.get(field).invalid && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }
  }

  invalidPass() {
    const pass1 = this.registerForm.get('pass').value;
    const pass2 = this.registerForm.get('passconfirm').value;

    if ( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  acceptTerms() {
    return !this.registerForm.get('terms').value && this.formSubmitted;
  }

  passwordsIquals(pass1Name: string, pass2Name: string ) {

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if ( pass1Control.value === pass2Control.value ) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ noEsIgual: true })
      }
    }
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

}
