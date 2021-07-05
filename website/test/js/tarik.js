let ctr = 0;
const cfg = {};
const lifecycle = {};

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

export const config = (c) => {
  Object.assign(cfg, c);
}

export async function test(name, callback) {
  if ('containing' in cfg && !name.includes(cfg.containing)) return;
  
  const id = `chai-iframe-${ctr + 1}`;

  fetch(window.location.href)
    .then(response => response.text())
    .then(doc => {
      if ('removeScript' in lifecycle) { 
        // TODO: stub 
      }
      if ('replaceScript' in lifecycle) {
        doc = doc.replaceAll(lifecycle.replaceScript.oldScript, lifecycle.replaceScript.newScript);
      }

      let iframe = document.createElement("IFRAME");
      iframe.id = id;
      iframe.src = window.location.href;
      iframe.setAttribute('style', `position: fixed; top: 0; left: 0; opacity: ${cfg.visible ? '1' : '0'}; pointer-events: ${cfg.interactable ? 'unset' : 'none'}; height: 100vh; width: 100vw; border: none; padding: 0; margin: 0`);
      
      let T = {
        checks: [],
        navigates: []
      }
      
      T.expect = (thing) => {
        if (typeof thing === 'string') {
          return {
            toEqual: (mustEqual) => {
              T.checks.push({
                evaluate: () => p(thing === mustEqual),
                reason: () => `Wanted '${thing}' to equal '${mustEqual}'`
              })
            },
            toNotEqual: (mustNotEqual) => {
              T.checks.push({
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
                  evaluate: () => p(t),
                  reason: () => `Could not find element with selector '${thing.selector}'`
                })
              },
              toNotExist: () => {
                let t = thing.getIn(T.document) === null;

                T.checks.push({
                  evaluate: () => p(t),
                  reason: () => `Found element with selector '${thing.selector}', expected null`
                })
              },
              toHaveAttribute: (attr) => {
                let t = thing.getIn(T.document) !== null && thing.getIn(T.document).getAttribute(attr) !== null;

                T.checks.push({
                  evaluate: () => p(t),
                  reason: () => thing.getIn(T.document) === null ? `Could not find element with selector '${thing.selector}'` : `Found element with selector '${thing.selector}' but it did not have attribute '${attr}'`
                })
              },
              toHaveAttributeWithValue: (attr, equals) => {
                let t = thing.getIn(T.document) !== null && thing.getIn(T.document).getAttribute(attr) === equals

                T.checks.push({
                  evaluate: () => p(t),
                  reason: () => thing.getIn(T.document) === null ? `Could not find element with selector '${thing.selector}'` : thing.getIn(T.document).getAttribute(attr) === null ? `Found element with selector '${thing.selector}' but it did not have attribute '${attr}'` : `Found element with selector '${thing.selector}', it had attribute '${attr}' but it did not have value '${equals}'`
                })
              },
              toNotHaveAttribute: (attr) => {
                let t = thing.getIn(T.document) !== null && thing.getIn(T.document).getAttribute(attr) === null;

                T.checks.push({
                  evaluate: () => p(t),
                  reason: () => thing.getIn(T.document) === null ? `Could not find element with selector '${thing.selector}'` : `Found element with selector '${thing.selector}' but it had attribute '${attr}', expected null`
                })
              },
              toContainExactly: (text) => {
                // TODO: what if text var is not string but is inner child?
                let t = thing.getIn(T.document) !== null && thing.getIn(T.document).textContent === text;

                T.checks.push({
                  evaluate: () => p(t),
                  reason: () => thing.getIn(T.document) === null ? `Could not find element with selector '${thing.selector}'` : `Found element with selector '${thing.selector}' but it had text '${thing.getIn(T.document).textContent}'; wanted '${text}'`
                })
              }
            }
          }
        } else if (typeof thing === 'undefined') {
          return {
            toNavigateTo(url) {
              // TODO: good god

              let absUrl = getAbsoluteUrl(url);

              T.checks.push({
                evaluate: () => {
                  return new Promise((resolve, reject) => {
                    setTimeout(() => resolve(T.navigates.findIndex(el => el.potential === absUrl && el.potential === T.window.location.href) >= 0), 'timeout' in cfg ? cfg.timeout : 2000);
                  })              
                },
                reason: () => T.window.location.href === url ? `Timed out after ${'timeout' in cfg ? cfg.timeout : 2000}ms` : `Nothing tried to navigate to '${url}', expected some event`
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
              }
            }
          }
        }
      }

      iframe.addEventListener('load', () => {
        setTimeout(() => {
          T.document =  iframe.contentDocument || iframe.contentWindow?.document;
          T.window = iframe.contentWindow;

          callback(T);

          let fail = false;
          let failingAssertions = "";
          let numFails = 0;
          let numPasses = 0;
          let promises = []
          T.checks.forEach(check => {
            promises.push(
              check.evaluate()
                .then(pass => {
                  if (!pass) {
                    failingAssertions += "\t" + `FAIL: ${check.reason()}` + "\n"
                    fail = true;
                    numFails++;
                  } else numPasses++;
                })
            )
          })

          Promise.all(promises)
            .then(() => {
              console.info(`Running test: ${name}`);
              if (fail) {
                console.error(`Test: '${name}' FAILED ${numFails}/${numFails+numPasses} assertion${(numFails+numPasses) > 1 ? 's' : ''}`)
                console.warn(failingAssertions)
              } else console.log(`%cTest: '${name}' PASSED`, 'color: green')
            }).then(() => {
              if (!cfg.freezeAfterTest) document.body.removeChild(iframe);
            })
        }, 'loadTime' in cfg ? cfg.loadTime : 2000);
      }, { once: true })

      document.body.appendChild(iframe);
      iframe.contentDocument.open();
      iframe.contentDocument.write(doc);
      iframe.contentDocument.close();

      // TODO: figure out how to do this later
      // if ('useScript' in lifecycle) {
      //   console.log("hi")
      //   let s = document.createElement('SCRIPT');
      //   s.src = lifecycle.useScript;

      //   T.document.body.appendChild(s);
      // }
    })
}