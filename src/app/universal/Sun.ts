import {SimpleFunction} from "./index";

export default class Sun {


    static listeners: SimpleFunction[] = []


    public static register(fun: SimpleFunction) {
        Sun.listeners.push(fun)
    }

    public static updateFrame() {
        for (let listener of Sun.listeners) {
            listener()
        }
    }
}