import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  success(title: string, message: string) {
    Swal.fire({
      title: title,
      text: message,
      icon: "success",
      timer: 5000,
      timerProgressBar: true,
      showCloseButton: true,
    });
  }

  error(title: string, message: string) {
    Swal.fire({
      title: title || "Oops...",
      text: message || "Something went wrong!",
      icon: "error",
      showCloseButton: true,
    });
  }

  confirm(title: string, message: string, confirmTxt: string, cancelTxt: string, onConfirm: () => void) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: "#e43949",
      cancelButtonColor: "#198754",
      confirmButtonText: confirmTxt,
      cancelButtonText: cancelTxt,
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
    });
  }



}
