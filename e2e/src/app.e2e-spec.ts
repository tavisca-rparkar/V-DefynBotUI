import { AppPage } from './app.po';
import { element, browser, protractor } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should Check the title', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('US Bank');
  });
  
  it('Check default message', () => {
    page.navigateTo();
    expect(page.getTextBubble()).not.toBe('');
  });
  
  it('should enter  text in textbox', () => {
    page.navigateTo();
    page.getTextBox().sendKeys("cgaksjcbasncjanclakmclaskcmakcnjccsancka");
    
    
  });
  it('should enter  text in textbox and click send', () => {
    page.navigateTo();
    page.getTextBox().sendKeys("cgaksjcbasncjanclakmclaskcmakcnjccsancka");
    page.sendText().click();
    //expect(page.getTextBubble()).toEqual('cgaksjcbasncjanclakmclaskcmakcnjccsancka');
  });

  it('should click Book a table button',()=>{
    page.navigateTo();
    page.getBookATableButton().click();
    browser.pause();
    browser.pause();
      //expect(page.getLatestElement().getText()).toEqual('In which city are you looking for restaurants?'||'can you tell me in which city do you plan to look for restaurants?');
      var val =page.getLatestElement().getText();
      val.then(v=>
      expect(['In which city are you looking for restaurants?','can you tell me in which city do you plan to look for restaurants?']).toContain(v)
      );
      var EC = protractor.ExpectedConditions;
      page.getTextBox().sendKeys("pune");
      page.sendText().click();
      //browser.wait(EC.presenceOf(page.getCorousal()), 10000);
      page.getCorousal().click();
      browser.wait(EC.presenceOf(page.getCard()), 10000);
      page.getCard().click();
      page.getCourousalAgain().click();
      browser.wait(EC.presenceOf(page.getBrowserStop()), 20000);
      
  });

  it('should click Order food button',()=>{
    page.navigateTo();
    page.getOrderFoodButton().click();
    
  });
});
