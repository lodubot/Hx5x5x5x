"use strict";

const title = "BALIYES";
const slogan = "MAD BY MOTU_PATLU_HINDU_HAI.";
const g = { c1: [80, 80, 80], c2: [200, 200, 200] }; 

console.log(
    [title, slogan]
        .map((line) =>
            line
                .split("")
                .map((ch, i, arr) => {
                    const t = i / (arr.length - 1 || 1);
                    const r = Math.round(g.c1[0] + (g.c2[0] - g.c1[0]) * t);
                    const green = Math.round(g.c1[1] + (g.c2[1] - g.c1[1]) * t);
                    const b = Math.round(g.c1[2] + (g.c2[2] - g.c1[2]) * t);
                    return `\x1b[38;2;${r};${green};${b}m${ch}`;
                })
                .join("") + "\x1b[0m" 
        )
        .join("\n")
);

const __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));

const __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", { value: true });
exports.proto = exports.makeWASocket = void 0;

const { proto } = require("../WAProto");
Object.defineProperty(exports, "proto", { enumerable: true, get: function () { return proto; } });

const { default: socket } = require("./Socket");
exports.makeWASocket = socket;

__exportStar(require("../WAProto"), exports);
__exportStar(require("./Utils"), exports);
__exportStar(require("./Types"), exports);
__exportStar(require("./Store"), exports);
__exportStar(require("./Defaults"), exports);
__exportStar(require("./WABinary"), exports);
__exportStar(require("./WAM"), exports);
__exportStar(require("./WAUSync"), exports);

exports.default = socket;
