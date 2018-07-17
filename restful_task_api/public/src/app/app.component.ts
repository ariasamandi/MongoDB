import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Set the attribute tasks to be an array.
  title = "app";

  tasks = [];
  constructor(private _httpService: HttpService){}
  // ngOnInit will run when the component is initialized, after the constructor method.
  ngOnInit(){
    this.getTasksFromService();
  }
  onButtonClick(): void { 
    console.log(`Click event is working`);
}
onButtonClickParam(num: Number): void { 
    console.log(`Click event is working with num param: ${num}`);
}
onButtonClickParams(num: Number, str: String): void { 
    console.log(`Click event is working with num param: ${num} and str param: ${str}`);
}
onButtonClickEvent(event: any): void { 
    console.log(`Click event is working with event: ${event}`);
}
  getTasksFromService(){
     let observable = this._httpService.getTasks();
     observable.subscribe(data => {
        console.log("Got our tasks!", data)
        // In this example, the array of tasks is assigned to the key 'tasks' in the data object. 
        // This may be different for you, depending on how you set up your Task API.
        this.tasks = data['tasks'];
     });
  }
}

 // subscribe to the Observable and provide the code we would like to do with our data from the response
//  tempObservable.subscribe(data => console.log("Got our tasks!", data));
//  console.log("hi");