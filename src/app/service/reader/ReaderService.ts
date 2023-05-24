import BaseService from "../base/BaseService";
import Reader from "../../model/reader/Reader";

export default class ReaderService extends BaseService {

    static URL_TINY_LOGIN = "/api/reader/tiny/login"
    static URL_LOGIN = "/api/reader/login"
    static URL_LOGOUT = "/api/reader/logout"


    public static async httpTinyLogin(): Promise<Reader> {

        let data = await BaseService.httpPost(ReaderService.URL_TINY_LOGIN, {})

        let reader = new Reader();
        reader.assign(data)

        return reader
    }



    public static async httpLogin(username: string, password: string): Promise<Reader> {

        let data = await BaseService.httpPost(ReaderService.URL_LOGIN, {username, password})

        let reader = new Reader();
        reader.assign(data)

        return reader
    }



    public static async httpLogout(): Promise<void> {

        await BaseService.httpPost(ReaderService.URL_LOGOUT, {})

    }


}