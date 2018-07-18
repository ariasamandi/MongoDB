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
  clicked: any;
  tasks = [];
  newTask: any;
  show: any;
  editing: any;
  constructor(private _httpService: HttpService){}
  // ngOnInit will run when the component is initialized, after the constructor method.
  ngOnInit(){
    this.getTasksFromService();
    this.newTask = { title: "", description: "", completed: false};

  }
  showTask(task: any){
    this.clicked = task;

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
  onSubmit() {
    // Code to send off the form data (this.newTask) to the Service
    // ...
    // Reset this.newTask to a new, clean object.
    this.newTask = { title: "", description: "" }
  }
  editTask(task: any){
    console.log(task);
    this.editing = {...task};
  }
  submitEdit(){
    let obs = this._httpService.editTask(this.editing);
    obs.subscribe(data=>{
      console.log(data);
      this.getTasksFromService();
      this.editing = null;
    })
  }
  addTask(){
    let obs = this._httpService.addTask(this.newTask);
    obs.subscribe(data=>{
      console.log(data);
      this.newTask = {title: "", description: "", completed: ""};
      this.getTasksFromService()
    })
  }
  deleteTask(task: any){
    let obs = this._httpService.deleteTask(task);
    obs.subscribe(data=>{
      console.log(data);
      this.getTasksFromService();
    })
  }
}