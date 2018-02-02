Lita
====

Lita is a small library, that uses *unified* and *remark* to create an easy to use interface to literary programming in Javascript.
It is meant to be used by other tools, but if it suits your needs - feel free to abuse it!

## Instalation

    $ npm install lita

## Usage

    const lita = require('lita')

### `lita(input: string [, options: object ]) -> string`
Lita accepts a Markdown formated string and returns all of the code blocks concatenated together.

## Macros

To extend the functionality a bit, I have added two simple macros into the markdown syntax. Both of them can be used only inside a code block.

### `define` - `//= <name>`
  At the beginning of a code block, binds a code block to a `name`, so it can be used later. Code is not included in the final output if it isn't `import`ed anywhere.

### `import` - `//: <name>`
  Anywhere in the code block, imports a code block defined earlier. It can be called multiple times for the same named code block.

## Example

    const lita = require('lita') // first, import `lita` into your project
    const fs = require('fs')
    const util = require('util')

    const readFile = util.promisify(fs.readFile)
    const writeFile = util.promisify(fs.writeFile)

    async function main () {
      // somehow obtain a string that contains markdown with code blocks
      let text = await readFile('./index.js.md', 'utf8')

      // lita is a function that accepts a markdown string and returns a javascript file string
      let result = lita(text)

      // do something with resultant code
      await writeFile('./index.js', result)
    }

    main().then(() => {

    }).catch(err => { // always remember to handle your errors!
      console.error(err)
    })

