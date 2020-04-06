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
  if(Array.isArray(err.error.message)){
    for (let index = 0; index < err.error.message.length; index++) {
      const element = err.error.message[index].message;
      Toast.fire({icon:'error', title:element});  
    }
  }else{
    Toast.fire({icon:'error', title:err.error.message});
  }
};

export const swalInfo = (objeto:string, titulo:string, mensaje:string) =>{
  Swal.fire({
    title: `<strong>${titulo}</strong>`,
    icon: 'info',
    html:objeto,
    showCloseButton: true,
    focusConfirm: false,
    confirmButtonText:`<i class="fa fa-thumbs-up"></i>${mensaje}!`
  })
}