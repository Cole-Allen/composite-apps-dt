import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor() { }

  @Input() employeesArray!: any;

  ngOnInit() {
    console.log('Pretend fetch request')
  }

  onEmit(event: any) {
    console.log(event);
  }

}
