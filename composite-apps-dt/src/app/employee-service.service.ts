import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { Employee } from "./employee";

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  timesRan = 0;

  employeesArray = new BehaviorSubject<any>([{}]);

  employeesArrayObservable: Observable<any> = this.employeesArray.asObservable();

  id = 2

  selectedEmployee = new BehaviorSubject<any>({});

  selectedEmployeeObservable: Observable<any> = this.selectedEmployee.asObservable();

  getEmployees() {
    fetch('/employees')
      .then(res => res.json())
      .then(data => {
        this.employeesArray.next(data);
      })
      .catch(err => (console.error(err)));
  }

  selectEmployee(employee: any) {
    this.selectedEmployee.next(employee);
  }

  getSelectedEmployee() {
    const se = of(this.selectedEmployee);
    return se;
  }
}
