import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
})
export class EmployeeCardComponent implements OnInit {

  constructor() { }

  @Input() addEmployee !: (name: string) => void;
  @Input() id !: any;

  cardV: string = '';

  ngOnInit(): void {
    console.log(this.cardV);
  }

}
