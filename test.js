var choppa = require('choppa')
var tail = require('.')
var test = require('tape')
var randomBytes = require('crypto').randomBytes

test('Sample', function (assert) {
  var data = randomBytes(16)

  var a = tail(3, function (bytes, done) {
    assert.ok(Buffer.compare(bytes, data.slice(16 - 3)) === 0)
    done()
  })

  a.on('error', assert.error)
  a.on('end', assert.end)
  a.on('data', _ => _)

  var source = choppa(3)
  source.pipe(a)
  source.write(data)
  source.end()
})

test('Too short', function (assert) {
  var data = randomBytes(8)

  var a = tail(15, function (bytes, done) {
    assert.ok(bytes.length < 15)
    assert.ok(Buffer.compare(bytes, data) === 0)
    done()
  })

  a.on('error', assert.error)
  a.on('end', assert.end)
  a.on('data', _ => _)

  var source = choppa(3)
  source.pipe(a)
  source.write(data)
  source.end()
})

test('Too short', function (assert) {
  var data = randomBytes(65)

  var a = tail(7, function (bytes, done) {
    assert.ok(Buffer.compare(bytes, data.slice(-7)) === 0)
    done()
  })

  a.on('error', assert.error)
  a.on('end', assert.end)
  a.on('data', _ => _)

  var source = choppa(5)
  source.pipe(a)
  source.write(data)
  source.end()
})
