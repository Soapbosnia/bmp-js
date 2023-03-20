# bmp-js / Documentation / bmp_filesize

## Introduction

### Description

Determine the file size of the BMPJS resource based on resource properties.

### Parameters

1. `resource` | `BMPJS Resource`

Returns: `(number)`

## Code examples

```js
// Create a sample picture
var resource = bmp_create(64, 64);

// Get the size of this resource in bytes
var filesize = bmp_filesize(resource);

// Print the size of this resource into the JavaScript console
console.log(filesize);
// Output: 16438
```
