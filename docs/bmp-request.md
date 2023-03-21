# bmp-js / Documentation / bmp_request

## Alternative

Using this function to load a BMP file and create a BMPJS Resource occupies way too many lines of code, if you want to make your life easier you can do this in a single function call with the [`bmp_load()`](./bmp-load.md) function.

If you wish to operate directly on the bytes before of a BMP file before creating a BMPJS Resource, then continue reading.

## Introduction

### Description

Request a BMP file from a remote location using synchronous XMLHttpRequest.

Thanks to: [https://tinyurl.com/SendingAndReceivingBinaryData](https://tinyurl.com/SendingAndReceivingBinaryData)

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|url|URL pointing to a BMP file|null|

### Returns
`false` | `null` | `string`

### Notes

Before spawning the requested resource, once it has loaded, the resource must be created using the [`bmp_from_raw()`](./bmp-from-raw.md) function.

## Code examples

```js
// Load 4 images
var resource_1 = bmp_request("docs/img/load/01.bmp");
var resource_2 = bmp_request("docs/img/load/02.bmp");
var resource_3 = bmp_request("docs/img/load/03.bmp");
var resource_4 = bmp_request("docs/img/load/04.bmp");

// Create BMP resources from bytes
resource_1 = bmp_from_raw(resource_1);
resource_2 = bmp_from_raw(resource_2);
resource_3 = bmp_from_raw(resource_3);
resource_4 = bmp_from_raw(resource_4);

// Spawn the images into the container
bmp_spawn(resource_4, container);
bmp_spawn(resource_3, container);
bmp_spawn(resource_2, container);
bmp_spawn(resource_1, container);
```

## Expected Result

![expected-result](./img/004.png)
