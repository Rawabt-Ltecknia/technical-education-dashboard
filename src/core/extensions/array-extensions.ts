declare global {
    interface Array<T> {
        isEmpty(): boolean;
        distinct(): T[];
        chunk(size: number): T[][];
        last(): T | undefined;
        first(): T | undefined;
        remove(item: T): T[];
    }
}

Array.prototype.isEmpty = function (): boolean {
    return this.length === 0;
};

Array.prototype.distinct = function (): any[] {
    return [...new Set(this)];
};

Array.prototype.chunk = function (size: number): any[][] {
    const result = [];
    for (let i = 0; i < this.length; i += size) {
        result.push(this.slice(i, i + size));
    }
    return result;
};

Array.prototype.last = function (): any {
    return this[this.length - 1];
};

Array.prototype.first = function (): any {
    return this[0];
};

Array.prototype.remove = function (item: any): any[] {
    const index = this.indexOf(item);
    if (index > -1) {
        this.splice(index, 1);
    }
    return this;
};

export {};
