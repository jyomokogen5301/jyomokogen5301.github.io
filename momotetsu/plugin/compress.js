const compress = async target => {
    const arrayBufferToBinaryString = arrayBuffer => {
      const bytes = new Uint8Array(arrayBuffer)
  
      let binaryString = ""
      for (let i = 0; i < bytes.byteLength; i++) {
        binaryString += String.fromCharCode(bytes[i])
      }
  
      return binaryString
    }
  
    const blob = new Blob([target])
    const stream = blob.stream()
    const compressedStream = stream.pipeThrough(
      new CompressionStream("deflate-raw")
    )
  
    const buf = await new Response(compressedStream).arrayBuffer()
  
    const binaryString = arrayBufferToBinaryString(buf)
    const encodedByBase64 = btoa(binaryString)
    return encodedByBase64
  }
  
  const decompress = async target => {
    const binaryStringToBytes = str => {
      const bytes = new Uint8Array(str.length)
      for (let i = 0; i < str.length; i++) {
        bytes[i] = str.charCodeAt(i)
      }
      return bytes
    }
  
    const decodedByBase64 = atob(target)
    const bytes = binaryStringToBytes(decodedByBase64)
  
    const stream = new Blob([bytes]).stream()
  
    const decompressedStream = stream.pipeThrough(
      new DecompressionStream("deflate-raw")
    )
  
    return await new Response(decompressedStream).text()
  }
  
