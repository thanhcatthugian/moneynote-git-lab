# Hướng dẫn các lệnh Git

Tài liệu tra cứu nhanh các lệnh dùng trong bài thực hành `BAI_TAP_GIT.md` (cá nhân) và `BAI_TAP_NHOM.md` (làm nhóm). Mỗi lệnh có ví dụ lấy từ chính dự án MoneyNote.

Quy ước trong tài liệu:

- `<...>` là phần em tự thay, ví dụ `<ten-nhanh>` thay bằng `feature/gioi-thieu`.
- Dòng bắt đầu bằng `#` là ghi chú, không cần gõ.
- Mọi lệnh gõ khi **đang đứng trong thư mục repo**.

---

## 1. Ba vùng của Git

```
 Thư mục làm việc  ──git add──▶  Vùng chờ (staging)  ──git commit──▶  Lịch sử (repo)
 (file em đang sửa)               (sẽ vào commit tới)                 (các commit đã lưu)
        ▲                                │                                   │
        └────── git restore <file> ──────┘                                   │
        └──────────────────── git switch / git reset --hard ─────────────────┘
```

Thêm một vùng nữa khi làm với GitHub: **remote** (`origin`), nơi `git push` gửi lên và `git fetch` / `git pull` lấy về.

---

## 2. Cấu hình lần đầu

```bash
git --version                                   # kiểm tra đã cài Git
git config --global user.name "thanhcatthugian"
git config --global user.email "quachtrananh1609@gmail.com"
git config --global core.editor "code --wait"   # dùng VS Code để soạn thông điệp commit
git config --global init.defaultBranch main     # repo mới dùng nhánh main
git config --global --list                      # xem lại cấu hình
```

> Bị kẹt trong vim: gõ `:wq` rồi Enter để lưu và thoát, `:q!` để thoát không lưu.

---

## 3. Tạo hoặc lấy repo

```bash
git init                                        # biến thư mục hiện tại thành repo
git clone https://github.com/<tai-khoan>/<repo>.git
git clone https://github.com/<tai-khoan>/<repo>.git thu-clone   # clone vào thư mục tên khác
```

Sau khi clone, các nhánh khác chỉ nằm ở `origin`. Tạo nhánh trên máy để làm việc:

```bash
git branch -a                                   # xem cả nhánh trên máy và trên origin
git branch feature/tieu-de origin/feature/tieu-de
# hoặc chuyển thẳng sang, Git tự tạo nhánh theo dõi origin/feature/tieu-de:
git switch feature/tieu-de
```
dit cu chung may riki oi
---

## 4. Xem trạng thái và lịch sử

| Lệnh | Dùng để |
|---|---|
| `git status` | Đang ở nhánh nào, file nào đã sửa, file nào đã vào vùng chờ |
| `git status -s` | Như trên, dạng ngắn gọn |
| `git log --oneline` | Danh sách commit, mỗi commit một dòng |
| `git log --oneline --graph --all` | Sơ đồ tất cả các nhánh |
| `git log --oneline -5` | 5 commit gần nhất |
| `git log --author="Lan" --oneline` | Lọc theo tác giả |
| `git log --oneline --grep="CSV"` | Lọc theo nội dung thông điệp commit |
| `git log --oneline -- js/app.js` | Các commit có sửa file `js/app.js` |
| `git log --oneline main..feature/xuat-csv` | Commit có trên `feature/xuat-csv` mà `main` chưa có |
| `git show <ma-commit>` | Xem chi tiết một commit |
| `git show v0.1 --stat` | Tag `v0.1` trỏ vào commit nào, sửa những file nào |
| `git blame js/tinh-toan.js` | Từng dòng do ai viết, ở commit nào |
| `git diff` | Thay đổi **chưa** `add` |
| `git diff --staged` | Thay đổi **đã** `add`, sẽ vào commit tới |
| `git diff main feature/tieu-de` | So sánh hai nhánh |
| `git grep -n "DEBUG"` | Tìm chữ trong các file Git đang quản lý |

---

## 5. Commit

```bash
git add README.md                   # đưa một file vào vùng chờ
git add js/                         # cả thư mục
git add .                           # mọi thay đổi trong thư mục hiện tại
git commit -m "Thêm tên An vào danh sách thành viên"
git commit                          # mở trình soạn thảo để viết thông điệp dài
git commit -am "Sửa chữ trên nút lọc"   # add + commit các file ĐÃ được Git theo dõi (file mới thì không)
```

**Thông điệp commit tốt:** tiếng Việt có dấu, bắt đầu bằng động từ, dưới 72 ký tự, nói rõ làm gì.

| Nên | Không nên |
|---|---|
| `Sửa giá trị khởi tạo reduce trong tinhTong (#1)` | `sua loi` |
| `Thêm thẻ Số dư vào trang chủ (#5)` | `update`, `abc`, `fix fix fix` |

### `.gitignore`

File `.gitignore` liệt kê những file Git sẽ **bỏ qua**, ví dụ:

```
node_modules/
.env
*.log
```

```bash
git check-ignore -v nhat-ky.log     # xem dòng nào trong .gitignore đang bỏ qua file này
git rm --cached .env                # lỡ commit .env rồi: bỏ khỏi Git nhưng giữ file trên máy
```

---

## 6. Nhánh

```bash
git branch                          # liệt kê nhánh, dấu * là nhánh hiện tại
git switch -c feature/gioi-thieu    # tạo nhánh mới từ chỗ đang đứng và chuyển sang
git switch main                     # chuyển nhánh
git switch -                        # quay lại nhánh vừa ở trước đó
git branch -m ten-cu ten-moi        # đổi tên nhánh
git branch -d feature/gioi-thieu    # xóa nhánh đã gộp
git branch -D feature/thu-nghiem    # xóa nhánh chưa gộp (mất các commit trên đó)
```

> `git checkout` là lệnh cũ, làm được cả việc của `switch` và `restore`. Tài liệu này dùng `switch` / `restore` cho dễ hiểu.

---

## 7. Gộp nhánh (merge) và xử lý xung đột

```bash
git switch main                     # đứng ở nhánh NHẬN thay đổi
git merge feature/gioi-thieu        # gộp nhánh kia vào
git merge --no-ff feature/x         # luôn tạo merge commit, kể cả khi fast-forward được
git merge --ff-only feature/x       # chỉ gộp nếu fast-forward được, không thì báo lỗi
git merge --abort                   # đang xung đột, muốn hủy và quay về như trước khi merge
```

**Fast-forward** xảy ra khi `main` không có commit mới kể từ lúc tách nhánh: Git chỉ việc dời `main` lên. Còn khi cả hai bên đều có commit mới, Git tạo một **merge commit**.

### Khi gặp `CONFLICT`

```
<<<<<<< HEAD
    <h1>Phiên bản đang có trên nhánh của em</h1>
=======
    <h1>Phiên bản từ nhánh đang gộp vào</h1>
>>>>>>> feature/ten-nhanh
```

1. `git status` xem file nào bị xung đột (`both modified`).
2. Mở file, đọc **cả hai phần**, sửa thành nội dung đúng. Xóa hết các dòng `<<<<<<<`, `=======`, `>>>>>>>`.
3. Kiểm tra không còn dấu xung đột: `git grep -n "<<<<<<<" -- index.html js css` (không ra gì là đúng). Chỉ tìm trong các file code, vì file `.md` hướng dẫn có chứa dấu xung đột làm ví dụ.
4. Chạy thử: `node kiem-tra.js` hoặc `node kiem-tra-nhom.js`.
5. `git add <file>` rồi `git commit` (giữ thông điệp merge mặc định).

> Xung đột không phải lỗi. Đó là lúc Git hỏi em: "hai người cùng sửa một chỗ, giữ cái nào?". Làm nhóm thì thường phải **giữ cả hai**.

---

## 8. Hoàn tác (undo)

| Tình huống | Lệnh |
|---|---|
| Sửa file lung tung, muốn bỏ hết thay đổi **chưa add** | `git restore <file>` |
| Đã `add` nhầm, muốn bỏ khỏi vùng chờ (vẫn giữ thay đổi) | `git restore --staged <file>` |
| Vừa commit, muốn sửa thông điệp hoặc thêm file quên | `git add <file>` rồi `git commit --amend -m "Thông điệp mới"` |
| Bỏ commit cuối, giữ thay đổi trong vùng chờ | `git reset --soft HEAD~1` |
| Bỏ commit cuối, giữ thay đổi nhưng chưa add | `git reset HEAD~1` (mặc định là `--mixed`) |
| Bỏ hẳn 3 commit cuối và mọi thay đổi | `git reset --hard HEAD~3` ⚠️ |
| Gỡ một commit **đã đẩy lên nhánh chung** | `git revert <ma-commit>` |
| Lỡ `reset --hard`, muốn cứu lại | `git reflog` rồi `git reset --hard <ma-truoc-do>` |
| Lấy lại một file như ở commit cũ | `git restore --source=<ma-commit> <file>` |

`HEAD~1` là commit ngay trước commit hiện tại, `HEAD~3` là lùi 3 commit.

**Quy tắc vàng:** commit **chưa** đẩy lên GitHub thì dùng `reset` / `--amend` thoải mái. Commit **đã** đẩy lên nhánh chung thì chỉ dùng `revert`, vì `reset` viết lại lịch sử mà đồng đội đã kéo về.

```bash
git reflog                          # nhật ký mọi lần HEAD di chuyển, kể cả commit "đã mất"
# a1b2c3d HEAD@{0}: reset: moving to HEAD~3
# 9f8e7d6 HEAD@{1}: commit: Sửa lỗi chính tả...   ← commit muốn cứu
git reset --hard 9f8e7d6
```

---

## 9. Cất tạm việc đang làm (stash)

```bash
git stash                           # cất mọi thay đổi chưa commit, thư mục trở nên sạch
git stash push -m "đang làm thẻ số dư"   # cất kèm ghi chú
git stash -u                        # cất cả file mới chưa được theo dõi
git stash list                      # xem các lần đã cất
git stash pop                       # lấy lần cất gần nhất ra và xóa khỏi danh sách
git stash apply stash@{1}           # lấy một lần cất cụ thể, vẫn giữ trong danh sách
git stash drop stash@{0}            # xóa một lần cất
```

Dùng khi đang code dở mà phải sang nhánh khác sửa gấp, hoặc khi `git pull` báo có thay đổi chưa commit.

---

## 10. Tìm commit gây lỗi (bisect) và lấy một commit (cherry-pick)

### `git bisect`: chia đôi lịch sử để tìm commit đầu tiên gây lỗi

```bash
git bisect start
git bisect bad                      # commit hiện tại bị lỗi
git bisect good <tag-hoac-ma>       # một mốc cũ chắc chắn còn chạy đúng
# Git nhảy tới commit ở giữa. Kiểm tra (chạy test, mở trang), rồi báo:
git bisect good                     # commit này chạy đúng
git bisect bad                      # commit này bị lỗi
# ... lặp lại đến khi Git báo "<ma> is the first bad commit"
git bisect reset                    # quay về nhánh ban đầu
```

Tự động hóa khi có lệnh kiểm tra trả mã thoát 0 (đúng) / khác 0 (sai):

```bash
git bisect start <commit-loi> <commit-dung>
git bisect run node kiem-tra.js
git bisect reset
```

### `git cherry-pick`: chép đúng một commit từ nhánh khác sang nhánh hiện tại

```bash
git log --oneline main..hotfix/ten-nhanh    # xem nhánh kia có những commit nào
git cherry-pick <ma-commit>
git cherry-pick --abort                     # nếu xung đột và muốn hủy
```

Dùng khi chỉ cần **một** commit sửa lỗi, không muốn kéo theo các commit khác của nhánh đó.

---

## 11. Làm lại nền nhánh (rebase)

```bash
git switch feature/xuat-csv
git rebase main                     # đặt các commit của nhánh này lên trên main mới nhất
# nếu xung đột: sửa file, git add <file>, rồi
git rebase --continue
git rebase --abort                  # hủy, quay về như trước khi rebase
```

Sau rebase, lịch sử thẳng hàng, gộp vào `main` bằng fast-forward:

```bash
git switch main
git merge --ff-only feature/xuat-csv
```

| | `merge` | `rebase` |
|---|---|---|
| Lịch sử | Giữ nguyên, có merge commit | Thẳng hàng, như làm tuần tự |
| Mã commit | Không đổi | **Đổi** (commit mới) |
| An toàn với nhánh đã chia sẻ | Có | **Không**, chỉ rebase nhánh của riêng mình |

---

## 12. Tag và phát hành

```bash
git tag                                         # liệt kê tag
git tag -a v1.0 -m "Bản đã sửa lỗi, có xuất CSV"   # tag có chú thích (nên dùng)
git tag v1.0-nhap <ma-commit>                   # tag nhẹ, gắn vào commit cũ
git show v1.0
git push origin v1.0                            # đẩy một tag
git push origin --tags                          # đẩy mọi tag
git tag -d v1.0-nhap                            # xóa tag trên máy
git push origin --delete v1.0-nhap              # xóa tag trên GitHub
```

Tag chỉ là một cái nhãn trỏ vào commit. **Release** trên GitHub là trang giới thiệu bản phát hành, gắn với một tag.

---

## 13. Làm việc với GitHub (remote)

```bash
git remote -v                                   # xem repo đang nối với đâu
git remote add origin https://github.com/<tai-khoan>/<repo>.git
git remote set-url origin https://github.com/<tai-khoan>/<repo>.git   # đổi địa chỉ origin
git remote rename origin thay-co                # đổi tên remote

git push -u origin main                         # lần đầu đẩy nhánh, -u để lần sau chỉ cần git push
git push                                        # đẩy nhánh hiện tại
git push origin --all                           # đẩy mọi nhánh
git push origin --delete issue-5-the-so-du      # xóa nhánh trên GitHub

git fetch origin                                # tải thay đổi mới về, KHÔNG gộp vào nhánh của em
git fetch --prune                               # tải về và dọn các nhánh đã bị xóa trên GitHub
git pull                                        # fetch + merge vào nhánh hiện tại
git pull --rebase                               # fetch + rebase, lịch sử gọn hơn
```

| | `git fetch` | `git pull` |
|---|---|---|
| Tải commit mới từ GitHub | Có | Có |
| Thay đổi file trên máy em | Không | Có (gộp vào nhánh hiện tại) |
| Khi nào dùng | Muốn xem trước người khác đã làm gì | Muốn cập nhật ngay |

Xem trước rồi mới gộp:

```bash
git fetch origin
git log --oneline main..origin/main             # origin/main có gì mới mà main trên máy chưa có
git diff main origin/main
git merge origin/main
```

### Đăng nhập GitHub khi `push`

GitHub không nhận mật khẩu tài khoản khi `git push`. Dùng một trong các cách:

- **Git Credential Manager** (có sẵn khi cài Git for Windows): lần đầu push sẽ bật trình duyệt để đăng nhập.
- **GitHub CLI:** `gh auth login`, chọn HTTPS, đăng nhập bằng trình duyệt.

---

## 14. Quy trình làm nhóm: vòng đời một Issue

Áp dụng cho Phần 8. Ví dụ em được giao Issue #5 "Thêm thẻ Số dư".

```bash
# 1. Lấy main mới nhất
git switch main
git pull

# 2. Tạo nhánh theo Issue
git switch -c issue-5-the-so-du

# 3. Code, commit nhỏ, nhắc số Issue
git add js/tinh-toan.js
git commit -m "Thêm hàm tinhSoDu (#5)"
git add index.html js/app.js
git commit -m "Hiển thị thẻ Số dư trên trang (#5)"

# 4. Cập nhật với main trước khi mở PR (bạn khác có thể đã merge trước)
git fetch origin
git merge origin/main
node kiem-tra-nhom.js

# 5. Đẩy nhánh lên
git push -u origin issue-5-the-so-du
```

6. Trên GitHub: **Compare & pull request**, mô tả có `Closes #5`, chờ dấu ✓ **kiem-tra** xanh.
7. Nhờ một bạn duyệt. Bị **Request changes** thì sửa tiếp trên cùng nhánh:

```bash
git add <file>
git commit -m "Đổi tên biến theo góp ý review (#5)"
git push                            # PR tự cập nhật, không cần mở PR mới
```

8. Được **Approve** và kiểm tra xanh: bấm **Merge pull request**, rồi **Delete branch**.
9. Dọn máy:

```bash
git switch main
git pull
git branch -d issue-5-the-so-du
git fetch --prune
```

### PR báo "This branch has conflicts"

Ai mở PR **sau** thì người đó xử lý, trên nhánh của mình:

```bash
git switch issue-5-the-so-du
git fetch origin
git merge origin/main               # xung đột hiện ra trên máy em
# sửa file: giữ lại thay đổi của CẢ HAI người
node kiem-tra-nhom.js               # phải ĐẠT, không còn dấu xung đột
git add <cac-file-da-sua>
git commit                          # giữ thông điệp merge mặc định
git push
```

Ví dụ xung đột hay gặp trong bài nhóm: hai bạn cùng thêm hàm vào cuối `js/tinh-toan.js`.

```js
<<<<<<< HEAD
  module.exports = { tinhTong, locTheoLoai, dinhDangTien, tinhSoDu };
=======
  module.exports = { tinhTong, locTheoLoai, dinhDangTien, boDau };
>>>>>>> origin/main
```

Kết quả đúng là **giữ cả hai** hàm (và cả hai đoạn code định nghĩa hàm ở phía trên):

```js
  module.exports = { tinhTong, locTheoLoai, dinhDangTien, tinhSoDu, boDau };
```

### Duyệt code của bạn trên máy mình

```bash
git fetch origin
git switch issue-6-tim-khong-dau    # Git tự tạo nhánh theo dõi origin/issue-6-tim-khong-dau
node kiem-tra-nhom.js
# mở index.html thử bằng mắt
git switch main
```

Hoặc dùng GitHub CLI: `gh pr checkout <so-PR>`.

### Repo mình không có quyền ghi (fork)

Khi muốn đóng góp vào repo của người khác mà không phải cộng tác viên:

```bash
# 1. Trên GitHub bấm Fork, rồi clone bản fork của em
git clone https://github.com/<tai-khoan-em>/<repo>.git
git remote add upstream https://github.com/<chu-repo>/<repo>.git

# 2. Làm trên nhánh riêng, đẩy lên fork, mở PR từ fork vào repo gốc
git switch -c sua-loi-chinh-ta
git push -u origin sua-loi-chinh-ta

# 3. Cập nhật fork khi repo gốc có thay đổi
git fetch upstream
git switch main
git merge upstream/main
git push
```

---

## 15. Lỗi thường gặp

| Thông báo | Nghĩa là | Cách xử lý |
|---|---|---|
| `fatal: not a git repository` | Đang đứng sai thư mục | `cd` vào thư mục repo |
| `Please tell me who you are` | Chưa cấu hình tên, email | Làm mục 2 |
| `nothing added to commit` | Chưa `git add` | `git add <file>` rồi commit lại |
| `error: Your local changes ... would be overwritten` | Có thay đổi chưa commit, không chuyển nhánh / pull được | `git commit` hoặc `git stash` trước |
| `! [rejected] main -> main (fetch first)` | GitHub có commit mới mà máy em chưa có | `git pull` rồi `git push` lại |
| `GH013: Repository rule violations` / `protected branch` | Đẩy thẳng lên `main` đã được bảo vệ | Tạo nhánh, mở Pull Request |
| `CONFLICT (content): Merge conflict in ...` | Hai bên sửa cùng chỗ | Làm theo mục 7 |
| `You are in 'detached HEAD' state` | Đang đứng ở một commit, không ở nhánh nào (thường gặp khi bisect) | `git switch main`, hoặc `git switch -c <ten-nhanh>` để giữ lại việc đang làm |
| `fatal: refusing to merge unrelated histories` | Hai repo không chung gốc (thường do tạo repo trên GitHub có tick README) | Tạo lại repo trống, hoặc `git pull origin main --allow-unrelated-histories` |
| `Authentication failed` / `Permission denied` | Chưa đăng nhập hoặc không có quyền ghi | Đăng nhập lại (mục 13), kiểm tra đã được mời làm cộng tác viên chưa |

---

## 16. Những điều không được làm

- Không commit file `.env`, mật khẩu, khóa API. Đã lỡ đẩy lên GitHub thì đổi mật khẩu/khóa ngay, xóa commit không đủ.
- Không `git push --force` lên `main` hoặc nhánh người khác đang dùng.
- Không `rebase` / `reset` / `--amend` những commit đã đẩy lên nhánh chung.
- Không xóa code của bạn khác chỉ để hết xung đột.
- Không commit thẳng lên `main` khi làm nhóm. Mọi thay đổi đi qua Pull Request.
