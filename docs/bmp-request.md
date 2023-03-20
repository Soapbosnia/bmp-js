# bmp-js / Documentation / bmp_request

## Introduction

### Description

Request a BMP file from a remote location using synchronous XMLHttpRequest.

Thanks to: [https://tinyurl.com/SendingAndReceivingBinaryData](https://tinyurl.com/SendingAndReceivingBinaryData)

### Parameters

1. `url` | `URL pointing to a BMP file`

Returns: false | null | string `(boolean|null|string)`

### Notes

Before spawning the requested resource, once it has loaded, the resource must be created using the [`bmp_create_from_bytes()`](./bmp-resource-create-from-bytes.md) function.

## Code examples

```js
// Load 4 images
var resource_1 = bmp_request("docs/img/load/01.bmp");
var resource_2 = bmp_request("docs/img/load/02.bmp");
var resource_3 = bmp_request("docs/img/load/03.bmp");
var resource_4 = bmp_request("docs/img/load/04.bmp");

// Create BMP resources from bytes
resource_1 = bmp_create_from_bytes(resource_1);
resource_2 = bmp_create_from_bytes(resource_2);
resource_3 = bmp_create_from_bytes(resource_3);
resource_4 = bmp_create_from_bytes(resource_4);

// Spawn the images into the container
bmp_spawn(resource_4, container);
bmp_spawn(resource_3, container);
bmp_spawn(resource_2, container);
bmp_spawn(resource_1, container);
```

## Expected Result

![expected-result](./img/004.png)
