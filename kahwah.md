# Kahwah

A static frontend testing framework that lives in the browser.

## Running tests

To run tests with the boilerplate setup described below, open developer tools in your browser and run `test()` in the console.

## How it works

Kahwah uses `iframe` elements to run tests without affecting the state of the current page, or leaking state between tests. It's currently tested to work in Chrome/Chromium browsers currently.

## Boilerplate

The expected way of arranging kahwah is as follows. First, we anticipate a directory structure that looks something like this:

    website-root
    |__ ...
    |__ index.html (calling script.js)
    |__ js
        |__ ...
        |__ script.js
    |__ test
        |__ kahwah.js
        |__ script_test.js

In `script.js`, which is the main script for your page, add a code snippet to import `script_test.js` and call its `run()` function, like:

```javascript
/******************************************
 * script.js
 ******************************************/

function test(cfg) {
    import('../test/script_test.js')
        .then(m => {
            m.run(cfg)
        })
}
```

Then, in `script_test.js`, use kahwah's `test` and other helper functions to write your tests:

```javascript
/******************************************
 * script_test.js
 ******************************************/

import { config, test, TElement } from './kahwah.js';

export const run = (cfg) => {
    config(cfg)

    test('1 plus 1 equals 2', async (T) => {
        T.expect(1 + 1).toEqual(2);
    });

    test('h1 heading should exist', async (T) => {
        T.expect(TElement.ofTag('h1')).toExist();
    })
}
```

Then, loading your `index.html` in a local server, run `test()` in the console.

## Configuration

It is possible to configure some aspects of how kahwah runs tests. Here are a list of currently configurable options:

| Option | Default | What does it do? |
|-----|-----|-----|
| `visible` | `false` | If `true`, shows `iframe` element for each test while they are running. Usually, the `iframe` elements are hidden with `opacity: 0`. |
| `interactable` | `false` | If `true`, allows the user to interact with the `iframe` elements. Usually this is disabled with `pointer-events: none`. |
| `freezeAfterTest` | `false` | If `true`, does not remove the `iframe` element from the DOM when the test is complete. Useful for debugging. |
| `containing` | `""` | If not empty, only runs tests with names containing the given string. |
| `urlTimeout` | `2000` | Default timeout to check if the `iframe` navigates to another URL. Needed since `iframe` elements suck. |
| `fnTimeout` | `2000` | Default length of time to persist function calls in test state. Useful for `toCallFunction` assertions. |
| `loadTime` | `2000` | Default length of time to allow the `iframe` element to load. Needed to avoid `iframe` jankiness. |

## Lifecycle methods

Lifecycle methods inject scripts and perform certain behaviors at different points of the test lifecyle. Here is a list of current and planned lifecycle methods:
| Method | Implemented? | What does it do? |
|-----|-----|-----|
| `replaceScript(pathToOldScript, pathToNewScript)` | **Yes** | Replaces all instances of script in page with a new, possibly mocked script. |
| `useScript(pathToScript)` | No | Injects custom script into page before loading. |
| `removeScript(pathToScript)` | No | Removes all instances of script in page with a new, possibly mocked script. |
| `beforeEach(callback)` | No | Executes arbitrary JavaScript in page before each test. |
| `afterEach(callback)` | No | Executes arbitrary JavaScript in page after each test. |

## T

`T` is the main object that kahwah uses to perform tests. When using the `test(name, callback)` function, you must use `T` in the callback, and the callback must be `async`. Here's an example:

```javascript
test('1 == 1 should be true', async (T) => {
    T.expect(1 === 1).toBeTrue();
})
```

As you can see, `T` provides us with some helpful methods. Let's go over some of them.

### Getting elements

`T` exposes a `get()` method that expects an instance of `TElement`. This class can be imported from `kahwah.js` as well; we'll go over that in a little bit. Once you use `T.get`, you have the following methods available to you:
| Method | What does it do? |
|-----|-----|-----|
| `click()` | Clicks the retrieved element. |
| `getAttribute(attr: string)` | Returns the value of the given attribute on the retrieved element using the `getAttribute` API. |

Now, back to `TElement`. There are several ways to select elements with `TElement`. The idiomatic way is to start with a static method, then call instance methods on the returned object. They do the same thing. For example:

```javascript
// these two TElements get the same thing
let t1 = TElement.ofTag('h1').withClass('name');

let t2 = new TElement();
t2.ofTag('h1');
t2.withClass('name');
```

Here are all the methods currently exposed by `TELement`:
| Method | Chainable? | What does it do? |
|-----|-----|-----|
| `ofTag(tag: string)` | Yes | Uses given tag to select elements. Like with normal elements, using multiple tags will fail spectacularly. |
| `withId(id: string)` | Yes | Uses given id to select elements. |
| `withClass(class: string)` | Yes | Uses given class to select elements. |
| `withClasses(classes: []string)` | Yes | Uses given classes to select elements. |
| `withAttribute(attr: string)` | Yes | Selects element with the given attribute. |
| `withAttributeEquals(attr: string, equals: string)` | Yes | Selects element where the given attribute exists, and equals the given value. |
| `withText(text: string)` | Yes | Selects element where `textContent` contains (but does not necessarily match) given text. |
| `withExactText(text: string)` | Yes | Selects element where `textContent` matches exactly given text. |
| `withSelector(selector: string)` | **Yes\*** | Selects element by given CSS selector. \*Only chainable with `withText` and `withExactText`. |

## Expects

The main way to test things with kahwah is to use assertions. These are provided by the exposed `expect()` method on `T`. This allows us to test different things based on what is passed in. Let's go over some of those.

### `expect(string)`

If a string is passed in, we can chain the following methods:

| Method | Implemented? | What does it do? |
|-----|-----|-----|
| `toEqual(mustEqual: string)` | **Yes** | Passes if the two strings are equal, fails otherwise. |
| `toNotEqual(mustNotEqual: string)` | **Yes** | Passes if the two strings are **not** equal, fails otherwise. |
| `toContain( )` | No | . |
| `toNotContain( )` | No | . |