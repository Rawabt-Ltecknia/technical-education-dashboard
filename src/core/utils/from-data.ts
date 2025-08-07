function toFormData(obj :any, formData = new FormData(), parentKey = '') {
    for (const key in obj) {
        if (!obj.hasOwnProperty(key)) continue;

        const value = obj[key];
        const formKey = parentKey ? `${parentKey}[${key}]` : key;

        if (value instanceof File || value instanceof Blob) {
            formData.append(formKey, value);
        } else if (typeof value === 'object' && value !== null && !(value instanceof Date)) {
            toFormData(value, formData, formKey);
        } else {
            formData.append(formKey, value);
        }
    }

    return formData;
}
