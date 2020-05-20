import {required, minLength, numeric} from "@rxweb/reactive-form-validators";
import { Sexo } from '../../config/enums';

export class Enfermedad{

    id:number;

    @required()
    @minLength({ value: 2 })
    codigo:string;


    @required()
    @minLength({value:2})
    nombre:string;

    @required()
    @numeric()
    edadinicial:Number;

    @required()
    @numeric()
    edadfinal:Number;

    @required()
    sexo:Sexo;

}
