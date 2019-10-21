import { Component} from "@angular/core";
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: "app-chat-input",
  templateUrl: "./chat-input.component.html",
  styleUrls: ["./chat-input.component.css"]
})
export class ChatInputComponent {
  private _userInput: string = "";

  constructor(
    private _appService : AppService
  ) {}

  SendUserInput() {
    if (this._userInput.length !== 0) {
      this._appService.ProcessInput(this._userInput);
    }
    this._userInput = "";
  }
}
