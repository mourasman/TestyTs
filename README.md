![Test](https://github.com/Testy/TestyTs/workflows/Test/badge.svg)
[![Maintainability](https://api.codeclimate.com/v1/badges/66d7c2c5c60a4919d593/maintainability)](https://codeclimate.com/github/Testy/TestyTs/maintainability)
[![codecov](https://codecov.io/gh/Testy/TestyTs/branch/master/graph/badge.svg)](https://codecov.io/gh/Testy/TestyTs)
[![npm version](https://badge.fury.io/js/testyts.svg)](https://badge.fury.io/js/testyts)
[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://clicktotweet.co/daN8y)


<img src="./img/testy_colour_rgb_transparent.png" alt="Shoutout to Kateryna Jones for that sweet logo!" />


### Testy.Ts is a modern TypeScript testing framework.

## Why?
Writing tests should be fun. The other testing framework solutions do not make use of the full power of TypeScript. This one uses decorators and OOP and stuff. Therefore, it makes writing tests fun.

## Installation

```
$ npm install --save-dev testyts
$ npm install -g testyts
```

## Setup

To generate a basic testy.json configuration file, use the following command. To see all available configurations, see  [this section](#configuration-file).

```
$ testyts init
```


## Write some tests

### The basics 
Writing tests with Testy is simple. Don't forget to export your test suites though. Otherwise, they won't be discovered by the test runner.

```ts
@TestSuite()
export class MyTestSuite {

    @Test()
    onePlusOne() {
        // Act
        const result = 1 + 1;
        
        // Assert
        expect.toBeEqual(result, 2);
    }
}
```

### Setup and teardown

Testy provides setup and teardown hooks.

```ts
@TestSuite()
export class MyTestSuite {

    @BeforeAll()
    beforeAll() {
        // This is executed before all the tests
    }

    @BeforeEach()
    beforeEach() {
        // This is executed before each test
    }

    @AfterEach()
    afterEach() {
        // This is executed after each test
    }
    
    @AfterAll()
    afterAll() {
        // This is executed after all the tests
    }
}
```

### Asynchronous stuff

Asynchronous tests, setup and teardown methods are supported out of the box. Just make your method async.

```ts
@TestSuite()
export class MyTestSuite {

    @Test()
    async asyncTest() {
        // Asynchronous stuff       
    }
}
```

### Timeout

If a test is taking too long to complete, it will fail automatically. The default timeout it 2000 ms, but you can configure it. Please note that the `Timeout` decorator goes after the `Test` decorator.

```ts
@TestSuite()
export class MyTestSuite {

    @Test() 
    @Timeout(100000) // Really slow test
    slowTest() {
       // Some test
    }
}
```


### Reuse code!

This is where stuff gets interesting. Testy allows you to use base test classes. The base test can have setup and teardown methods. Your child test suite may also have setup and teardown methods. In that case, the base test methods are executed first.

```ts
class MyBaseTestSuite{
    // Setup/teardown extravaganza
}

@TestSuite()
class MyTestSuite extends MyBaseTestSuite {
    // My tests
}
```

### Test cases

You can easily run the same test with different inputs using the `TestCase` decorator. The first argument is the test case name, the following arguments will be 
passed to your test method. Please note this decorator goes after the `@Test` decorator. 

```ts
@TestSuite()
export class MyTestSuite {

    @Test()
    @TestCase('Two plus two is four', 2, 2, 4)
    @TestCase(`Minus one that's three`, 4, -1, 3)
    addition(a: number, b: number, result: number) {
        expect.toBeEqual(a + b, result);
    }
}
```

### Asserting

There's a whole bunch of assertion methods and also a dash of syntactic sugar sexyness in the expect class.

```ts
expect.toBeTrue(2 > 1);
expect.toBeEqual('a', 'a');
expect.not.toBeEqual('p', 'np');
expect.toThrow(() => someNastyMethod());
expect.toBeSorted.inAscendingOrder([0, 1, 1, 2, 3, 5, 8]);
// More!
```

### Ignoring or focusing some tests

You can ignore tests by adding an `X` before a test suite or a specific test decorator. Ignored tests will still show up in the test report, but they will be marked as ignored.

```ts
@XTestSuite() // This test suite will be ignored
export class MyTestSuite { 
// Your tests
}

@TestSuite()
export class MyTestSuite {

    @XTest() // This test will be ignored
    onePlusOne() {
       // Some test
    }
}
```

You can also focus tests by adding an `F` before a test suite or a specific test decorator. If one test or test suites are focused, only those will be runned. The others will be reported as ignored.

```ts
@FTestSuite() // This test suite will be focused.
export class MyTestSuite { 
...
}

@TestSuite()
export class MyTestSuite {

    @FTest() // This test will be focused
    onePlusOne() {
       // Your test
    }
}
```

## Custom tests and test suites names 

The tests and test suites names are inferred from the method or class name by default. You can specify a custom name.

```ts
@TestSuite('My glorious test suite')
export class MyTestSuite {

    @Test('Adding one plus one, should equal two')
    onePlusOne() {
        // Act
        const result = 1 + 1;
        
        // Assert
        expect.toBeEqual(result, 2);
    }
}
```

## Configuration file

| Key        | Description | Type | Note |
|------------|-------------|------|------|
| `include`  | The [test loader](src\lib\utils\testsLoader.ts) will look for tests in files that match any of those [glob patterns](https://www.npmjs.com/package/glob#glob-primer) |  `string[]`  | *Required* |
| `tsconfig` | Alternate tsconfig for the test loader to use. If not specified, the loader will use the `tsconfig.json` in the current directory | `string` | *Optional* |
| `timeout`  | Global test timeout. By default, the global timeout is 2000 ms. The global timeout will be overriden by test-level timeouts. | `number`| *Optional* |
| `reporter` | Output format. | `'standard'`  &#124; `'TAP'` | *Optional* |

Example configuration file:

```json
{
    "include": ["**/*.spec.ts"],
    "tsconfig": "./tsconfig.spec.json",
    "reporter": "standard",
    "timeout": 10000,
}
```

## Cli arguments

Cli arguments will override config file values.


```
-c --config <config> // Specify a testy.json configuration file
-t --tsconfig <tsconfig> // Specify a tsconfig.json file
-r --reporter <reporter> // Specify a reporter. Either standard or TAP.
```

## Run the tests

To run the tests, use the following command

```
$ testyts
$ testyts --config custom/config/file.json // To specify a custom configuration file
$ testyts --tsconfig custom/tsconfig.json // To specify a custom typescript configuration file (tsconfig.json)
```


## Try it out online!

Here's an online [REPL](https://repl.it/@Aboisier/TestyTs-Playground) for you to try Testy.Ts!

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update unit tests and [e2e tests](./e2e/README.md) as appropriate.

If you have any questions, do not hesitate to email me at <aboisiermichaud@gmail.com>.

## More documentation
- [E2E tests](./e2e/README.md)

## License
* [ISC](./LICENSE)


<img src="./img/testy_colour_rgb_transparent.png" alt="Shoutout to Kateryna Jones for that sweet logo!" width="150"> <br> <sub>*Shoutout to [Kateryna Jones](https://www.katerynajones.com/) for that sweet logo!*</sub>