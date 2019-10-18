import { AppPage } from './app.po';

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


});
