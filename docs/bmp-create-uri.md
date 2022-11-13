# bmp-js / Documentation / bmp_create_uri
## Introduction

### Description

Creates a Blob URI with fully-constructed BMP data

### Parameters

1. `resource` | `BMPJS Resource`

Returns: `(string)`

## Code examples

```js
// Create a resource
var bmp_resource = bmp_resource_create(1, 1);

// Generate a URI
var bmp_resource_uri = bmp_create_uri(bmp_resource);

// Print URI
console.log(bmp_resource_uri);
// Output: blob:{protocol}://{hostname}/{guid}
```
