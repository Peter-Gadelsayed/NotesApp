import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FormGuard } from './form.guard';
import { AlertService } from 'src/app/shared/alert/alert.service';

describe('FormGuard', () => {
  let guard: FormGuard;
  let alertService: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormGuard,
        AlertService
      ]
    });
    guard = TestBed.inject(FormGuard);
    alertService = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow navigation when form is not dirty', () => {
    const mockComponent = {
      form: {
        dirty: false,
        submitted: false
      }
    };
    const mockRoute = {} as ActivatedRouteSnapshot;
    const mockState = {} as RouterStateSnapshot;

    expect(guard.canDeactivate(mockComponent, mockRoute, mockState)).toBe(true);
  });
});
