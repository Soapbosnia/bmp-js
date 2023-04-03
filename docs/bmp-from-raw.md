# bmp-js / Documentation / bmp_from_raw

## Introduction

### Description

Decode raw bytes from a BMP file to a BMPJS resource object

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|bytes|Raw bytes of a valid BMP file||
|2|canvas|When writing to a canvas this must be true|false|

### Returns
`BMPJS Resource`

### Warning

When the BMPJS resource is created for use in a Canvas element then [Chromium-based browsers](https://en.wikipedia.org/wiki/Chromium_(web_browser)#Browsers_based_on_Chromium) may experience rendering artifacts if the `alpha` property inside the `options` object that's passed to [`getContext`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext) is set to false.

This bug must be fixed by Chromium developers and is not caused by bmp-js.

This issue does not occur on Mozilla Firefox.

## Code examples

```js
// Load an image
var bytes = bmp_request("docs/img/load/02.bmp");

// Convert the raw bytes to a BMP resource object
var resource = bmp_from_raw(bytes);

// Spawn the image into the container
bmp_spawn(resource, container);
```

## Expected Result

![expected-result](./img/005.png)
