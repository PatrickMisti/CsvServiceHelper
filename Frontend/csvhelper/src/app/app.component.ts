import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  active = false;

  ngOnInit(): void {
    const toggle = document.querySelector('.toggle');
    const ul = document.querySelector('ul');
    toggle.addEventListener('click', () => {
      if (!this.active) {
        toggle.classList.toggle('active', true);
        ul.classList.toggle('active', true);
        this.active = true;
      } else {
        toggle.classList.toggle('active', false);
        ul.classList.toggle('active', false);
        this.active = false;
      }
    });
  }
  deleteTable() {
    const table = document.querySelector('#table');
    // var filePicker = document.querySelector('#filePicker');
    if (table != null) {
      table.innerHTML = '';
      table.parentNode.removeChild(table);
      // filePicker.value = '';
      // filePicker.nodeValue = '';
      alert('Erfolgreich gelöscht');
    } else {
      alert('Es wurde noch kein File eingelesen');
    }
  }

  deleteSelectedRows() {

  }

  safeTable() {
    alert('Daten sind gespeichert worden!!!');
  }
}
