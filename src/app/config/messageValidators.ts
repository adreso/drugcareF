import { ReactiveFormConfig } from "@rxweb/reactive-form-validators";

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