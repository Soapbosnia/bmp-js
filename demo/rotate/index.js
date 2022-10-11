// Copyright (C) 2022 Nurudin Imsirovic <github.com/oxou>
//
// Created: 2022-10-11 09:35 AM
// Updated: 2022-10-11 09:55 AM

var image_arrow = bmp_resource_request("../images/arrow.bmp");

var resource = bmp_resource_create_from_bytes(image_arrow);
bmp_resource_spawn(resource, target_bmp_images);

resource = bmp_mod_rotate_left(resource);
bmp_resource_spawn(resource, target_bmp_images);

resource = bmp_mod_rotate_left(resource);
bmp_resource_spawn(resource, target_bmp_images);

resource = bmp_mod_rotate_left(resource);
bmp_resource_spawn(resource, target_bmp_images);
