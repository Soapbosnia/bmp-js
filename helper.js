//
// Copyright (C) 2022 Nurudin Imsirovic <github.com/oxou>
//
// Bitmap Image Encoder/Decoder - Helper
// https://www.github.com/oxou/bmp-js
//
// This file is a part of bmp.js but its contents are contained separately.
//
// It defines helper functions to ease the programming of bmp.js
//
// Created: 2022-09-05 10:31 AM
// Updated: 2022-09-30 01:05 AM
//

function hex2bin(hex = null) {
    if (hex == null)
        return null;

    hex = hex.toLowerCase();
    var hexl = hex.length;

    if ((hexl % 2))
        throw("Hexadecimal input string length must be even");

    for (let i = 0; i < hexl; i++) {
        var ord = Number(hex.charCodeAt(i));

        if (!(ord > 47 && ord < 58 || ord > 96 && ord < 103))
            throw("Input string must be hexadecimal");
    }

    var output = "";

    for (let i = 0; i < hexl; i += 2)
        output += String.fromCharCode(parseInt(hex.substr(i, 2), 16));

    return output;
}

function bin2hex(bin = null) {
    if (bin == null)
        return null;

    var binl = bin.length;
    var output = "";

    for (let i = 0; i < binl; i++) {
        var hex = bin.charCodeAt(i).toString(16);

        if (2 > hex.length)
            hex = '0' + hex;

        output += hex;
    }

    return output;
}

function hexdec(v = null) {
    if (v == null)
        return null;

    return Number(parseInt(v, 16).toString()); // NOTE(oxou) [2022-09-24] Added Number type
}

function dechex(v = null) {
    if (v == null)
        return null;

    return Number(v).toString(16);
}

function str_split(string, length = 1) {
    if (0 >= length)
        length = 1;

    if (length == 1)
        return string.split('');

    var string_size = string.length;
    var result = [];

    for (let i = 0; i < string_size / length; i++)
        result[i] = string.substr(i * length, length);

    return result;
}

function clamp(v, l, h) {
    if (l > v) return l;
    if (h < v) return h;
               return v;
}

function time() {
    return Math.floor(Date.now() / 1000);
}

function time_precise() {
    return Date.now();
}

function byte_to_uint8array(str) {
    str = bin2hex(str);
    str = str_split(str, 2);
    str = str.map(v => hexdec(v));

    return Uint8Array.from(str);
}

function uint8array_to_byte(arr) {
    arr = [...arr];
    arr = arr.map(v => hex2bin(dechex(v).padStart(2, '0')));
    arr = arr.join('');

    return arr;
}
