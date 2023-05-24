import BaseService from "../base/BaseService";
import Editor from "../../model/editor/Editor";

export default class EditorService extends BaseService {

    static URL_TINY_LOGIN = "/api/editor/tiny/login"
    static URL_LOGIN = "/api/editor/login"
    static URL_LOGOUT = "/api/editor/logout"


    public static async httpTinyLogin(): Promise<Editor> {

        let data = await BaseService.httpPost(EditorService.URL_TINY_LOGIN, {})

        let editor = new Editor();
        editor.assign(data)

        return editor
    }



    public static async httpLogin(username: string, password: string): Promise<Editor> {

        let data = await BaseService.httpPost(EditorService.URL_LOGIN, {username, password})

        let editor = new Editor();
        editor.assign(data)

        return editor
    }



    public static async httpLogout(): Promise<void> {

        await BaseService.httpPost(EditorService.URL_LOGOUT, {})

    }


}