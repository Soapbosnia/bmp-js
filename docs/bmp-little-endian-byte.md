# bmp-js / Documentation / bmp_little_endian_byte
## Introduction

### Description

Converts bytes from little endian to integers

### Parameters

1. `value` | `Bytes to integer`

Returns: `(number)`

## Code examples

```js
var byte = "\x40\x80";
var result = bmp_little_endian_byte(byte);
console.log(result);
// Output: 32832
```
