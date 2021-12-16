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

  adding: boolean = false;

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
      this.es.getEmployees();
      this.es.employeeAdd(false);
      this.newEmployeeCard.controls['firstName'].setValue('');
      this.newEmployeeCard.controls['lastName'].setValue('');
    })

  }

  cancelAdd(e: any) {
    if (e.target.getAttribute('class') === 'card-modal') {
      this.es.employeeAdd(false);
    }

  }

  ngOnInit(): void {
    this.es.addingEmployeeObservable
    .subscribe(res => this.adding = res);
  }

}
