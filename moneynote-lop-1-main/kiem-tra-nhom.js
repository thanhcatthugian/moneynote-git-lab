// Kiểm tra cho bài làm nhóm. Cách chạy: node kiem-tra-nhom.js
// GitHub Actions cũng chạy file này trên mỗi Pull Request.
//
// - Hàm tinhTong phải đúng.
// - Không được còn dấu xung đột (<<<<<<< ======= >>>>>>>) trong code.
// - Hàm của Issue nào đã có thì phải chạy đúng; chưa có thì chỉ nhắc "chưa làm".
'use strict';
const fs = require('fs');
const path = require('path');

let loi = 0;
function dat(msg) { console.log('  ĐẠT    ' + msg); }
function sai(msg) { console.log('  LỖI    ' + msg); loi++; }
function chua(msg) { console.log('  CHƯA   ' + msg); }

console.log('Kiểm tra MoneyNote Lite\n');

// 1. Dấu xung đột
const fileCode = ['index.html', 'js/app.js', 'js/tinh-toan.js', 'css/style.css'];
for (const f of fileCode) {
  const p = path.join(__dirname, f);
  if (!fs.existsSync(p)) continue;
  const dong = fs.readFileSync(p, 'utf8').split('\n');
  const vt = dong.findIndex(d => /^(<<<<<<<|=======|>>>>>>>)( |$)/.test(d));
  if (vt >= 0) sai(`${f} dòng ${vt + 1} còn dấu xung đột: ${dong[vt].trim()}`);
}

// 2. Các hàm tính toán
let tt;
try {
  tt = require('./js/tinh-toan.js');
} catch (e) {
  sai('Không nạp được js/tinh-toan.js: ' + e.message);
  tt = {};
}

const mau = [
  { loai: 'thu', soTien: 100000 },
  { loai: 'thu', soTien: 50000 },
  { loai: 'chi', soTien: 30000 }
];

function thu(ten, fn) {
  if (typeof tt[ten] !== 'function') return chua(`${ten}() – chưa có (Issue tương ứng chưa làm)`);
  try {
    const kq = fn(tt[ten]);
    kq === true ? dat(`${ten}()`) : sai(`${ten}() – ${kq}`);
  } catch (e) {
    sai(`${ten}() – lỗi khi chạy: ${e.message}`);
  }
}

if (typeof tt.tinhTong !== 'function') {
  sai('tinhTong() – không tìm thấy hàm');
} else {
  const a = tt.tinhTong(mau, 'thu'), b = tt.tinhTong(mau, 'chi');
  a === 150000 && b === 30000
    ? dat('tinhTong() (Issue #1)')
    : sai(`tinhTong() (Issue #1) – tổng thu = ${JSON.stringify(a)}, tổng chi = ${JSON.stringify(b)}, mong đợi 150000 và 30000`);
}

thu('dinhDangNgay', f => f('2026-10-05') === '05/10/2026' || `dinhDangNgay('2026-10-05') = ${JSON.stringify(f('2026-10-05'))}, mong đợi "05/10/2026"`);
thu('tinhSoDu', f => f(mau) === 120000 || `tinhSoDu(mẫu) = ${JSON.stringify(f(mau))}, mong đợi 120000`);
thu('boDau', f => f('Đổ Xăng Cà Phê') === 'do xang ca phe' || `boDau('Đổ Xăng Cà Phê') = ${JSON.stringify(f('Đổ Xăng Cà Phê'))}, mong đợi "do xang ca phe"`);

console.log('');
if (loi) {
  console.log(`KẾT QUẢ: LỖI (${loi} lỗi)`);
  process.exit(1);
}
console.log('KẾT QUẢ: ĐẠT');
