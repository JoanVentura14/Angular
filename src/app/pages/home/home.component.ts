import { Component, signal } from '@angular/core';
import { title } from 'node:process';
import { Task} from './../../models/tasl.model';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  standalone: true,
  imports:[CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tasks = signal <Task[]>([
    {
        id: Date.now(),
        title: 'crear proyecto',
        completed: false
    },
    {
      id: Date.now(),
      title: 'crear componentes',
      completed: false
  },
  ]);

  newTaskCtrl = new FormControl('Tarea',{
    nonNullable: true,
    validators:[
      Validators.required,
    ]
  });

  changeHandler() {
    if(this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value;
      this.addTask(value);
      this.newTaskCtrl.setValue('');
    }

  }

  addTask(title:string){
    const newTask = {
      id: Date.now(),
      title,
      completed: false,
    };
    this.tasks.update((tasks) =>  [...tasks, newTask]);
  }
  deleteTask(index: number){
    this.tasks.update((tasks) => tasks.filter((task,position) => position !== index));
  }

  updateTask(index: number){
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return{
            ...task,
            completed: !task.completed
          }
        }
        return task;
      })
    })
  }

}
