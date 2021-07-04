let ctr = 0;

export class TElement {
  constructor() {
    this.selector = "";
    this.advanced = false;
    this.advancedFinder = {}
  }

  getIn(document) {
    if (this.selector == "") this.selector = "*";

    if (this.advanced) {
      let selected = null;

      Array.from(document.querySelectorAll(this.selector)).every(el => {
        if ('textContent' in this.advancedFinder && el.textContent.trim() === this.advancedFinder.textContent) {
          selected = el;
          return false;
        }
        
        if ('textContentContains' in this.advancedFinder && el.textContent.trim().includes(this.advancedFinder.textContentContains)) {
          selected = el;
          return false;
        }

        return true;
      })

      return selected;
    } else {
      return document.querySelector(this.selector);
    }
  }

  ofTag(tag) {
    this.selector = tag + this.selector

    return this;
  }

  withId(id) {
    this.selector += `#${id}`

    return this;
  }

  withClass(className) {
    this.selector += `.${className}`

    return this;
  }

  withClasses(classes) {
    classes.forEach(className => this.withClass(className))

    return this;
  }

  withAttribute(attr) {
    this.selector += `[${attr}]`

    return this;
  }

  withAttributeEquals(attr, equals) {
    this.selector += `[${attr}="${equals}"]`

    return this;
  }

  withText(text) {
    this.advanced = true;    
    this.advancedFinder.textContentContains = text;

    return this;
  }

  withExactText(text) {
    this.advanced = true;    
    this.advancedFinder.textContent = text;

    return this;
  }

  withSelector(selector) {
    this.selector = selector;

    return this;
  }

  static ofTag(tag) {
    let t = new TElement();
    t.ofTag(tag);

    return t;
  }

  static withId(id) {
    let t = new TElement();
    t.withId(id);

    return t;
  }

  static withClass(className) {
    let t = new TElement();
    t.withClass(className);

    return t;
  }

  static withClasses(classes) {
    let t = new TElement();
    t.withClasses(classes);

    return t;
  }

  static withAttribute(attr) {
    let t = new TElement();
    t.withAttribute(attr);

    return t;
  }

  static withAttributeEquals(attr, equals) {
    let t = new TElement();
    t.withAttributeEquals(attr, equals);

    return t;
  }

  static withText(text) {
    let t = new TElement();
    t.withText(text);

    return t;
  }

  static withExactText(text) {
    let t = new TElement();
    t.withExactText(text);

    return t;
  }

  static withSelector(selector) {
    let t = new TElement();
    t.withSelector(selector);

    return t;
  }
}

const getAbsoluteUrl = (url) => {
  let a = document.createElement("A");
  a.href = url;
  return a.href;
} 

export async function test(name, callback) {
  const id = `chai-iframe-${ctr + 1}`;

  let iframe = document.createElement("IFRAME");
  iframe.id = id;
  iframe.src = '.';
  iframe.setAttribute('style', 'position: fixed; top: 0; left: 0; opacity: 0; pointer-events: none; height: 100vh; width: 100vw; border: none; padding: 0; margin: 0');
  
  let T = {
    checks: [],
    navigates: []
  }
   
  T.expect = (thing) => {
    if (typeof thing === 'string') {
      return {
        toEqual: (mustEqual) => {
          T.checks.push({
            evaluate: () => thing === mustEqual,
            reason: () => `Wanted '${thing}' to equal '${mustEqual}'`
          })
        },
        toNotEqual: (mustNotEqual) => {
          T.checks.push({
            evaluate: () => thing !== mustNotEqual,
            reason: () => `Wanted '${thing}' not to equal '${mustNotEqual}'`
          })
        }
      }
    } else if (typeof thing === 'object') {
      if (thing instanceof TElement) {
        return {
          toExist: () => {
            T.checks.push({
              evaluate: () => thing.getIn(T.document) !== null,
              reason: () => `Could not find element with selector '${thing.selector}'`
            })
          },
          toNotExist: () => {
            T.checks.push({
              evaluate: () => thing.getIn(T.document) === null,
              reason: () => `Found element with selector '${thing.selector}', expected null`
            })
          },
          toContainExactly: (text) => {
            // TODO: what if text var is not string but is inner child?
            
            T.checks.push({
              evaluate: () => thing.getIn(T.document) !== null && thing.getIn(T.document).textContent === text,
              reason: () => thing.getIn(T.document) === null ? `Could not find element with selector '${thing.selector}'` : `Found element with selector '${thing.selector}' but it had text '${thing.getIn(T.document).textContent}'; wanted '${text}'`
            })
          }
        }
      }
    } else if (typeof thing === 'undefined') {
      return {
        toNavigateTo(url) {
          T.checks.push({
            evaluate: () => T.navigates.includes(getAbsoluteUrl(url)),
            reason: () => `Nothing tried to navigate to '${url}', expected some event`
          })
        }
      }
    }
  }

  T.get = (thing) => {
    if (typeof thing === 'object') {
      if (thing instanceof TElement) {
        return {
          click: () => {
            // TODO: this sucks!

            let el = thing.getIn(T.document);
            
            T.navigates.push(el.href);
          }
        }
      }
    }
  }

  iframe.addEventListener('load', () => {
    T.document =  iframe.contentDocument || iframe.contentWindow?.document;

    // T.document.querySelectorAll("*, *:before, *:after").forEach(el => {
    //   el.addEventListener('tarikClick', () => {
    //     el.dispatchEvent(new Event('click'))
    //   })
    // })

    console.info(`Running test: ${name}`);
    callback(T);
    document.body.removeChild(iframe);

    let fail = false;
    let failingAssertions = "";
    let numFails = 0;
    let numPasses = 0;
    T.checks.forEach(check => {
      if (!check.evaluate()) {
        failingAssertions += "\t" + `FAIL: ${check.reason()}` + "\n"
        fail = true;
        numFails++;
      } else numPasses++;
    })

    if (fail) {
      console.error(`Test: '${name}' FAILED ${numFails}/${numFails+numPasses} test${numFails > 1 ? 's' : ''}`)
      console.warn(failingAssertions)
    } else console.log(`%cTest: '${name}' PASSED`, 'color: green')
  })

  document.body.appendChild(iframe);
}