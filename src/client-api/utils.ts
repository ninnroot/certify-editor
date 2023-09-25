import { queryParamDefault } from "@/config/defaults";
import { axiosClient } from "@/lib/api"
import { filterParamsBody, queryParamOptions } from "@/types/api"
import { AxiosResponse } from "axios";

export function encodeArrayToBase64(array: Array<string>) {
    return Buffer.from(JSON.stringify(array)).toString("base64");
}
export function encodeQueryData(data: any) {
    const ret = [];
    for (let d in data)
        ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return "?" + ret.join('&');
}



export const makeSearchParams = (queryParams: queryParamOptions) => {
    return encodeQueryData({
        page: String(queryParams.page || queryParamDefault.page),
        size: String(queryParams.size || queryParamDefault.size),
        sorts: encodeArrayToBase64(queryParams.sorts || []),
        expand: encodeArrayToBase64(queryParams.expand || [])
    })
}

export const fetchEntity = async(entity: string, entityId: number | string, expandParams: string[] = [])=> {
    return (await axiosClient.get(`${entity}/${entityId}?expand=${encodeArrayToBase64(expandParams)}`))
}

export const fetchEntities = async (entity: string, queryParams: queryParamOptions = queryParamDefault) => {
    return (await axiosClient.get(entity + makeSearchParams(queryParams)))
}

export const searchEntities = async (entity: string, queryParams: queryParamOptions = queryParamDefault, filterParams: filterParamsBody = {}) => {
    return (await axiosClient.post(`${entity}/search${makeSearchParams(queryParams)}`, filterParams))
}

export const createEntity = async (entity: string, data: Object, queryParamOptions = queryParamDefault) => {
    return (await axiosClient.post(`${entity}${makeSearchParams(queryParamOptions)}`, data))
}

export const updateEntities = async (entity: string, data: Object) => {
    return (await axiosClient.put(`${entity}`, data))
}

export const updateEntity = async (entity: string, entityId: number | string, data: Object) => {
    return (await axiosClient.put(`${entity}/${entityId}`, data))
}
