import { Component, OnInit, Input } from '@angular/core';
import { ChildActivationStart } from '@angular/router';
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

  employeesArray: any = {};



  onAdd() {
    this.es.employeeAdd(true);
  }

  ngOnInit() {
    this.es.getEmployees();
    this.es.employeesArrayObservable
    .subscribe(res => {
      this.employeesArray = res;
    });
  }

}
