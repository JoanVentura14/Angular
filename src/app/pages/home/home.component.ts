import { Component, computed, signal } from '@angular/core';
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

  filter = signal <'all' | 'pending' | 'completed'>('all');
  taskByFilter = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    if (filter === 'pending') {
      return tasks.filter(task => !task.completed);
    }
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    }
    return tasks;
  })

  newTaskCtrl = new FormControl('Tarea',{
    nonNullable: true,
    validators:[
      Validators.required,

    ]
  });

  changeHandler() {
    if(this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value.trim();
      if(value!== ''){
      this.addTask(value);
      this.newTaskCtrl.setValue('');
      }

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
    })/*
   this.tasks.mutate(state =>{
    cost currentTask = state[index];
    state[index]={
      ...currentTask,
      completed: !currentTask.completed
    }
   })*/
  }

  updateTaskEditingMode(index: number){
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return{
            ...task,
            editing: true
          }
        }
        return {
          ...task,
          editing: false
        };
      })
    })
  }
  updateTaskText(index: number,event: Event){
    const input = event.target as HTMLInputElement;
    this.tasks.update(prevState =>  {
      return prevState.map((task, position) =>{
        if (position === index) {
          return{
            ...task,
            title: input.value,
            editing: false
          }
        }
        return task;
      })
      });
  }

  changeFilter(filter: 'all' | 'pending' | 'completed'){
    this.filter.set(filter);
  }
}
