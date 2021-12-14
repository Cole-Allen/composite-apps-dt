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
        .then(res => console.log('res', res));
    } else {
      console.log('String!');
      fetch(`/employees/name/${this.searchForm.value.search}`)
        .then(res => console.log('res', res));
    }

    this.searchForm.reset();
  }



}
