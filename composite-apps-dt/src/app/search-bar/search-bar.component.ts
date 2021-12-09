import { Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchForm = this.fb.group({
    search: ''
  })

  constructor (private fb: FormBuilder) {

  }

  ngOnInit() {
    this.searchForm.valueChanges.subscribe(console.log);
  }

  onSubmit():void {
    console.log('submitted', this.searchForm.value);
    this.searchForm.reset();
  }



}
