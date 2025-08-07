declare global {
    interface Date {
        toShortDate(): string;
        toFullDate(): string;
        addDays(days: number): Date;
        isWeekend(): boolean;
        isToday(): boolean;
    }
}

Date.prototype.toShortDate = function (): string {
    return this.toLocaleDateString('en-GB'); // DD/MM/YYYY
};

Date.prototype.toFullDate = function (): string {
    return this.toLocaleDateString('ar-LY', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

Date.prototype.addDays = function (days: number): Date {
    const date = new Date(this);
    date.setDate(date.getDate() + days);
    return date;
};

Date.prototype.isWeekend = function (): boolean {
    return this.getDay() === 0 || this.getDay() === 6;
};

Date.prototype.isToday = function (): boolean {
    const today = new Date();
    return this.toDateString() === today.toDateString();
};

export {};
