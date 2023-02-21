import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'print-error',
  templateUrl: './print-error.component.html',
  styleUrls: ['./print-error.component.css']
})
export class PrintErrorComponent implements OnInit {

  @Input("control") control: any;
  @Input() errorMessages: any = {};
  constructor() { }

  ngOnInit(): void {
  }

}
