import {required, minLength} from "@rxweb/reactive-form-validators";

export class TipoHorario{

    id:number;

    @required()
    @minLength({ value: 4 })
    descripcion:string;
}
