# bmp-js / Documentation

Welcome to BMPJS.

This directory holds all the documentation related to the functions and how-to for using BMPJS.

## Preparing the environment

### Introduction

There are 2 ways to go about setting up the BMPJS environment, those are local and remote.

Local means cloning this GitHub repository and running your own local web-server within the source directory.

Remote means working from a single file, either through a web-server host or running from a local file which sources BMPJS from a remote location.

One limitation of running from a local file versus on a web-server host is that you cannot load bitmaps from a relative path, for example `./img/test.bmp` will fail as the browser forbids reading resources from a local file resource (also known as [**file URI scheme**](https://en.wikipedia.org/wiki/File_URI_scheme).)

For the sake of ease-of-use and simplicity we will be taking the `Local` approach this time. But will warn when transitioning to `Remote` when necessary based on use-case.

### Setting up

Simply copy the source code provided below and paste it into a text editor, then save it somewhere safely under the name `bmpjs.htm`.

Note: You can name the file anything as long as it ends with `.htm` or `.html`.

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

**Expected Result**
![expected-result](./img/001.bmp)
