import Swal from 'sweetalert2';

export const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});

export const ToastErrores = (err)=>{
  for (let index = 0; index < err.error.message.length; index++) {
    const element = err.error.message[index].message;
    Toast.fire({icon:'error', title:element});  
  }
};