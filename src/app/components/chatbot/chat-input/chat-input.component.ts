import { Component, AfterViewInit, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";

@Component({
  selector: "app-chat-input",
  templateUrl: "./chat-input.component.html",
  styleUrls: ["./chat-input.component.css"]
})
export class ChatInputComponent implements OnInit {
  _userInput: string = "";
  textButtonIcon =
    "https://cdn1.imggmi.com/uploads/2019/11/2/e373919184a03e32a37bd139399e4117-full.png";
  voiceButtonIcon =
    "https://cdn1.imggmi.com/uploads/2019/11/2/6fe47f39d2b33fc65e8395917d264ec9-full.png";
  isListening = false;

  constructor(private _appService: AppService) {}

  ngOnInit(): void {
    try {
      var recognition = new ((window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition ||
        (window as any).mozSpeechRecognition ||
        (window as any).msSpeechRecognition)();
      recognition.lang = "en-US";
    } catch (err) {
      this.changeVoiceButtonIconTo("disabled");
      this.isListening = false;
    }
  }

  SendUserInput() {
    this._userInput = this._userInput.trim();
    if (this._userInput.length !== 0) {
      this._appService.ProcessInput(this._userInput);
    }
    this._userInput = "";
  }

  changeVoiceButtonIconTo(type: string) {
    switch (type) {
      case "inactive":
        this.voiceButtonIcon =
          "https://cdn1.imggmi.com/uploads/2019/11/2/6fe47f39d2b33fc65e8395917d264ec9-full.png";
        break;
      case "active":
        this.voiceButtonIcon =
          "https://cdn1.imggmi.com/uploads/2019/11/2/aabb7939d5cbe17d64b9a4866120c365-full.png";
        break;
      case "disabled":
        this.voiceButtonIcon =
          "https://cdn1.imggmi.com/uploads/2019/11/2/c49eb9eb0368c1f871f9c7a575757bcf-full.png";
        break;
    }
  }

  listen() {
    if (this.isListening == false) {
      this.changeVoiceButtonIconTo("active");
      this.isListening = true;
      try {
        var recognition = new ((window as any).SpeechRecognition ||
          (window as any).webkitSpeechRecognition ||
          (window as any).mozSpeechRecognition ||
          (window as any).msSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 2;
        recognition.start();
        console.log("Speech recognition service started!");
        this.playStartSound();

        recognition.addEventListener("result", e => {
          const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join("");
          this._userInput = transcript;

          if (e.results[0].isFinal) {
            this._userInput = transcript;
          }
          console.log(transcript);
        });

        recognition.addEventListener("end", e => {
          console.log("Speech recognition service stopped");
          this.listen();
          this.playStopSound();
        });
      } catch (err) {
        alert("Your browser Doesn't Support Voice Input!");
        this.changeVoiceButtonIconTo("disabled");
        this.isListening = false;
      }
    } else {
      //alert("listening stopped! ");
      this.changeVoiceButtonIconTo("inactive");
      this.isListening = false;
    }
  }

  playStartSound() {
    let x = new Audio();
    x.src = "../../../../assets/media/Robot_blip-Marianne_Gagnon-120342607.mp3";
    x.load();
    x.play();
  }
  playStopSound() {
    let x = new Audio();
    x.src =
      "../../../../assets/media/Computer Error-SoundBible.com-1655839472.mp3";
    x.load();
    x.play();
  }
}
