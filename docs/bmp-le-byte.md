# bmp-js / Documentation / bmp_le_byte
## Introduction

### Description

Converts bytes from little endian to integers

\* This function should only be called by the internals of the library.

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|value|Bytes to integer||

### Returns
`number`

## Code examples

```js
var byte = "\x40\x80";
var result = bmp_le_byte(byte);

console.log(result);
// Output: 32832
```
