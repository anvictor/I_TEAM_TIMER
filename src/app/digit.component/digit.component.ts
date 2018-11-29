import {Input, Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessageService} from "../message.service";

@Component({
  selector: 'app-digit',
  templateUrl: './digit.component.html',
  styleUrls: ['./digit.component.css']
})
export class DigitComponent implements OnDestroy{
  arr = [];
  subscription: Subscription;
  @Input() arr = [];

  constructor(private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(arr => { this.arr = arr; });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
