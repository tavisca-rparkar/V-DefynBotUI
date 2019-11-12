import { AppPage } from './app.po';
import { element, browser, protractor } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  //browser.waitForAngularEnabled(false);

  beforeEach(() => {
    page = new AppPage();
    //browser.waitForAngularEnabled(false);
  });

  // it('should Check the title', () => {
  //   page.navigateTo();
  //   expect(page.getTitleText()).toEqual('US Bank');
  // });
  
  // it('Check default message', () => {
  //   page.navigateTo();
  //   expect(page.getTextBubble()).not.toBe('');
  // });
  
  // it('should enter  text in textbox', () => {
  //   page.navigateTo();
  //   page.getTextBox().sendKeys("cgaksjcbasncjanclakmclaskcmakcnjccsancka");
    
    
  // });
  // it('should enter  text in textbox and click send', () => {
  //   page.navigateTo();
  //   browser.manage().window().setSize(1600,1000);
  //   page.getTextBox().sendKeys("cgaksjcbasncjanclakmclaskcmakcnjccsancka");
  //   //page.sendText().click();
    
  //   browser.actions().mouseMove(page.sendText()).click().perform();
    
    
  // });

  it('Happy Flow for table booking',()=>{
    page.navigateTo();
    browser.manage().window().setSize(375,667);
    var EC = protractor.ExpectedConditions;
    browser.wait(EC.presenceOf(page.getLauncher()),10000);
    
    browser.wait(EC.presenceOf(page.getBookATableButton()),10000);
    page.getBookATableButton().click();
    browser.wait(EC.presenceOf(page.getCorousal()), 10000);
    browser.actions().mouseMove(page.getCorousal()).click().perform();
    browser.wait(EC.presenceOf(page.getCard()), 10000);
    page.getCourousalAgain().click();
    browser.wait(EC.presenceOf(page.getLatestCorousal()), 10000);
    var slider=page.swipeLeft();
    browser.actions().dragAndDrop(
      slider,
      {x:1, y:0}
    ).perform();
    
    browser.actions().mouseMove(page.getLatestCorousalCard()).click().perform();
    browser.wait(EC.presenceOf(page.getLatestCard()), 10000);
    page.getLatestCard().click();
    page.getTextBox().sendKeys("today");
    page.sendText().click();
    page.getTextBox().sendKeys("9pm");
    page.sendText().click();
    page.getTextBox().sendKeys("2");
    page.sendText().click();
    browser.sleep(5000);
    browser.wait(EC.presenceOf(page.getCancelBookingButton()),10000);
    // page.getCancelBookingButton().click();
    
    
    
    //page.getProceedToPayButton().click();
    // browser.sleep(4000);
    // page.getCancelBookingButton().click();
});

  // it('flow for table booking with session expiry',()=>
  // { page.navigateTo();
  //   browser.manage().window().setSize(375,667);
  //   var EC = protractor.ExpectedConditions;
  //   browser.wait(EC.presenceOf(page.getBookATableButton()),10000);
  //   page.getBookATableButton().click();
  //   browser.wait(EC.presenceOf(page.getLatestCorousal()), 10000);
  //   browser.actions().mouseMove(page.getLatestCorousalCard()).click().perform();
  //   browser.wait(EC.presenceOf(page.getCard()), 10000);
  //   page.getCourousalAgain().click();
  //   browser.wait(EC.presenceOf(page.getLatestCorousal()), 10000);
  //   browser.actions().mouseMove(page.getLatestCorousalCard()).click().perform();
  //   browser.wait(EC.presenceOf(page.getLatestCard()), 10000);
  //   page.getLatestCard().click();
  //   page.getTextBox().sendKeys("today");
  //   page.sendText().click();
  //   page.getTextBox().sendKeys("9pm");
  //   page.sendText().click();
  //   page.getTextBox().sendKeys("8");
  //   page.sendText().click();
  //   browser.wait(EC.presenceOf(page.getCheckoutSummaryCard()),5000);
  //   browser.sleep(62000);
  //   expect(page.getLatestElement()).toEqual("")




  // });

  // it('should click Order food button',()=>{
  //   page.navigateTo();
  //   page.getOrderFoodButton().click();
    
  // });
});
