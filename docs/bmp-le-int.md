# bmp-js / Documentation / bmp_le_int
## Introduction

### Description

Converts integers to little endian bytes

\* This function should only be called by the internals of the library.

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|value|Unsigned integer||
|2|pad_length|Padding length|2|
|3|pad_left|True pads left, False pads right|true|

### Returns
`string`

## Code examples

```js
var integer = 32832;
var result = bmp_le_int(integer);
console.log(bin2hex(result));
// Output: 4080
```
