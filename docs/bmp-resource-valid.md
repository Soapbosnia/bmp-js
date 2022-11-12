# bmp-js / Documentation / bmp_resource_valid
## Introduction

### Description

Verify that the BMP resource is valid

### Parameters

1. `resource` | `Reference to the resource created by bmp_resource_create()`
2. `raw` | `Process raw data`

Returns: false | true `(boolean)`

## Code examples

```js
// Valid image
var resource_valid   = bmp_resource_create(1, 1);
var resource_invalid = {};

console.log(bmp_resource_valid(resource_valid));
// Output: true

console.log(bmp_resource_valid(resource_invalid));
// Output: false
```
