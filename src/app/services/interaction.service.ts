// Inter Component Interaction Service !

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  private _buttonInteractionSource = new Subject<string>();
  buttonInteraction$ =this._buttonInteractionSource.asObservable();

  private _chatBodyInteractionSource = new Subject<string>();
  chatBodyInteraction$ =this._chatBodyInteractionSource.asObservable();

  constructor() { }

  sendButtonMessage(message:string){
    this._buttonInteractionSource.next(message);
  }

  sendChatBodyMessage(message:string){
    this._chatBodyInteractionSource.next(message);
  }
}
