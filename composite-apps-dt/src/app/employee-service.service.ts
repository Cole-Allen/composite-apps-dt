import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { Employee } from "./employee";

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  employeesArray = new BehaviorSubject<any>([{}]);

  employeesArrayObservable: Observable<any> = this.employeesArray.asObservable();

  selectedEmployee = new BehaviorSubject<any>({});

  selectedEmployeeObservable: Observable<any> = this.selectedEmployee.asObservable();

  addingEmployee = new BehaviorSubject<any>(false);

  addingEmployeeObservable: Observable<any> = this.addingEmployee.asObservable();

  getEmployees() {
    fetch('/employees')
      .then(res => res.json())
      .then(data => {
        this.employeesArray.next(data);
      })
      .catch(err => (console.error(err)));
  }

  employeeAdd(bool: boolean){
    this.addingEmployee.next(bool);
  }

  selectEmployee(employee: any) {
    this.selectedEmployee.next(employee);
  }

  getSelectedEmployee() {
    const se = of(this.selectedEmployee);
    return se;
  }
}
