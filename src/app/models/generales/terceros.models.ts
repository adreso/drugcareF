import { TiposID, Sexo } from '../../config/enums';
import {required, minLength, email} from "@rxweb/reactive-form-validators";
import { Deserializable } from '../configuraciones/deserializable.model';

export class Tercero{
    id:number;

    @required()
    @minLength({value: 6})
    identificacion:string;

    @required()
    tipoidentificacion:TiposID;

    @required()
    @minLength({value:2})
    pnombre:string;

    @minLength({value:2})
    snombre:string;
    @required()
    @minLength({value:2})
    papellido:string;

    @minLength({value:2})
    sapellido:string;

    @required()
    sexo:Sexo;

    @required()
    fechanacimiento:Date;

    @required()
    direccion:string;
    @required()
    telefono:string;

    @required()
    @email()
    email:string;

    foto:string;

    estado:boolean;

    getFullName() {
      return this.pnombre + ' ' + this.snombre + ' ' + this.papellido + ' '+ this.sapellido;
    }
}


