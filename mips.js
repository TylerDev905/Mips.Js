// JQuery is needed

$(document).ready(function(){

    Array.prototype.contains = function(string){
        if(this.indexOf(string) > -1)
            return true;
        return false;
    }

    String.prototype.insert = function (index, string){
        if (index > 0)
            return this.substring(0, index) + string + this.substring(index, this.length);
        else
            return string + this;
    };

    String.prototype.remove = function(index, size){
        return this.substr(0, index) + this.substr(index + size, this.length);
    }

    String.prototype.rangeReplace = function(index, string){
        return this.remove(index, string.length).insert(index, string);
    }

    String.prototype.padLeft = function(size, char){
        return Array(size - String(this).length + 1)
            .join(parseInt(char) ||'0') + this;
    }

    String.prototype.removeSpaces = function(){
        return this.replace(/ /g,'');
    }

    String.prototype.toHex = function(){
        return new Hex(this);
    }

    String.prototype.toBinary = function(){
        return new Binary(this);
    }

    var Binary = function(binaryString){
        binaryString = binaryString.removeSpaces();
        var pattern = /[0-1]{4,}/;
        if(binaryString.length % 4 && pattern.test(binaryString))
            throw "The binary string supplied is not valid."

        return{
            value: binaryString,
            toHex: function(){
                return new Hex(parseInt(this.value, 2)
                    .toString(16)
                    .padLeft(this.value.length / 4, '0'));
            },
            toInt: function(){
                return parseInt(this.value, 2);
            },
            insert: function(index, string){
                this.value = this.value.rangeReplace(index, string);
                return this;
            }
        }
    };

    var Hex = function(hexString){ 
        hexString = hexString.removeSpaces();
        var pattern = /[0-9a-f]{2,}/i;
        if(hexString.length % 2 && pattern.test(hexString))
            throw "The hex string supplied is not valid."

        return{
            value: hexString,
            toBinary: function(){
                return new Binary(parseInt(this.value, 16)
                    .toString(2)
                    .padLeft(this.value.length * 4, '0'));
            },
            toInt: function(){
                return parseInt(this.value, 16);
            },
            insert: function(index, string){
                this.value = this.value
                    .rangeReplace(index, string);
                return this;
            }
        }
    };

    var Mips = function(){
        return {
            "memory": {
                "EE": 0,
                "COP0": 1,
                "COP1": 2
            },
            "registers": {
                "EE": {
                "memory": 0,
                "items": [
                    {
                    "binary": "00000",
                    "hex": "0000",
                    "description": "This register will result to always being zero.",
                    "value": "zero",
                    "int": 1
                    },
                    {
                    "binary": "00001",
                    "hex": "0001",
                    "description": "This register is set aside for the assembler.",
                    "value": "at",
                    "int": 2
                    },
                    {
                    "binary": "00010",
                    "hex": "0002",
                    "description": "This register is used as a return value.",
                    "value": "v0",
                    "int": 3
                    },
                    {
                    "binary": "00011",
                    "hex": "0003",
                    "description": "This register is used as a return value.",
                    "value": "v1",
                    "int": 4
                    },
                    {
                    "binary": "00100",
                    "hex": "0004",
                    "description": "This register is used as an Argument.",
                    "value": "a0",
                    "int": 5
                    },
                    {
                    "binary": "00101",
                    "hex": "0005",
                    "description": "This register is used as an Argument.",
                    "value": "a1",
                    "int": 6
                    },
                    {
                    "binary": "00110",
                    "hex": "0006",
                    "description": "This register is used as an Argument.",
                    "value": "a2",
                    "int": 7
                    },
                    {
                    "binary": "00111",
                    "hex": "0007",
                    "description": "This register is used as an Argument.",
                    "value": "a3",
                    "int": 8
                    },
                    {
                    "binary": "01000",
                    "hex": "0008",
                    "description": "This register is used as temporary storage.",
                    "value": "t0",
                    "int": 9
                    },
                    {
                    "binary": "01001",
                    "hex": "0009",
                    "description": "This register is used as temporary storage.",
                    "value": "t1",
                    "int": 10
                    },
                    {
                    "binary": "01010",
                    "hex": "000a",
                    "description": "This register is used as temporary storage.",
                    "value": "t2",
                    "int": 11
                    },
                    {
                    "binary": "01011",
                    "hex": "000b",
                    "description": "This register is used as temporary storage.",
                    "value": "t3",
                    "int": 12
                    },
                    {
                    "binary": "01100",
                    "hex": "000c",
                    "description": "This register is used as temporary storage.",
                    "value": "t4",
                    "int": 13
                    },
                    {
                    "binary": "01101",
                    "hex": "000d",
                    "description": "This register is used as temporary storage.",
                    "value": "t5",
                    "int": 14
                    },
                    {
                    "binary": "01110",
                    "hex": "000e",
                    "description": "This register is used as temporary storage.",
                    "value": "t6",
                    "int": 15
                    },
                    {
                    "binary": "01111",
                    "hex": "000f",
                    "description": "This register is used as temporary storage.",
                    "value": "t7",
                    "int": 16
                    },
                    {
                    "binary": "10000",
                    "hex": "0010",
                    "description": "This register is used as saved storage.",
                    "value": "s0",
                    "int": 17
                    },
                    {
                    "binary": "10001",
                    "hex": "0011",
                    "description": "This register is used as saved storage.",
                    "value": "s1",
                    "int": 18
                    },
                    {
                    "binary": "10010",
                    "hex": "0012",
                    "description": "This register is used as saved storage.",
                    "value": "s2",
                    "int": 19
                    },
                    {
                    "binary": "10011",
                    "hex": "0013",
                    "description": "This register is used as saved storage.",
                    "value": "s3",
                    "int": 20
                    },
                    {
                    "binary": "10100",
                    "hex": "0014",
                    "description": "This register is used as saved storage.",
                    "value": "s4",
                    "int": 21
                    },
                    {
                    "binary": "10101",
                    "hex": "0015",
                    "description": "This register is used as saved storage.",
                    "value": "s5",
                    "int": 22
                    },
                    {
                    "binary": "10110",
                    "hex": "0016",
                    "description": "This register is used as saved storage.",
                    "value": "s6",
                    "int": 23
                    },
                    {
                    "binary": "10111",
                    "hex": "0017",
                    "description": "This register is used as saved storage.",
                    "value": "s7",
                    "int": 24
                    },
                    {
                    "binary": "11000",
                    "hex": "0018",
                    "description": "This register is used as temporary storage.",
                    "value": "t8",
                    "int": 25
                    },
                    {
                    "binary": "11001",
                    "hex": "0019",
                    "description": "This register is used as temporary storage.",
                    "value": "t9",
                    "int": 26
                    },
                    {
                    "binary": "11010",
                    "hex": "001a",
                    "description": "This register is used as a kernal register.",
                    "value": "k0",
                    "int": 27
                    },
                    {
                    "binary": "11011",
                    "hex": "001b",
                    "description": "This register is used as a kernal register.",
                    "value": "k1",
                    "int": 28
                    },
                    {
                    "binary": "11100",
                    "hex": "001c",
                    "description": "This register is used as a global pointer.",
                    "value": "gp",
                    "int": 29
                    },
                    {
                    "binary": "11101",
                    "hex": "001d",
                    "description": "This register is used as a stack pointer.",
                    "value": "sp",
                    "int": 30
                    },
                    {
                    "binary": "11110",
                    "hex": "001e",
                    "description": "This register is used as a frame pointer.",
                    "value": "fp",
                    "int": 31
                    },
                    {
                    "binary": "11111",
                    "hex": "001f",
                    "description": "This register is used for storage of a return address.",
                    "value": "ra",
                    "int": 32
                    }
                ]
                },
                "COP0": {
                "memory": 1,
                "items": [
                    {
                    "binary": "00000",
                    "hex": "0000",
                    "description": "None",
                    "value": "index",
                    "int": 33
                    },
                    {
                    "binary": "00001",
                    "hex": "0001",
                    "description": "None",
                    "value": "random",
                    "int": 34
                    },
                    {
                    "binary": "00010",
                    "hex": "0002",
                    "description": "None",
                    "value": "entrylo0",
                    "int": 35
                    },
                    {
                    "binary": "00011",
                    "hex": "0003",
                    "description": "None",
                    "value": "entryo1",
                    "int": 36
                    },
                    {
                    "binary": "00100",
                    "hex": "0004",
                    "description": "None",
                    "value": "context",
                    "int": 37
                    },
                    {
                    "binary": "00101",
                    "hex": "0005",
                    "description": "None",
                    "value": "pagemask",
                    "int": 38
                    },
                    {
                    "binary": "00110",
                    "hex": "0006",
                    "description": "None",
                    "value": "wired",
                    "int": 39
                    },
                    {
                    "binary": "00111",
                    "hex": "0007",
                    "description": "None",
                    "value": "7",
                    "int": 40
                    },
                    {
                    "binary": "01000",
                    "hex": "0008",
                    "description": "None",
                    "value": "badvaddr",
                    "int": 41
                    },
                    {
                    "binary": "01001",
                    "hex": "0009",
                    "description": "None",
                    "value": "count",
                    "int": 42
                    },
                    {
                    "binary": "01010",
                    "hex": "000a",
                    "description": "None",
                    "value": "entryhi",
                    "int": 43
                    },
                    {
                    "binary": "01011",
                    "hex": "000b",
                    "description": "None",
                    "value": "compare",
                    "int": 44
                    },
                    {
                    "binary": "01100",
                    "hex": "000c",
                    "description": "None",
                    "value": "status",
                    "int": 45
                    },
                    {
                    "binary": "01101",
                    "hex": "000d",
                    "description": "None",
                    "value": "cause",
                    "int": 46
                    },
                    {
                    "binary": "01110",
                    "hex": "000e",
                    "description": "None",
                    "value": "epc",
                    "int": 47
                    },
                    {
                    "binary": "01111",
                    "hex": "000f",
                    "description": "None",
                    "value": "prid",
                    "int": 48
                    },
                    {
                    "binary": "10000",
                    "hex": "0010",
                    "description": "None",
                    "value": "config",
                    "int": 49
                    },
                    {
                    "binary": "10001",
                    "hex": "0011",
                    "description": "None",
                    "value": "lladr",
                    "int": 50
                    },
                    {
                    "binary": "10010",
                    "hex": "0012",
                    "description": "None",
                    "value": "watchlo",
                    "int": 51
                    },
                    {
                    "binary": "10011",
                    "hex": "0013",
                    "description": "None",
                    "value": "watchhi",
                    "int": 52
                    },
                    {
                    "binary": "10100",
                    "hex": "0014",
                    "description": "None",
                    "value": "xcontext",
                    "int": 53
                    },
                    {
                    "binary": "10101",
                    "hex": "0015",
                    "description": "None",
                    "value": "21",
                    "int": 54
                    },
                    {
                    "binary": "10110",
                    "hex": "0016",
                    "description": "None",
                    "value": "22",
                    "int": 55
                    },
                    {
                    "binary": "10111",
                    "hex": "0017",
                    "description": "None",
                    "value": "badpaddr",
                    "int": 56
                    },
                    {
                    "binary": "11000",
                    "hex": "0018",
                    "description": "None",
                    "value": "debug",
                    "int": 57
                    },
                    {
                    "binary": "11001",
                    "hex": "0019",
                    "description": "None",
                    "value": "perf",
                    "int": 58
                    },
                    {
                    "binary": "11010",
                    "hex": "001a",
                    "description": "None",
                    "value": "ecc",
                    "int": 59
                    },
                    {
                    "binary": "11011",
                    "hex": "001b",
                    "description": "None",
                    "value": "cacheerr",
                    "int": 60
                    },
                    {
                    "binary": "11100",
                    "hex": "001c",
                    "description": "None",
                    "value": "taglo",
                    "int": 61
                    },
                    {
                    "binary": "11101",
                    "hex": "001d",
                    "description": "None",
                    "value": "taghi",
                    "int": 62
                    },
                    {
                    "binary": "11110",
                    "hex": "001e",
                    "description": "None",
                    "value": "errepc",
                    "int": 63
                    },
                    {
                    "binary": "11111",
                    "hex": "001f",
                    "description": "None",
                    "value": "31",
                    "int": 64
                    }
                ]
                },
                "COP1": {
                "memory": 2,
                "items": [
                    {
                    "binary": "00000",
                    "hex": "0000",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f0",
                    "int": 65
                    },
                    {
                    "binary": "00001",
                    "hex": "0001",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f1",
                    "int": 66
                    },
                    {
                    "binary": "00010",
                    "hex": "0002",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f2",
                    "int": 67
                    },
                    {
                    "binary": "00011",
                    "hex": "0003",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f3",
                    "int": 68
                    },
                    {
                    "binary": "00100",
                    "hex": "0004",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f4",
                    "int": 69
                    },
                    {
                    "binary": "00101",
                    "hex": "0005",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f5",
                    "int": 70
                    },
                    {
                    "binary": "00110",
                    "hex": "0006",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f6",
                    "int": 71
                    },
                    {
                    "binary": "00111",
                    "hex": "0007",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f7",
                    "int": 72
                    },
                    {
                    "binary": "01000",
                    "hex": "0008",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f8",
                    "int": 73
                    },
                    {
                    "binary": "01001",
                    "hex": "0009",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f9",
                    "int": 74
                    },
                    {
                    "binary": "01010",
                    "hex": "000a",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f10",
                    "int": 75
                    },
                    {
                    "binary": "01011",
                    "hex": "000b",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f11",
                    "int": 76
                    },
                    {
                    "binary": "01100",
                    "hex": "000c",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f12",
                    "int": 77
                    },
                    {
                    "binary": "01101",
                    "hex": "000d",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f13",
                    "int": 78
                    },
                    {
                    "binary": "01110",
                    "hex": "000e",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f14",
                    "int": 79
                    },
                    {
                    "binary": "01111",
                    "hex": "000f",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f15",
                    "int": 80
                    },
                    {
                    "binary": "10000",
                    "hex": "0010",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f16",
                    "int": 81
                    },
                    {
                    "binary": "10001",
                    "hex": "0011",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f17",
                    "int": 82
                    },
                    {
                    "binary": "10010",
                    "hex": "0012",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f18",
                    "int": 83
                    },
                    {
                    "binary": "10011",
                    "hex": "0013",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f19",
                    "int": 84
                    },
                    {
                    "binary": "10100",
                    "hex": "0014",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f20",
                    "int": 85
                    },
                    {
                    "binary": "10101",
                    "hex": "0015",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f21",
                    "int": 86
                    },
                    {
                    "binary": "10110",
                    "hex": "0016",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f22",
                    "int": 87
                    },
                    {
                    "binary": "10111",
                    "hex": "0017",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f23",
                    "int": 88
                    },
                    {
                    "binary": "11000",
                    "hex": "0018",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f24",
                    "int": 89
                    },
                    {
                    "binary": "11001",
                    "hex": "0019",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f25",
                    "int": 90
                    },
                    {
                    "binary": "11010",
                    "hex": "001a",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f26",
                    "int": 91
                    },
                    {
                    "binary": "11011",
                    "hex": "001b",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f27",
                    "int": 92
                    },
                    {
                    "binary": "11100",
                    "hex": "001c",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f28",
                    "int": 93
                    },
                    {
                    "binary": "11101",
                    "hex": "001d",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f29",
                    "int": 94
                    },
                    {
                    "binary": "11110",
                    "hex": "001e",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f30",
                    "int": 95
                    },
                    {
                    "binary": "11111",
                    "hex": "001f",
                    "description": "This register is reserved for floating point numbers.",
                    "value": "$f31",
                    "int": 96
                    }
                ]
                }
            },
            "instructions": [
                {
                "name": "NOP",
                "description": "No Operation",
                "syntax": [
                    "NOP"
                ],
                "binary": "00000000000000000000000000000000",
                "mask": "11111111111111111111111111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 32,
                    "value": "0"
                    }
                ]
                },
                {
                "name": "ADD",
                "description": "Add Word",
                "syntax": [
                    "ADD rd, rs, rt"
                ],
                "binary": "00000000000000000000000000100000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "ADD"
                    }
                ]
                },
                {
                "name": "ADDI",
                "description": "Add Immediate Word",
                "syntax": [
                    "ADDI rt, rs, immediate"
                ],
                "binary": "00100000000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "immediate"
                    }
                ]
                },
                {
                "name": "ADDIU",
                "description": "Add Immediate Unsigned Word",
                "syntax": [
                    "ADDIU rt, rs, immediate"
                ],
                "binary": "00100100000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "ADDIU"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "immediate"
                    }
                ]
                },
                {
                "name": "ADDU",
                "description": "Add Unsigned Word",
                "syntax": [
                    "ADDU rd, rs, rt"
                ],
                "binary": "00000000000000000000000000100001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "ADDU"
                    }
                ]
                },
                {
                "name": "AND",
                "description": "And",
                "syntax": [
                    "AND rd, rs, rt"
                ],
                "binary": "00000000000000000000000000100100",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "AND"
                    }
                ]
                },
                {
                "name": "ANDI",
                "description": "Add Immediate",
                "syntax": [
                    "ANDI rt, rs, immediate"
                ],
                "binary": "00110000000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "ANDI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "immediate"
                    }
                ]
                },
                {
                "name": "BEQ",
                "description": "Branch on Equal",
                "syntax": [
                    "BEQ rs, rt, offset"
                ],
                "binary": "00010000000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "BEQ"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BEQL",
                "description": "Branch on Equal Likely",
                "syntax": [
                    "BEQL rs, rt, offset"
                ],
                "binary": "01010000000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "BEQL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BGEZ",
                "description": "Branch on Greater Than or Equal to Zero",
                "syntax": [
                    "BGEZ rs, offset"
                ],
                "binary": "00000100000000010000000000000000",
                "mask": "11111100000111110000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "REGIMM"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "BGEZ"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BGEZAL",
                "description": "Branch on Greater Than or Equal to Zero and Link",
                "syntax": [
                    "BGEZAL rs, offset"
                ],
                "binary": "00000100000100010000000000000000",
                "mask": "11111100000111110000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "REGIMM"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "BGEZAL"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BGEZALL",
                "description": "Branch on Greater Than or Equal to Zero and Link Likely",
                "syntax": [
                    "BGEZALL rs, offset"
                ],
                "binary": "00000100000100110000000000000000",
                "mask": "11111100000111110000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "REGIMM"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "BGEZALL"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BGEZL",
                "description": "Branch on Greater Than or Equal to Zero Likely",
                "syntax": [
                    "BGEZL rs, offset"
                ],
                "binary": "00000100000000110000000000000000",
                "mask": "11111100000111110000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "REGIMM"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "BGEZL"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BGTZ",
                "description": "Branch on Greater Than Zero",
                "syntax": [
                    "BGTZ rs, offset"
                ],
                "binary": "00011100000000000000000000000000",
                "mask": "11111100000111110000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "BGTZ"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BGTZL",
                "description": "Branch on Greater Than Zero Likely",
                "syntax": [
                    "BGTZL rs, offset"
                ],
                "binary": "01011100000000000000000000000000",
                "mask": "11111100000111110000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "BGTZL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BLEZ",
                "description": "Branch on Less Than or Equal to Zero",
                "syntax": [
                    "BLEZ rs, offset"
                ],
                "binary": "00011000000000000000000000000000",
                "mask": "11111100000111110000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "BLEZ"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BLEZL",
                "description": "Branch on Less Than or Equal to Zero Likely",
                "syntax": [
                    "BLEZL rs, offset"
                ],
                "binary": "01011000000000000000000000000000",
                "mask": "11111100000111110000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "BLEZL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BLTZ",
                "description": "Branch on Less Than Zero",
                "syntax": [
                    "BLTZ rs, offset"
                ],
                "binary": "00000100000000000000000000000000",
                "mask": "11111100000111110000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "REGIMM"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "BLTZ"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BLTZAL",
                "description": "Branch on Less Than Zero and Link",
                "syntax": [
                    "BLTZAL rs, offset"
                ],
                "binary": "00000100000100000000000000000000",
                "mask": "11111100000111110000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "REGIMM"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "BLTZAL"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BLTZALL",
                "description": "Branch on Less Than Zero and Link Likely",
                "syntax": [
                    "BLTZALL rs, offset"
                ],
                "binary": "00000100000100100000000000000000",
                "mask": "11111100000111110000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "REGIMM"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "BLTZALL"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BLTZL",
                "description": "Branch on Less Than Zero Likely",
                "syntax": [
                    "BLTZL rs, offset"
                ],
                "binary": "00000100000000100000000000000000",
                "mask": "11111100000111110000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "REGIMM"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "BLTZL"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BNE",
                "description": "Branch on Not Equal",
                "syntax": [
                    "BNE rs, rt, offset"
                ],
                "binary": "00010100000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "BNE"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BNEL",
                "description": "Branch on Not Equal Likely",
                "syntax": [
                    "BNEL rs, rt, offset"
                ],
                "binary": "01010100000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "BNEL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BREAK",
                "description": "Breakpoint",
                "syntax": [
                    "BREAK (code)"
                ],
                "binary": "00000000000000000000000000001101",
                "mask": "11111100000000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 20,
                    "value": "code"
                    },
                    {
                    "size": 6,
                    "value": "BREAK"
                    }
                ]
                },
                {
                "name": "DADD",
                "description": "Doubleword Add",
                "syntax": [
                    "DADD rd, rs, rt"
                ],
                "binary": "00000000000000000000000000101100",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "DADD"
                    }
                ]
                },
                {
                "name": "DADDI",
                "description": "Doubleword Add Immediate",
                "syntax": [
                    "DADDI rt, rs, immediate"
                ],
                "binary": "01100000000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "DADDI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "immediate"
                    }
                ]
                },
                {
                "name": "DADDIU",
                "description": "Doubleword Add Immediate Unsigned",
                "syntax": [
                    "DADDIU rt, rs, immediate"
                ],
                "binary": "01100100000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "DADDIU"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "immediate"
                    }
                ]
                },
                {
                "name": "DADDU",
                "description": "Doubleword Add Unsigned",
                "syntax": [
                    "DADDU rd, rs, rt"
                ],
                "binary": "00000000000000000000000000101101",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "DADDU"
                    }
                ]
                },
                {
                "name": "DIV",
                "description": "Divide Word",
                "syntax": [
                    "DIV rs, rt"
                ],
                "binary": "00000000000000000000000000011010",
                "mask": "11111100000000001111111111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 10,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "DIV"
                    }
                ]
                },
                {
                "name": "DIVU",
                "description": "Divide Unsigned Word",
                "syntax": [
                    "DIVU rs, rt"
                ],
                "binary": "00000000000000000000000000011011",
                "mask": "11111100000000001111111111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 10,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "DIVU"
                    }
                ]
                },
                {
                "name": "DSLL",
                "description": "Doubleword Shift Left Logical",
                "syntax": [
                    "DSLL rd, rt, sa"
                ],
                "binary": "00000000000000000000000000111000",
                "mask": "11111111111000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "sa"
                    },
                    {
                    "size": 6,
                    "value": "DSLL"
                    }
                ]
                },
                {
                "name": "DSLL32",
                "description": "Doubleword Shift Left Logical Plus 32",
                "syntax": [
                    "DSLL32 rd, rt, sa"
                ],
                "binary": "00000000000000000000000000111100",
                "mask": "11111111111000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "sa"
                    },
                    {
                    "size": 6,
                    "value": "DSLL32"
                    }
                ]
                },
                {
                "name": "DSLLV",
                "description": "Doubleword Shift Left Logical Variable",
                "syntax": [
                    "DSLLV rd, rt, rs"
                ],
                "binary": "00000000000000000000000000010100",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "DSLLV"
                    }
                ]
                },
                {
                "name": "DSRA",
                "description": "Doubleword Shift Right Arithmetic",
                "syntax": [
                    "DSRA rd, rt, sa"
                ],
                "binary": "00000000000000000000000000111011",
                "mask": "11111111111000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "sa"
                    },
                    {
                    "size": 6,
                    "value": "DSRA"
                    }
                ]
                },
                {
                "name": "DSRA32",
                "description": "Doubleword Shift Right Arithmetic Plus 32",
                "syntax": [
                    "DSRA32 rd, rt, sa"
                ],
                "binary": "00000000000000000000000000111111",
                "mask": "11111111111000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "sa"
                    },
                    {
                    "size": 6,
                    "value": "DSRA32"
                    }
                ]
                },
                {
                "name": "DSRAV",
                "description": "Doubleword Shift Right Arithmetic Variable",
                "syntax": [
                    "DSRAV rd, rt, rs"
                ],
                "binary": "00000000000000000000000000010111",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "DSRAV"
                    }
                ]
                },
                {
                "name": "DSRL",
                "description": "Doubleword Shift Right Logical",
                "syntax": [
                    "DSRL rd, rt, sa"
                ],
                "binary": "00000000000000000000000000111010",
                "mask": "11111111111000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "sa"
                    },
                    {
                    "size": 6,
                    "value": "DSRL"
                    }
                ]
                },
                {
                "name": "DSRL32",
                "description": "Doubleword Shift Right Logical Plus 32",
                "syntax": [
                    "DSRL32 rd, rt, sa"
                ],
                "binary": "00000000000000000000000000111110",
                "mask": "11111111111000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "sa"
                    },
                    {
                    "size": 6,
                    "value": "DSRL32"
                    }
                ]
                },
                {
                "name": "DSRLV",
                "description": "Doubleword Shift Right Logical Variable",
                "syntax": [
                    "DSRLV rd, rt, rs"
                ],
                "binary": "00000000000000000000000000010110",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "DSRLV"
                    }
                ]
                },
                {
                "name": "DSUB",
                "description": "Doubleword Subtract",
                "syntax": [
                    "DSUB rd, rs, rt"
                ],
                "binary": "00000000000000000000000000101110",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "DSUB"
                    }
                ]
                },
                {
                "name": "DSUBU",
                "description": "Doubleword Subtract Unsigned",
                "syntax": [
                    "DSUBU rd, rs, rt"
                ],
                "binary": "00000000000000000000000000101111",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "DSUBU"
                    }
                ]
                },
                {
                "name": "J",
                "description": "Jump",
                "syntax": [
                    "J target"
                ],
                "binary": "00001000000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "J"
                    },
                    {
                    "size": 26,
                    "value": "target"
                    }
                ]
                },
                {
                "name": "JAL",
                "description": "Jump and Link",
                "syntax": [
                    "JAL target"
                ],
                "binary": "00001100000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "JAL"
                    },
                    {
                    "size": 26,
                    "value": "target"
                    }
                ]
                },
                {
                "name": "JALR",
                "description": "Jump and Link Register",
                "syntax": [
                    "JALR rs",
                    "JALR rd, rs"
                ],
                "binary": "00000000000000000000000000001001",
                "mask": "11111100000111110000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "JALR"
                    },
                    {
                    "size": null
                    }
                ]
                },
                {
                "name": "JR",
                "description": "Jump Register",
                "syntax": [
                    "JR rs"
                ],
                "binary": "00000000000000000000000000001000",
                "mask": "11111100000111111111111111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 15,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "JR"
                    }
                ]
                },
                {
                "name": "LB",
                "description": "Load Byte",
                "syntax": [
                    "LB rt, offset(base)"
                ],
                "binary": "10000000000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "LB"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "LBU",
                "description": "Load Byte Unsigned",
                "syntax": [
                    "LBU rt, offset(base)"
                ],
                "binary": "10010000000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "LBU"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "LD",
                "description": "Load Doubleword",
                "syntax": [
                    "LD rt, offset(base)"
                ],
                "binary": "11011100000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "LD"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "LDL",
                "description": "Load Doubleword Left",
                "syntax": [
                    "LDL rt, offset(base)"
                ],
                "binary": "01101000000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "LDL"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "LDR",
                "description": "Load Doubleword Right",
                "syntax": [
                    "LDR rt, offset(base)"
                ],
                "binary": "01101100000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "LDR"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "LH",
                "description": "Load Halfword",
                "syntax": [
                    "LH rt, offset(base)"
                ],
                "binary": "10000100000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "LH"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "LHU",
                "description": "Load Halfword Unsigned",
                "syntax": [
                    "LHU rt, offset(base)"
                ],
                "binary": "10010100000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "LHU"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "LUI",
                "description": "Load Upper Immediate",
                "syntax": [
                    "LUI rt, immediate"
                ],
                "binary": "00111100000000000000000000000000",
                "mask": "11111111111000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "LUI"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "immediate"
                    }
                ]
                },
                {
                "name": "LW",
                "description": "Load Word",
                "syntax": [
                    "LW rt, offset(base)"
                ],
                "binary": "10001100000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "LW"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "LWL",
                "description": "Load Word Left",
                "syntax": [
                    "LWL rt, offset(base)"
                ],
                "binary": "10001000000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "LWL"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "LWR",
                "description": "Load Word Right",
                "syntax": [
                    "LWR rt, offset(base)"
                ],
                "binary": "10011000000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "LWR"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "LWU",
                "description": "Load Word Unsigned",
                "syntax": [
                    "LWU rt, offset(base)"
                ],
                "binary": "10011100000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "LWU"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "MFHI",
                "description": "Move from HI Register",
                "syntax": [
                    "MFHI rd"
                ],
                "binary": "00000000000000000000000000010000",
                "mask": "11111111111111110000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 10,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MFHI"
                    }
                ]
                },
                {
                "name": "MFLO",
                "description": "Move from LO Register",
                "syntax": [
                    "MFLO rd"
                ],
                "binary": "00000000000000000000000000010010",
                "mask": "11111111111111110000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 10,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MFLO"
                    }
                ]
                },
                {
                "name": "MOVN",
                "description": "Move Conditional on Not Zero",
                "syntax": [
                    "MOVN rd, rs, rt"
                ],
                "binary": "00000000000000000000000000001011",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MOVN"
                    }
                ]
                },
                {
                "name": "MOVZ",
                "description": "Move Conditional on Zero",
                "syntax": [
                    "MOVZ rd, rs, rt"
                ],
                "binary": "00000000000000000000000000001010",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MOVZ"
                    },
                    {
                    "size": null,
                    "value": " Move to HI Register"
                    },
                    {
                    "size": null
                    },
                    {
                    "size": 10001
                    },
                    {
                    "size": 1.1111100000111111e+31
                    },
                    {
                    "size": null
                    },
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 15,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MTHI"
                    }
                ]
                },
                {
                "name": "MTLO",
                "description": "Move to LO Register",
                "syntax": [
                    "MTLO rs"
                ],
                "binary": "00000000000000000000000000010011",
                "mask": "11111100000111111111111111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 15,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MTLO"
                    }
                ]
                },
                {
                "name": "MULT",
                "description": "Multiply Word",
                "syntax": [
                    "MULT rs, rt"
                ],
                "binary": "00000000000000000000000000011000",
                "mask": "11111100000000001111111111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 10,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MULT"
                    }
                ]
                },
                {
                "name": "MULTU",
                "description": "Multiply Unsigned Word",
                "syntax": [
                    "MULTU rs, rt"
                ],
                "binary": "00000000000000000000000000011001",
                "mask": "11111100000000001111111111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 10,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MULTU"
                    }
                ]
                },
                {
                "name": "NOR",
                "description": "Not Or",
                "syntax": [
                    "NOR rd, rs, rt"
                ],
                "binary": "00000000000000000000000000100111",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "NOR"
                    }
                ]
                },
                {
                "name": "OR",
                "description": "Or",
                "syntax": [
                    "OR rd, rs, rt"
                ],
                "binary": "00000000000000000000000000100101",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "OR"
                    }
                ]
                },
                {
                "name": "ORI",
                "description": "Or immediate",
                "syntax": [
                    "ORI rt, rs, immediate"
                ],
                "binary": "00110100000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "ORI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "immediate"
                    }
                ]
                },
                {
                "name": "PREF",
                "description": "Prefetch",
                "syntax": [
                    "PREF rs, offset(base)"
                ],
                "binary": "11001100000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "PREF"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "SB",
                "description": "Store Byte",
                "syntax": [
                    "SB rt, offset(base)"
                ],
                "binary": "10100000000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SB"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "SD",
                "description": "Store Doubleword",
                "syntax": [
                    "SD rt, offset(base)"
                ],
                "binary": "11111100000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SD"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "SDL",
                "description": "Store Doubleword Left",
                "syntax": [
                    "SDL rt, offset(base)"
                ],
                "binary": "10110000000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SDL"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "SDR",
                "description": "Store Doubleword Right",
                "syntax": [
                    "SDR rt, offset(base)"
                ],
                "binary": "10110100000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SDR"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "SH",
                "description": "Store Halfword",
                "syntax": [
                    "SH rt, offset(base)"
                ],
                "binary": "10100100000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SH"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "SLL",
                "description": "Shift Word Left Logical",
                "syntax": [
                    "SLL rd, rt, sa"
                ],
                "binary": "00000000000000000000000000000000",
                "mask": "11111111111000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "sa"
                    },
                    {
                    "size": 6,
                    "value": "SLL"
                    }
                ]
                },
                {
                "name": "SLLV",
                "description": "Shift Word Left Logical Variable",
                "syntax": [
                    "SLLV rd, rt, rs"
                ],
                "binary": "00000000000000000000000000000100",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "SLLV"
                    }
                ]
                },
                {
                "name": "SLT",
                "description": "Set on Less Than",
                "syntax": [
                    "SLT rd, rs, rt"
                ],
                "binary": "00000000000000000000000000101010",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "SLT"
                    }
                ]
                },
                {
                "name": "SLTI",
                "description": "Set on Less Than Immediate",
                "syntax": [
                    "SLTI rt, rs, immediate"
                ],
                "binary": "00101000000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SLTI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "immediate"
                    }
                ]
                },
                {
                "name": "SLTIU",
                "description": "Set on Less Than Immediate Unsigned",
                "syntax": [
                    "SLTIU rt, rs, immediate"
                ],
                "binary": "00101100000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SLTIU"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "immediate"
                    }
                ]
                },
                {
                "name": "SLTU",
                "description": "Set on Less Than Unsigned",
                "syntax": [
                    "SLTU rd, rs, rt"
                ],
                "binary": "00000000000000000000000000101011",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "SLTU"
                    }
                ]
                },
                {
                "name": "SRA",
                "description": "Shift Word Right Arithmetic",
                "syntax": [
                    "SRA rd, rt sa"
                ],
                "binary": "00000000000000000000000000000011",
                "mask": "11111111111000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "sa"
                    },
                    {
                    "size": 6,
                    "value": "SRA"
                    }
                ]
                },
                {
                "name": "SRAV",
                "description": "Shift Word Right Arithmetic Variable",
                "syntax": [
                    "SRAV rd, rt, rs"
                ],
                "binary": "00000000000000000000000000000111",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "SRAV"
                    }
                ]
                },
                {
                "name": "SRL",
                "description": "Shift Word Right Logical",
                "syntax": [
                    "SRL rd, rt, sa"
                ],
                "binary": "00000000000000000000000000000010",
                "mask": "11111111111000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "sa"
                    },
                    {
                    "size": 6,
                    "value": "SRL"
                    }
                ]
                },
                {
                "name": "SRLV",
                "description": "Shift Word Right Logical Variable",
                "syntax": [
                    "SRLV rd, rt, rs"
                ],
                "binary": "00000000000000000000000000000110",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "SRLV"
                    }
                ]
                },
                {
                "name": "SUB",
                "description": "Subtract Word",
                "syntax": [
                    "SUB rd, rs, rt"
                ],
                "binary": "00000000000000000000000000100010",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "SUB"
                    }
                ]
                },
                {
                "name": "SUBU",
                "description": "Subtract Unsigned Word",
                "syntax": [
                    "SUBU rd, rs, rt"
                ],
                "binary": "00000000000000000000000000100011",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "SUBU"
                    }
                ]
                },
                {
                "name": "SW",
                "description": "Store Word",
                "syntax": [
                    "SW rt, offset(base)"
                ],
                "binary": "10101100000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SW"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "SWL",
                "description": "Store Word Left",
                "syntax": [
                    "SWL rt, offset(base)"
                ],
                "binary": "10101000000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SWL"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "SWR",
                "description": "Store Word Right",
                "syntax": [
                    "SWR rt, offset(base)"
                ],
                "binary": "10111000000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SWR"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "SYNC",
                "description": "Synchronize Shared Memory",
                "syntax": "SYNC",
                "binary": "00000000000000000000000000001111",
                "mask": "11111111111111111111110000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 15,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "stype"
                    },
                    {
                    "size": 6,
                    "value": "SYNC"
                    }
                ]
                },
                {
                "name": "SYNC.P",
                "description": "Synchronize Shared Memory",
                "syntax": "SYNC.P",
                "binary": "00000000000000000000010000001111",
                "mask": "11111111111111111111110000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 15,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "stype"
                    },
                    {
                    "size": 6,
                    "value": "SYNC"
                    }
                ]
                },
                {
                "name": "SYSCALL",
                "description": "System Call",
                "syntax": [
                    "SYSCALL (code)"
                ],
                "binary": "00000000000000000000000000001100",
                "mask": "11111100000000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 20,
                    "value": "code"
                    },
                    {
                    "size": 6,
                    "value": "SYSCALL"
                    }
                ]
                },
                {
                "name": "TEQ",
                "description": "Trap if Equal",
                "syntax": [
                    "TEQ rs, rt (code)"
                ],
                "binary": "00000000000000000000000000110100",
                "mask": "11111100000000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 10,
                    "value": "code"
                    },
                    {
                    "size": 6,
                    "value": "TEQ"
                    }
                ]
                },
                {
                "name": "TEQI",
                "description": "Trap if Equal Immediate",
                "syntax": [
                    "TEQI rs, immediate"
                ],
                "binary": "00000100000011000000000000000000",
                "mask": "11111100000111110000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "REGIMM"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "TEQI"
                    },
                    {
                    "size": 16,
                    "value": "immediate"
                    }
                ]
                },
                {
                "name": "TGE",
                "description": "Trap if Greater or Equal",
                "syntax": [
                    "TGE rs, rt (code)"
                ],
                "binary": "00000000000000000000000000110000",
                "mask": "11111100000000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 10,
                    "value": "code"
                    },
                    {
                    "size": 6,
                    "value": "TGE"
                    }
                ]
                },
                {
                "name": "TGEI",
                "description": "Trap if Greater or Equal Immediate",
                "syntax": [
                    "TGEI rs, immediate"
                ],
                "binary": "00000100000010000000000000000000",
                "mask": "11111100000111110000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "REGIMM"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "TGEI"
                    },
                    {
                    "size": 16,
                    "value": "immediate"
                    }
                ]
                },
                {
                "name": "TGEIU",
                "description": "Trap if Greater or Equal Immediate Unsigned",
                "syntax": [
                    "TGEIU rs, immediate"
                ],
                "binary": "00000100000010010000000000000000",
                "mask": "11111100000111110000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "REGIMM"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "TGEIU"
                    },
                    {
                    "size": 16,
                    "value": "immediate"
                    }
                ]
                },
                {
                "name": "TGEU",
                "description": "Trap if Greater or Equal Unsigned",
                "syntax": [
                    "TGEU rs, rt (code)"
                ],
                "binary": "00000000000000000000000000110001",
                "mask": "11111100000000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 10,
                    "value": "code"
                    },
                    {
                    "size": 6,
                    "value": "TGEU"
                    }
                ]
                },
                {
                "name": "TLT",
                "description": "Trap if Less Than",
                "syntax": [
                    "TLT rs, rt (code)"
                ],
                "binary": "00000000000000000000000000110010",
                "mask": "11111100000000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 10,
                    "value": "code"
                    },
                    {
                    "size": 6,
                    "value": "TLT"
                    }
                ]
                },
                {
                "name": "TLTI",
                "description": "Trap if Less Than Immediate",
                "syntax": [
                    "TLTI rs, immediate"
                ],
                "binary": "00000100000010100000000000000000",
                "mask": "11111100000111110000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "REGIMM"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "TLTI"
                    },
                    {
                    "size": 16,
                    "value": "immediate"
                    }
                ]
                },
                {
                "name": "TLTIU",
                "description": "Trap if Less Than Immediate Unsigned",
                "syntax": [
                    "TLTIU rs, immediate"
                ],
                "binary": "00000100000010110000000000000000",
                "mask": "11111100000111110000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "REGIMM"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "TLTIU"
                    },
                    {
                    "size": 16,
                    "value": "immediate"
                    }
                ]
                },
                {
                "name": "TLTU",
                "description": "Trap if Less Than Unsigned",
                "syntax": [
                    "TLTU rs, rt (code)"
                ],
                "binary": "00000000000000000000000000110011",
                "mask": "11111100000000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 10,
                    "value": "code"
                    },
                    {
                    "size": 6,
                    "value": "TLTU"
                    }
                ]
                },
                {
                "name": "TNE",
                "description": "Trap if Not Equal",
                "syntax": [
                    "TNE rs, rt (code)"
                ],
                "binary": "00000000000000000000000000110110",
                "mask": "11111100000000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 10,
                    "value": "code"
                    },
                    {
                    "size": 6,
                    "value": "TNE"
                    }
                ]
                },
                {
                "name": "TNEI",
                "description": "Trap if Not Equal Immediate",
                "syntax": [
                    "TNEI rs, immediate"
                ],
                "binary": "00000100000011100000000000000000",
                "mask": "11111100000111110000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "REGIMM"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "TNEI"
                    },
                    {
                    "size": 16,
                    "value": "immediate"
                    }
                ]
                },
                {
                "name": "XOR",
                "description": "Exclusive OR",
                "syntax": [
                    "XOR rd, rs, rt"
                ],
                "binary": "00000000000000000000000000100110",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "XOR"
                    }
                ]
                },
                {
                "name": "XORI",
                "description": "Exclusive OR Immediate",
                "syntax": [
                    "XORI rt, rs, immediate"
                ],
                "binary": "00111000000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "XORI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "immediate"
                    }
                ]
                },
                {
                "name": "DIV1",
                "description": "Divide Word Pipeline 1",
                "syntax": [
                    "DIV1 rs, rt"
                ],
                "binary": "01110000000000000000000000011010",
                "mask": "11111100000000001111111111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 10,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "DIV1"
                    }
                ]
                },
                {
                "name": "DIVU1",
                "description": "Divide Unsigned Word Pipeline 1",
                "syntax": [
                    "DIVU1 rs, rt"
                ],
                "binary": "01110000000000000000000000011011",
                "mask": "11111100000000001111111111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 10,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "DIVU1"
                    }
                ]
                },
                {
                "name": "LQ",
                "description": "Load Quadword",
                "syntax": [
                    "LQ rt, offset(base)"
                ],
                "binary": "01111000000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "LQ"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "MADD",
                "description": "Multiply-Add word",
                "syntax": [
                    "MADD rs, rt",
                    "MADD rd, rs, rt"
                ],
                "binary": "01110000000000000000000000000000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MADD"
                    },
                    {
                    "size": null
                    }
                ]
                },
                {
                "name": "MADD1",
                "description": "Multiply-Add word Pipeline 1",
                "syntax": [
                    "MADD1 rs, rt",
                    "MADD1 rd, rs, rt"
                ],
                "binary": "01110000000000000000000000100000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MADD1"
                    },
                    {
                    "size": null
                    }
                ]
                },
                {
                "name": "MADDU",
                "description": "Multiply-Add Unsigned word",
                "syntax": [
                    "MADDU rs, rt",
                    "MADDU rd, rs, rt"
                ],
                "binary": "01110000000000000000000000000001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MADDU"
                    },
                    {
                    "size": null
                    },
                    {
                    "size": null,
                    "value": " Multiply-Add Unsigned word Pipeline 1"
                    },
                    {
                    "size": null
                    },
                    {
                    "size": null
                    },
                    {
                    "size": 1.11e+30
                    },
                    {
                    "size": 1.11111e+31
                    },
                    {
                    "size": null
                    },
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MADDU1"
                    },
                    {
                    "size": null
                    }
                ]
                },
                {
                "name": "MFHI1",
                "description": "Move From HI1 Register",
                "syntax": [
                    "MFHI1 rd"
                ],
                "binary": "01110000000000000000000000010000",
                "mask": "11111111111111110000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 10,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MFHI1"
                    }
                ]
                },
                {
                "name": "MFLO1",
                "description": "Move From LO1 Register",
                "syntax": [
                    "MFLO1 rd"
                ],
                "binary": "01110000000000000000000000010010",
                "mask": "11111111111111110000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 10,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MFLO1"
                    }
                ]
                },
                {
                "name": "MFSA",
                "description": "Move from Shift Amount Register",
                "syntax": [
                    "MFSA rd"
                ],
                "binary": "00000000000000000000000000101000",
                "mask": "11111111111111110000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 10,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MFSA"
                    }
                ]
                },
                {
                "name": "MTHI1",
                "description": "Move To HI1 Register",
                "syntax": [
                    "MTHI1 rs"
                ],
                "binary": "01110000000000000000000000010001",
                "mask": "11111100000111111111111111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 15,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MTHI1"
                    }
                ]
                },
                {
                "name": "MTLO1",
                "description": "Move To LO1 Register",
                "syntax": [
                    "MTLO1 rs"
                ],
                "binary": "01110000000000000000000000010011",
                "mask": "11111100000111111111111111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 15,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MTLO1"
                    }
                ]
                },
                {
                "name": "MTSA",
                "description": "Move to Shift Amount Register",
                "syntax": [
                    "MTSA rs"
                ],
                "binary": "00000000000000000000000000101001",
                "mask": "11111100000111111111111111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 15,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MTSA"
                    }
                ]
                },
                {
                "name": "MTSAB",
                "description": "Move Byte Count to Shift Amount Register",
                "syntax": [
                    "MTSAB rs, immediate"
                ],
                "binary": "00000100000110000000000000000000",
                "mask": "11111100000111110000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "REGIMM"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "11000"
                    },
                    {
                    "size": 16,
                    "value": "immediate"
                    }
                ]
                },
                {
                "name": "MTSAH",
                "description": "Move Halfword Count to Shift Amount Register",
                "syntax": [
                    "MTSAH rs, immediate"
                ],
                "binary": "00000100000110010000000000000000",
                "mask": "11111100000111110000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "REGIMM"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "11001"
                    },
                    {
                    "size": 16,
                    "value": "immediate"
                    }
                ]
                },
                {
                "name": "MULT",
                "description": "Multiply Word",
                "syntax": [
                    "MULT rs, rt",
                    "MULT rd, rs, rt"
                ],
                "binary": "00000000000000000000000000011000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MULT"
                    },
                    {
                    "size": null
                    }
                ]
                },
                {
                "name": "MULT1",
                "description": "Multiply Word Pipeline 1",
                "syntax": [
                    "MULT1 rs, rt",
                    "MULT1 rd, rs, rt"
                ],
                "binary": "01110000000000000000000000011000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MULT1"
                    },
                    {
                    "size": null
                    }
                ]
                },
                {
                "name": "MULTU",
                "description": "Multiply Unsigned Word",
                "syntax": [
                    "MULTU rs, rt",
                    "MULTU rd, rs, rt"
                ],
                "binary": "00000000000000000000000000011001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SPECIAL"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MULTU"
                    },
                    {
                    "size": null
                    }
                ]
                },
                {
                "name": "MULTU1",
                "description": "Multiply Unsigned Word Pipeline 1",
                "syntax": [
                    "MULTU1 rs, rt",
                    "MULTU1 rd, rs, rt"
                ],
                "binary": "01110000000000000000000000011001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MULTU1"
                    },
                    {
                    "size": null
                    }
                ]
                },
                {
                "name": "PABSH",
                "description": "Parallel Absolute Halfword",
                "syntax": [
                    "PABSH rd, rt"
                ],
                "binary": "01110000000000000000000101101000",
                "mask": "11111111111000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PABSH"
                    },
                    {
                    "size": 6,
                    "value": "MMI1"
                    }
                ]
                },
                {
                "name": "PABSW",
                "description": "Parallel Absolute Word",
                "syntax": [
                    "PABSW rd, rt"
                ],
                "binary": "01110000000000000000000001101000",
                "mask": "11111111111000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PABSW"
                    },
                    {
                    "size": 6,
                    "value": "MMI1"
                    }
                ]
                },
                {
                "name": "PADDB",
                "description": "Parallel Add Byte",
                "syntax": [
                    "PADDB rd, rs, rt"
                ],
                "binary": "01110000000000000000001000001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PADDB"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PADDH",
                "description": "Parallel Add Halfword",
                "syntax": [
                    "PADDH rd, rs, rt"
                ],
                "binary": "01110000000000000000000100001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PADDH"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PADDSB",
                "description": "Parallel Add with Signed saturation Byte",
                "syntax": [
                    "PADDSB rd, rs, rt"
                ],
                "binary": "01110000000000000000011000001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PADDSB"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PADDSH",
                "description": "Parallel Add with Signed saturation Halfword",
                "syntax": [
                    "PADDSH rd, rs, rt"
                ],
                "binary": "01110000000000000000010100001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PADDSH"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PADDSW",
                "description": "Parallel Add with Signed saturation Word",
                "syntax": [
                    "PADDSW rd, rs, rt"
                ],
                "binary": "01110000000000000000010000001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PADDSW"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PADDUB",
                "description": "Parallel Add with Unsigned saturation Byte",
                "syntax": [
                    "PADDUB rd, rs, rt"
                ],
                "binary": "01110000000000000000011000101000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PADDUB"
                    },
                    {
                    "size": 6,
                    "value": "MMI1"
                    }
                ]
                },
                {
                "name": "PADDUH",
                "description": "Parallel Add with Unsigned saturation Halfword",
                "syntax": [
                    "PADDUH rd, rs, rt"
                ],
                "binary": "01110000000000000000010100101000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PADDUH"
                    },
                    {
                    "size": 6,
                    "value": "MMI1"
                    }
                ]
                },
                {
                "name": "PADDUW",
                "description": "Parallel Add with Unsigned saturation Word",
                "syntax": [
                    "PADDUW rd, rs, rt"
                ],
                "binary": "01110000000000000000010000101000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PADDUW"
                    },
                    {
                    "size": 6,
                    "value": "MMI1"
                    }
                ]
                },
                {
                "name": "PADDW",
                "description": "Parallel Add Word",
                "syntax": [
                    "PADDW rd, rs, rt"
                ],
                "binary": "01110000000000000000000000001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PADDW"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PADSBH",
                "description": "Parallel Add/Subtract Halfword",
                "syntax": [
                    "PADSBH rd, rs, rt"
                ],
                "binary": "01110000000000000000000100101000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PADSBH"
                    },
                    {
                    "size": 6,
                    "value": "MMI1"
                    }
                ]
                },
                {
                "name": "PAND",
                "description": "Parallel And",
                "syntax": [
                    "PAND rd, rs, rt"
                ],
                "binary": "01110000000000000000010010001001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PAND"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "PCEQB",
                "description": "Parallel Compare for Equal Byte",
                "syntax": [
                    "PCEQB rd, rs, rt"
                ],
                "binary": "01110000000000000000001010101000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PCEQB"
                    },
                    {
                    "size": 6,
                    "value": "MMI1"
                    }
                ]
                },
                {
                "name": "PCEQH",
                "description": "Parallel Compare for Equal Halfword",
                "syntax": [
                    "PCEQH rd, rs, rt"
                ],
                "binary": "01110000000000000000000110101000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PCEQH"
                    },
                    {
                    "size": 6,
                    "value": "MMI1"
                    }
                ]
                },
                {
                "name": "PCEQW",
                "description": "Parallel Compare for Equal Word",
                "syntax": [
                    "PCEQW rd, rs, rt"
                ],
                "binary": "01110000000000000000000010101000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PCEQW"
                    },
                    {
                    "size": 6,
                    "value": "MMI1"
                    }
                ]
                },
                {
                "name": "PCGTB",
                "description": "Parallel Compare for Greater Than Byte",
                "syntax": [
                    "PCGTB rd, rs, rt"
                ],
                "binary": "01110000000000000000001010001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PCGTB"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PCGTH",
                "description": "Parallel Compare for Greater Than Halfword",
                "syntax": [
                    "PCGTH rd, rs, rt"
                ],
                "binary": "01110000000000000000000110001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PCGTH"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PCGTW",
                "description": "Parallel Compare for Greater Than Word",
                "syntax": [
                    "PCGTW rd, rs, rt"
                ],
                "binary": "01110000000000000000000010001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PCGTW"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PCPYH",
                "description": "Parallel Copy Halfword",
                "syntax": [
                    "PCPYH rd, rt"
                ],
                "binary": "01110000000000000000011011101001",
                "mask": "11111111111000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PCPYH"
                    },
                    {
                    "size": 6,
                    "value": "MMI3"
                    }
                ]
                },
                {
                "name": "PCPYLD",
                "description": "Parallel Copy Lower Doubleword",
                "syntax": [
                    "PCPYLD rd, rs, rt"
                ],
                "binary": "01110000000000000000001110001001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PCPYLD"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "PCPYUD",
                "description": "Parallel Copy Upper Doubleword",
                "syntax": [
                    "PCPYUD rd, rs, rt"
                ],
                "binary": "01110000000000000000001110101001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PCPYUD"
                    },
                    {
                    "size": 6,
                    "value": "MMI3"
                    }
                ]
                },
                {
                "name": "PDIVBW",
                "description": "Parallel Divide Broadcast Word",
                "syntax": [
                    "PDIVBW rs, rt"
                ],
                "binary": "01110000000000000000011101001001",
                "mask": "11111100000000001111111111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "PDIVBW"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "PDIVUW",
                "description": "Parallel Divide Unsigned Word",
                "syntax": [
                    "PDIVUW rs, rt"
                ],
                "binary": "01110000000000000000001101101001",
                "mask": "11111100000000001111111111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "PDIVUW"
                    },
                    {
                    "size": 6,
                    "value": "MMI3"
                    }
                ]
                },
                {
                "name": "PDIVW",
                "description": "Parallel Divide Word",
                "syntax": [
                    "PDIVW rs, rt"
                ],
                "binary": "01110000000000000000001101001001",
                "mask": "11111100000000001111111111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "PDIVW"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "PEXCH",
                "description": "Parallel Exchange Center Halfword",
                "syntax": [
                    "PEXCH rd, rt"
                ],
                "binary": "01110000000000000000011010101001",
                "mask": "11111111111000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PEXCH"
                    },
                    {
                    "size": 6,
                    "value": "MMI3"
                    }
                ]
                },
                {
                "name": "PEXCW",
                "description": "Parallel Exchange Center Word",
                "syntax": [
                    "PEXCW rd, rt"
                ],
                "binary": "01110000000000000000011110101001",
                "mask": "11111111111000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PEXCW"
                    },
                    {
                    "size": 6,
                    "value": "MMI3"
                    }
                ]
                },
                {
                "name": "PEXEH",
                "description": "Parallel Exchange Even Halfword",
                "syntax": [
                    "PEXEH rd, rt"
                ],
                "binary": "01110000000000000000011010001001",
                "mask": "11111111111000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PEXEH"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "PEXEW",
                "description": "Parallel Exchange Even Word",
                "syntax": [
                    "PEXEW rd, rt"
                ],
                "binary": "01110000000000000000011110001001",
                "mask": "11111111111000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PEXEW"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "PEXT5",
                "description": "Parallel Extend from 5 bits",
                "syntax": [
                    "PEXT5 rd, rt"
                ],
                "binary": "01110000000000000000011110001000",
                "mask": "11111111111000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PEXT5"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PEXTLB",
                "description": "Parallel Extend Lower from Byte",
                "syntax": [
                    "PEXTLB rd, rs, rt"
                ],
                "binary": "01110000000000000000011010001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PEXTLB"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PEXTLH",
                "description": "Parallel Extend Lower from Halfword",
                "syntax": [
                    "PEXTLH rd, rs, rt"
                ],
                "binary": "01110000000000000000010110001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PEXTLH"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PEXTLW",
                "description": "Parallel Extend Lower from Word",
                "syntax": [
                    "PEXTLW rd, rs, rt"
                ],
                "binary": "01110000000000000000010010001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PEXTLW"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PEXTUB",
                "description": "Parallel Extend Upper from Byte",
                "syntax": [
                    "PEXTUB rd, rs, rt"
                ],
                "binary": "01110000000000000000011010101000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PEXTUB"
                    },
                    {
                    "size": 6,
                    "value": "MMI1"
                    }
                ]
                },
                {
                "name": "PEXTUH",
                "description": "Parallel Extend Upper from Halfword",
                "syntax": [
                    "PEXTUH rd, rs, rt"
                ],
                "binary": "01110000000000000000010110101000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PEXTUH"
                    },
                    {
                    "size": 6,
                    "value": "MMI1"
                    }
                ]
                },
                {
                "name": "PEXTUW",
                "description": "Parallel Extend Upper from Word",
                "syntax": [
                    "PEXTUW rd, rs, rt"
                ],
                "binary": "01110000000000000000010010101000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PEXTUW"
                    },
                    {
                    "size": 6,
                    "value": "MMI1"
                    }
                ]
                },
                {
                "name": "PHMADH",
                "description": "Parallel Horizontal Multiply-Add Halfword",
                "syntax": [
                    "PHMADH rd, rs, rt"
                ],
                "binary": "01110000000000000000010001001001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PHMADH"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "PHMSBH",
                "description": "Parallel Horizontal Multiply-Subtract Halfword",
                "syntax": [
                    "PHMSBH rd, rs, rt"
                ],
                "binary": "01110000000000000000010101001001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PHMSBH"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "PINTEH",
                "description": "Parallel Interleave Even Halfword",
                "syntax": [
                    "PINTEH rd, rs, rt"
                ],
                "binary": "01110000000000000000001010101001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PINTEH"
                    },
                    {
                    "size": 6,
                    "value": "MMI3"
                    }
                ]
                },
                {
                "name": "PINTH",
                "description": "Parallel Interleave Halfword",
                "syntax": [
                    "PINTH rd, rs, rt"
                ],
                "binary": "01110000000000000000001010001001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PINTH"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "PLZCW",
                "description": "Parallel Leading Zero or one Count Word",
                "syntax": [
                    "PLZCW rd, rs"
                ],
                "binary": "01110000000000000000000000000100",
                "mask": "11111100000111110000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "PLZCW"
                    }
                ]
                },
                {
                "name": "PMADDH",
                "description": "Parallel Multiply-Add Halfword",
                "syntax": [
                    "PMADDH rd, rs, rt"
                ],
                "binary": "01110000000000000000010000001001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PMADDH"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "PMADDUW",
                "description": "Parallel Multiply-Add Unsigned Word",
                "syntax": [
                    "PMADDUW rd, rs, rt"
                ],
                "binary": "01110000000000000000000000101001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PMADDUW"
                    },
                    {
                    "size": 6,
                    "value": "MMI3"
                    }
                ]
                },
                {
                "name": "PMADDW",
                "description": "Parallel Multiply-Add Word",
                "syntax": [
                    "PMADDW rd, rs, rt"
                ],
                "binary": "01110000000000000000000000001001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PMADDW"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "PMAXH",
                "description": "Parallel Maximize Halfword",
                "syntax": [
                    "PMAXH rd, rs, rt"
                ],
                "binary": "01110000000000000000000111001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PMAXH"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PMAXW",
                "description": "Parallel Maximize Word",
                "syntax": [
                    "PMAXW rd, rs, rt"
                ],
                "binary": "01110000000000000000000011001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PMAXW"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PMFHI",
                "description": "Parallel Move From HI Register",
                "syntax": [
                    "PMFHI rd"
                ],
                "binary": "01110000000000000000001000001001",
                "mask": "11111111111111110000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 10,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PMFHI"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "PMFHL.LH",
                "description": "Parallel Move From HI/LO Register",
                "syntax": [
                    "PMFHL.LH rd"
                ],
                "binary": "01110000000000000000000011110000",
                "mask": "11111111111111110000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 10,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "fmt"
                    },
                    {
                    "size": 6,
                    "value": "PMFHL"
                    }
                ]
                },
                {
                "name": "PMFHL.LW",
                "description": "Parallel Move From HI/LO Register",
                "syntax": [
                    "PMFHL.LW rd"
                ],
                "binary": "01110000000000000000000000110000",
                "mask": "11111111111111110000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 10,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "fmt"
                    },
                    {
                    "size": 6,
                    "value": "PMFHL"
                    }
                ]
                },
                {
                "name": "PMFHL.SH",
                "description": "Parallel Move From HI/LO Register",
                "syntax": [
                    "PMFHL.SH rd"
                ],
                "binary": "01110000000000000000000100110000",
                "mask": "11111111111111110000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 10,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "fmt"
                    },
                    {
                    "size": 6,
                    "value": "PMFHL"
                    }
                ]
                },
                {
                "name": "PMFHL.SLW",
                "description": "Parallel Move From HI/LO Register",
                "syntax": [
                    "PMFHL.SLW rd"
                ],
                "binary": "01110000000000000000000010110000",
                "mask": "11111111111111110000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 10,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "fmt"
                    },
                    {
                    "size": 6,
                    "value": "PMFHL"
                    }
                ]
                },
                {
                "name": "PMFHL.UW",
                "description": "Parallel Move From HI/LO Register",
                "syntax": [
                    "PMFHL.UW rd"
                ],
                "binary": "01110000000000000000000001110000",
                "mask": "11111111111111110000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 10,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "fmt"
                    },
                    {
                    "size": 6,
                    "value": "PMFHL"
                    }
                ]
                },
                {
                "name": "PMFLO",
                "description": "Parallel Move From LO Register",
                "syntax": [
                    "PMFLO rd"
                ],
                "binary": "01110000000000000000001001001001",
                "mask": "11111111111111110000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 10,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PMFLO"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "PMINH",
                "description": "Parallel Minimize Halfword",
                "syntax": [
                    "PMINH rd, rs, rt"
                ],
                "binary": "01110000000000000000000111101000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PMINH"
                    },
                    {
                    "size": 6,
                    "value": "MMI1"
                    }
                ]
                },
                {
                "name": "PMINW",
                "description": "Parallel Minimize Word",
                "syntax": [
                    "PMINW rd, rs, rt"
                ],
                "binary": "01110000000000000000000011101000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PMINW"
                    },
                    {
                    "size": 6,
                    "value": "MMI1"
                    }
                ]
                },
                {
                "name": "PMSUBH",
                "description": "Parallel Multiply-Subtract Halfword",
                "syntax": [
                    "PMSUBH rd, rs, rt"
                ],
                "binary": "01110000000000000000010100001001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PMSUBH"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "PMSUBW",
                "description": "Parallel Multiply-Subtract Word",
                "syntax": [
                    "PMSUBW rd, rs, rt"
                ],
                "binary": "01110000000000000000000100001001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PMSUBW"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "PMTHI",
                "description": "Parallel Move To HI Register",
                "syntax": [
                    "PMTHI rs"
                ],
                "binary": "01110000000000000000001000101001",
                "mask": "11111100000111111111111111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 10,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "PMTHI"
                    },
                    {
                    "size": 6,
                    "value": "MMI3"
                    }
                ]
                },
                {
                "name": "PMTHL.LW",
                "description": "Parallel Move To HI/LO Register",
                "syntax": [
                    "PMTHL.LW rs"
                ],
                "binary": "01110000000000000000000000110001",
                "mask": "11111100000111111111111111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 10,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "fmt"
                    },
                    {
                    "size": 6,
                    "value": "PMTHL"
                    }
                ]
                },
                {
                "name": "PMTLO",
                "description": "Parallel Move To LO Register",
                "syntax": [
                    "PMTLO rs"
                ],
                "binary": "01110000000000000000001001101001",
                "mask": "11111100000111111111111111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 10,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "PMTLO"
                    },
                    {
                    "size": 6,
                    "value": "MMI3"
                    }
                ]
                },
                {
                "name": "PMULTH",
                "description": "Parallel Multiply Halfword",
                "syntax": [
                    "PMULTH rd, rs, rt"
                ],
                "binary": "01110000000000000000011100001001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PMULTH"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "PMULTUW",
                "description": "Parallel Multiply Unsigned Word",
                "syntax": [
                    "PMULTUW rd, rs, rt"
                ],
                "binary": "01110000000000000000001100101001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PMULTUW"
                    },
                    {
                    "size": 6,
                    "value": "MMI3"
                    }
                ]
                },
                {
                "name": "PMULTW",
                "description": "Parallel Multiply Word",
                "syntax": [
                    "PMULTW rd, rs, rt"
                ],
                "binary": "01110000000000000000001100001001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PMULTW"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "PNOR",
                "description": "Parallel Not Or",
                "syntax": [
                    "PNOR rd, rs, rt"
                ],
                "binary": "01110000000000000000010011101001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PNOR"
                    },
                    {
                    "size": 6,
                    "value": "MMI3"
                    }
                ]
                },
                {
                "name": "POR",
                "description": "Parallel Or",
                "syntax": [
                    "POR rd, rs, rt"
                ],
                "binary": "01110000000000000000010010101001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "POR"
                    },
                    {
                    "size": 6,
                    "value": "MMI3"
                    }
                ]
                },
                {
                "name": "PPAC5",
                "description": "Parallel Pack to 5 bits",
                "syntax": [
                    "PPAC5 rd, rt"
                ],
                "binary": "01110000000000000000011111001000",
                "mask": "11111111111000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PPAC5"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PPACB",
                "description": "Parallel Pack to Byte",
                "syntax": [
                    "PPACB rd, rs, rt"
                ],
                "binary": "01110000000000000000011011001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PPACB"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PPACH",
                "description": "Parallel Pack to Halfword",
                "syntax": [
                    "PPACH rd, rs, rt"
                ],
                "binary": "01110000000000000000010111001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PPACH"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PPACW",
                "description": "Parallel Pack to Word",
                "syntax": [
                    "PPACW rd, rs, rt"
                ],
                "binary": "01110000000000000000010011001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PPACW"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PREVH",
                "description": "Parallel Reverse Halfword",
                "syntax": [
                    "PREVH rd, rt"
                ],
                "binary": "01110000000000000000011011001001",
                "mask": "11111111111000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PREVH"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "PROT3W",
                "description": "Parallel Rotate 3 Words Left",
                "syntax": [
                    "PROT3W rd, rt"
                ],
                "binary": "01110000000000000000011111001001",
                "mask": "11111111111000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PROT3W"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "PSLLH",
                "description": "Parallel Shift Left Logical Halfword",
                "syntax": [
                    "PSLLH rd, rt, sa"
                ],
                "binary": "01110000000000000000000000110100",
                "mask": "11111111111000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "sa"
                    },
                    {
                    "size": 6,
                    "value": "PSLLH"
                    }
                ]
                },
                {
                "name": "PSLLVW",
                "description": "Parallel Shift Left Logical Variable Word",
                "syntax": [
                    "PSLLVW rd, rt, rs"
                ],
                "binary": "01110000000000000000000010001001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PSLLVW"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "PSLLW",
                "description": "Parallel Shift Left Logical Word",
                "syntax": [
                    "PSLLW rd, rt, sa"
                ],
                "binary": "01110000000000000000000000111100",
                "mask": "11111111111000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "sa"
                    },
                    {
                    "size": 6,
                    "value": "PSLLW"
                    }
                ]
                },
                {
                "name": "PSRAH",
                "description": "Parallel Shift Right Arithmetic Halfword",
                "syntax": [
                    "PSRAH rd, rt, sa"
                ],
                "binary": "01110000000000000000000000110111",
                "mask": "11111111111000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "sa"
                    },
                    {
                    "size": 6,
                    "value": "PSRAH"
                    }
                ]
                },
                {
                "name": "PSRAVW",
                "description": "Parallel Shift Right Arithmetic Variable Word",
                "syntax": [
                    "PSRAVW rd, rt, rs"
                ],
                "binary": "01110000000000000000000011101001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PSRAVW"
                    },
                    {
                    "size": 6,
                    "value": "MMI3"
                    }
                ]
                },
                {
                "name": "PSRAW",
                "description": "Parallel Shift Right Arithmetic Word",
                "syntax": [
                    "PSRAW rd, rt, sa"
                ],
                "binary": "01110000000000000000000000111111",
                "mask": "11111111111000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "sa"
                    },
                    {
                    "size": 6,
                    "value": "PSRAW"
                    }
                ]
                },
                {
                "name": "PSRLH",
                "description": "Parallel Shift Right Logical Halfword",
                "syntax": [
                    "PSRLH rd, rt, sa"
                ],
                "binary": "01110000000000000000000000110110",
                "mask": "11111111111000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "sa"
                    },
                    {
                    "size": 6,
                    "value": "PSRLH"
                    }
                ]
                },
                {
                "name": "PSRLVW",
                "description": "Parallel Shift Right Logical Variable Word",
                "syntax": [
                    "PSRLVW rd, rt, rs"
                ],
                "binary": "01110000000000000000000011001001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PSRLVW"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "PSRLW",
                "description": "Parallel Shift Right Logical Word",
                "syntax": [
                    "PSRLW rd, rt, sa"
                ],
                "binary": "01110000000000000000000000111110",
                "mask": "11111111111000000000000000111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "sa"
                    },
                    {
                    "size": 6,
                    "value": "PSRLW"
                    }
                ]
                },
                {
                "name": "PSUBB",
                "description": "Parallel Subtract Byte",
                "syntax": [
                    "PSUBB rd, rs, rt"
                ],
                "binary": "01110000000000000000001001001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PSUBB"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PSUBH",
                "description": "Parallel Subtract Halfword",
                "syntax": [
                    "PSUBH rd, rs, rt"
                ],
                "binary": "01110000000000000000000101001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PSUBH"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PSUBSB",
                "description": "Parallel Subtract with Signed saturation Byte",
                "syntax": [
                    "PSUBSB rd, rs, rt"
                ],
                "binary": "01110000000000000000011001001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PSUBSB"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PSUBSH",
                "description": "Parallel Subtract with Signed Saturation Halfword",
                "syntax": [
                    "PSUBSH rd, rs, rt"
                ],
                "binary": "01110000000000000000010101001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PSUBSH"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PSUBSW",
                "description": "Parallel Subtract with Signed Saturation Word",
                "syntax": [
                    "PSUBSW rd, rs, rt"
                ],
                "binary": "01110000000000000000010001001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PSUBSW"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PSUBUB",
                "description": "Parallel Subtract with Unsigned Saturation Byte",
                "syntax": [
                    "PSUBUB rd, rs, rt"
                ],
                "binary": "01110000000000000000011001101000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PSUBUB"
                    },
                    {
                    "size": 6,
                    "value": "MMI1"
                    }
                ]
                },
                {
                "name": "PSUBUH",
                "description": "Parallel Subtract with Unsigned Saturation Halfword",
                "syntax": [
                    "PSUBUH rd, rs, rt"
                ],
                "binary": "01110000000000000000010101101000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PSUBUH"
                    },
                    {
                    "size": 6,
                    "value": "MMI1"
                    }
                ]
                },
                {
                "name": "PSUBUW",
                "description": "Parallel Subtract with Unsigned Saturation Word",
                "syntax": [
                    "PSUBUW rd, rs, rt"
                ],
                "binary": "01110000000000000000010001101000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PSUBUW"
                    },
                    {
                    "size": 6,
                    "value": "MMI1"
                    }
                ]
                },
                {
                "name": "PSUBW",
                "description": "Parallel Subtract Word",
                "syntax": [
                    "PSUBW rd, rs, rt"
                ],
                "binary": "01110000000000000000000001001000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PSUBW"
                    },
                    {
                    "size": 6,
                    "value": "MMI0"
                    }
                ]
                },
                {
                "name": "PXOR",
                "description": "Parallel Exclusive OR",
                "syntax": [
                    "PXOR rd, rs, rt"
                ],
                "binary": "01110000000000000000010011001001",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "PXOR"
                    },
                    {
                    "size": 6,
                    "value": "MMI2"
                    }
                ]
                },
                {
                "name": "QFSRV",
                "description": "Quadword Funnel Shift Right Variable",
                "syntax": [
                    "QFSRV rd, rs, rt"
                ],
                "binary": "01110000000000000000011011101000",
                "mask": "11111100000000000000011111111111",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "MMI"
                    },
                    {
                    "size": 5,
                    "value": "rs"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "rd"
                    },
                    {
                    "size": 5,
                    "value": "QFSRV"
                    },
                    {
                    "size": 6,
                    "value": "MMI1"
                    }
                ]
                },
                {
                "name": "SQ",
                "description": "Store Quadword",
                "syntax": [
                    "SQ rt, offset(base)"
                ],
                "binary": "01111100000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "EE",
                "args": [
                    {
                    "size": 6,
                    "value": "SQ"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BC0F",
                "description": "Branch on Coprocessor 0 False",
                "syntax": [
                    "BC0F offset"
                ],
                "binary": "01000001000000000000000000000000",
                "mask": "11111111111111110000000000000000",
                "memory": "COP0",
                "args": [
                    {
                    "size": 6,
                    "value": "COP0"
                    },
                    {
                    "size": 5,
                    "value": "BC0"
                    },
                    {
                    "size": 5,
                    "value": "BC0F"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BC0FL",
                "description": "Branch on Coprocessor 0 False Likely",
                "syntax": [
                    "BC0FL offset"
                ],
                "binary": "01000001000000100000000000000000",
                "mask": "11111111111111110000000000000000",
                "memory": "COP0",
                "args": [
                    {
                    "size": 6,
                    "value": "COP0"
                    },
                    {
                    "size": 5,
                    "value": "BC0"
                    },
                    {
                    "size": 5,
                    "value": "BC0FL"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BC0T",
                "description": "Branch on Coprocessor 0 True",
                "syntax": [
                    "BC0T offset"
                ],
                "binary": "01000001000000010000000000000000",
                "mask": "11111111111111110000000000000000",
                "memory": "COP0",
                "args": [
                    {
                    "size": 6,
                    "value": "COP0"
                    },
                    {
                    "size": 5,
                    "value": "BC0"
                    },
                    {
                    "size": 5,
                    "value": "BC0T"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BC0TL",
                "description": "Branch on Coprocessor 0 True Likely",
                "syntax": [
                    "BC0TL offset"
                ],
                "binary": "01000001000000110000000000000000",
                "mask": "11111111111111110000000000000000",
                "memory": "COP0",
                "args": [
                    {
                    "size": 6,
                    "value": "COP0"
                    },
                    {
                    "size": 5,
                    "value": "BC0"
                    },
                    {
                    "size": 5,
                    "value": "BC0TL"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "DI",
                "description": "Disable Interrupt",
                "syntax": [
                    "DI"
                ],
                "binary": "01000010000000000000000000111001",
                "mask": "11111111111111111111111111111111",
                "memory": "COP0",
                "args": [
                    {
                    "size": 6,
                    "value": "COP0"
                    },
                    {
                    "size": 5,
                    "value": "CO"
                    },
                    {
                    "size": 15,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "DI"
                    }
                ]
                },
                {
                "name": "EI",
                "description": "Enable Interrupt",
                "syntax": [
                    "EI"
                ],
                "binary": "01000010000000000000000000111000",
                "mask": "11111111111111111111111111111111",
                "memory": "COP0",
                "args": [
                    {
                    "size": 6,
                    "value": "COP0"
                    },
                    {
                    "size": 5,
                    "value": "CO"
                    },
                    {
                    "size": 15,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "EI"
                    }
                ]
                },
                {
                "name": "ERET",
                "description": "Exception Return",
                "syntax": [
                    "ERET"
                ],
                "binary": "01000010000000000000000000011000",
                "mask": "11111111111111111111111111111111",
                "memory": "COP0",
                "args": [
                    {
                    "size": 6,
                    "value": "COP0"
                    },
                    {
                    "size": 5,
                    "value": "CO"
                    },
                    {
                    "size": 15,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "ERET"
                    }
                ]
                },
                {
                "name": "MFC0",
                "description": "Move from System Control Coprocessor",
                "syntax": [
                    "MFC0 rt, reg",
                    "MFC0 rt, reg, sel"
                ],
                "binary": "01000000000000000000000000000000",
                "mask": "11111111111000000000011111111000",
                "memory": "COP0",
                "args": [
                    {
                    "size": 6,
                    "value": "COP0"
                    },
                    {
                    "size": 5,
                    "value": "MF0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "reg"
                    },
                    {
                    "size": 8,
                    "value": "0"
                    },
                    {
                    "size": 3,
                    "value": "sel"
                    },
                    {
                    "size": null
                    }
                ]
                },
                {
                "name": "MTC0",
                "description": "Move to System Control Coprocessor",
                "syntax": [
                    "MTC0 rt, reg",
                    "MTC0 rt, reg, sel"
                ],
                "binary": "01000000100000000000000000000000",
                "mask": "11111111111000000000011111111000",
                "memory": "COP0",
                "args": [
                    {
                    "size": 6,
                    "value": "COP0"
                    },
                    {
                    "size": 5,
                    "value": "MT0"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "reg"
                    },
                    {
                    "size": 8,
                    "value": "0"
                    },
                    {
                    "size": 3,
                    "value": "sel"
                    },
                    {
                    "size": null
                    }
                ]
                },
                {
                "name": "ABS.S",
                "description": "Floating Point Absolute Value",
                "syntax": [
                    "ABS.S fd, fs"
                ],
                "binary": "01000110000000000000000000000101",
                "mask": "11111111111111110000000000111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "fd"
                    },
                    {
                    "size": 6,
                    "value": "ABS"
                    }
                ]
                },
                {
                "name": "ADD.S",
                "description": "Floating Point ADD",
                "syntax": [
                    "ADD.S fd, fs, ft"
                ],
                "binary": "01000110000000000000000000000000",
                "mask": "11111111111000000000000000111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "ft"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "fd"
                    },
                    {
                    "size": 6,
                    "value": "ADD"
                    }
                ]
                },
                {
                "name": "ADDA.S",
                "description": "Floating Point Add to Accumulator",
                "syntax": [
                    "ADDA.S fs, ft"
                ],
                "binary": "01000110000000000000000000011000",
                "mask": "11111111111000000000011111111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "ft"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "ADDA"
                    }
                ]
                },
                {
                "name": "BC1F",
                "description": "Branch on FP False",
                "syntax": [
                    "BC1F offset"
                ],
                "binary": "01000101000000000000000000000000",
                "mask": "11111111111111110000000000000000",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "BC1"
                    },
                    {
                    "size": 5,
                    "value": "BC1F"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BC1FL",
                "description": "Branch on FP False Likely",
                "syntax": [
                    "BC1FL offset"
                ],
                "binary": "01000101000000100000000000000000",
                "mask": "11111111111111110000000000000000",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "BC1"
                    },
                    {
                    "size": 5,
                    "value": "BC1FL"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BC1T",
                "description": "Branch on FP True",
                "syntax": [
                    "BC1T offset"
                ],
                "binary": "01000101000000010000000000000000",
                "mask": "11111111111111110000000000000000",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "BC1"
                    },
                    {
                    "size": 5,
                    "value": "BC1T"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "BC1TL",
                "description": "Branch on FP True Likely",
                "syntax": [
                    "BC1TL offset"
                ],
                "binary": "01000101000000110000000000000000",
                "mask": "11111111111111110000000000000000",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "BC1"
                    },
                    {
                    "size": 5,
                    "value": "BC1TL"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "C.EQ.S",
                "description": "Floating Point Compare",
                "syntax": [
                    "C.EQ.S fs, ft"
                ],
                "binary": "01000110000000000000000000110010",
                "mask": "11111111111000000000011111111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "ft"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 2,
                    "value": "FC"
                    },
                    {
                    "size": 1,
                    "value": "0"
                    },
                    {
                    "size": 2,
                    "value": "cond"
                    },
                    {
                    "size": 1,
                    "value": "0"
                    }
                ]
                },
                {
                "name": "C.F.S",
                "description": "Floating Point Compare",
                "syntax": [
                    "C.F.S fs, ft"
                ],
                "binary": "01000110000000000000000000110000",
                "mask": "11111111111000000000011111111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "ft"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 2,
                    "value": "FC"
                    },
                    {
                    "size": 1,
                    "value": "0"
                    },
                    {
                    "size": 2,
                    "value": "cond"
                    },
                    {
                    "size": 1,
                    "value": "0"
                    }
                ]
                },
                {
                "name": "C.LE.S",
                "description": "Floating Point Compare",
                "syntax": [
                    "C.LE.S fs, ft"
                ],
                "binary": "01000110000000000000000000110110",
                "mask": "11111111111000000000011111111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "ft"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 2,
                    "value": "FC"
                    },
                    {
                    "size": 1,
                    "value": "0"
                    },
                    {
                    "size": 2,
                    "value": "cond"
                    },
                    {
                    "size": 1,
                    "value": "0"
                    }
                ]
                },
                {
                "name": "C.LT.S",
                "description": "Floating Point Compare",
                "syntax": [
                    "C.LT.S fs, ft"
                ],
                "binary": "01000110000000000000000000110100",
                "mask": "11111111111000000000011111111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "ft"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 2,
                    "value": "FC"
                    },
                    {
                    "size": 1,
                    "value": "0"
                    },
                    {
                    "size": 2,
                    "value": "cond"
                    },
                    {
                    "size": 1,
                    "value": "0"
                    }
                ]
                },
                {
                "name": "CFC1",
                "description": "Move Control Word from Floating Point",
                "syntax": [
                    "CFC1 rt, fs"
                ],
                "binary": "01000100010000000000000000000000",
                "mask": "11111111111000000000011111111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "CFC1"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 11,
                    "value": "0"
                    }
                ]
                },
                {
                "name": "CTC1",
                "description": "Move Control Word to Floating Point",
                "syntax": [
                    "CTC1 rt, fs"
                ],
                "binary": "01000100110000000000000000000000",
                "mask": "11111111111000000000011111111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "CTC1"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 11,
                    "value": "0"
                    }
                ]
                },
                {
                "name": "CVT.S.W",
                "description": "Fixed-point Convert to Single Floating Point",
                "syntax": [
                    "CVT.S.W fd, fs"
                ],
                "binary": "01000110100000000000000000100000",
                "mask": "11111111111111110000000000111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "W"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "fd"
                    },
                    {
                    "size": 6,
                    "value": "CVTS"
                    }
                ]
                },
                {
                "name": "CVT.W.S",
                "description": "Floating Point Convert to Word Fixed-point",
                "syntax": [
                    "CVT.W.S fd, fs"
                ],
                "binary": "01000110000000000000000000100100",
                "mask": "11111111111111110000000000111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "fd"
                    },
                    {
                    "size": 6,
                    "value": "CVTW"
                    }
                ]
                },
                {
                "name": "DIV.S",
                "description": "Floating Point Divide",
                "syntax": [
                    "DIV.S fd, fs, ft"
                ],
                "binary": "01000110000000000000000000000011",
                "mask": "11111111111000000000000000111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "ft"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "fd"
                    },
                    {
                    "size": 6,
                    "value": "DIV"
                    }
                ]
                },
                {
                "name": "LWC1",
                "description": "Load Word to Floating Point",
                "syntax": [
                    "LWC1 ft, offset(base)"
                ],
                "binary": "11000100000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "LWC1"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "ft"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                },
                {
                "name": "MADD.S",
                "description": "Floating Point Multiply-ADD",
                "syntax": [
                    "MADD.S fd, fs, ft"
                ],
                "binary": "01000110000000000000000000011100",
                "mask": "11111111111000000000000000111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "ft"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "fd"
                    },
                    {
                    "size": 6,
                    "value": "MADD"
                    }
                ]
                },
                {
                "name": "MADDA.S",
                "description": "Floating Point Multiply-Add",
                "syntax": [
                    "MADDA.S fs, ft"
                ],
                "binary": "01000110000000000000000000011110",
                "mask": "11111111111000000000011111111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "ft"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MADDA"
                    }
                ]
                },
                {
                "name": "MAX.S",
                "description": "Floating Point Maximum",
                "syntax": [
                    "MAX.S fd, fs, ft"
                ],
                "binary": "01000110000000000000000000101000",
                "mask": "11111111111000000000000000111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "ft"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "fd"
                    },
                    {
                    "size": 6,
                    "value": "MAX"
                    }
                ]
                },
                {
                "name": "MFC1",
                "description": "Move Word from Floating Point",
                "syntax": [
                    "MFC1 rt, fs"
                ],
                "binary": "01000100000000000000000000000000",
                "mask": "11111111111000000000011111111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "MFC1"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 11,
                    "value": "0"
                    }
                ]
                },
                {
                "name": "MIN.S",
                "description": "Floating Point Minimum",
                "syntax": [
                    "MIN.S fd, fs, ft"
                ],
                "binary": "01000110000000000000000000101001",
                "mask": "11111111111000000000000000111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "ft"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "fd"
                    },
                    {
                    "size": 6,
                    "value": "MIN"
                    }
                ]
                },
                {
                "name": "MOV.S",
                "description": "Floating Point Move",
                "syntax": [
                    "MOV.S fd, fs"
                ],
                "binary": "01000110000000000000000000000110",
                "mask": "11111111111111110000000000111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "fd"
                    },
                    {
                    "size": 6,
                    "value": "MOV"
                    }
                ]
                },
                {
                "name": "MSUB.S",
                "description": "Floating Point Multiply and Subtract",
                "syntax": [
                    "MSUB.S fd, fs, ft"
                ],
                "binary": "01000110000000000000000000011101",
                "mask": "11111111111000000000000000111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "ft"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "fd"
                    },
                    {
                    "size": 6,
                    "value": "MSUB"
                    }
                ]
                },
                {
                "name": "MSUBA.S",
                "description": "Floating Point Multiply and Subtract from Accumulator",
                "syntax": [
                    "MSUBA.S fs, ft"
                ],
                "binary": "01000110000000000000000000011111",
                "mask": "11111111111000000000011111111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "ft"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MSUBA"
                    }
                ]
                },
                {
                "name": "MTC1",
                "description": "Move Word to Floating Point",
                "syntax": [
                    "MTC1 rt, fs"
                ],
                "binary": "01000100100000000000000000000000",
                "mask": "11111111111000000000011111111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "MTC1"
                    },
                    {
                    "size": 5,
                    "value": "rt"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 11,
                    "value": "0"
                    }
                ]
                },
                {
                "name": "MUL.S",
                "description": "Floating Point Multiply",
                "syntax": [
                    "MUL.S fd, fs, ft"
                ],
                "binary": "01000110000000000000000000000010",
                "mask": "11111111111000000000000000111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "ft"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "fd"
                    },
                    {
                    "size": 6,
                    "value": "MUL"
                    }
                ]
                },
                {
                "name": "MULA.S",
                "description": "Floating Point Multiply to Accumulator",
                "syntax": [
                    "MULA.S fs, ft"
                ],
                "binary": "01000110000000000000000000011010",
                "mask": "11111111111000000000011111111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "ft"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "MULA"
                    }
                ]
                },
                {
                "name": "NEG.S",
                "description": "Floating Point Negate",
                "syntax": [
                    "NEG.S fd, fs"
                ],
                "binary": "01000110000000000000000000000111",
                "mask": "11111111111111110000000000111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "fd"
                    },
                    {
                    "size": 6,
                    "value": "NEG"
                    }
                ]
                },
                {
                "name": "RSQRT.S",
                "description": "Floating Point Reciprocal Square Root",
                "syntax": [
                    "RSQRT.S fd, fs, ft"
                ],
                "binary": "01000110000000000000000000010110",
                "mask": "11111111111000000000000000111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "ft"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "fd"
                    },
                    {
                    "size": 6,
                    "value": "RSQRT"
                    }
                ]
                },
                {
                "name": "SQRT.S",
                "description": "Floating Point Square Root",
                "syntax": [
                    "SQRT.S fd, ft"
                ],
                "binary": "01000110000000000000000000000100",
                "mask": "11111111111000001111100000111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "ft"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 5,
                    "value": "fd"
                    },
                    {
                    "size": 6,
                    "value": "SQRT"
                    }
                ]
                },
                {
                "name": "SUB.S",
                "description": "Floating Point Subtract",
                "syntax": [
                    "SUB.S fd, fs, ft"
                ],
                "binary": "01000110000000000000000000000001",
                "mask": "11111111111000000000000000111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "ft"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "fd"
                    },
                    {
                    "size": 6,
                    "value": "SUB"
                    }
                ]
                },
                {
                "name": "SUBA.S",
                "description": "Floating Point Subtract to Accumulator",
                "syntax": [
                    "SUBA.S fs, ft I"
                ],
                "binary": "01000110000000000000000000011001",
                "mask": "11111111111000000000011111111111",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "COP1"
                    },
                    {
                    "size": 5,
                    "value": "S"
                    },
                    {
                    "size": 5,
                    "value": "ft"
                    },
                    {
                    "size": 5,
                    "value": "fs"
                    },
                    {
                    "size": 5,
                    "value": "0"
                    },
                    {
                    "size": 6,
                    "value": "SUBA"
                    }
                ]
                },
                {
                "name": "SWC1",
                "description": "Store Word from Floating Point",
                "syntax": [
                    "SWC1 ft, offset(base)"
                ],
                "binary": "11100100000000000000000000000000",
                "mask": "11111100000000000000000000000000",
                "memory": "COP1",
                "args": [
                    {
                    "size": 6,
                    "value": "SWC1"
                    },
                    {
                    "size": 5,
                    "value": "base"
                    },
                    {
                    "size": 5,
                    "value": "ft"
                    },
                    {
                    "size": 16,
                    "value": "offset"
                    }
                ]
                }
            ],
            assemble: function(hex){
                var self = this;
                var binary = hex.toBinary();
                var instruction = self.getInstructionByBinary(binary);
                var bitIndex = 0;
                var syntax = instruction.syntax[0];
                $.each(instruction.args, function(i, x){
                    var argBinary = binary.value
                        .substring(bitIndex, bitIndex + x.size);
                    
                    var value = self.getArguementByBinary(x.value, argBinary);
                    if(value != null) 
                        syntax = syntax.replace(x.value, value);

                    bitIndex += x.size;
                });
                return syntax.toLowerCase();
            },
            disassemble: function(operation){
                var self = this;
                var operation = self.splitOperation(operation);
                var instruction = self.getInstructionByValue(operation[0]);
                var binary = new Binary(instruction.binary);
                var definition = null;

                $.each(instruction.syntax, function(i, x){
                    var def = self.splitOperation(x);
                    if(def.length == operation.length)
                        definition = def;
                });

                if(definition == null)
                    throw "The operation supplied does not match any known instruction definition.";

                var bitIndex = 0;
                $.each(instruction.args, function(i, arg){
                    var argBinary = self.getArguementByValue(arg.value, operation[definition.indexOf(arg.value)]);
                    if(argBinary != null)
                        binary.insert(bitIndex, argBinary); 
                    bitIndex += arg.size;
                });

                return binary.toHex().value;
            },
            splitOperation: function(operation){
                return operation
                    .replace(/, /g, " ")
                    .replace(/\(/g, " ")
                    .replace(/\)/g, "")
                    .replace("$", "")
                    .replace("  ", " ")
                    .split(" ");
            },
            getInstructionByValue: function(instructionName){
                return this.instructions.find(function(x){
                    if(x.name.toLowerCase() == instructionName)
                        return x;
                });
            },
            getInstructionByBinary: function(binary){
                return this.instructions.find(function(x){
                    var isMatch = true;
                    for(i = 0; i < 32; i++){ 
                        if(x.mask[i] == '1' && x.binary[i] != binary.value[i]){
                            isMatch = false;
                            break;
                        }
                    }
                    if(isMatch)
                        return x;
                });
            },
            getArguementByValue: function(placeholder, value){
                var self = this;
                var argBinary = null;
                if(['base','rs','rt','rd'].contains(placeholder)){
                    var arg = self.registers.EE.items.find(function(reg){
                        if(reg.value == value)
                            return reg;
                    }) || null;

                    if(arg != undefined)
                        argBinary = arg.binary;
                }

                if(placeholder == 'reg'){
                    var arg = self.registers.COP0.find(function(reg){
                        if(reg.value == value)
                            return reg;
                    }) || null;

                    if(arg != undefined)
                        argBinary = arg.binary;
                }

                if(['fs', 'ft', 'fd'].contains(placeholder)){
                    var arg =  self.registers.COP1.items.find(function(reg){
                        if(reg.value == value)
                            return reg;
                    }) || null;

                    if(arg != undefined)
                        argBinary = arg.binary;
                }

                if(placeholder == 'target'){
                    argBinary = (new Hex(value.replace("$", "")).toInt() / 4).toString(2).padLeft(26, "0");
                }

                if(['immediate', 'offset'].contains(placeholder)){
                    argBinary = new Hex(value.replace("$", "")).toBinary().value;
                }

                if(placeholder == 'sa'){
                    argBinary = parseInt(value)
                        .toString(2)
                        .padLeft(5, "0");
                }

                if(placeholder == 'code'){
                    argBinary = parseInt(value, 16)
                        .toString(2)
                        .padLeft(20);
                }

                return argBinary;
            },
            getArguementByBinary: function(placeholder, binary){
                var self = this;
                var arg = null;

                if(['base','rs','rt','rd'].contains(placeholder)){
                    arg = self.registers.EE.items.find(function(reg){
                        if(reg.binary == binary)
                            return reg;
                    }).value;
                }

                if(placeholder == 'reg'){
                    arg = self.registers.COP0.items.find(function(reg){
                        if(reg.binary == binary)
                            return reg;
                    }).value;
                }

                if(['fs', 'ft', 'fd'].contains(placeholder)){
                    arg = self.registers.COP1.items.find(function(reg){
                        if(reg.binary == binary)
                            return reg;
                    }).value;
                }

                if(placeholder == 'target'){
                    arg = "$" + new Hex((new Binary(binary.padLeft(28, '0'))
                        .toInt() * 4).toString(16)).value.padLeft(8, '0');
                }

                if(['immediate', 'offset'].contains(placeholder)){
                    arg = "$" + new Binary(binary).toHex().value;
                }

                if(placeholder == 'sa'){
                    arg = new Binary(binary.padLeft(8,'0')).toInt();
                }

                if(placeholder == 'code'){
                    arg = parseInt(binary, 2).toString(16).padLeft(5, '0');
                }
                
                return arg;
            }
        };
    }
});
