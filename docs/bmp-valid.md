# bmp-js / Documentation / bmp_valid
## Introduction

### Description

Verify that the BMP resource is valid

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|resource|BMPJS Resource||
|2|raw|Process raw data|false|

### Returns:
`false` | `true`

## Code examples

```js
// Valid image
var resource_valid   = bmp_create(1, 1);
var resource_invalid = {};

console.log(bmp_valid(resource_valid));
// Output: true

console.log(bmp_valid(resource_invalid));
// Output: false
```
