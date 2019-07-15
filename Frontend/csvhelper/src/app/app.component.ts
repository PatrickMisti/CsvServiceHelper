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
}
