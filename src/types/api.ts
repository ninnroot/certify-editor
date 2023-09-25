
export type queryParamOptions = {
    page?: number,
    size?: number,
    sorts?: string[],
    expand?: string[]
}

export enum operatorEnum {
    exact = "exact",
    iexact = "iexact",
    in = "in",
    lt = "lt",
    gt = "gt",
    lte = "lte",
    gte = "gte",
    icontains = "icontains"

}

export type filterParam = {
    field_name: string,
    operator: operatorEnum,
    value: string
}

export type filterParamsBody = {
    filter_params?: filterParam[],
    exlude_params?: filterParam[]
}
