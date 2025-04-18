import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../../../shared/alert/alert.service';

export interface FormComponent {
  form: {
    dirty: boolean;
    submitted: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class FormGuard implements CanDeactivate<FormComponent> {
  constructor(private alert: AlertService) { }

  canDeactivate(
    component: FormComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (component.form.dirty && !component.form.submitted) {
      return new Promise<boolean>((resolve) => {
        this.alert.confirm(
          'Discard Changes?',
          'You have unsaved changes. Are you sure you want to leave?',
          'Leave',
          'Stay',
          () => {
            resolve(true);
          }
        );
      });
    }
    return true;
  }
}
