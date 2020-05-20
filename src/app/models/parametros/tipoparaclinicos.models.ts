import {required, minLength, maxLength, numeric} from "@rxweb/reactive-form-validators";

export class TipoParaclinico{

    id:number;

    @required()
    @minLength({ value: 2 })
    nombre:string;

    @required()
    @numeric()
    valornormal:Number;

    @required()
    @minLength({value:2})
    unidadmedida:string;

    @required()
    @maxLength({value:3})
    simbolo:string;

    @required()
    @numeric()
    rangomayor:Number;

    @required()
    @numeric()
    rangomenor:Number;

    @required()
    frecuencia:Number;

}
