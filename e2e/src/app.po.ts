import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {

    return element(by.css('app-header div.header h1')).getText() as Promise<string>;
  }
  getTextBox(){
    return element(by.css('app-chat-input div input'));
  }
  sendText(){
    return element(by.css('app-chat-input div button'));
  }
  getTextBubble(){
    return element(by.css('app-chat-body app-text-bubble div p')).getText() as Promise<string>;
  }
  getBookATableButton(){
    return element(by.buttonText('Book a Table'));
  }
  getOrderFoodButton(){
    return element.all(by.buttonText('Order Food'));
  }
  getLatestElement(){
    return element.all(by.css('app-chat-body app-text-bubble div p')).last();
  }
}
