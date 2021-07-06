# Kahwah

A static frontend testing framework that lives in the browser.

## Running tests

To run tests with the boilerplate setup described below, open developer tools in your browser and run `test()` in the console. Here's what it should look like (with two tests, one of which is failing):

![image](https://user-images.githubusercontent.com/24604927/124519504-8086be80-ddb7-11eb-8fdb-dfaa2e1bb2d9.png)

## How it works

Kahwah uses `iframe` elements to run tests without affecting the state of the current page, or leaking state between tests. It's currently tested to work in Chrome/Chromium browsers currently.

## Boilerplate

The expected way of arranging kahwah is as follows. First, we recommend a directory structure that looks something like this:

    website-root
    |__ ...
    |__ index.html
    |__ js
        |__ ...
        |__ script.js
    |__ test
        |__ kahwah.js
        |__ script_test.js

First, make sure your `index.html` loads `script.js` somewhere:

```html
<script src="js/script.js"></script>
```

In `script.js`, which is the main script for your page, add a code snippet to import `script_test.js` and call its `run()` function, like so:

```javascript
// script.js

function test(cfg) {
    import('../test/script_test.js')
        .then(m => {
            m.run(cfg)
        })
}
```

Then, in `script_test.js`, use kahwah's `test()` function (and other helper functions) to write your tests:

```javascript
// script_test.js

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

It's possible to configure some aspects of how kahwah runs tests. Options have varying scope: some options are configurable per test and globally (`all`); some are only available globally (`global`). None are for tests only at this point in time. Here is a list of all currently configurable options:

| Option | Default | Scope | What does it do? |
|-----|-----|-----|-----|
| `visible` | `false` | `all` | If `true`, shows `iframe` element for each test while they are running. Usually, the `iframe` elements are hidden with `opacity: 0`. |
| `interactable` | `false` | `all` | If `true`, allows the user to interact with the `iframe` elements. Usually this is disabled with `pointer-events: none`. |
| `freezeAfterTest` | `false` | `all` | If `true`, does not remove the `iframe` element from the DOM when the test is complete. Useful for debugging. |
| `showPassingAssertions` | `false` | `all` | If `true`, shows all assertions that pass as well as those that fail. Useful for checking if an assertion is being tested. |
| `containing` | `""` | `global` | If not empty, only runs tests with names containing the given string. |
| `urlTimeout` | `2000` | `all` | Default timeout to check if the `iframe` navigates to another URL. Needed since `iframe` elements suck. |
| `fnTimeout` | `2000` | `global` | Default length of time to persist function calls in test state. Useful for `toCallFunction` assertions. |
| `loadTime` | `2000` | `all` | Default length of time to allow the `iframe` element to load. Needed to avoid `iframe` jankiness. |

## Lifecycle methods

Lifecycle methods inject scripts and perform certain behaviors at different points of the test lifecyle. Here is a list of current and planned lifecycle methods:
| Method | Implemented? | What does it do? |
|-----|-----|-----|
| `replaceScript(pathToOldScript, pathToNewScript)` | **Yes** | Replaces all instances of script in page with a new, possibly mocked script. |
| `useScript(pathToScript)` | No | Injects custom script into page before loading. |
| `removeScript(pathToScript)` | No | Removes all instances of script in page with a new, possibly mocked script. |
| `beforeEach(callback)` | No | Executes arbitrary JavaScript in page before each test. |
| `afterEach(callback)` | No | Executes arbitrary JavaScript in page after each test. |

## kahwah.T

`T` is the main object that kahwah uses to perform tests. When using the `test(name, callback)` function, you should use `T` in the callback, and the callback must be `async`. Here's an example:

```javascript
test('1 == 1 should be true', async (T) => {
    T.expect(1 === 1).toBeTrue();
})
```

As you can see, `T` provides us with some helpful methods. Let's go over some of them.

### Getting elements

`T` exposes a `get()` method that expects an instance of `TElement`. A `TElement` represents an HTML element, but with some useful methods baked in. This class can be imported from `kahwah.js` as well; we'll go over that in a little bit. Once you use `T.get`, you have the following methods available to you:

| Method | What does it do? |
|-----|-----|
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

### Waiting

Since the callback is asynchronous, we can use the following syntax to wait in between actions:

```javascript
let timeToWait = 2000;

doThingOne();

await T.wait(timeToWait)

doThingTwo();
```

### Assertions

The main way to test things with kahwah is to use assertions. These are provided by the exposed `expect()` method on `T`. This allows us to test different things based on what is passed in. Let's go over some of those.

#### `expect(thing: string)`

If a string is passed in, we can chain the following methods:

| Method | Implemented? | What does it do? |
|-----|-----|-----|
| `toEqual(mustEqual: string)` | **Yes** | Passes if the two strings (`thing` and `mustEqual`) are equal, fails otherwise. |
| `toNotEqual(mustNotEqual: string)` | **Yes** | Passes if the two strings (`thing` and `mustNotEqual`) are **not** equal, fails otherwise. |
| `toContain(mustContain: string)` | No | Passes if `thing` contains `mustContain`, fails otherwise. |
| `toNotContain(mustNotContain: string)` | No | Passes if `thing` does **not** contain `mustNotContain`, fails otherwise. |

As an example, you could have the following:

```javascript
T.expect("Hello World!").toEqual("Goodbye World!") // => assertion fails - "Hello World!" does not equal "Goodbye World!"
T.expect("foobar").toNotContain("var") // => assertion passes
```

#### `expect(thing: TElement)`

If a `TElement` is passed in, we can use the following methods:

| Method | Implemented? | What does it do? |
|-----|-----|-----|
| `toExist()` | **Yes** | Passes if the element exists and can be found, fails otherwise. |
| `toNotExist()` | **Yes** | Passes if the element does not exist or cannot be found, fails otherwise. |
| `toHaveClass(class: string)` | No | Passes if the element exists and has the given class, fails otherwise. |
| `toNotHaveClass(class: string)` | No | Passes if the element exists and does **not** have the given class, fails otherwise. |
| `toHaveAttribute(attr: string)` | **Yes** | Passes if the element exists and has the given attribute (i.e. not `null`), fails otherwise. |
| `toHaveAttributeWithValue(attr: string, equals: string)` | **Yes** | Passes if the element exists, has the given attribute, **and** the attribute has the given value, fails otherwise. |
| `toNotHaveAttribute(attr: string)` | **Yes** | Passes if the element exists and does **not** have the given attribute (i.e. `null`), fails otherwise. |
| `toContain(text: string)` | No | Passes if the element exists and has text content containing the given text, fails otherwise. |
| `toContainExactly(text: string)` | **Yes** | Passes if the element and has text content exactly matching the given text, fails otherwise. |

For example, imagine the following HTML in `<body>`:

```html
<details open>
    <summary class="detail-summary">
        The quick brown fox ate spaghetti.
    </summary>
    The quick brown fox jumped over the lazy dog. All this jumping made it tired, and so it decided to have spaghetti for dinner.
</details>
```

Then, you could test it like so:

```javascript
let details = TElement.ofTag('details')

T.expect(details).toExist() // => assertion passes
T.expect(details).toHaveAttributeWithValue('open', 'true') // => assertion fails - attribute open exists but has a value of "", not "true"

let summary = TElement.ofTag('summary').withClass('detail-summary')

T.expect(summary).toContain('quick brown fox') // => assertion passes
T.expect(summary).toHaveClass('invisible') // => assertion fails - element does not have class "invisible"
```

#### `expect(thing: Boolean)`

If a boolean is passed in, we have three available methods:

| Method | Implemented? | What does it do? |
|-----|-----|-----|
| `toBeTrue()` | **Yes** | Passes if the boolean is strictly `true`, fails otherwise. |
| `toNotBeTrue()` | **Yes** | Passes if the boolean is not `true` (e.g. `false`, `null`, `undefined` all pass), fails otherwise. |
| `toBeFalse()` | **Yes** | Passes if the boolean is strictly `false`, fails otherwise. |

A simple example:

```javascript
let config = {
    a: true
}
T.expect(config.a).toBeTrue() // => assertion passes
T.expect(config.b).toBeFalse() // => assertion fails - wanted boolean to be "false", got "undefined"
T.expect(config.b).toNotBeTrue() // => assertion passes
```

#### `expect()` or `expect(thing: undefined)`

If nothing is passed in, we have some global methods that we can chain:

| Method | Implemented? | What does it do? |
|-----|-----|-----|
| `toNavigateTo(url: string)` | **Yes** | Passes if `iframe` navigated to the given URL in the past `cfg.urlTimeout` milliseconds, fails otherwise. |
| `toCallFunction(fn: string)` | **Yes** | Passes if the function with the given name was called in the past `cfg.fnTimeout` milliseconds, fails otherwise. |
| `toCallFunctionWithParams(fn: string, ...params: ...Object)` | **Yes** | Passes if the function with the given name was called in the past `cfg.fnTimeout` milliseconds **and** it was called with the given params, fails otherwise. |

Suppose you had the following code in your `script.js`:

```javascript
function sayHi() {
    console.log('Hi!')
}

function sayBye() {
    console.log('Bye!')
}

function sayTextThenLeave(text) {
    console.log(text)
    window.location.href = '..'
}

sayHi()
sayTextThenLeave('goodbye');
```

Then, you could write the following tests:

```javascript
T.expect().toCallFunction('sayBye') // => assertion fails - function "sayBye" was not called
T.expect().toCallFunctionWithParams('sayTextThenLeave', 'goodbye') // => assertion passes
T.expect().toNavigateTo('example.html') // => assertion fails - did not navigate to "example.html"
```
