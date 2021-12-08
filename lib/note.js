export const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
export const noteFlatNames = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
export const triadDegrees = ['', '', 'sus2', 'm3', '3', '4', 'b5', '5', 'b6', '6', '7', 'M7']
export const tensionDegrees = ['', 'b9', '9', '#9', 'b11', '11', '#11', '', 'b13', '13', '#13', '']

// 音番号を渡すと音名を返す
export const getNoteName = (noteNumber) => {
  const alphabet = noteNumber % 12
  return `${noteNames[alphabet]}`
}

// 音番号を渡すと国際式音名を返す
// 国際式音名は C0 から始まる
export const getFullNoteName = (noteNumber) => {
  const number = Math.floor(noteNumber / 12)
  const alphabet = noteNumber % 12
  return `${noteNames[alphabet]}${number}`
}

// 音番号を渡すとスケール上の音名を返す 無ければ空文字
export const getScaleNoteName = (noteNumber, scaleNotes) => {
  const alphabet = noteNumber % 12
  return `${scaleNotes[alphabet]}`
}

// 音名から音番号を変換して返す
export const getNoteNum = (noteStr) => {
  return noteNames.indexOf(noteStr)
}
