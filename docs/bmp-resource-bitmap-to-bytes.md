# bmp-js / Documentation / bmp_resource_bitmap_to_bytes

## Introduction

### Description

Converts `resource.bitmap` array into raw bytes and mutates `resource.bitmap_raw` property.

### Parameters

1. `resource` -&gt; `BMPJS Resource`

**Returns**: true `(boolean)`

## Code examples

```js
var resource = bmp_create_resource(2, 2);
console.log(resource.bitmap);
// Output: 

bmp_resource_bitmap_to_bytes(resource);
console.log(resource.bitmap);
// Output: 
```