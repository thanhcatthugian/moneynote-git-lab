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

❓ **Câu 5.** Vì sao 3.1 là fast-forward còn 3.2 lại tạo merge commit?
    Fast forward xảy ra khi nhánh main chưa có commit kể từ khi rẽ nhánh
    Merge commit xảy ra khi nhánh phân mới đã được commit 
❓ **Câu 6.** Vì sao gộp `feature/giao-dien-moi` không xung đột, còn `feature/tieu-de` thì có?
Do feature/tieu-de chứa các dòng `<<<<<<<`, `=======`, `>>>>>>>`

❓ **Câu 7.** Vì sao dùng `git revert` chứ không dùng `git reset` để gỡ commit đã có trên nhánh chung?
git revert vẫn giữ nguyên lịch sử sai và thêm mới một commit mới sửa
git reset xóa lịch sử sai đưa về trạng thái ban đầu 
❓ **Câu 8.** `reset --soft`, `reset --mixed` (mặc định) và `reset --hard` khác nhau thế nào?
Với soft thì code vẫn sẽ nằm trong repo như khi sử dụng git add .
Với mixed thì reverse về trạng thái trước khi dùng git add .
VỚi hard thì đưa về trạng thái ban đầu bỏ cả nội dung nhập trước git add 
❓ **Câu 10.** Nếu dùng `git merge hotfix/sua-loi-cong` thay cho `cherry-pick` thì chuyện gì xảy ra?
Nếu dùng merge git sẽ không cho gộp 
❓ **Câu 11.** Sau rebase, mã commit "Thêm hàm xuất CSV" có giống mã cũ không? Vì sao không nên rebase một nhánh mà bạn khác đã kéo về máy?
Chắc là sẽ không giống mã cũ, do không giống mã cũ nên khi nhánh đã được kéo về kia sẽ có sự khác biệt 
