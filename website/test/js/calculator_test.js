import { config, replaceScript, TElement, test } from './tarik.js';

export const run = (cfg) => {
  config(cfg)

  replaceScript('../js/apicalls.js', '/test/js/mock_apicalls.js');

  if (new URLSearchParams(window.location.search).get('service') !== 'geo') {
    console.error(`Please run this test suite on test data! Expecting the geo service, got ${new URLSearchParams(window.location.search).get('service')} instead!`);
    return;
  }

  test('page should call getServiceFromSlug', (T) => {
    T.expect().toCallFunction('getServiceFromSlug');
  });

  test('should have h1 with service name', (T) => {
    T.expect(TElement.ofTag('h1')).toExist();
    T.expect(TElement.ofTag('h1')).toContainExactly("Geolocation") 
  });

  test('clicking on "back to service" should navigate to services', (T) => {
    T.get(TElement.ofTag('a').withText('Choose another service')).click();

    T.expect().toNavigateTo('/services/');
  });

  test('clicking on more button should open details', (T) => {
    T.expect(TElement.ofTag('details').withAttributeEquals('data-risk', 'pods-down')).toNotHaveAttribute('open');

    T.get(TElement.ofTag('span').withClass('show-details')).click()

    T.expect(TElement.ofTag('details').withAttributeEquals('data-risk', 'pods-down')).toHaveAttribute('open');
  })

  test('clicking on delete button in risk should call deleteRisk', (T) => {
    T.get(TElement.ofTag('button').withClass('delete-btn')).click()

    T.wait(200).then(() => T.expect().toCallFunction('deleteRisk'));
  });
}