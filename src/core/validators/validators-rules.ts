import { translation } from "@/plugins/i18n";

class Validators {
    required(message?: string) {
        return (value: any) =>
            !!value || (message ?? translation("VALIDATIONS.REQUIRED"));
    }

    isNullOrEmpty(message?: string) {
        return (value: any) =>
            value !== null && value !== undefined && value !== ''
            || (message ?? translation("VALIDATIONS.REQUIRED"));
    }

    isArabic(message?: string) {
        const arabicRegex =
            /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s٠-٩0-9؟؛!@#$%^&*()_\-+=~`|{}\\[\]:";'<>?,.\\/\\s]+$/u;
        return (value: string) =>
            !value || arabicRegex.test(value) || (message ?? translation("VALIDATIONS.ARABIC"));
    }

    isEnglish(message?: string) {
        const englishRegex = /^[A-Za-z0-9!@#$%^&*()_\-+=~`|{}[\]:";'<>?,.\\/\s]+$/;
        return (value: string) =>
            !value || englishRegex.test(value) || (message ?? translation("VALIDATIONS.ENGLISH"));
    }

    minLength(min: number, message?: string) {
        return (value: string) =>
            (value?.length ?? 0) >= min || (message ?? translation("VALIDATIONS.MIN_LENGTH", { min }));
    }

    maxLength(max: number, message?: string) {
        return (value: string) =>
            (value?.length ?? 0) <= max || (message ?? translation("VALIDATIONS.MAX_LENGTH", { max }));
    }

    isValidEmail(message?: string) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return (value: string) =>
            !value || pattern.test(value) || (message ?? translation("VALIDATIONS.EMAIL"));
    }

    isPasswordStrength(message?: string) {
        return (value: string) => {
            if (!value) return true;
            const hasUpper = /[A-Z]/.test(value);
            const hasLower = /[a-z]/.test(value);
            const hasNumber = /\d/.test(value);
            const hasSpecial = /[!@#$%^&*]/.test(value);
            return (
                (hasUpper && hasLower && hasNumber && hasSpecial) ||
                (message ?? translation("VALIDATIONS.PASSWORD_STRENGTH"))
            );
        };
    }

    isNumeric(message?: string) {
        return (value: string) =>
            !value || /^\d+$/.test(value) || (message ?? translation("VALIDATIONS.NUMERIC"));
    }

    noWhitespace(message?: string) {
        return (value: string) =>
            !value || !/\s/.test(value) || (message ?? translation("VALIDATIONS.NO_WHITESPACE"));
    }

    alphanumeric(message?: string) {
        return (value: string) =>
            !value || /^[a-z0-9]+$/i.test(value) || (message ?? translation("VALIDATIONS.ALPHANUMERIC"));
    }

    positiveNumber(message?: string) {
        return (value: number) =>
            value > 0 || (message ?? translation("VALIDATIONS.POSITIVE_NUMBER"));
    }

    negativeNumber(message?: string) {
        return (value: number) =>
            value < 0 || (message ?? translation("VALIDATIONS.NEGATIVE_NUMBER"));
    }

    integer(message?: string) {
        return (value: number) =>
            Number.isInteger(value) || (message ?? translation("VALIDATIONS.INTEGER"));
    }

    greaterThanOrEqual(min: number, message?: string) {
        return (value: number) =>
            value >= min || (message ?? translation("VALIDATIONS.MIN_VALUE", { min }));
    }

    lessThanOrEqual(max: number, message?: string) {
        return (value: number) =>
            value <= max || (message ?? translation("VALIDATIONS.MAX_VALUE", { max }));
    }

    futureDate(message?: string) {
        return (value: string) => {
            const inputDate = new Date(value);
            return inputDate >= new Date() || (message ?? translation("VALIDATIONS.FUTURE_DATE"));
        };
    }

    pastDate(message?: string) {
        return (value: string) => {
            const inputDate = new Date(value);
            return inputDate <= new Date() || (message ?? translation("VALIDATIONS.PAST_DATE"));
        };
    }

    validTime(message?: string) {
        const pattern = /^([01]\d|2[0-3]):[0-5]\d$/;
        return (value: string) =>
            !value || pattern.test(value) || (message ?? translation("VALIDATIONS.VALID_TIME"));
    }

    validUUID(message?: string) {
        const pattern =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        return (value: string) =>
            !value || pattern.test(value) || (message ?? translation("VALIDATIONS.VALID_UUID"));
    }

    validJson(message?: string) {
        return (value: string) => {
            try {
                JSON.parse(value);
                return true;
            } catch {
                return message ?? translation("VALIDATIONS.VALID_JSON");
            }
        };
    }

    evenNumber(message?: string) {
        return (value: number) =>
            value % 2 === 0 || (message ?? translation("VALIDATIONS.EVEN_NUMBER"));
    }

    oddNumber(message?: string) {
        return (value: number) =>
            value % 2 !== 0 || (message ?? translation("VALIDATIONS.ODD_NUMBER"));
    }

    boolean(message?: string) {
        return (value: any) =>
            typeof value === "boolean" || (message ?? translation("VALIDATIONS.BOOLEAN"));
    }

    username(message?: string) {
        const pattern = /^[a-z0-9_.]{3,20}$/i;
        return (value: string) =>
            !value || pattern.test(value) || (message ?? translation("VALIDATIONS.USERNAME"));
    }

    validHexColor(message?: string) {
        const pattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return (value: string) =>
            !value || pattern.test(value) || (message ?? translation("VALIDATIONS.VALID_HEX_COLOR"));
    }

    validIP(message?: string) {
        const ipv4 =
            /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        const ipv6 = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
        return (value: string) =>
            !value ||
            ipv4.test(value) ||
            ipv6.test(value) ||
            (message ?? translation("VALIDATIONS.VALID_IP"));
    }

    validBase64(message?: string) {
        const pattern =
            /^([A-Za-z0-9+\\/]{4})*([A-Za-z0-9+\\/]{3}=|[A-Za-z0-9+\\/]{2}==)?$/;
        return (value: string) =>
            !value || pattern.test(value) || (message ?? translation("VALIDATIONS.VALID_BASE64"));
    }

    validMAC(message?: string) {
        const pattern = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
        return (value: string) =>
            !value || pattern.test(value) || (message ?? translation("VALIDATIONS.VALID_MAC"));
    }

    validXML(message?: string) {
        return (value: string) => {
            if (!value) return true;
            try {
                const parser = new DOMParser();
                const parsed = parser.parseFromString(value, "text/xml");
                const isError = parsed.getElementsByTagName("parsererror").length > 0;
                return !isError || (message ?? translation("VALIDATIONS.VALID_XML"));
            } catch {
                return message ?? translation("VALIDATIONS.VALID_XML");
            }
        };
    }
    startsWith(start: string, message?: string) {
        return (value: string) =>
            value?.startsWith(start) || (message ?? translation("VALIDATIONS.STARTS_WITH", { start }));
    }
    endsWith(end: string, message?: string) {
        return (value: string) =>
            value?.endsWith(end) || (message ?? translation("VALIDATIONS.ENDS_WITH", { end }));
    }
    regexMatch(pattern: RegExp, message?: string) {
        return (value: string) =>
            pattern.test(value) || (message ?? translation("VALIDATIONS.REGEX_MATCH"));
    }
    betweenDates(start: Date, end: Date, message?: string) {
        return (value: string) => {
            const date = new Date(value);
            return (date >= start && date <= end) || (message ?? translation("VALIDATIONS.BETWEEN_DATES"));
        };
    }
    matchesRegex(pattern: RegExp, message?: string) {
        return (value: string) =>
            pattern.test(value) || (message ?? translation("VALIDATIONS.REGEX_MATCH"));
    }
    isPhoneNumber(message?: string) {
        const pattern = /^\+?[0-9]{7,15}$/;
        return (value: string) =>
            !value || pattern.test(value) || (message ?? translation("VALIDATIONS.PHONE_NUMBER"));
    }
    isNationalID(message?: string) {
        const pattern = /^[0-9]{12}$/; // مثال
        return (value: string) =>
            !value || pattern.test(value) || (message ?? translation("VALIDATIONS.NATIONAL_ID"));
    }
}

export const validationRules = new Validators();
