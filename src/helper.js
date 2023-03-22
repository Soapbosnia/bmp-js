//
// Copyright (C) 2022-2023 Nurudin Imsirovic <github.com/oxou>
//
// Bitmap Image Encoder/Decoder - Helper
// https://www.github.com/oxou/bmp-js
//
// This file is a part of bmp.js but its contents are contained separately.
//
// It defines helper functions to ease the programming of bmp.js
//
// Created: 2022-09-05 10:31 AM
// Updated: 2023-03-19 07:44 PM
//

/**
 * Converts Hexadecimal string back to binary string
 *
 * @param hex Hexadecimal string
 * @return    null | string
 */
function hex2bin(hex = null) {
    if (hex == null)
        return null;

    hex = hex.toLowerCase();
    var hexl = hex.length;

    if ((hexl % 2))
        throw("Hexadecimal input string length must be even");

    var output = "";

    for (let i = 0; i < hexl; i += 2)
        output += String.fromCharCode(parseInt(hex.substr(i, 2), 16));

    return output;
}

/**
 * Converts binary strings to Hexadecimal strings
 *
 * @param bin Binary string
 * @return    null | string
 */
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

/**
 * Convert a hexadecimal byte to an integer
 *
 * @param v Hexadecimal byte
 * @return  null | Integer
 */
function hexdec(v = null) {
    if (v == null)
        return null;

    return parseInt(v, 16);
}

/**
 * Convert an integer to a hexadecimal byte
 *
 * @param v Integer
 * @return  null | Hexadecimal byte
 */
function dechex(v = null) {
    if (v == null)
        return null;

    var h = Number(v).toString(16);

    if (h.length % 2)
        h = '0' + h;

    return h;
}

/**
 * PHP's implementation of str_split in JavaScript. Splits the string into
 * length sized chunks.
 *
 * @param string Input string
 * @param length Split chunk size
 * @return       Array
 */
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

/**
 * Clamps a value between low and high
 *
 * @param v Initial integer
 * @param l Lowest integer allowed
 * @param h Highest integer allowed
 * @return  Number
 */
function clamp(v, l, h) {
    if (l > v) return l;
    if (h < v) return h;
               return v;
}

/**
 * Returns a Unix timestamp
 */
function time() {
    return Math.floor(Date.now() / 1000);
}

/**
 * Returns a Unix timestamp with miliseconds
 */
function time_precise() {
    return Date.now();
}

/**
 * Converts bytes to an Uint8ClampedArray
 *
 * @param str String
 * @return    Uint8ClampedArray
 */
function byte_to_uint8clampedarray(str) {
    str = bin2hex(str);
    str = str_split(str, 2);
    str = str.map(v => hexdec(v));

    return Uint8ClampedArray.from(str);
}

/**
 * Converts Uint8ClampedArray to bytes
 *
 * @param arr Uint8ClampedArray
 * @return    string
 */
function uint8clampedarray_to_byte(arr) {
    arr = [...arr];
    arr = arr.map(v => hex2bin(dechex(v).padStart(2, '0')));
    arr = arr.join('');

    return arr;
}

/**
 * Request raw bytes from URL using synchronous XMLHttpRequest
 * Thanks to: https://tinyurl.com/SendingAndReceivingBinaryData
 *
 * @param url URL pointing to a file
 * @return    false | null | string
 */
function http_get_bytes(url = null) {
    if (url == null)
        return false;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.overrideMimeType("text/plain; charset=x-user-defined");
    xhr.send();

    if (xhr.status != 200)
        return null;

    //
    // WARN(oxou): Had to come up with a solution to remove preceeding 0x7F
    // bytes, which caused misalignment and overall incorrect response of the
    // data. This "hack" solves that issue, but I do not know how stable it is.
    // I've tried several files and it seems to just "work." I hope it stays
    // that way.
    //
    data = xhr.response.split('');
    var data_len = data.length;

    for (var i = 0; i < data_len; i++) {
        var value = bin2hex(data[i]);

        if (value.length > 2) {
            value = value.substr(2, 2);
            data[i] = hex2bin(value);
        }
    }

    return data.join('');
}

/**
 * Linear interpolation.
 *
 * @param a Point a
 * @param b Point b
 * @param t Time
 */
function lerp(a, b, t) {
    return a + (b - a) * t;
}

/**
 * Degree to radian
 *
 * @param deg Degree
 * @return    Number
 */
function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

/**
 * Radian to degree
 *
 * @param rad Radian
 * @return    Number
 */
function rad2deg(rad) {
    return rad * (180 / Math.PI);
}

/**
 * Returns true if N is in range of A and B
 *
 * @param n Initial value
 * @param a Point A
 * @param b Point B
 * @return  false | true
 */
function in_range(n, a, b) {
    return (n >= a &&
            n <= b);
}

/**
 * Returns 1 if positive, -1 if negative, and 0 if none of those
 *
 * @param n Initial value
 * @return  -1 | 0 | 1
 */
function sgn(n) {
    return (n > 0) -
           (n < 0);
}
