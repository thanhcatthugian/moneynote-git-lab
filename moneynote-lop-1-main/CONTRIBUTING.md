# Quy ước làm việc nhóm

Cả nhóm thống nhất làm theo các quy ước sau. Người duyệt Pull Request có quyền yêu cầu sửa nếu không đúng quy ước.

## 1. Nhánh

- **Không bao giờ commit thẳng lên `main`.** Mọi thay đổi đi qua Pull Request.
- Mỗi Issue một nhánh, đặt tên `issue-<số>-<mo-ta-ngan>`, chữ thường, không dấu, nối bằng dấu gạch ngang.
  Ví dụ: `issue-5-the-so-du`, `issue-1-sua-loi-tong`.
- Tạo nhánh từ `main` **mới nhất**:

```bash
git switch main
git pull
git switch -c issue-5-the-so-du
```

## 2. Commit

- Viết tiếng Việt có dấu, bắt đầu bằng động từ, ngắn gọn (dưới 72 ký tự), nhắc số Issue.
  Ví dụ: `Thêm hàm tinhSoDu (#5)`, `Sửa giá trị khởi tạo reduce (#1)`.
- Mỗi commit làm một việc. Không gộp "sửa lỗi + đổi màu + thêm README" vào một commit.

## 3. Pull Request

- Tiêu đề PR giống tiêu đề Issue. Phần mô tả ghi `Closes #<số>` để Issue tự đóng khi merge.
- Trước khi mở PR, cập nhật nhánh với `main` và chạy `node kiem-tra-nhom.js`:

```bash
git fetch origin
git merge origin/main
node kiem-tra-nhom.js
```

- PR chỉ được merge khi:
  - Kiểm tra tự động (GitHub Actions) **xanh**
  - Có ít nhất **1 thành viên khác** bấm Approve
- Người tạo PR tự bấm Merge sau khi được duyệt, rồi xóa nhánh (nút **Delete branch**).

## 4. Xung đột

- Ai mở PR **sau** thì người đó xử lý xung đột, trên nhánh của mình, không sửa trên `main`.
- Giữ lại thay đổi của **cả hai** bên khi hợp lý. Không xóa code của bạn khác chỉ để hết xung đột.
- Không bao giờ dùng `git push --force` lên `main`.

## 5. Duyệt code (review)

- Đọc từng dòng thay đổi trong tab **Files changed**, chạy thử trên máy nếu cần (`git fetch` rồi `git switch <nhánh>`).
- Góp ý cụ thể: chỉ ra dòng nào, vì sao, đề xuất sửa thế nào. Tránh "ok", "LGTM" khi chưa đọc.
- Chọn **Approve** nếu đạt, **Request changes** nếu cần sửa. Người tạo PR sửa bằng cách commit thêm vào cùng nhánh rồi push.
