import { Enfermedad } from './enfermedades.models';
import { TipoParaclinico } from './tipoparaclinicos.models';
import { required } from '@rxweb/reactive-form-validators';


export class EnfermedadParaclinico{
  id:number;

  @required()
  enfermedad:Enfermedad;

  @required()
  paraclinico:TipoParaclinico

}
