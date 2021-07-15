import Papa from 'papaparse'

/**
 * Gets the csv headers from the file. Reads the first line of readable
 * text from the csv file to determine the csv headers. This will read
 * the file in chunks to obtain the headers. This avoids loading the
 * entire file in memory (for large files).
 * @param blob
 */
export async function getCSVHeaders(blob: Blob): Promise<string[]> {
  const reader = blob.stream().getReader()
  const utf8decode = new TextDecoder('utf-8')
  let {value: chunk, done: readerDone} = await reader.read()
  chunk = chunk ? utf8decode.decode(chunk, {stream: true}) : ''

  // Read until we find text, which should be the csv header
  const re = /[a-zA-Z0-9]+(?:\r\n|\n|\r)/gm
  for (;;) {
    if (readerDone || re.test(chunk))
      break
    const {value, done} = await reader.read()
    readerDone = done
    chunk = chunk + (value ? utf8decode.decode(value, {stream: true}) : '')
  }

  try {
    const s = chunk.substr(0, re.lastIndex).trim()
    const csv = Papa.parse(s)
    return csv.data[0] as string[] // headers
  } catch (e) {
    return []
  }
}
