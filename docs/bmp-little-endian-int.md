# bmp-js / Documentation / bmp_little_endian_int
## Introduction

### Description

Converts integers to little endian bytes

### Parameters

1. `value` | `Unsigned integer`
2. `pad_length` | `Padding length`
3. `pad_left` | `True pads left (default), False pads right`

Returns: Little-endian (LE) bytes `(string)`

## Code examples

```js
var integer = 32832;
var result = bmp_little_endian_int(integer);
console.log(bin2hex(result));
// Output: 4080
```
