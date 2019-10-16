import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ThemeService } from "src/app/services/theme.service";

@Component({
  selector: "app-chat-header",
  templateUrl: "./chat-header.component.html",
  styleUrls: ["./chat-header.component.css"]
})
export class ChatHeaderComponent implements AfterViewInit {
  bankName: string;
  bankColor: string;
  bankDpUrl: string;
  ngAfterViewInit(): void {
    this.themes.GetTheme("usbank").subscribe(theme => {
      this.bankName = theme.bank.name;
      this.bankColor = theme.bank.color;
      this.bankDpUrl = theme.bank.dpUrl;
    });
  }
  constructor(private themes: ThemeService) {}
}
