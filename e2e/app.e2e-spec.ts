import { GrayscaleOnePagePage } from './app.po';

describe('grayscale-one-page App', () => {
  let page: GrayscaleOnePagePage;

  beforeEach(() => {
    page = new GrayscaleOnePagePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
