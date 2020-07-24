import {required, propObject} from "@rxweb/reactive-form-validators";
import { Tercero } from '../generales/terceros.models';

export class Paciente{
  public id: number;

  @required()
  public administradora: string;

  @required()
  public tipo: string;

  @required()
  public autorizacion: string;

  @required()
  public talla:number;

  @propObject(Tercero)
  public tercero:Tercero=new Tercero();
}
