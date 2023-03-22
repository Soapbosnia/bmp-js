# bmp-js / Documentation / bmp_create_uri
## Introduction

### Description

Creates a Blob URI with fully-constructed BMP data

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|resource|BMPJS Resource||

### Returns
`string`

## Code examples

```js
// Create a resource
var resource = bmp_create(1, 1);

// Generate a URI
var resource_uri = bmp_create_uri(resource);

// Print URI
console.log(resource_uri);
// Output: blob:{protocol}://{hostname}/{guid}
```
