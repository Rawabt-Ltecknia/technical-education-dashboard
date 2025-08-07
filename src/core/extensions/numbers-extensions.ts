declare global {
    interface Number {
        toCurrency(locale?: string, currency?: string): string;
        isEven(): boolean;
        isOdd(): boolean;
        clamp(min: number, max: number): number;
        toArabic(): string;
    }
}

Number.prototype.toCurrency = function (locale = 'en-US', currency = 'USD'): string {
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(this.valueOf());
};

Number.prototype.isEven = function (): boolean {
    return this.valueOf() % 2 === 0;
};

Number.prototype.isOdd = function (): boolean {
    return this.valueOf() % 2 !== 0;
};

Number.prototype.clamp = function (min: number, max: number): number {
    return Math.min(Math.max(this.valueOf(), min), max);
};

Number.prototype.toArabic = function (): string {
    const arabicNumbers = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    return this.toString().replace(/\d/g, d => arabicNumbers[+d]);
};

export {};
