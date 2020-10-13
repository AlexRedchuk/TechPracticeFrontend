import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [
    trigger('alert', [
    state('danger', style( { background: '#c72d12'})),
    state('peace', style( { background: '#079402'})),
    transition(':enter', [
    style({ opacity: 0}),
    animate('850ms ease-out')
  ]),
    transition(':leave', [
      style({opacity: .9}),
      animate(550, style( {
        opacity: 0
      }))
    ])
  ]),
]
})
export class AlertComponent implements OnInit {

  @Output() closeModal = new EventEmitter<void>();
  @Input() message: string;
  @Input() type: string;
  alertState = '';
  constructor() { }

  ngOnInit(): void {
    this.alertState = this.type;
    setTimeout(() => {
    this.closeModal.emit();
   }, 3000);
  }

}
