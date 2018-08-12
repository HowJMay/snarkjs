const bigInt = require("big-integer");

class F1Field {
    constructor(q) {
        this.q = q;
        this.nq = bigInt.zero.minus(q);
        this.zero = bigInt.zero;
        this.one = bigInt.one;
    }

    e(a) {
        return bigInt(a);
    }

    copy(a) {
        return bigInt(a);
    }

    add(a, b) {
        return a.add(b);
    }

    sub(a, b) {
        return a.minus(b);
    }

    neg(a) {
        return bigInt.zero.minus(a);
    }

    mul(a, b) {
        return a.times(b).mod(this.q);
    }

    inverse(a) {
        return this.affine(a).modInv(this.q);
    }

    div(a, b) {
        return this.mul(a, this.inverse(b));
    }

    square(a) {
        return a.square().mod(this.q);
    }

    isZero(a) {
        return a.isZero();
    }

    equals(a, b) {
        return this.affine(a).equals(this.affine(b));
    }

    affine(a) {
        let aux = a;
        if (aux.isNegative()) {
            if (aux.lesserOrEquals(this.nq)) {
                aux = a.mod(this.q);
            }
            if (aux.isNegative()) {
                aux = aux.add(this.q);
            }
        } else {
            if (aux.greaterOrEquals(this.q)) {
                aux = aux.mod(this.q);
            }
        }
        return aux;
    }

    toString(a) {
        const ca = this.affine(a);
        return `"0x${ca.toString(16)}"`;
    }
}

module.exports = F1Field;
