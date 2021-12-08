// 整数を渡すと連番が入った配列を渡す
export const range = (num) => {
  return [...Array(num).keys()]
}
