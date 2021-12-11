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
    name: ''
  })

  getSelectedEmployee() {
    this.es.selectedEmployeeObservable
      .subscribe(res => {
        this.selectedEmployee = res;
        this.employeeCard.controls['name'].setValue(res.name);
      });
  }

  onSave() {
    console.log(this.selectedEmployee);
  }

  ngOnInit(): void {
    this.employeeCard.valueChanges.subscribe(console.log);
    this.getSelectedEmployee();
  }
}
