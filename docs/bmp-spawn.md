# bmp-js / Documentation / bmp_spawn
## Introduction

### Description

Creates an `img` element that is appended to the `target`. The image element src is set to the output of `bmp_create_uri(resource)`

### Parameters

|#|Name|Description|Default Value|
|-|-|-|-|
|1|resource|BMPJS Resource||
|2|target|HTMLElement in which the image will be appended to|null|

### Returns
`false` | `HTMLImageElement` | `HTMLCanvasElement`

### Notes
#### Reference

The `BMPJS Resource` object stores the property `reference` whose value is set to the element that `bmp_spawn()` has spawned.

That value is overwritten to the new `reference` if `bmp_spawn()` is called on the same resource.

Due to this nature it is best to store the `reference` in a separate variable instead of accessing it through the `BMPJS Resource` object, as that value may change if you spawn a separate instance without realizing.

Bad code:
```js
var resource = bmp_create(640, 480);
// Spawn base image
bmp_spawn(resource, container);
// ...
bmp_replace(resource.reference, resource);
//                   ^^^^^^^^^
//                   |- if this changes, you've lost your previous reference
// ...
// Do some debug visualisation on the resource
// ...
// Spawn debug image
bmp_spawn(resource, container); // <-- this has now wiped the previous reference
```

Good code:
```js
var resource_1 = bmp_create(640, 480);
var reference_1 = bmp_spawn(resource_1, container);
// ...
bmp_replace(reference_1, resource_1);
//          ^^^^^^^^^^^
//          |- this stays constant until an external force acts upon it like
//             the element gets removed, or this reference gets shuffled around
//             and lost
// ...
// Do some debug visualisation on the resource
// ...
// Spawn debug image
var reference_2 = bmp_spawn(resource_1, container);
//                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//                |- this appends a new element to the container, and overwrites
//                   the |reference| property in the BMPJS Resource object.
//                   But we still retain the previous reference in |reference_1|
```

To showcase this in practice, take a look at the [`demo/debug-overlay/index.js`](../demo/example/bmp-spawn/index.js)

## Code examples

```js
// Add CSS
var raw_css = `
#container, #img {border: 12px solid #800; display: inline-block}
#img {border-color: #080}
p {padding-left: 16px}
`;

var style_element = document.createElement("style");
style_element.innerHTML = raw_css;
document.body.appendChild(style_element);

// Create a container element in which we will spawn an image
var container = document.createElement("div");
container.id = "container";

// Define image width and height, which will be used to calculate
// each box width and their X position relative to the parent
var image_width  = 256;
var image_height = 128;
var box_width    = Math.ceil(image_width / 5);
var box_height   = image_height;

// Create BMPJS resource
var image = bmp_create(image_width, image_height);

// Plot 5 rectangles spanning across the X axis
bmp_plot_rect(image, box_width * 0, 0, box_width, box_height, 243,  79,  28, true);
bmp_plot_rect(image, box_width * 1, 0, box_width, box_height, 127, 188,   0, true);
bmp_plot_rect(image, box_width * 2, 0, box_width, box_height, 255, 186,   1, true);
bmp_plot_rect(image, box_width * 3, 0, box_width, box_height,   1, 166, 240, true);
bmp_plot_rect(image, box_width * 4, 0, box_width, box_height, 116, 116, 116, true);

// Spawn the image, storing the reference
var image_reference = bmp_spawn(image, container);
image_reference.id = "img";

// Append the container element to the body. The container may be appended
// before or after a resource has been spawned. What matters is that the
// target is of HTMLElement type, else the spawn function will fail.
document.body.appendChild(container);

// Create brief description about elements
var text_1 = document.createElement("p");
text_1.innerText = "#container";
text_1.style.color = "#800";

var text_2 = document.createElement("p");
text_2.innerText = "#img";
text_2.style.color = "#080";

document.body.appendChild(text_1);
document.body.appendChild(text_2);
```

## Expected Result

![expected-result](./img/010.png)
