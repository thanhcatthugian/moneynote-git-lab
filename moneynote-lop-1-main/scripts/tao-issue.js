#!/usr/bin/env node
/*
 * Tạo nhãn và 8 Issue mẫu cho repo của nhóm (dành cho nhóm trưởng).
 *
 * Cần cài GitHub CLI và đăng nhập: https://cli.github.com  →  gh auth login
 * Chạy trong thư mục repo của nhóm:
 *   node scripts/tao-issue.js
 *
 * Không có GitHub CLI thì tạo Issue bằng tay theo Phụ lục trong BAI_TAP_NHOM.md.
 */
'use strict';
const { execFileSync } = require('child_process');
const path = require('path');
const issues = require(path.join(__dirname, 'issues.json'));

const NHAN = [
  { ten: 'lỗi', mau: 'd73a4a', moTa: 'Có gì đó chạy sai' },
  { ten: 'tính năng', mau: '0e8a16', moTa: 'Tính năng mới' },
  { ten: 'tài liệu', mau: '0075ca', moTa: 'README, hướng dẫn' },
  { ten: 'ưu tiên cao', mau: 'b60205', moTa: 'Cần làm trước' }
];

function gh(args) {
  return execFileSync('gh', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

try {
  gh(['auth', 'status']);
} catch (e) {
  console.error('Chưa cài hoặc chưa đăng nhập GitHub CLI. Chạy: gh auth login');
  process.exit(1);
}

for (const n of NHAN) {
  gh(['label', 'create', n.ten, '--color', n.mau, '--description', n.moTa, '--force']);
  console.log(`Nhãn: ${n.ten}`);
}

const daCo = JSON.parse(gh(['issue', 'list', '--state', 'all', '--limit', '100', '--json', 'title']))
  .map(i => i.title);

for (const is of issues) {
  if (daCo.includes(is.tieuDe)) {
    console.log(`Bỏ qua (đã có): ${is.tieuDe}`);
    continue;
  }
  const args = ['issue', 'create', '--title', is.tieuDe, '--body', is.noiDung];
  is.nhan.forEach(n => args.push('--label', n));
  const url = gh(args);
  console.log(`Đã tạo: ${is.tieuDe} → ${url}`);
}
console.log('\nXong. Mở tab Issues trên GitHub để phân công (Assignees) cho từng thành viên.');
