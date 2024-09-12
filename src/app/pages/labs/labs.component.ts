import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-labs',
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.scss'
})
export class LabsComponent {

  welcome = 'Hola!';
  tasks = signal([
    'Instalar el angular cli',
    'crear protecto',
    'crear componente'
  ]);
  name = signal('Joan Ventura');
  age = 22;
  disabled=true;
  img = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtn-95Af9W76K6CtOgmZcFDZZCB203zMPMEQ&s';

  person = signal({
    name: 'alejandro',
    age : 18,
    avatar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtn-95Af9W76K6CtOgmZcFDZZCB203zMPMEQ&s'
  });
  clickHandler(){
    alert('hola')
  }
  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newvalue = input.value;
    this.name.set(newvalue);
  }
  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value);
  }


}
