import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-error-validator',
  templateUrl: './button-error-validator.component.html',
  styles: []
})
export class ButtonErrorValidatorComponent implements OnInit {

  @Input() error:string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
