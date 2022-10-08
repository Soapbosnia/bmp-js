// Copyright (C) 2022 Nurudin Imsirovic <github.com/oxou>
//
// Created: 2022-09-19 08:11 PM
// Updated: 2022-10-08 11:59 PM

var blur_amount = 10;

resource = bmp_resource_request("../images/cat.bmp");
resource = bmp_resource_create_from_bytes(resource);

bmp_resource_spawn(resource, target_bmp_images);

function custom_blur(resource, blur_amount) {
    var w = resource.width;
    var h = resource.height;

    for (let z = 0; z < blur_amount; z++) {
        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                var a = bmp_resource_get_pixel(resource, x,     y);
                var u = bmp_resource_get_pixel(resource, x,     y - 1);
                var b = bmp_resource_get_pixel(resource, x,     y + 1);
                var l = bmp_resource_get_pixel(resource, x - 1, y);
                var r = bmp_resource_get_pixel(resource, x + 1, y);

                a = [
                    (a[0] + u[0] + b[0] + l[0] + r[0]) / 5,
                    (a[1] + u[1] + b[1] + l[1] + r[1]) / 5,
                    (a[2] + u[2] + b[2] + l[2] + r[2]) / 5
                ];

                bmp_resource_set_pixel(resource, x, y, a[0], a[1], a[2]);
            }
        }
    }

    bmp_resource_spawn(resource, target_bmp_images);
}

//
// Because functions like custom_blur are intensive by nature, the more function
// calls you make or the bigger the blur_amount in this case, the longer it will
// take to update the resource
//
custom_blur(resource, blur_amount);
