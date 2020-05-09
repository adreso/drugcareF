import { ReactiveFormConfig } from "@rxweb/reactive-form-validators";
import { FormGroup, FormControl } from '@angular/forms';

export const configMessagesValidator = () =>{
  ReactiveFormConfig.set({
    "validationMessage":{
  "required":"Este campo es obligatorio",
    "minLength":"El campo debe tener mínimo {{1}} caracteres",
    "maxLength":"El campo no puede tener mas de {{1}} caracteres",
    "maxDate":"La fecha no puede ser mayor a la fecha actual",
    "numeric":"Este dato debe ser númerico",
    "email":"Email no valido",
    "extension":"Las extensiones validas son: {{1}}",
    "fileSize":"El archivo pesa un total de: {{0}} bytes y el tamaño máximo permitido es {{1}} bytes",
    "password":"La contraseña no cumple con los requisitos mínimos"
    }
  });
}


export const showValidationMsg = (formGroup: FormGroup) => {  
  for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
          const control: FormControl = <FormControl>formGroup.controls[key];
          if (Object.keys(control).includes('controls')) {
              const formGroupChild: FormGroup = <FormGroup>formGroup.controls[key];
              showValidationMsg(formGroupChild);
          }
          control.markAsTouched();
      }
  }
}

export const resetForm = (formGroup:FormGroup) =>{
  
    for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
          const control: FormControl = <FormControl>formGroup.controls[key];
          if (Object.keys(control).includes('controls')) {
              const formGroupChild: FormGroup = <FormGroup>formGroup.controls[key];
              resetForm(formGroupChild);
          }
          control.setErrors(null);
      }
  
  }
}

export const resetearForma = (formGroup:FormGroup) =>{
  formGroup.reset();
  resetForm(formGroup);
}

// export const resetForm = (form: FormGroup) => {
//   form.reset();
//   Object.keys(form.controls).forEach(key => {
//     form.get(key).setErrors(null);
    
//   });
// }