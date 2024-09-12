import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  welcome = 'Hola!';
  tasks = [
    'Instalar el angular cli',
    'crear protecto',
    'crear componente'
  ];
}
