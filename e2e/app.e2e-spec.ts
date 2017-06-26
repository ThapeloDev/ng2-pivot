import { PivotDemoPage } from './app.po';

describe('pivot-demo App', () => {
  let page: PivotDemoPage;

  beforeEach(() => {
    page = new PivotDemoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
