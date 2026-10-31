❓ **Câu 1.** Lúc mới nhận repo, nhánh `main` có bao nhiêu commit? Kể tên 4 nhánh còn lại.
Lúc nhận repo nhánh main có khoảng 15 commit. 4 nhánh còn lại ngoài nhánh main: feature/giao-dien-moi, feature/tieu-de.feature/xuat-csv,hotfix/sua-loi-cong
❓ **Câu 2.** Bạn Lan có bao nhiêu commit trong toàn bộ repo (gợi ý: thêm `--all`)?
bạn lan có 3 commit trong repo 
❓ **Câu 3.** Dòng có chữ `reduce` trong `js/tinh-toan.js` do ai viết, ở commit nào?
Nguyễn Minh tại commit thêm hàm tính tổng thu, tổng chi 
❓ **Câu 4.** `git diff` và `git diff --staged` khác nhau thế nào? Vì sao file `.env` không bao giờ nên đưa lên Git?

git diff để hiển thị những thay đổi chưa chạy git add 
git diff --staged Hiển thị những thay đổi sau khi chạy git add 
file .env thường chứa những cấu hình kỹ thuật nên hạn chế đưa lên nhằm vấn đề bảo mật 
