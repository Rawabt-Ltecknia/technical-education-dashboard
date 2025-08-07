

class AppConfigManager {
    private static instance: AppConfigManager;
    private config!: AppConfig;
    // private environment = process.env;

    private constructor() {
        this.initialize().then()
    }

    public static getInstance(): AppConfigManager {
        if (!AppConfigManager.instance) {
            AppConfigManager.instance = new AppConfigManager();
        }
        return AppConfigManager.instance;
    }

    public async initialize(): Promise<void> {
        this.config = {
            api: this.loadApiConfig(),
            information: this.loadAppInformationConfig(),
            environment: this.getOptionalString('VUE_APP_ENVIRONMENT', 'Development')
        };

        await this.validateConfig();
    }

    private loadApiConfig(): ApiConfig {
        return {
            baseUrl: this.getRequiredString('VUE_APP_BASE_URL'),
            dashboardUrlSuffix: this.getRequiredString('VUE_APP_DASHBOARD_URL_SUFFIX'),
            timeout: this.getOptionalNumber('VUE_APP_TIMEOUT', 30000),
            version: this.getOptionalString('VUE_APP_API_VERSION', 'v1'),
        };
    }

    private loadAppInformationConfig(): AppInformationConfig {
        return {
            appName: this.getOptionalString('VUE_APP_APP_NAME'),
            appDescription: this.getOptionalString('VUE_APP_APP_DESC'),
            appVersion: this.getOptionalString('VUE_APP_APP_VERSION')
        };
    }

    private async validateConfig(): Promise<void> {
        const requiredKeys = [
            'VUE_APP_BASE_URL',
        ];
        requiredKeys.forEach(key => {
            if (!process.env[key]) {
                throw new Error(`Missing required environment variable: ${key}`);
            }
        });
    }

    private getRequiredString(key: string): string {
        const value = process.env[key];
        if (!value) throw new Error(`Missing required environment variable: ${key}`);
        return value;
    }

    private getOptionalString(key: string, defaultValue = ''): string {
        return process.env[key] || defaultValue;
    }

    private getOptionalNumber(key: string, defaultValue: number): number {
        const value = process.env[key];
        return value ? Number(value) : defaultValue;
    }

    public get env(): Record<string, string> {
        return process.env;
    }

    public get isDevelopment(): boolean {
        return this.config.environment.toLowerCase() === 'development'.toLowerCase();
    }

    public get isProduction(): boolean {
        return this.config.environment.toLowerCase() === 'production'.toLowerCase();
    }

    public get apiConfig(): ApiConfig {
        this.checkInitialized();
        return this.config.api;
    }

    public get appInformationConfig(): AppInformationConfig {
        this.checkInitialized();
        return this.config.information;
    }

    private checkInitialized(): void {
        if (!this.config) {
            throw new Error('AppConfig must be initialized before accessing values');
        }
    }

    public async refreshConfig(): Promise<void> {
        await this.initialize();
    }
}

export const appConfig = AppConfigManager.getInstance();



export interface AppConfig {
    api: ApiConfig;
    information: AppInformationConfig
    environment: string
}

export interface ApiConfig {
    baseUrl: string;
    dashboardUrlSuffix: string;
    timeout: number;
    version: string;
}

export interface AppInformationConfig {
    appName: string;
    appDescription: string;
    appVersion: string;
}
