import {defineStore} from "pinia";
import {ref} from "vue";

// export interface snackbarState {
//     show: boolean;
//     msg: string;
//     icon: string;
//     type: string;
// }

export const useSnackbarStore = defineStore('snackbar', () => {
    const show = ref<boolean>(false);
    const type = ref<string>("success");
    const message = ref<string>("");
    const icon = ref<string>("");
    const location = ref<string | null>();
    const timeout = ref<number>(3000);
    const width = ref<number>(400);

    async function showSnackbar(msg: string,
                                snackbarType: "success" | "warning" | "info" | "error" = "success",
                                snackbarLocation: string = "top right",
                                snackbarTimeout: number = 3000
    ) {

        timeout.value = snackbarTimeout;
        location.value = snackbarLocation;
        message.value = msg;
        type.value = snackbarType;
        if (msg.length > 35)
        {
            width.value = 500;
        }
        if (snackbarType == "success") {
            icon.value = "mdi-check-circle";
        } else if (snackbarType == "warning") {
            icon.value = "mdi-alert";
        } else if (snackbarType == "error") {
            icon.value = "mdi-alert-circle";
        } else if (snackbarType == "info") {
            icon.value = "mdi-information";
        }
        show.value = true;
    }

    async function showSuccess(msg: string,
                               snackbarLocation: string = "top right",
                               snackbarTimeout: number = 3000) {
        await showSnackbar(msg, "success", snackbarLocation, snackbarTimeout);
    }

    async function showError(msg: string,
                             snackbarLocation: string = "top right",
                             snackbarTimeout: number = 3000) {
        await showSnackbar(msg, "error", snackbarLocation, snackbarTimeout);
    }

    async function showInfo(msg: string,
                            snackbarLocation: string = "top right",
                            snackbarTimeout: number = 3000) {
        await showSnackbar(msg, "info", snackbarLocation, snackbarTimeout);
    }

    async function showWarning(msg: string,
                               snackbarLocation: string = "top right",
                               snackbarTimeout: number = 3000) {
        await showSnackbar(msg, "warning", snackbarLocation, snackbarTimeout);
    }


    return {
        show,
        type,
        message,
        icon,
        timeout,
        location,
        width,
        showSnackbar,
        showSuccess,
        showError,
        showInfo,
        showWarning,
    };
});
