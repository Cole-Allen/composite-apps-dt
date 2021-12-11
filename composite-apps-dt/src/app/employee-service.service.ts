import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from "rxjs";
import { Employee } from "./employee";

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  timesRan = 0;

  employeesArray = [{
    name: 'Cole Allen',
    id: 0
  },
  {
    name: 'Isaac Paxman',
    id: 1
  }];

  id = 2

  selectedEmployee = new BehaviorSubject<any>({name: 'Work Please', id: 9});

  selectedEmployeeObservable: Observable<any> = this.selectedEmployee.asObservable();

  getEmployees(): Observable<any> {
    const heroes = of(this.employeesArray)
    return heroes;
  }

  addEmployee(name: string): void {
    this.addEmployee = this.addEmployee.bind(this);
    this.employeesArray.push({
      name,
      id: this.id
    });
    this.id++;
  }

  selectEmployee(employee: any) {
    this.selectedEmployee.next(employee);
  }

  getSelectedEmployee() {
    const se = of(this.selectedEmployee);
    return se;
  }
}
