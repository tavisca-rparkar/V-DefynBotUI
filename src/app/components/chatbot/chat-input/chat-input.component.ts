import { Component, AfterViewInit, OnInit } from "@angular/core";
import { AppService } from "src/app/services/app.service";
import { Meta } from "@angular/platform-browser";
import { ComponentFactoryService } from "src/app/services/ComponentFactory.service";

@Component({
  selector: "app-chat-input",
  templateUrl: "./chat-input.component.html",
  styleUrls: ["./chat-input.component.css"]
})
export class ChatInputComponent implements OnInit {
  _userInput: string = "";
  voiceButtonIcon: string = "voice-inactive";
  isListening = false;

  constructor(
    private _appService: AppService,
    private meta: Meta,
    private _componentFactoryService: ComponentFactoryService
  ) {
    this.meta.addTag({
      name: "viewport",
      content: "width=device-width, initial-scale=1.0"
    });
  }

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
    this._componentFactoryService.updateScroll();
  }

  changeVoiceButtonIconTo(type: string) {
    switch (type) {
      case "inactive":
        this.voiceButtonIcon = "voice-inactive";
        break;
      case "active":
        this.voiceButtonIcon = "voice-active";
        break;
      case "disabled":
        this.voiceButtonIcon = "voice-disabled";
        break;
    }
  }

  // listenCheck(){
  //   if(!!window.chrome){
  //     navigator.permissions.query({name:'microphone'}).then((result) => {
  //       if (result.state == 'granted') {
  //         this.listen();
  //       } else if (result.state == 'prompt') {
  //         this.listen();
  //       } else {
  //         alert("mic permission not granted!");
  //       }
  //      });
  //   }
  // }

  listen() {
    if (this.isListening == false) {
      this.changeVoiceButtonIconTo("active");
      this.isListening = true;
      try {
        let recognition = new ((window as any).SpeechRecognition ||
          (window as any).webkitSpeechRecognition ||
          (window as any).mozSpeechRecognition ||
          (window as any).msSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 2;
        recognition.start();
        this.playStartSound();

        recognition.addEventListener("result", e => {
          const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join("");
          if (this.isListening == true) {
            this._userInput = transcript;
          }

          if (e.results[0].isFinal && this.isListening == true) {
            this._userInput = transcript;
            this.SendUserInput();
          }
        });

        recognition.addEventListener("end", e => {
          if (this.isListening == true) {
            this.playStopSound();
            this.changeVoiceButtonIconTo("inactive");
            this.isListening = false;
          }
        });
      } catch (err) {
        alert("Your browser Doesn't Support Voice Input!");
        this.changeVoiceButtonIconTo("disabled");
        this.isListening = false;
      }
    } else {
      this.changeVoiceButtonIconTo("inactive");
      this.isListening = false;
      this.playStopSound();
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
