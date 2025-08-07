import type { App } from 'vue'

import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'
import defaults from './defaults'
// import { icons } from './icons'
import { themes } from './theme'

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import 'vuetify/styles'
import {icons} from "@/plugins/vuetify/icons";

export default function (app: App) {
  const vuetify = createVuetify({
    aliases: {
      IconBtn: VBtn,
    },
    defaults,
    icons,
    theme: {
      defaultTheme: 'light',
      themes,
    },
    components,
    directives,
  })

  app.use(vuetify)
}
