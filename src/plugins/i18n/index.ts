import english from '@/plugins/i18n/locals/en.json'
import arabic from '@/plugins/i18n/locals/ar.json'

import {createI18n} from 'vue-i18n'
import {ar as vuetifyAr, en as vuetifyEn} from "vuetify/locale";

export const i18n = createI18n({
    locale: localStorage.getItem('locale') || 'en',
    fallbackLocale: localStorage.getItem('locale') || 'en',
    // messages: locales,
    messages: {
        ar: {
            $vuetify: vuetifyAr,
            ...arabic,
        },
        en: {
            $vuetify: vuetifyEn,
            ...english
        },
    },
    globalInjection: true,
})
export const translation = i18n.global.t
export const getCurrentLocale = () =>( i18n.global.locale ??  localStorage.getItem('locale')) ?? "ar";

export function setLocale(newLocale: string) {
    localStorage.setItem('locale', newLocale)
    i18n.global.locale =newLocale ==="ar" ?"ar" :"en"
}

