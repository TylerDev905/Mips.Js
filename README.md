# Mips32.js

## Example Usage
```javascript
var mips = new Mips();

// assemble
mips.assemble(new Hex("0462002a"));
mips.assemble(new Hex("0000008d"));
mips.assemble(new Hex("42000018"));
mips.assemble(new Hex("0c080004"));
mips.assemble(new Hex("000840c0"));
mips.assemble(new Hex("0462002a"));
mips.assemble(new Hex("0000008d"));

// disassemble
mips.disassemble("break (00002)"));
mips.disassemble("addiu a0, a0, $0001"));
mips.disassemble("sll, t0, t0, 3"));
mips.disassemble("beq zero, zero, $0002"));
mips.disassemble("jal $00200008"));
mips.disassemble("lw s0, $0008(s0)"));
mips.disassemble("addiu a0, a0, $0001"));
mips.disassemble("break (00002)"));
mips.disassemble("jr ra"));
mips.disassemble("jal $00200008"));
mips.disassemble("beq t0, a0, $FFFF"));
mips.disassemble("sll t0, t0, 4"));
