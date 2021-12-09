import { Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {
    this.addEmployee = this.addEmployee.bind(this);
  }

  employeesArray = [{
    name: 'Cole Allen',
    id: 0
  },
  {
    name: 'Cole Allen',
    id: 1
  }];

  id = 2

  addEmployee(name: string): void {
    this.addEmployee = this.addEmployee.bind(this);
    this.employeesArray.push({
      name,
      id: this.id
    });
    this.id ++;
  }



}
