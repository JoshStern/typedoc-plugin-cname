# CNAME file configuration for typedoc
Github pages uses a `CNAME` file at the root of the docs directory and `typedoc` will remove the
it when regenerating docs. `typedoc-plugin-cname` allows for a CNAME host to be configured and
added to the output directory.

## Installation
```sh
npm install -D typedoc typedoc-plugin-cname
```

## Usage
This plugin adds the `cname` option which can be used to set a hostname.

### CLI
```sh
npx tsdoc --plugin typedoc-plugin-cname --cname <host> <entryPoint>
```

### Config file
```json
// typedoc.json
{
  // ...
  "cname": "<host>"
}
```
