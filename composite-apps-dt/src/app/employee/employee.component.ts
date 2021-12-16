import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EmployeeService } from '../employee-service.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @Input() firstName !: string;
  @Input() lastName !: string;
  @Input() employeeId !: number;
  @Input() last !: boolean;

  @Output() newEventEmitter = new EventEmitter<any>();

  constructor(
    private es: EmployeeService
  ) {
    this.onClick = this.onClick.bind(this);
  }

  ngOnInit(): void {
    console.log(this.last);
  }

  onClick() {
    this.es.selectEmployee({firstName: this.firstName, lastName: this.lastName, employeeId: this.employeeId});
  }

}
