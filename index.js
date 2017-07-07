var assert = require('nanoassert')
var through = require('through2')

module.exports = function (bytes, onend) {
  assert(typeof bytes === 'number', 'bytes must be number')
  assert(bytes > 0, 'bytes must be positive, non-zero integer')
  assert(Number.isSafeInteger(bytes), 'bytes must be safe integer')
  assert(typeof onend === 'function', 'onend must be function')

  var chunks = []
  var size = 0

  return through(function (chunk, enc, next) {
    chunks.push(chunk)
    size += chunk.length

    while (size > bytes) {
      if (size - chunks[0].length > bytes) {
        size -= chunks[0].length
        this.push(chunks.shift())
      } else {
        break
      }
    }

    next()
  }, function (done) {
    if (size > bytes) {
      this.push(chunks[0].slice(0, size - bytes))
      chunks[0] = chunks[0].slice(size - bytes)
    }

    onend(Buffer.concat(chunks), function (err, data) {
      return done(err, data)
    })
  })
}
