import { test, TElement } from './tarik.js';

export const run = () => {
  test('should have h1 with text Services', (T) => {    
    T.expect(TElement.ofTag("h1")).toExist();
    T.expect(TElement.ofTag("h1").withClass("madeup")).toNotExist();
    T.expect(TElement.ofTag("h1")).toContainExactly("Services");
  });

  test('clicking on auth should navigate to calculator' ,(T) => {
    T.get(TElement.ofTag("a").withText("Authentication")).click()

    T.expect().toNavigateTo('/calculator?service=auth');
  });
}