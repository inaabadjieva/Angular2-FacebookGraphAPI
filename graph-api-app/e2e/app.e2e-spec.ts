import { GraphApiAppPage } from './app.po';

describe('graph-api-app App', () => {
  let page: GraphApiAppPage;

  beforeEach(() => {
    page = new GraphApiAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
