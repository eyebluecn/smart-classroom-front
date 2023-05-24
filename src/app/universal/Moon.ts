import Reader from "../model/reader/Reader";
import Editor from "../model/editor/Editor";
import Author from "../model/author/Author";

export default class Moon {

    public static reader: Reader = new Reader()

    public static editor: Editor = new Editor()

    public static author: Author = new Author()

    public static hasReaderLogin(): boolean {
        return !!Moon.reader.id
    }

    public static hasEditorLogin(): boolean {
        return !!Moon.editor.id
    }

    static hasAuthorLogin() {
        return !!Moon.author.id
    }
}