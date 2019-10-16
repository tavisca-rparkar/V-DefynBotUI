import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ThemeService } from "src/app/services/theme.service";

@Component({
  selector: "app-chat-header",
  templateUrl: "./chat-header.component.html",
  styleUrls: ["./chat-header.component.css"]
})
export class ChatHeaderComponent implements AfterViewInit {
  bankTheme: JSON;
  name: string;
  ngAfterViewInit(): void {
    this.themes.GetTheme().subscribe(theme => (this.bankTheme = theme));
    console.log(this.bankTheme.banks.bankName);
    //this.name = this.bankTheme.banks.bankName;
  }
  constructor(private themes: ThemeService) {}
}
