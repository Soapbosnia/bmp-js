![Cover Image](img/cover-2560x1280.png)

Clone the repo locally by running `git clone https://github.com/oxou/bmp-js`
and browse the `demo` folder for examples of what this library can do.

## Documentation
See [here](docs/readme.md).

## What is the purpose of this?

It may not serve any purpose other than for me to work on it and in the meantime
expand knowledge about data and image processing algorithms used alongside it and
hopefully apply that knowledge on a broader scale.

In my honest opinion I do not think one should deploy this library inside a
production environment although you definitely can do that with the additions of
the newly added Canvas support to the core.

BMPJS itself is not only a library for decoding and encoding Bitmap images, but
also a library that tries to bring extra functionality to the core that allow it
to run specialized tasks on the image pixels themselves.

You can take a look at the [Documentation](docs/readme.md) and [Demos](demo/readme.md)
for more information regarding these extra functionalities.

## Features

- Encode/Decode Bitmap Images.
- Write code that works per-pixel.
- Code can interchangeably work on 2 or more images.
- Sharing of color data between 2 or more images, for example `denoiser`.
- Automatically decodes images as 32-bit (even if they're 24)
- Canvas support has been added for animation purposes and performance.
- Pretty much anything can be generated if you put enough effort to it.
- Make animations using BMPJS with the performance of the Canvas

## Limitations
- Missing lots of vital plot and mod functions.
- Bugs do still exist ;)
