# bmp-js / Documentation / bmp_load

## Introduction

### Description

Similar to [`bmp_request()`](./bmp-request.md) but returns a BMPJS Resource automatically

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|url|URL pointing to a BMP file|null|
|2|canvas|When writing to a canvas this must be true|false|

### Returns
`false` | `BMPJS Resource`

### Warning

When the BMPJS resource is created for use in a Canvas element then [Chromium-based browsers](https://en.wikipedia.org/wiki/Chromium_(web_browser)#Browsers_based_on_Chromium) may experience rendering artifacts if the `alpha` property inside the `options` object that's passed to [`getContext`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext) is set to false.

This bug must be fixed by Chromium developers and is not caused by bmp-js.

This issue does not occur on Mozilla Firefox.

## Code examples

```js
// Load 4 images
var resource_1 = bmp_load("docs/img/load/01.bmp");
var resource_2 = bmp_load("docs/img/load/02.bmp");
var resource_3 = bmp_load("docs/img/load/03.bmp");
var resource_4 = bmp_load("docs/img/load/04.bmp");

// Spawn the images into the container
bmp_spawn(resource_4, container);
bmp_spawn(resource_3, container);
bmp_spawn(resource_2, container);
bmp_spawn(resource_1, container);
```

## Expected Result

![expected-result](./img/004.png)
