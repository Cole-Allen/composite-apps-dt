import { Component, OnInit, Input } from '@angular/core';
import { EmployeeService } from '../employee-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(
    private es: EmployeeService
  ) { }

  employeesArray: any;

  getEmployees() {
    this.es.getEmployees()
      .subscribe(res => this.employeesArray = res);
  }

  ngOnInit() {
    console.log('Pretend fetch request')
    this.getEmployees();
  }

}
