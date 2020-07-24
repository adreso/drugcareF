import {required, minLength, propObject} from "@rxweb/reactive-form-validators";
import { GrupoTerapeutico } from './grupoTerapeutico.models';

export class Principio{

    id:number;

    @required()
    @minLength({ value: 4 })
    nombre:string;

    // @propObject(GrupoTerapeutico)
    @required()
    grupoterpeutico: GrupoTerapeutico = new GrupoTerapeutico();
}
