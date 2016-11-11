import { A2djangotodosFrontendPage } from './app.po';

describe('a2djangotodos-frontend App', function() {
  let page: A2djangotodosFrontendPage;

  beforeEach(() => {
    page = new A2djangotodosFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
