function deflateEncode(data, gzip){
    return new Response(new Blob([data]).stream().pipeThrough(new CompressionStream(gzip ? "gzip" : "deflate"))).arrayBuffer();
}

function deflateDecode(data, gzip){
    return new Response(new Blob([data]).stream().pipeThrough(new DecompressionStream(gzip ? "gzip" : "deflate"))).arrayBuffer();
}