let ctr = 0;
const cfg = {};
const lifecycle = {};
const mockFns = [];

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

  // TODO: throw error on multiple tags
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

const p = (r) => {
  return new Promise((re) => re(r));
}

export const useScript = (path) => {
  lifecycle.useScript = path;
}

export const replaceScript = (oldScript, newScript) => {
  lifecycle.replaceScript = {
    oldScript,
    newScript
  }
}

export const removeScript = () => {
  // TODO: stub
}

window.addEventListener('message', (e) => {
  mockFns.push(e.data)

  setTimeout(() => {
    let i = mockFns.findIndex(el => el === e.data)

    mockFns.splice(i, 1);
  }, 'fnTimeout' in cfg ? cfg.fnTimeout : 2000)
}, false);

export const config = (c) => {
  Object.assign(cfg, c);
}

export async function test(name, callback) {
  if ('containing' in cfg && !name.includes(cfg.containing)) return;
  
  const id = `chai-iframe-${ctr + 1}`;

  fetch(window.location.href)
    .then(response => response.text())
    .then(doc => {
      doc = doc.replaceAll('</head>', `
      <script>
        const mock = (fn, data) => {
          window.parent.postMessage(JSON.parse(JSON.stringify({
            id: window.frameElement.id,
            fn: fn.name,
            data
          })), "*");
        }
      </script>
      </head>
      `)
      doc = doc.replaceAll('</script>', `
      </script>
      <script>
        window.addEventListener('load', () => {
          Object.keys(window).forEach(fn => {
            if (typeof window[fn] === 'function') {
              const oldFn = window[fn];

              window[fn] = function() {
                mock(oldFn, Object.values(arguments));
                return oldFn.apply(this, arguments);
              }
            }
          })
        });
      </script>
      `)
      if ('removeScript' in lifecycle) { 
        // TODO: stub 
      }
      if ('useScript' in lifecycle) { 
        // TODO: stub 
      }
      if ('replaceScript' in lifecycle) {
        doc = doc.replaceAll(lifecycle.replaceScript.oldScript, lifecycle.replaceScript.newScript);
      }

      let T = {
        id,
        cfg: { ...cfg },
        checks: [],
        navigates: []
      }

      T.config = (cfg) => {
        return Object.assign(T.cfg, cfg);
      }

      let iframe = document.createElement("IFRAME");
      iframe.id = id;
      iframe.src = window.location.href;
      iframe.setAttribute('style', `position: fixed; top: 0; left: 0; opacity: ${T.cfg.visible ? '1' : '0'}; pointer-events: ${T.cfg.interactable ? 'unset' : 'none'}; height: 100vh; width: 100vw; border: none; padding: 0; margin: 0`);

      T.wait = (timeout) => {
        return new Promise((resolve, reject) => setTimeout(() => resolve(T), timeout))
      }
      
      T.expect = (thing) => {
        if (typeof thing === 'string') {
          return {
            toEqual: (mustEqual) => {
              T.checks.push({
                name: `expect '${thing}' to equal '${mustEqual}'`,
                evaluate: () => p(thing === mustEqual),
                reason: () => `Wanted '${thing}' to equal '${mustEqual}'`
              })
            },
            toNotEqual: (mustNotEqual) => {
              T.checks.push({
                name: `expect '${thing}' to not equal '${mustEqual}'`,
                evaluate: () => p(thing !== mustNotEqual),
                reason: () => `Wanted '${thing}' not to equal '${mustNotEqual}'`
              })
            }
          }
        } else if (typeof thing === 'object') {
          if (thing instanceof TElement) {
            return {
              toExist: () => {
                let t = thing.getIn(T.document) !== null;

                T.checks.push({
                  name: `expect element with selector '${thing.selector}' to exist`,
                  evaluate: () => p(t),
                  reason: () => `Could not find element with selector '${thing.selector}'`
                })
              },
              toNotExist: () => {
                let t = thing.getIn(T.document) === null;

                T.checks.push({
                  name: `expect element with selector '${thing.selector}' to not exist`,
                  evaluate: () => p(t),
                  reason: () => `Found element with selector '${thing.selector}', expected null`
                })
              },
              toHaveAttribute: (attr) => {
                let t = thing.getIn(T.document) !== null && thing.getIn(T.document).getAttribute(attr) !== null;

                T.checks.push({
                  name: `expect element with selector '${thing.selector}' to have attribute '${attr}'`,
                  evaluate: () => p(t),
                  reason: () => thing.getIn(T.document) === null ? `Could not find element with selector '${thing.selector}'` : `Found element with selector '${thing.selector}' but it did not have attribute '${attr}'`
                })
              },
              toHaveAttributeWithValue: (attr, equals) => {
                let t = thing.getIn(T.document) !== null && thing.getIn(T.document).getAttribute(attr) === equals

                T.checks.push({
                  name: `expect element with selector '${thing.selector}' to have attribute '${attr}' with value '${equals}'`,
                  evaluate: () => p(t),
                  reason: () => thing.getIn(T.document) === null ? `Could not find element with selector '${thing.selector}'` : thing.getIn(T.document).getAttribute(attr) === null ? `Found element with selector '${thing.selector}' but it did not have attribute '${attr}'` : `Found element with selector '${thing.selector}', it had attribute '${attr}' but it did not have value '${equals}'`
                })
              },
              toNotHaveAttribute: (attr) => {
                let t = thing.getIn(T.document) !== null && thing.getIn(T.document).getAttribute(attr) === null;

                T.checks.push({
                  name: `expect element with selector '${thing.selector}' to not have attribute '${attr}'`,
                  evaluate: () => p(t),
                  reason: () => thing.getIn(T.document) === null ? `Could not find element with selector '${thing.selector}'` : `Found element with selector '${thing.selector}' but it had attribute '${attr}', expected null`
                })
              },
              toContainExactly: (text) => {
                // TODO: what if text var is not string but is inner child?
                let t = thing.getIn(T.document) !== null && thing.getIn(T.document).textContent === text;

                T.checks.push({
                  name: `expect element with selector '${thing.selector}' to contain exactly '${text}'`,
                  evaluate: () => p(t),
                  reason: () => thing.getIn(T.document) === null ? `Could not find element with selector '${thing.selector}'` : `Found element with selector '${thing.selector}' but it had text '${thing.getIn(T.document).textContent}'; wanted '${text}'`
                })
              }
            }
          }
        } else if (typeof thing === 'boolean') {
          return {
            toBeTrue: () => {
              T.checks.push({
                name: `expect '${thing}' to be true`,
                evaluate: () => p(thing),
                reason: () => `Expected ${thing} to be true, got ${thing}`
              })              
            },
            toNotBeTrue: () => {
              T.checks.push({
                name: `expect '${thing}' to not be true`,
                evaluate: () => p(!thing),
                reason: () => `Expected ${thing} to not be true, got ${thing}`
              })              
            },
            toBeFalse: () => {
              T.checks.push({
                name: `expect '${thing}' to be false`,
                evaluate: () => p(thing === false),
                reason: () => `Expected ${thing} to be false, got ${thing}`
              })              
            },
          }
        } else if (typeof thing === 'undefined') {
          return {
            toNavigateTo: (url) => {
              // TODO: good god 
              // TODO: doesn't work for things not pushed to navigates - e.g. changes to window.location.href

              let absUrl = getAbsoluteUrl(url);

              T.checks.push({
                name: `expect to navigate to '${absUrl}'`,
                evaluate: () => {
                  return new Promise((resolve, reject) => {
                    setTimeout(() => resolve(T.navigates.findIndex(el => el.potential === absUrl && el.potential === T.window.location.href) >= 0), 'timeout' in T.cfg ? T.cfg.urlTimeout : 2000);
                  })              
                },
                reason: () => T.window.location.href === url ? `Timed out after ${'timeout' in T.cfg ? T.cfg.urlTimeout : 2000}ms` : `Did not navigate to '${url}', expected to`
              })
            },
            toCallFunction: (fn) => {
              // passing in fn.name, technically
              let t = mockFns.findIndex(el => el.id === T.id && el.fn === fn) >= 0;

              T.checks.push({
                name: `expect to call function '${fn}'`,
                evaluate: () => p(t),
                reason: () => `Function ${fn} wasn't called, expected it to be called`
              })
            },
            toCallFunctionWithParams: (fn, ...params) => {
              // passing in fn.name, technically
              let t = mockFns.find(el => el.id === T.id && el.fn === fn && JSON.stringify(el.data.sort()) === JSON.stringify(params.sort()));

              let u = mockFns.find(el => el.id === T.id && el.fn === fn);

              T.checks.push({
                name: `expect to call function '${fn}' with params '${JSON.stringify(params)}'`,
                evaluate: () => p(typeof t !== 'undefined'),
                reason: () => (u && typeof t === 'undefined') ? `Function ${fn} was called but with incorrect params, got ${JSON.stringify(u.data)} but wanted ${JSON.stringify(params)}` : `Function ${fn} wasn't called, expected it to be called`
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
                
                let old = T.window.location.href;
                thing.getIn(T.document).click();

                T.navigates.push({
                  old,
                  potential: el.href // add some || in here?
                })
              },
              getAttribute: (attr) => {
                let el = thing.getIn(T.document);
                
                return el.getAttribute(attr);
              }
            }
          }
        }
      }

      iframe.addEventListener('load', () => {
        setTimeout(async () => {
          T.document =  iframe.contentDocument || iframe.contentWindow.document;
          T.window = iframe.contentWindow;

          await callback(T);

          let fail = false;
          let failingAssertions = [];
          let passingAssertions = [];
          let numFails = 0;
          let numPasses = 0;
          let promises = []
          T.checks.forEach(check => {
            promises.push(
              check.evaluate()
                .then(pass => {
                  if (!pass) {
                    failingAssertions.push(check.reason());
                    fail = true;
                    numFails++;
                  } else {
                    passingAssertions.push(check.name);
                    numPasses++;
                  }
                })
            )
          })

          Promise.all(promises)
            .then(() => {
              console.info('%c\n\nRUNNING:' + `%c\n${name}`, 'font-weight: bold; font-size: 1.05rem;', 'font-size: unset;');
              if (fail) {
                console.error('%cFAILED:', 'font-weight: bold; color: white; background: red;', `'${name}' failed ${numFails}/${numFails+numPasses} assertion${(numFails+numPasses) > 1 ? 's' : ''}`)

                failingAssertions.forEach(fa => console.log('%c\tFAIL:', 'font-weight: bold; color: red;', fa))
              } else console.log('%cPASSED:' + `%c '${name}' passed`, 'font-weight: bold; color: white; background: darkgreen;', 'color: lightgreen;')

              if (T.cfg.showPassingAssertions) passingAssertions.forEach(pa => console.log('%c\tPASS:' + `%c\n\t${pa}`, 'font-weight: bold; color: lightgreen;', 'color: white;'))
            }).then(() => {
              if (!T.cfg.freezeAfterTest) document.body.removeChild(iframe);
            })
        }, 'loadTime' in T.cfg ? T.cfg.loadTime : 2000);
      }, { once: true })

      document.body.appendChild(iframe);
      iframe.contentDocument.open();
      iframe.contentDocument.write(doc);
      iframe.contentDocument.close();
    })
}