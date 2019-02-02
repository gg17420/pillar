import utf from './utf8'

let hexcase = 0,
    b64pad = '',
    chrsz = 8;

function md5(input) {
  let input = utf8(typeof input === 'string'? input: input.toString());
  return binl2hex(core_md5(str2binl(input), input.length * chrsz));
}

function core_md5(x, len) {
}

function md5_cmn() {}
function md5_ff() {}
function md5_gg() {}
function md5_hh() {}
function md5_ii() {}
function safe_add() {}
function bit_rol() {}
function str2binl() {}
function binl2hex() {}
export default md5
