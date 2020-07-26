import {required, propObject} from "@rxweb/reactive-form-validators";
import { Paciente } from './paciente.model';
import { Enfermedad } from '../parametros/enfermedades.models';


export class Diagnostico{
    public id: number;
  
    public enfermedad:Enfermedad = new  Enfermedad();
   
    public paciente:Paciente=new Paciente();


    
  }