import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private auth: AuthService) {
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), this.patternValidator]),
    password2: new FormControl('', [Validators.required, Validators.minLength(6), this.patternValidator]),
  }, { validators: this.passwordValidators('password', 'password2') });

  submit() {
    const promise = this.auth.register(this.form.value.email!, this.form.value.password!)
  }

  passwordValidators(p1: string, p2: string) {
    return (control: AbstractControl) => {
      const password1 = control.get(p1)?.value;
      const password2 = control.get(p2)?.value;

      if (password1 === password2) {
        return null;
      } else {
        return { missmatch: true };
      }
    };
  }

  patternValidator(control: AbstractControl): ValidationErrors | null {
    const complexityRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    const v = control.value as string;
    if (complexityRegex.test(v)) {
      return null;
    }
    else {
      return {
        passwordStrenght: true
      }
    }
  }
}
