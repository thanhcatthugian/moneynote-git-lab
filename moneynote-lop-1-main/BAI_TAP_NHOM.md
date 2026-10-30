# Phần 8 – Làm việc nhóm trên GitHub

Ở Phần 1–7, mỗi em làm một mình trên bản sao riêng. Phần này cả nhóm **3–4 người** cùng làm trên **một repo chung**, như một nhóm dự án thật: chia việc bằng Issue, mỗi người một nhánh, mọi thay đổi qua Pull Request, có người duyệt, có kiểm tra tự động.

**Mục tiêu:** sau phần này, em biết:

- Làm việc trên repo chung: thêm cộng tác viên, bảo vệ nhánh `main`
- Chia việc bằng Issue, đặt tên nhánh theo Issue, đóng Issue tự động bằng `Closes #số`
- Mở Pull Request, duyệt code (Approve / Request changes), sửa theo góp ý
- Cập nhật nhánh khi bạn khác đã merge trước, xử lý **xung đột thật** với đồng đội
- Đọc kết quả kiểm tra tự động (GitHub Actions) và phát hành bản `v2.0`

**Thời lượng:** 2 buổi. **Cần có:** mỗi người một tài khoản GitHub, đã làm xong Phần 0. Nên đọc trước `CONTRIBUTING.md` (quy ước của nhóm).

> Một số Issue được thiết kế để **chắc chắn đụng nhau** ở cùng dòng code. Gặp xung đột là đúng kịch bản, không phải em làm sai.

---

## Bước 1. Phân công

Nhóm bầu một **nhóm trưởng** (A). Chia Issue **đúng theo bảng** dưới: một số cặp Issue cố ý sửa cùng một chỗ trong code, nên phải do hai người khác nhau làm thì mới có xung đột thật để thực hành.

**Nhóm 4 người**

| Thành viên | Issue |
|---|---|
| A – nhóm trưởng | #1 Sửa lỗi tổng, #5 Thẻ Số dư |
| B | #2 Danh mục, #8 Thẻ Số giao dịch |
| C | #3 Thêm giao dịch mẫu, #6 Tìm kiếm không dấu |
| D | #4 Định dạng ngày, #7 Dọn debug và README |

**Nhóm 3 người**

| Thành viên | Issue |
|---|---|
| A – nhóm trưởng | #1 Sửa lỗi tổng, #5 Thẻ Số dư, #7 Dọn debug và README |
| B | #2 Danh mục, #8 Thẻ Số giao dịch |
| C | #3 Thêm giao dịch mẫu, #4 Định dạng ngày, #6 Tìm kiếm không dấu |

---

## Bước 2. Nhóm trưởng tạo repo chung

1. Mở repo bài tập trên GitHub, bấm **Use this template → Create a new repository**.
   - Đặt tên, ví dụ `moneynote-nhom-1`.
   - Chọn **Public**. (Repo Private chỉ bảo vệ nhánh được khi tài khoản có GitHub Pro. Sinh viên đăng ký GitHub Education sẽ được Pro miễn phí.)
2. Thêm thành viên: **Settings → Collaborators → Add people**. Các bạn vào email bấm chấp nhận lời mời.
3. Bảo vệ `main`: **Settings → Rules → Rulesets → New branch ruleset**.
   - **Ruleset name:** `bao-ve-main`, **Enforcement status:** Active
   - **Target branches:** Add target → Include default branch
   - Tick **Require a pull request before merging**, đặt **Required approvals = 1**
   - Tick **Require status checks to pass**, bấm **Add checks**, gõ `kiem-tra` và chọn
   - Tick **Block force pushes**
   - Bấm **Create**
4. Tạo nhãn và 8 Issue:
   - Có GitHub CLI: clone repo về máy, chạy `node scripts/tao-issue.js`.
   - Không có: tạo tay 8 Issue theo **Phụ lục** cuối file này (chép tiêu đề và nội dung).
5. Mở từng Issue, chọn **Assignees** theo bảng phân công.

**Kết quả mong đợi:** tab **Issues** có 8 Issue đã giao người. Tab **Actions** có một lần chạy **đỏ** (vì lỗi tổng, sẽ sửa ở Issue #1).

---

## Bước 3. Mọi người lấy repo về

```bash
git clone https://github.com/<nhom-truong>/moneynote-nhom-1.git
cd moneynote-nhom-1
node kiem-tra-nhom.js
```

**Kết quả mong đợi:** `kiem-tra-nhom.js` báo `LỖI` ở `tinhTong()` và `CHƯA` ở ba hàm khác.

**Thử nghiệm bắt buộc (mỗi người làm 1 lần):** sửa một chữ trong `README.md`, commit, rồi `git push` thẳng lên `main`.

**Kết quả mong đợi:** GitHub **từ chối** (`GH013: Repository rule violations` hoặc `protected branch`). Ghi lại thông báo vào báo cáo. Bỏ commit vừa rồi bằng:

```bash
git reset --hard origin/main
```

---

## Bước 4. Vòng 1: sửa lỗi trước (Issue #1)

Chỉ **A** làm. Các bạn khác theo dõi và duyệt.

```bash
git switch -c issue-1-sua-loi-tong
# sửa js/tinh-toan.js, chạy node kiem-tra-nhom.js đến khi tinhTong ĐẠT
git add js/tinh-toan.js
git commit -m "Sửa giá trị khởi tạo reduce trong tinhTong (#1)"
git push -u origin issue-1-sua-loi-tong
```

Trên GitHub:

1. A bấm **Compare & pull request**. Mẫu PR hiện sẵn: điền `Closes #1`, tick các ô đã làm.
2. Chờ dấu **✓ kiem-tra** xanh.
3. Một bạn khác vào tab **Files changed**, đọc thay đổi, bấm **Review changes → Approve**.
4. A bấm **Merge pull request**, rồi **Delete branch**.

Sau khi merge, **mọi người** cập nhật máy mình:

```bash
git switch main
git pull
```

**Kết quả mong đợi:** Issue #1 tự đóng. Tab Actions có lần chạy xanh trên `main`.

---

## Bước 5. Vòng 2: làm song song

Mỗi người làm các Issue còn lại của mình. Với **mỗi** Issue:

```bash
git switch main
git pull
git switch -c issue-<số>-<mo-ta-ngan>
# code, commit nhỏ, nhắc số Issue trong thông điệp
git push -u origin issue-<số>-<mo-ta-ngan>
```

Mở PR có `Closes #<số>`, nhờ một bạn duyệt, xanh và được Approve thì merge.

### Khi PR báo xung đột

Bạn khác merge trước, PR của em hiện **This branch has conflicts that must be resolved**. Em xử lý trên máy mình:

```bash
git switch issue-<số>-<mo-ta-ngan>
git fetch origin
git merge origin/main
```

Git liệt kê file xung đột. Mở từng file, đọc kỹ cả hai phần giữa `<<<<<<<` và `>>>>>>>`, và **giữ lại thay đổi của cả hai người**. Ví dụ, bạn thêm trường `danhMuc` còn em thêm 3 giao dịch mới: kết quả đúng là 9 giao dịch, **giao dịch nào cũng có `danhMuc`**.

```bash
node kiem-tra-nhom.js        # phải ĐẠT, không còn dấu xung đột
git add <các file đã sửa>
git commit                   # giữ thông điệp merge mặc định
git push
```

PR tự cập nhật, xung đột biến mất, kiểm tra chạy lại.

> Lưu ý: dòng `module.exports = { ... }` trong `js/tinh-toan.js` gần như chắc chắn xung đột giữa #4, #5, #6. Kết quả đúng là dòng đó liệt kê **đủ** mọi hàm.

### Duyệt code

- Mỗi người duyệt **ít nhất 2 PR** của bạn khác.
- Cả nhóm phải có **ít nhất 1 lần Request changes thật sự**: góp ý cụ thể (tên biến, thiếu trường hợp, chưa đúng tiêu chí Issue). Tác giả sửa bằng cách commit thêm vào cùng nhánh rồi push, người duyệt xem lại và Approve.
- Không Approve PR có dấu kiểm tra **đỏ**.

---

## Bước 6. Phát hành v2.0

Khi cả 8 Issue đã đóng:

1. Mọi người `git switch main && git pull`, mở `index.html` kiểm tra lần cuối.
2. Nhóm trưởng tạo tag và đẩy lên:

```bash
git tag -a v2.0 -m "Bản làm nhóm: danh mục, số dư, tìm không dấu"
git push origin v2.0
```

3. Trên GitHub: **Releases → Draft a new release**, chọn tag `v2.0`, bấm **Generate release notes** (GitHub tự liệt kê các PR), rồi **Publish release**.

---

## Nộp bài

Tạo file `BAO_CAO_NHOM.md` qua một PR (đúng quy trình), trả lời:

- **N1.** Bảng phân công thực tế: ai làm Issue nào, PR số mấy, ai duyệt.
- **N2.** Nhóm gặp những xung đột nào (file nào, giữa Issue nào), ai xử lý, giữ lại những gì.
- **N3.** Khi push thẳng lên `main`, GitHub báo gì? Vì sao nhóm cần bảo vệ `main`?
- **N4.** Kể lại một lần Request changes: góp ý gì, sửa thế nào.
- **N5.** Kiểm tra tự động có lần nào đỏ không? Vì sao, sửa thế nào?
- **N6.** Nếu làm lại, nhóm sẽ chia việc hoặc sắp thứ tự merge thế nào để bớt xung đột?
- Mỗi thành viên viết 2–3 câu về phần việc của mình.

Nộp **link repo nhóm**.

**Tự kiểm tra trước khi nộp:**

- [ ] 8 Issue đều **Closed**, mỗi Issue đóng bởi một PR
- [ ] Mỗi thành viên có ít nhất 2 PR đã merge và đã duyệt ít nhất 2 PR của bạn
- [ ] Có ít nhất 1 lần Request changes
- [ ] `main` được bảo vệ, không có commit nào đẩy thẳng
- [ ] `node kiem-tra-nhom.js` trên `main` ra ĐẠT cả 4 hàm, Actions xanh
- [ ] Trang web: 9 giao dịch trở lên, có danh mục, ngày dạng dd/mm/yyyy, thẻ Số dư, thẻ Số giao dịch, tìm không dấu được, không còn DEBUG
- [ ] Có tag và Release `v2.0`

---

## Phụ lục: nội dung 8 Issue

Dùng khi tạo Issue bằng tay. Chép **Tiêu đề** vào ô Title, phần **Nội dung** vào ô mô tả, gắn nhãn tương ứng.

### Issue #1

**Tiêu đề:** [Lỗi] Tổng thu, tổng chi hiển thị sai  
**Nhãn:** lỗi, ưu tiên cao

**Nội dung:**

````markdown
## Mô tả lỗi
Ô **Tổng thu** hiện 35.000.005.000.000 ₫ thay vì 8.500.000 ₫. Chạy `node kiem-tra-nhom.js` báo LỖI và kiểm tra tự động (GitHub Actions) đang đỏ.

## Cách tái hiện
1. Mở `index.html`
2. Xem ô Tổng thu

## Kết quả mong đợi
- Tổng thu 8.500.000 ₫, Tổng chi 365.000 ₫
- `node kiem-tra-nhom.js` ra ĐẠT, GitHub Actions chuyển xanh

## Gợi ý
Xem hàm `tinhTong` trong `js/tinh-toan.js`.

**Làm đầu tiên.** Các Pull Request khác chỉ merge được khi kiểm tra tự động xanh.
````

### Issue #2

**Tiêu đề:** Thêm danh mục cho mỗi giao dịch  
**Nhãn:** tính năng

**Nội dung:**

````markdown
## Mô tả
Mỗi giao dịch cần biết thuộc danh mục nào.

## Yêu cầu
- Thêm trường `danhMuc` cho **mọi** giao dịch trong mảng `giaoDich` (`js/app.js`). Dùng các danh mục: Ăn uống, Đi lại, Học tập, Giải trí, Lương, Học bổng, Khác.
- Mỗi dòng trong danh sách hiển thị dạng: `<ngày> – <ghi chú> (<danh mục>)`, ví dụ `2026-10-05 – Đổ xăng (Đi lại)`.

## Tiêu chí hoàn thành
- [ ] Không giao dịch nào hiện `(undefined)`
- [ ] `node kiem-tra-nhom.js` ra ĐẠT
````

### Issue #3

**Tiêu đề:** Thêm 3 giao dịch mẫu cuối tháng 10  
**Nhãn:** tính năng

**Nội dung:**

````markdown
## Mô tả
Dữ liệu mẫu mới có 6 giao dịch, nhìn còn trống.

## Yêu cầu
Thêm vào **cuối** mảng `giaoDich` (`js/app.js`) 3 giao dịch có ngày từ 20/10 đến 28/10/2026, ít nhất 1 khoản thu.

## Tiêu chí hoàn thành
- [ ] Mảng có ít nhất 9 giao dịch
- [ ] Giao dịch mới có đủ các trường giống giao dịch cũ
- [ ] Tổng thu, tổng chi trên trang thay đổi đúng
````

### Issue #4

**Tiêu đề:** Hiển thị ngày theo kiểu Việt Nam (dd/mm/yyyy)  
**Nhãn:** tính năng

**Nội dung:**

````markdown
## Mô tả
Danh sách đang hiện ngày dạng `2026-10-05`, người dùng khó đọc.

## Yêu cầu
- Thêm hàm `dinhDangNgay(ngay)` vào `js/tinh-toan.js`: `dinhDangNgay('2026-10-05')` trả về `'05/10/2026'`. Nhớ thêm vào `module.exports`.
- Dùng hàm này khi hiển thị ngày trong `veDanhSach` (`js/app.js`).

## Tiêu chí hoàn thành
- [ ] Danh sách hiện `05/10/2026 – Đổ xăng ...`
- [ ] `node kiem-tra-nhom.js` báo dinhDangNgay ĐẠT
````

### Issue #5

**Tiêu đề:** Thêm thẻ Số dư  
**Nhãn:** tính năng

**Nội dung:**

````markdown
## Mô tả
Người dùng muốn biết còn lại bao nhiêu tiền.

## Yêu cầu
- Thêm hàm `tinhSoDu(danhSach)` vào `js/tinh-toan.js`, trả về tổng thu trừ tổng chi. Nhớ thêm vào `module.exports`.
- Thêm một thẻ mới trong `<section class="tong-quan">` (`index.html`): `Số dư: <strong id="soDu">`.
- Hiển thị số dư bằng `dinhDangTien`.

## Tiêu chí hoàn thành
- [ ] Thẻ Số dư hiện 8.135.000 ₫ với dữ liệu mẫu ban đầu
- [ ] `node kiem-tra-nhom.js` báo tinhSoDu ĐẠT
````

### Issue #6

**Tiêu đề:** Tìm kiếm không phân biệt dấu tiếng Việt  
**Nhãn:** tính năng

**Nội dung:**

````markdown
## Mô tả
Gõ `do xang` không tìm ra `Đổ xăng`.

## Yêu cầu
- Thêm hàm `boDau(chuoi)` vào `js/tinh-toan.js`: bỏ dấu, đổi `đ/Đ` thành `d`, chuyển chữ thường. Ví dụ `boDau('Đổ Xăng')` trả về `'do xang'`. Nhớ thêm vào `module.exports`.
- Dùng `boDau` cho cả từ khóa và ghi chú trong hàm `capNhat` (`js/app.js`).

## Tiêu chí hoàn thành
- [ ] Gõ `do xang`, `HOC BONG` đều ra kết quả
- [ ] `node kiem-tra-nhom.js` báo boDau ĐẠT
````

### Issue #7

**Tiêu đề:** Dọn code debug và cập nhật README  
**Nhãn:** tài liệu

**Nội dung:**

````markdown
## Mô tả
Trang còn dòng chữ đỏ "DEBUG MODE" và `console.log` debug. README còn tên nhóm cũ.

## Yêu cầu
- Xóa `<div class="debug">` trong `index.html`, hai dòng `console.log('DEBUG ...')` trong `js/app.js`, quy tắc `.debug` trong `css/style.css`.
- README: thêm mục `## Hướng dẫn chạy` (cách mở trang, cách chạy `node kiem-tra-nhom.js`); thay mục Thành viên bằng tên các thành viên của nhóm.

## Tiêu chí hoàn thành
- [ ] Không còn chữ DEBUG trên trang và trong Console
- [ ] README có mục Hướng dẫn chạy và đúng tên thành viên nhóm
````

### Issue #8

**Tiêu đề:** Thêm thẻ Số giao dịch đang hiển thị  
**Nhãn:** tính năng

**Nội dung:**

````markdown
## Mô tả
Khi lọc hoặc tìm kiếm, người dùng muốn biết còn bao nhiêu giao dịch.

## Yêu cầu
- Thêm một thẻ mới trong `<section class="tong-quan">` (`index.html`): `Số giao dịch: <strong id="soGiaoDich">`.
- Cập nhật con số mỗi khi danh sách thay đổi (trong hàm `capNhat`).

## Tiêu chí hoàn thành
- [ ] Mở trang hiện đúng tổng số giao dịch
- [ ] Bấm lọc "Khoản thu" hoặc gõ tìm kiếm thì con số thay đổi theo
````

