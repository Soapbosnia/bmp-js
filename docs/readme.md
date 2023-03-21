# bmp-js / Documentation

Welcome to BMPJS.

This directory holds all the documentation related to the functions and how-to for using BMPJS.

## Preparing the environment

### Introduction

There are 2 ways to go about setting up the BMPJS environment, those are local and remote.

Local means cloning this GitHub repository and running your own local web-server within the source directory.

Remote means working from a single file, either through a web-server host or running from a local file which sources BMPJS from a remote location.

One limitation of running from a local file versus on a web-server host is that you cannot load bitmaps from a relative path, for example `./img/test.bmp` will fail as the browser forbids reading resources from a local file resource (see [**Cross-origin resource sharing**](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing).)

For the sake of ease-of-use and simplicity we will be taking the `Remote` approach this time. But will warn when transitioning to `Local` when necessary based on use-case.

### Notes

- You can name the file anything as long as it ends with `.htm` or `.html`.

- All code examples will use `container` to spawn images into, your code can specify a different variable name or an ID, `container` is just an [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) which we write image elements into.

- If the `container` variable is undefined, you can create it by spawning a HTMLElement node with the ID of `container` or adding `<div id="container"></div>` to your HTML code.

### Setting up (remote)

Simply copy the source code provided below and paste it into a text editor, then save it somewhere safely under the name `bmpjs.htm`.

```html
<script src="https://cdn.jsdelivr.net/gh/oxou/bmp-js/bmp.min.js"></script>

<div id="container"></div>

<script>
    // Create a resource across 320 x 320 pixels.
    var resource = bmp_create(320, 320);

    // Clear the entire resource's background with a dark red color
    bmp_plot_clear(resource, 64, 0, 0);

    // Plot a rectangle at 0,0 with dimensions of 160,160
    bmp_plot_rect(resource, 0, 0, 160, 160, 192, 0, 0);

    // Spawn the resource inside the HTMLElement #container
    bmp_spawn(resource, container);
</script>
```

### Setting up (local)

```html
<script src="./helper.js"></script>
<script src="./bmp.js"></script>
<script src="./bmp-plot.js"></script>
<script src="./bmp-mods.js"></script>

<div id="container"></div>

<script>
    // Create a resource across 320 x 320 pixels.
    var resource = bmp_create(320, 320);

    // Clear the entire resource's background with a dark red color
    bmp_plot_clear(resource, 64, 0, 0);

    // Plot a rectangle at 0,0 with dimensions of 160,160
    bmp_plot_rect(resource, 0, 0, 160, 160, 192, 0, 0);

    // Spawn the resource inside the HTMLElement #container
    bmp_spawn(resource, container);
</script>
```

## Expected Result

![expected-result](./img/001.png)

## Other documentations
### Core
- [bmp_le_int](./bmp_le_int.md)
- [bmp_le_byte](./bmp_le_byte.md)
- [bmp_create](./bmp_create.md)
- [bmp_valid](./bmp_valid.md)
- [bmp_get_pixel](./bmp_get_pixel.md)
- [bmp_set_pixel](./bmp_set_pixel.md)
- [bmp_to_bytes](./bmp_to_bytes.md)
- [bmp_size](./bmp_size.md)
- [bmp_get_pixels](./bmp_get_pixels.md)
- [bmp_create_pixels](./bmp_create_pixels.md)
- [bmp_reset_alpha](./bmp_reset_alpha.md)
- [bmp_create_uri](./bmp_create_uri.md)
- [bmp_spawn](./bmp_spawn.md)
- [bmp_replace](./bmp_replace.md)
- [bmp_filesize](./bmp_filesize.md)
- [bmp_from_raw](./bmp_from_raw.md)
- [bmp_getpos_24](./bmp_getpos_24.md)
- [bmp_getpos_32](./bmp_getpos_32.md)
- [bmp_request](./bmp_request.md)
- [bmp_copy](./bmp_copy.md)
- [bmp_save](./bmp_save.md)
- [bmp_to_canvas](./bmp_to_canvas.md)
- [bmp_load](./bmp_load.md)

### Mods
- [bmp_mod_apply_convolution_matrix](./bmp_mod_apply_convolution_matrix.md)
- [bmp_mod_blur_box](./bmp_mod_blur_box.md)
- [bmp_mod_blur_gaussian](./bmp_mod_blur_gaussian.md)
- [bmp_mod_color_1bit](./bmp_mod_color_1bit.md)
- [bmp_mod_color_grayscale](./bmp_mod_color_grayscale.md)
- [bmp_mod_color_invert](./bmp_mod_color_invert.md)
- [bmp_mod_crop](./bmp_mod_crop.md)
- [bmp_mod_detect_edge](./bmp_mod_detect_edge.md)
- [bmp_mod_dissect_font](./bmp_mod_dissect_font.md)
- [bmp_mod_emboss](./bmp_mod_emboss.md)
- [bmp_mod_flip_x](./bmp_mod_flip_x.md)
- [bmp_mod_flip_y](./bmp_mod_flip_y.md)
- [bmp_mod_get_channel](./bmp_mod_get_channel.md)
- [bmp_mod_noise_grayscale](./bmp_mod_noise_grayscale.md)
- [bmp_mod_noise_rgb](./bmp_mod_noise_rgb.md)
- [bmp_mod_pixelate](./bmp_mod_pixelate.md)
- [bmp_mod_replace_color](./bmp_mod_replace_color.md)
- [bmp_mod_resize](./bmp_mod_resize.md)
- [bmp_mod_rotate_left](./bmp_mod_rotate_left.md)
- [bmp_mod_rotate_right](./bmp_mod_rotate_right.md)
- [bmp_mod_sharpen](./bmp_mod_sharpen.md)

### Plot
- [bmp_plot_arrow_down](./bmp-plot-arrow-down.md)
- [bmp_plot_arrow_left](./bmp-plot-arrow-left.md)
- [bmp_plot_arrow_right](./bmp-plot-arrow-right.md)
- [bmp_plot_arrow_up](./bmp-plot-arrow-up.md)
- [bmp_plot_circle](./bmp-plot-circle.md)
- [bmp_plot_clear](./bmp-plot-clear.md)
- [bmp_plot_fill](./bmp-plot-fill.md)
- [bmp_plot_line](./bmp-plot-line.md)
- [bmp_plot_rect](./bmp-plot-rect.md)
- [bmp_plot_resource](./bmp-plot-resource.md)
- [bmp_plot_text](./bmp-plot-text.md)
- [bmp_plot_triangle](./bmp-plot-triangle.md)
