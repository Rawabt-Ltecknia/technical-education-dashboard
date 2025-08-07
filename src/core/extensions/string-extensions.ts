declare global {
    interface String {
        toArabic(): string;
        toEnglishNumbers(): string;
        capitalize(): string;
        isNullOrEmpty(): boolean;
        reverse(): string;
        removeWhiteSpaces(): string;
        truncate(length: number): string;
    }
}

String.prototype.toArabic = function (): string {
    const arabicNumbers = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    return this.replace(/\d/g, d => arabicNumbers[+d]);
};

String.prototype.toEnglishNumbers = function (): string {
    const englishNumbers = ['0','1','2','3','4','5','6','7','8','9'];
    return this.replace(/[٠-٩]/g, d => englishNumbers['٠١٢٣٤٥٦٧٨٩'.indexOf(d)]);
};

String.prototype.capitalize = function (): string {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.isNullOrEmpty = function (): boolean {
    return this == null || this.trim() === '';
};

String.prototype.reverse = function (): string {
    return [...this].reverse().join('');
};

String.prototype.removeWhiteSpaces = function (): string {
    return this.replace(/\s+/g, '');
};

String.prototype.truncate = function (length: number=30): string {
    if (this.length <= length) return this.toString();
    return this.substring(0, length) + '...';
};

export {};
