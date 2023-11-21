import axios, { AxiosInstance, AxiosResponse } from "axios";
import { Await } from "react-router-dom";
import { idText } from "typescript";

export interface IDataRequest{
    
    url: string;
    data?: object;
    headers?: object;
}

export interface IDataResponse <T= any>{

    data: T;
    statusCode: number;
    message: string;
}

export interface IHttpClient <T= any>{
    api: T;

    get(data: IDataRequest): Promise<IDataResponse<T>>;
}

class Api implements IHttpClient <AxiosInstance>{
    api: AxiosInstance;

    constructor(baseUrl:string){
        this.api = axios.create({
            baseURL:baseUrl
        })
    }

    async get(data: IDataRequest): Promise<IDataResponse>{

    
        try {
            let resp: AxiosResponse = await this.api.get(data.url,{
                headers: data.headers
            });     
            
            if(resp.status === 200){
                return {
                  data: resp.data,
                  message: "Ok",
                  statusCode: resp.status,  
                }
            }
            return{
                data: null,
                message: "",
                statusCode: resp.status
            }
        } catch (e) {
            return{
                data: null,
                message: "Error",
                statusCode: 500,
            }
        }
    }
    async post(data: IDataRequest): Promise<IDataResponse>{
        try{
            let resp  = await this.api.post(data.url, data.data,{
                headers: data.headers || {},
            });

            return{
                data:resp.data,
                message: resp.data.message || "Ok",
                statusCode: resp.status
            }
        }catch (e){
            return{
                data: null,
                message: "Error",
                statusCode: 500,
            }
        }
    }
    async put(data: IDataRequest): Promise<IDataResponse>{
        try {
            let resp: AxiosResponse = await this.api.put(data.url, data.data,{
                headers: data.headers
            });

            return{
                data: resp.data,
                message: resp.data.message || "OK",
                statusCode: resp.status   
            }

        } catch (e) {
            return{
                data: null,
                message: "Error",
                statusCode: 500
            }
        }
    }
}

const api = new Api(`http://localhost:8080`);

export default api;