import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class Edit {
  timesRan = 0;
  test(name: any, id: any) {
    console.log("name",name);
    console.log("id",id);
    this.timesRan++;
    console.log("times ran", this.timesRan);
  }
}
