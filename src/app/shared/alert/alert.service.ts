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
      color: "#716add",
      showClass: {
        popup: `
        animate__animated
        animate__fadeInUp
        animate__slower
        `
      },
      hideClass: {
        popup: `
        animate__animated
        animate__fadeOutDown
        animate__slower
        `
      },
    });
  }

  error(message: string) {
    Swal.fire('خطأ', message, 'error');
  }

  confirm(title: string, message: string, confirmTxt: string, onConfirm: () => void) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showClass: {
        popup: `
        animate__animated
        animate__fadeInUp
        animate__faster
        `
      },
      hideClass: {
        popup: `
        animate__animated
        animate__fadeOutDown
        animate__faster
        `
      },
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: confirmTxt,
      cancelButtonText: "No, cancel!",
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();

      }
    });
  }

}
