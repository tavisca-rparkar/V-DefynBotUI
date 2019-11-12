import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {

    return element.all(by.css('app-root app-chatbot div app-header div div')).get(1).getText() as Promise<string>;
  }
  getTextBox(){
    return element(by.css('app-chat-input div input'));
  }
  sendText(){
    return element.all(by.css('app-chat-input div button')).last();
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
    return element.all(by.css('app-text-bubble')).last().element(by.css('div p')).getText();
  }
  getCorousal(){
    return element(by.css("app-carousel"));
  }
  getRestaurantSlide()
  {
    return this.getCorousal().element(by.css(".carousel-container .slide .slide-card"));
  }
  getCard(){
    return element(by.className('proceed-button'));
  }
  getCourousalAgain(){
    return element(by.buttonText('Browse more restaurants'));
  }
  getLatestCorousal()
  {
    return element.all(by.css('app-carousel')).last();
  }
  getLatestCorousalCard()
  {
    return this.getLatestCorousal().all(by.className('slide-card')).get(0);
  }
  getLatestCard()
  { debugger;
     return element.all(by.className('proceed-button')).last();
  }
  getBrowserStop(){
    return element(by.buttonText('NO button present'));
  }
  swipeRight(){
    return  this.getLatestCorousal().element(by.className('slide'));
   
  }
  getDummyButton()
  {
    return element(by.css('dummy-button'));
   
  }
  swipeLeft(){
    return  this.getLatestCorousal().element(by.className('slide'));
  }
  getProceedToPayButton()
  {
    return element.all(by.className('proceedToPay')).last();
  }
  getCancelBookingButton()
  { debugger;
    //console.log(element(by.className('cancel')))
    return element(by.buttonText('Cancel Booking'));
    
  }
  getCheckoutSummaryCard()
  {
    return element(by.css('app-bookingcheckoutcard'));
  }
  getLauncher()
  {
    return element(by.css('app-launcher'));
  }
  getEnvironmentDropdown()
  {
    return element(by.id("environment-dropdown"));
  }
  selectEnvironment()
  {
    return this.getEnvironmentDropdown().element(by.css("option[value='development']"));
  }
  getClientDropdown()
  {
    return element(by.id("client-dropdown"));
  }
  selectClient()
  {
    return this.getClientDropdown().element(by.css('option[value="American Express"]'));
  }
  getLanguageDropdown()
  {
    return element(by.id("language-dropdown"));
  }
  selectLanguage()
  {
    return this.getLanguageDropdown().element(by.css('option[value="en-us"]'));
  }
  getUsernameTextBox()
  {
    return element(by.id("username-input"));
  }
  getUserIdTextBox()
  {
    return element(by.id("userId-input"));
  }
  getPointBalanceTextBox()
  {
    return element(by.id("pointBalance-input"));
  }
  getLaunchButton()
  {
    return element(by.id("launch-button"));
  }
  getChatbot()
  {
    return element(by.css("app-chatbot"));
  }
  

}

