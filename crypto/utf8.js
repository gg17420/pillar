function utf8(input) {
  var output = '',
  c = '',
  input = input.replace(/\r\n/g, '\n');
  
  for (let n = 0, len = input.length; n < len; n++) {
    c = input.charCodeAt(n);
    if (c < 128) {
      output += String.fromCharCode(c);
    } else if ((c > 127) && (c < 2048)) {
      output += String.fromCharCode((c >> 6) | 192);
      output += String.fromCharCode((c & 63) | 128);
    } else {
      output += String.fromCharCode((c >> 12) | 224);
      output += String.fromCharCode(((c >> 6) & 63) | 128);
      output += String.fromCharCode((c & 63) | 128);
    }
  }
  
  return output;
}

export default utf8
