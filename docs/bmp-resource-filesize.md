# bmp-js / Documentation / bmp_resource_filesize

## Introduction

### Description

Determine the file size of the BMPJS resource based on resource properties.

### Parameters

1. `resource` | `BMPJS Resource`

Returns: `(number)`

## Code examples

```js
// Create a sample picture
var bmp_resource = bmp_resource_create(64, 64);

// Get the size of this resource in bytes
var bmp_resource_size = bmp_resource_filesize(bmp_resource);

// Print the size of this resource into the JavaScript console
console.log(bmp_resource_size);
// Output: 12342
```
