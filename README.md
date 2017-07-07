# `tail-bytes-stream`

[![Build Status](https://travis-ci.org/emilbayes/tail-bytes-stream.svg?branch=master)](https://travis-ci.org/emilbayes/tail-bytes-stream)

> Read `n` bytes from the end of a stream

## Usage

```js
var tailBytes = require('tail-bytes-stream')

dataStream.pipe(tailBytes(32, function (bytes, done) {
  if(Buffer.compare(bytes, Buffer.from('...')) === 0) return done()

  return done(new Error('Mismatch'))
}))
```

## API

### `var stream = tailBytes(n, ontail)`

Read `n` bytes from the end of the stream and call `ontail(bytes, done)` when
they're available. `bytes` might be shorter than `n` if the source stream wasn't
long enough. You can rewrite `bytes` or other data to any subsequent streams.

Returns a `Transform` stream so you can pipe it to other streams.

## Install

```sh
npm install tail-bytes-stream
```

## License

[ISC](LICENSE.md)
