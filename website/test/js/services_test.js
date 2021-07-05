import { config, test, TElement } from './tarik.js';

// config({
//   visible: true,
//   interactable: true,
//   freezeAfterTest: true,
//   containing: 'auth',
//   timeout: 1000,
//   loadTime: 2000,
//   fnTimeout: 500
// })

export const run = (cfg) => {
  config(cfg)

  test('should have h1 with text Services', async (T) => {
    T.expect(TElement.ofTag('h1')).toExist();
    T.expect(TElement.ofTag('h1').withClass('madeup')).toNotExist();
    T.expect(TElement.ofTag('h1')).toContainExactly('Services');
  });

  test('clicking on auth should navigate to calculator', async (T) => {
    T.get(TElement.ofTag('a').withText('Authentication')).click();

    T.expect().toNavigateTo('/calculator/?service=auth');
  });

  test('clicking on more button should open details', async (T) => {
    T.expect(TElement.ofTag('details').withAttributeEquals('data-service', 'auth')).toNotHaveAttribute('open');

    T.get(TElement.ofTag('span').withClass('show-details')).click()

    T.expect(TElement.ofTag('details').withAttributeEquals('data-service', 'auth')).toHaveAttribute('open');
  })
}