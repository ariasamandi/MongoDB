import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) {
    this.getTasks();
  }
  getTasks() {
    return this._http.get('/tasks');
  }
  addTask(newtask: any) {
    return this._http.post('/create', newtask)
  }
  editTask(edited: any) {
    return this._http.put(`/update/${edited._id}`, edited);
  }
  deleteTask(task: any){
    return this._http.delete(`/delete/${task._id}`)
  }
}
