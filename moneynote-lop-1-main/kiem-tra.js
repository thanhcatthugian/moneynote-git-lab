// Kiểm tra nhanh hàm tinhTong. Cách chạy: node kiem-tra.js
// Kết quả: in ra ĐẠT (mã thoát 0) hoặc LỖI (mã thoát 1)
const { tinhTong } = require('./js/tinh-toan.js');

const mau = [
  { loai: 'thu', soTien: 100000 },
  { loai: 'thu', soTien: 50000 },
  { loai: 'chi', soTien: 30000 }
];

const thu = tinhTong(mau, 'thu');
const chi = tinhTong(mau, 'chi');

if (thu === 150000 && chi === 30000) {
  console.log('ĐẠT: tổng thu = 150000, tổng chi = 30000');
  process.exit(0);
}

console.log('LỖI: tổng thu = ' + JSON.stringify(thu) + ', tổng chi = ' + JSON.stringify(chi));
process.exit(1);
