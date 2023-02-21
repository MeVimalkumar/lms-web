import { HttpMethods } from "../enums/http-methods";

export interface ApiRequest {
    path: string,
    method?: HttpMethods
    qparams?: any
    body?: Array<any> | Object
    httpOptions?: any
}