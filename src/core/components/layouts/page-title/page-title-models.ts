
export interface BreadcrumbItem {
    text: string
    to?: string
    icon?: string
}

export interface Breadcrumb {
    breadcrumbItems?: BreadcrumbItem[]
    pageTitle?: string
    pageSubTitle?: string
    pageTitleIcon?: string
}
