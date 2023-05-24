/**
 * 带有两个值的选项
 */
import ColorSelectionOption from "./ColorSelectionOption";

export default interface PriorityOption extends ColorSelectionOption {
    num1: number,
    num2: number,
}
