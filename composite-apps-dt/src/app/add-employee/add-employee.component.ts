import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeeService } from '../employee-service.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private es: EmployeeService
  ) { }

  newEmployeeCard = this.fb.group({
    firstName: '',
    lastName: ''
  })

  onAdd() {
    fetch('/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.newEmployeeCard.value)
    })
    .then(res => {
      console.log(res);
      this.es.getEmployees();
    })

  }

  ngOnInit(): void {
  }

}
