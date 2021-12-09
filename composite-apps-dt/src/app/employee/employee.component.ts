import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Edit } from '../edit.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @Input() name !: string;
  @Input() id !: number;

  @Output() newEventEmitter = new EventEmitter<any>();

  constructor(
    private edit: Edit
  ) {
    this.onClick = this.onClick.bind(this);
  }

  ngOnInit(): void {
  }

  onClick() {
    this.newEventEmitter.emit(this.id);
    this.newEventEmitter.emit(this.name);
    this.edit.test(this.name, this.id);
  }

}
