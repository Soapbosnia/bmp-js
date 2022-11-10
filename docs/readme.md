# bmp-js / Documentation

Welcome to BMPJS.

This directory holds all the documentation related to the functions and how-to for using BMPJS.

## Preparing the environment

### Introduction

There are 2 ways to go about setting up the BMPJS environment, those are local and remote.

Local means cloning this GitHub repository and running your own local web-server within the source directory.

Remote means working from a single file, either through a web-server host or running from a local file which sources BMPJS from a remote location.

One limitation of running from a local file versus on a web-server host is that you cannot load bitmaps from a relative path, for example `./img/test.bmp` will fail as the browser forbids reading resources from a local file resource (also known as [**file URI scheme**](https://en.wikipedia.org/wiki/File_URI_scheme).)

For the sake of ease-of-use and simplicity we will be taking the `Remote` approach this time. But will warn when transitioning to `Local` when necessary based on use-case.

### Setting up

Simply copy the source code provided below and paste it into a text editor, then save it somewhere safely under the name `bmpjs.htm`.

**Note**: You can name the file anything as long as it ends with `.htm` or `.html`.

**Note**: All code examples will use `bmp_container` to spawn images into, your code can specify a different variable name or an ID, `bmp_container` is just an [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) which we write image elements into.

**Note**: If the `bmp_container` variable is undefined, you can create it by spawning a HTMLElement node with the ID of `bmp_container` or adding `<div id="bmp_container"></div>` to your HTML code.



```html
<script src="https://cdn.jsdelivr.net/gh/oxou/bmp-js/bmp.min.js"></script>

<div id="bmp_container"></div>

<script>
    // Create a resource across 320 x 320 pixels.
    var bmp_resource = bmp_resource_create(320, 320);

    // Clear the entire resource's background with a dark red color
    bmp_plot_clear(bmp_resource,  64, 0, 0);

    // Plot a rectangle at 0,0 with dimensions of 160,160
    bmp_plot_rect(bmp_resource, 0, 0, 160, 160, 192, 0, 0);

    // Spawn the resource inside the HTMLElement #bmp_container
    bmp_resource_spawn(bmp_resource, bmp_container);
</script>
```

## Expected Result

![expected-result](./img/001.bmp)

## Other documentations
- [bmp_resource_bitmap_to_bytes](./bmp-resource-bitmap-to-bytes.md)
- [bmp_resource_copy](./bmp-resource-copy.md)
- [bmp_resource_create](./bmp-resource-create.md)
- [bmp_resource_create_from_bytes](./bmp-resource-create-from-bytes.md)
- [bmp_resource_download](./bmp-resource-download.md)
- [bmp_resource_filesize](./bmp-resource-filesize.md)
- [bmp_resource_get_image_bitmap](./bmp-resource-get-image-bitmap.md)
- [bmp_resource_get_image_size](./bmp-resource-get-image-size.md)
- [bmp_resource_get_pixel](./bmp-resource-get-pixel.md)
- [bmp_resource_replace](./bmp-resource-replace.md)
- [bmp_resource_request](./bmp-resource-request.md)
- [bmp_resource_set_pixel](./bmp-resource-set-pixel.md)
- [bmp_resource_spawn](./bmp-resource-spawn.md)
- [bmp_resource_valid](./bmp-resource-valid.md)

- [bmp_create_array_pixel](./bmp-create-array-pixel.md)
- [bmp_create_uri](./bmp-create-uri.md)
- [bmp_little_endian_byte](./bmp-little-endian-byte.md)
- [bmp_little_endian_int](./bmp-little-endian-int.md)

- [bmp_mod_color_1bit](./bmp-mod-color-1bit.md)
- [bmp_mod_color_grayscale](./bmp-mod-color-grayscale.md)
- [bmp_mod_color_invert](./bmp-mod-color-invert.md)
- [bmp_mod_dissect_font](./bmp-mod-dissect-font.md)
- [bmp_mod_flip_x](./bmp-mod-flip-x.md)
- [bmp_mod_flip_y](./bmp-mod-flip-y.md)
- [bmp_mod_get_channel](./bmp-mod-get-channel.md)
- [bmp_mod_noise_grayscale](./bmp-mod-noise-grayscale.md)
- [bmp_mod_noise_rgb](./bmp-mod-noise-rgb.md)
- [bmp_mod_replace_color](./bmp-mod-replace-color.md)
- [bmp_mod_rotate_left](./bmp-mod-rotate-left.md)
- [bmp_mod_rotate_right](./bmp-mod-rotate-right.md)

- [bmp_plot_clear](./bmp-plot-clear.md)
- [bmp_plot_line](./bmp-plot-line.md)
- [bmp_plot_rect](./bmp-plot-rect.md)
- [bmp_plot_resource](./bmp-plot-resource.md)
- [bmp_plot_text](./bmp-plot-text.md)
