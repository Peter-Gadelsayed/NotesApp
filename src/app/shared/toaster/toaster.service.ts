import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {


  constructor(private toastr: ToastrService) { }

  // Success toaster
  SuccessToaster(successMessage: string, headtitle: string = 'Success', time: number = 2000) {
    this.toastr.success(successMessage, headtitle, {
      timeOut: time, // Toast duration
      progressBar: true, // Show progress bar
      closeButton: true, // Show close button
      tapToDismiss: false, // Click does not dismiss
      positionClass: 'toast-top-right' // Custom position
    });
  }

  // Error toaster
  ErrorToaster(errorMessage: string, headtitle: string = 'Error', time: number = 2000) {
    this.toastr.error(errorMessage, headtitle, {
      timeOut: time, // Toast duration
      progressBar: true, // Show progress bar
      closeButton: true, // Show close button
      tapToDismiss: false, // Click does not dismiss
      positionClass: 'toast-top-right' // Custom position
    });
  }

}
