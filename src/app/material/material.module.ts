import { NgModule } from '@angular/core';

import {MatTabsModule} from '@angular/material/tabs';
import {DragDropModule} from '@angular/cdk/drag-drop';



  
const materials=[
  MatTabsModule,
  DragDropModule
];

@NgModule({
  declarations: [],
  imports: [
    materials,
  ],
  exports:[
    materials,
  ]
})
export class MaterialModule { }
