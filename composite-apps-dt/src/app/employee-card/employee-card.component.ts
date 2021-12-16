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
        this.employeeCard.controls['firstName'].setValue(res.firstName);
        this.employeeCard.controls['lastName'].setValue(res.lastName);
      });
  }

  onSave() {
    if (this.selectedEmployee.employeeId) {
      fetch(`/employees/${this.selectedEmployee.employeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.employeeCard.value)
      })
        .then(res => res.json())
        .then(data => {
          this.es.getEmployees();
          this.es.selectEmployee({});
        });
    } else {
      console.log('No employee selected');
    }
  }

  onDelete() {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      if (this.selectedEmployee.employeeId) {
        fetch(`/employees/${this.selectedEmployee.employeeId}`, {
          method: 'DELETE'
        }).then(res => res.json())
        .then( data => {
          this.es.getEmployees();
          this.es.selectEmployee({});
        });
      }
    }
  }

  cancel(e: any) {
    if (e.target.getAttribute('class') === "card-modal") {
      this.es.selectEmployee({});
    }
  }

  ngOnInit(): void {
    this.employeeCard.valueChanges.subscribe();
    this.getSelectedEmployee();
  }
}
