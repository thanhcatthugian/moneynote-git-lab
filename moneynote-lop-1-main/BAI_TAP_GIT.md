# Bài thực hành Git – MoneyNote Lite

Repo này là một dự án nhỏ do ba bạn **Minh, Lan, Hùng** làm chung. Lịch sử đã có sẵn nhánh, một commit gây lỗi, một commit debug quên xóa và hai nhánh sẽ xung đột khi gộp. Nhiệm vụ của em là dùng Git để "dọn dẹp" dự án.

**Cách làm bài:**

- Làm lần lượt từ Phần 1 đến Phần 7. Mỗi bước có **Kết quả mong đợi** để em tự kiểm tra.
- Gặp câu hỏi đánh dấu **❓**, em ghi câu trả lời vào file `TRA_LOI.md` ở thư mục gốc (tự tạo ở Phần 2).
- Mọi lệnh gõ trong terminal (Git Bash, PowerShell hoặc Terminal của VS Code) **đang đứng trong thư mục repo**.
- Làm hỏng thì giải nén lại hoặc clone lại từ đầu, không sao cả.
- Quên lệnh thì tra **`HUONG_DAN_LENH_GIT.md`**.

Cần cài sẵn: **Git** và **Node.js** (dùng để chạy file kiểm tra `kiem-tra.js`).

---

## Phần 0. Chuẩn bị

```bash
git --version
node --version
git config --global user.name "thanhcatthugian"
git config --global user.email "quachtrananh1609@gmail.com"
```

Kiểm tra cấu hình: `git config --global --list`.

**Nên làm thêm:** cho Git mở VS Code khi cần soạn thông điệp commit, để không bị "kẹt" trong trình soạn thảo vim:

```bash
    git config --global core.editor "code --wait"
```

(Nếu lỡ bị kẹt trong vim: gõ `:wq` rồi Enter để lưu và thoát.)

**Nếu em lấy repo bằng `git clone` từ GitHub** (không phải giải nén file zip), các nhánh khác chỉ nằm ở `origin`. Chạy thêm 4 lệnh sau để có nhánh trên máy:

```bash
git branch feature/giao-dien-moi origin/feature/giao-dien-moi
git branch feature/tieu-de origin/feature/tieu-de
git branch feature/xuat-csv origin/feature/xuat-csv
git branch hotfix/sua-loi-cong origin/hotfix/sua-loi-cong
```

**Kết quả mong đợi:** thấy `user.name` và `user.email` đúng thông tin của em.

---

## Phần 1. Đọc lịch sử dự án

| Bước | Lệnh | Việc cần làm |
|---|---|---|
| 1.1 | `git status` | Xem đang ở nhánh nào, có file nào thay đổi không |
| 1.2 | `git log --oneline` | Xem danh sách commit trên nhánh hiện tại |
| 1.3 | `git log --oneline --graph --all` | Xem tất cả các nhánh dưới dạng sơ đồ |
| 1.4 | `git branch` và `git tag` | Liệt kê nhánh và tag |
| 1.5 | `git show v0.1 --stat` | Xem tag `v0.1` trỏ vào commit nào, sửa những file nào |
| 1.6 | `git log --author="Lan" --oneline` | Lọc commit theo tác giả |
| 1.7 | `git blame js/tinh-toan.js` | Xem từng dòng do ai viết, ở commit nào |

**Kết quả mong đợi:** đang ở nhánh `main`, cây làm việc sạch ("nothing to commit, working tree clean"), có 5 nhánh và 1 tag.

❓ **Câu 1.** Lúc mới nhận repo, nhánh `main` có bao nhiêu commit? Kể tên 4 nhánh còn lại.
❓ **Câu 2.** Bạn Lan có bao nhiêu commit trong toàn bộ repo (gợi ý: thêm `--all`)?
❓ **Câu 3.** Dòng có chữ `reduce` trong `js/tinh-toan.js` do ai viết, ở commit nào?

---

## Phần 2. Commit cơ bản và `.gitignore`

**2.1 Sửa file và xem thay đổi**

1. Mở `README.md`, thêm tên em vào cuối mục **Thành viên**.
2. Chạy `git status` rồi `git diff`.
3. Chạy `git add README.md`, rồi `git status` và `git diff --staged`.
4. Commit: `git commit -m "Thêm tên <tên em> vào danh sách thành viên"`.

**2.2 Tạo file trả lời**

Tạo file `TRA_LOI.md`, ghi câu trả lời Câu 1–3, rồi `add` và `commit`.

**2.3 Thử `.gitignore`**

1. Tạo file `nhat-ky.log` và file `.env` (nội dung gì cũng được).
2. Chạy `git status`.
3. Mở `.gitignore` đọc các dòng trong đó.

**Kết quả mong đợi:** sau bước 2.3, `git status` **không** liệt kê `nhat-ky.log` và `.env`. `git log --oneline` có thêm 2 commit của em ở trên cùng.

❓ **Câu 4.** `git diff` và `git diff --staged` khác nhau thế nào? Vì sao file `.env` không bao giờ nên đưa lên Git?

---

## Phần 3. Nhánh và gộp nhánh (merge)

**3.1 Nhánh của riêng em (fast-forward)**

```bash
git switch -c feature/gioi-thieu
```

1. Tạo file `thanh-vien/<ten-em>.md` (ví dụ `thanh-vien/an.md`), viết 2–3 câu giới thiệu bản thân.
2. `add`, `commit`.
3. Quay lại `main` và gộp:

```bash
git switch main
git merge feature/gioi-thieu
git branch -d feature/gioi-thieu
```

**Kết quả mong đợi:** thông báo có chữ **Fast-forward**; nhánh `feature/gioi-thieu` bị xóa.

**3.2 Gộp nhánh của bạn Hùng**

```bash
git merge feature/giao-dien-moi
```

**Kết quả mong đợi:** Git mở trình soạn thảo để ghi thông điệp merge (giữ nguyên, lưu và đóng), tạo ra một **merge commit**. Mở `index.html` bằng trình duyệt: tiêu đề là "Sổ chi tiêu sinh viên", màu chủ đạo đổi sang xanh ngọc.

**3.3 Gộp nhánh của bạn Lan – xử lý xung đột**

```bash
git merge feature/tieu-de
```

Git báo `CONFLICT (content): Merge conflict in index.html`. Mở `index.html`, em sẽ thấy:

```
<<<<<<< HEAD
    <h1>Sổ chi tiêu sinh viên</h1>
=======
    <h1>MoneyNote – Quản lý chi tiêu</h1>
>>>>>>> feature/tieu-de
```

Cả nhóm thống nhất chọn tiêu đề **"MoneyNote – Quản lý chi tiêu"**. Em hãy:

1. Sửa file sao cho chỉ còn một dòng `<h1>MoneyNote – Quản lý chi tiêu</h1>`, xóa hết các dòng `<<<<<<<`, `=======`, `>>>>>>>`.
2. `git add index.html`
3. `git commit` (giữ thông điệp mặc định).

**Kết quả mong đợi:** `git log --oneline --graph` thấy 2 merge commit. Trang web có tiêu đề "MoneyNote – Quản lý chi tiêu" **và** vẫn giữ màu xanh ngọc. Không còn dấu xung đột nào (kiểm tra bằng `git grep -n "<<<<<<<" -- index.html`, không có kết quả là đúng).

❓ **Câu 5.** Vì sao 3.1 là fast-forward còn 3.2 lại tạo merge commit?
 **Câu 6.** Vì sao gộp `feature/giao-dien-moi` không xung đột, còn `feature/tieu-de` thì có?

---

## Phần 4. Hoàn tác (undo)

**4.1 Gỡ commit debug bằng `revert`**

Bạn Hùng lỡ commit code debug lên `main`. Mở `index.html`, em sẽ thấy dòng chữ đỏ "DEBUG MODE" ở góc trên.

```bash
git log --oneline --grep="debug"
git revert <mã-commit-vừa-tìm>
```

**Kết quả mong đợi:** có thêm commit `Revert "Thêm log để debug"`. Lệnh `git grep -i "debug" -- index.html js css` không còn kết quả nào.

❓ **Câu 7.** Vì sao dùng `git revert` chứ không dùng `git reset` để gỡ commit đã có trên nhánh chung?

**4.2 Bỏ thay đổi chưa commit: `restore`**

1. Xóa vài dòng bất kỳ trong `css/style.css`, lưu lại.
2. `git restore css/style.css` → file quay về như cũ.
3. Lại sửa `css/style.css`, lần này chạy `git add css/style.css`.
4. `git restore --staged css/style.css` → bỏ khỏi vùng chờ (staging), file vẫn còn thay đổi.
5. `git restore css/style.css` để bỏ hẳn.

**4.3 Sửa commit vừa tạo: `--amend`**

1. Sửa một chữ trong `thanh-vien/<ten-em>.md`, `add` rồi commit với thông điệp sai chính tả: `git commit -m "sua loi chinh ta"`.
2. Sửa lại thông điệp: `git commit --amend -m "Sửa lỗi chính tả trong phần giới thiệu"`.

**Kết quả mong đợi:** `git log --oneline -1` hiện thông điệp mới, không có commit "sua loi chinh ta".

**4.4 `reset` và cứu bằng `reflog`**

1. `git reset --soft HEAD~1` → commit vừa rồi biến mất, thay đổi vẫn nằm trong vùng chờ. Commit lại với cùng thông điệp.
2. Bây giờ thử "lỡ tay": `git reset --hard HEAD~3`. Mở `git log --oneline`: 3 commit gần nhất đã mất.
3. Cứu lại:

```bash
git reflog
git reset --hard <mã-commit-trước-khi-reset-hard>
```

**Kết quả mong đợi:** `git log --oneline` trở lại đầy đủ như trước bước 2.

❓ **Câu 8.** `reset --soft`, `reset --mixed` (mặc định) và `reset --hard` khác nhau thế nào?

**4.5 Cất tạm việc đang làm: `stash`**

1. Sửa `README.md` (thêm dòng "Đang viết dở...") nhưng **chưa commit**.
2. Có việc gấp phải sang nhánh khác: `git stash`, rồi `git status` (sạch), `git switch feature/xuat-csv`.
3. Quay lại: `git switch main`, `git stash list`, `git stash pop`.
4. Bỏ dòng "Đang viết dở..." bằng `git restore README.md`.

---

## Phần 5. Tìm commit gây lỗi (`bisect`) và lấy bản sửa (`cherry-pick`)

**5.1 Phát hiện lỗi**

```bash
node kiem-tra.js
```

Kết quả: `LỖI: tổng thu = "10000050000" ...`. Mở `index.html`, ô **Tổng thu** hiện một con số khổng lồ. Ở tag `v0.1` thì app còn chạy đúng.

**5.2 Tìm commit gây lỗi bằng `bisect`**

```bash
git bisect start
git bisect bad              # commit hiện tại bị lỗi
git bisect good v0.1        # v0.1 còn đúng
```

Git sẽ nhảy tới từng commit ở giữa. Mỗi lần, em chạy `node kiem-tra.js` (hoặc mở `index.html` xem Tổng thu):

- In ra **ĐẠT** → gõ `git bisect good`
- In ra **LỖI** → gõ `git bisect bad`

Lặp lại đến khi Git báo `... is the first bad commit`. Ghi lại commit đó, rồi:

```bash
git bisect reset
```

*Cách nhanh (làm sau khi đã thử cách tay):* `git bisect start HEAD v0.1` rồi `git bisect run node kiem-tra.js`.

❓ **Câu 9.** Commit gây lỗi là commit nào (mã, thông điệp, tác giả)? Dùng `git show <mã>` và giải thích ngắn gọn vì sao code đó gây lỗi.

**5.3 Lấy bản sửa từ nhánh `hotfix`**

Bạn Lan đã sửa lỗi trên nhánh `hotfix/sua-loi-cong`, nhưng nhánh này còn một commit thử font Comic Sans **chưa được duyệt**.

```bash
git log --oneline main..hotfix/sua-loi-cong
git cherry-pick <mã-commit-sửa-lỗi>
node kiem-tra.js
```

**Kết quả mong đợi:** `node kiem-tra.js` in ra **ĐẠT**; trang web hiện Tổng thu 8.500.000 ₫, Tổng chi 365.000 ₫. Font chữ **không** bị đổi sang Comic Sans.

❓ **Câu 10.** Nếu dùng `git merge hotfix/sua-loi-cong` thay cho `cherry-pick` thì chuyện gì xảy ra?

---

## Phần 6. Làm lại nền nhánh (`rebase`)

Nhánh `feature/xuat-csv` của bạn Minh được tạo từ rất lâu, lúc `main` còn ở commit "Hiển thị danh sách giao dịch mẫu".

```bash
git log --oneline --graph main feature/xuat-csv
git switch feature/xuat-csv
git rebase main
git switch main
git merge --ff-only feature/xuat-csv
```

**Kết quả mong đợi:** rebase báo `Successfully rebased`. Merge là **Fast-forward**. Trong `git log --oneline --graph`, 2 commit về CSV nằm thẳng hàng trên cùng của `main`, có file `js/csv.js` và `docs/xuat-csv.md`.

❓ **Câu 11.** Sau rebase, mã commit "Thêm hàm xuất CSV" có giống mã cũ không? Vì sao không nên rebase một nhánh mà bạn khác đã kéo về máy?

---

## Phần 7. Làm việc với GitHub

1. Tạo một repo **trống** trên GitHub tên `moneynote-git-lab` (không tick tạo README).
2. Nối và đẩy code lên. Nếu em lấy repo bằng `git clone`, `origin` đã trỏ tới repo của thầy cô, hãy dùng `git remote set-url origin <link>` thay cho `git remote add`.

```bash
git remote add origin https://github.com/<tai-khoan>/moneynote-git-lab.git
git remote -v
git push -u origin main
git push origin --all
git push origin --tags
```

3. Đánh dấu bản hoàn thiện và đẩy tag:

```bash
git tag -a v1.0 -m "Bản đã sửa lỗi, có xuất CSV"
git push origin v1.0
```

4. Tạo Pull Request:
   - `git switch -c docs/huong-dan-chay`, thêm vào `README.md` mục "Cách kiểm tra": `node kiem-tra.js`.
   - Commit, rồi `git push -u origin docs/huong-dan-chay`.
   - Trên GitHub, tạo Pull Request vào `main`, tự review và bấm **Merge**.
5. Kéo thay đổi về máy và dọn nhánh:

```bash
git switch main
git pull
git branch -d docs/huong-dan-chay
```

6. Clone thử ra thư mục khác để chắc chắn mọi thứ đã lên đủ: `git clone <link-repo> thu-clone`.

**Kết quả mong đợi:** trên GitHub thấy tag `v0.1`, `v1.0`, có 1 Pull Request đã merge. Ở thư mục `thu-clone`, chạy `node kiem-tra.js` ra **ĐẠT**.

❓ **Câu 12.** `git fetch` và `git pull` khác nhau thế nào?

---

## Nộp bài

1. Commit `TRA_LOI.md` (đủ 12 câu) và đẩy lên GitHub.
2. Nộp **link repo GitHub** và ảnh chụp màn hình lệnh:

```bash
git log --oneline --graph --all -25
```

**Tự kiểm tra trước khi nộp:**

- [ ] `node kiem-tra.js` ra ĐẠT
- [ ] Trang web: tiêu đề "MoneyNote – Quản lý chi tiêu", màu xanh ngọc, không còn "DEBUG MODE", không dùng font Comic Sans
- [ ] Có file `thanh-vien/<ten-em>.md`, `js/csv.js`, `TRA_LOI.md`
- [ ] Có tag `v1.0` trên GitHub
- [ ] Có ít nhất 1 Pull Request đã merge

---

## Phần 8. Làm việc nhóm

Làm xong phần cá nhân, nhóm tiếp tục với **`BAI_TAP_NHOM.md`**: repo chung, Issue, Pull Request, duyệt code và xung đột thật giữa các thành viên.
