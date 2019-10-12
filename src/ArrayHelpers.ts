declare global {
    interface Array<T> {
        randomize(): this;
        addRange(b: Array<T>): void;
        unique(): Array<T>;
        uniqueObject(selector: Function): Array<T>;
        clear(selector: Function): void;
        remove(selector: Function): T;
        select(selector: (d: any) => T): T;
        selectMany<TIn, TOut>(selectListFn: (t: TIn) => TOut[]): TOut[];
    }
}

Array.prototype.randomize = function () {

    var array = this;
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;


};

Array.prototype.addRange = function (b: Array<any>) {
    var a = this;
    b.forEach(ele => a.push(ele));
};



Array.prototype.unique = function () {

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    var a = this;
    return a.filter(onlyUnique);
};

Array.prototype.uniqueObject = function (selector) {
    return this.filter((e, i) => this.findIndex((a) => {
        if (selector) {
            return selector(a) === selector(e);
        }
        return a === e;
    }) === i);
};


Array.prototype.clear = function (selector) {
    let res = this[this.findIndex(selector)];
    delete this[this.findIndex(selector)];
};



Array.prototype.remove = function (selector) {
    let idx = this.findIndex(selector)
    return this.splice(idx, 1);
};



// broken
Array.prototype.select = function (selector) {
    let res: any[];
    this.foreach(d =>
        res.push(selector(d))
    );
    return res;
};


Array.prototype.selectMany = function <TIn, TOut>(selectListFn: (t: TIn) => TOut[]): TOut[] {
    return this.reduce((out, inx) => {
        out.push(...selectListFn(inx));
        return out;
    }, new Array<TOut>());
};


export { };
