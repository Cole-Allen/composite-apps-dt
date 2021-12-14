import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee-service.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css']
})
export class EmployeeCardComponent implements OnInit {

  constructor(
    private es: EmployeeService,
    private fb: FormBuilder
  ) { }

  selectedEmployee: any;

  employeeCard = this.fb.group({
    firstName: '',
    lastName: ''
  })

  getSelectedEmployee() {
    this.es.selectedEmployeeObservable
      .subscribe(res => {
        this.selectedEmployee = res;
        console.log(res);
        this.employeeCard.controls['firstName'].setValue(res.firstName);
        this.employeeCard.controls['lastName'].setValue(res.lastName);
      });
  }

  onSave() {
    console.log(this.selectedEmployee.id);
    if (this.selectedEmployee.id) {
      fetch(`/employees/${this.selectedEmployee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.employeeCard.value)
      })
        .then(res => res.json())
        .then(data => this.es.getEmployees());
    } else {
      console.log('No employee selected');
    }
  }

  onDelete() {
    if (window.confirm('Test')) {
      if (this.selectedEmployee.id) {
        fetch(`/employees/${this.selectedEmployee.id}`, {
          method: 'DELETE'
        }).then(res => res.json())
        .then( data => {
          console.log(data);
          this.es.getEmployees();
          this.es.selectEmployee({});
        });
      }
    }
  }

  ngOnInit(): void {
    this.employeeCard.valueChanges.subscribe();
    this.getSelectedEmployee();
  }
}
