import { NgModule } from "@angular/core";
import { EstadoPipe } from './estado.pipe';

@NgModule({
    declarations:[
        EstadoPipe
    ],
    exports:[
        EstadoPipe
    ]
})

export class PipesModule{}