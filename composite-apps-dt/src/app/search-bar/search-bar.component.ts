import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeeService } from '../employee-service.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchForm = this.fb.group({
    search: ''
  })

  constructor (
    private fb: FormBuilder,
    private es: EmployeeService
      ) {

  }

  ngOnInit() {
    this.searchForm.valueChanges.subscribe();
  }

  onSubmit():void {
    if (this.searchForm.value.search === '') {
      return;
    }
    if (!isNaN(parseInt(this.searchForm.value.search))) {
      console.log('number!');
      fetch(`/employees/id/${this.searchForm.value.search}`)
        .then(res => res.json())
        .then(data => this.selectEmployee(data[0]));
    } else {
      console.log('String!');
      let name = this.searchForm.value.search.split(' ');
      if (name.length > 1) {
        fetch(`/employees/name/?firstName=${name[0]}&lastName=${name[1]}`)
          .then(res => res.json())
          .then(data => this.selectEmployee(data[0]));
      } else {
        fetch(`/employees/name/?name=${name[0]}`)
          .then(res => res.json())
          .then(data => this.selectEmployee(data[0]));
      }

    }

    this.searchForm.reset();
  }

  selectEmployee(employee: any) {
    if (employee) {
      this.es.selectEmployee(employee)
    }
  }



}
