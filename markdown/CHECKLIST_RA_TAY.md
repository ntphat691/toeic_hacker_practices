# Checklist rà tay — TOEIC Hacker markdown

File này tổng hợp toàn bộ các chỗ cần kiểm tra/sửa tay sau khi chạy script dựng lại Reading Part 5/6/7 bằng toạ độ PDF. Tick [x] sau khi đã kiểm tra/sửa xong từng dòng.

## 1. Quyết định còn treo

- [ ] **Đáp án Reading của 10 test Hacker Volume 2**: không tồn tại trong PDF nguồn (`hacker_2_reading.pdf` không có file đáp án đi kèm, khác với Volume 3 có `reading_key.md`). Cần quyết định: bỏ qua / tự tìm nguồn khác / để trống tạm thời.

## 2. Các câu Reading cần rà tay theo từng test

### `hacker_2_test_02/reading.md` (Hacker Volume 2, Test 02)

**Part 6:**
- [ ] question 132: expected 4 options, got 3
- [ ] missing header for 135-138 (page 35); synthesized
- [ ] question 142: expected 4 options, got 3
- [ ] question 144: expected 4 options, got 3

**Part 7:**
- [ ] question 163: expected 4 options, got 3
- [ ] question 164: expected 4 options, got 3
- [ ] question 184: not found (segment 181-185)
- [ ] question 185: not found (segment 181-185)

### `hacker_2_test_03/reading.md` (Hacker Volume 2, Test 03)

**Part 7:**
- [ ] question 179: not found (segment 176-180)
- [ ] question 180: not found (segment 176-180)

### `hacker_2_test_04/reading.md` (Hacker Volume 2, Test 04)

**Part 5:**
- [ ] question 123: not found at all
- [ ] question 122: expected 4 options, got 8

**Part 6:**
- [ ] missing header for 143-146 (page 97); synthesized

**Part 7:**
- [ ] question 179: not found (segment 176-180)
- [ ] question 180: not found (segment 176-180)
- [ ] question 184: not found (segment 181-185)
- [ ] question 185: not found (segment 181-185)

### `hacker_2_test_05/reading.md` (Hacker Volume 2, Test 05)

**Part 6:**
- [ ] question 146: expected 4 options, got 3

**Part 7:**
- [ ] question 199: not found (segment 196-200)
- [ ] question 200: not found (segment 196-200)

### `hacker_2_test_06/reading.md` (Hacker Volume 2, Test 06)

**Part 6:**
- [ ] question 142: expected 4 options, got 3
- [ ] question 144: expected 4 options, got 3
- [ ] question 146: expected 4 options, got 3

**Part 7:**
- [ ] question 185: not found (segment 181-185)
- [ ] question 184: expected 4 options, got 8
- [ ] question 192: not found (segment 191-195)
- [ ] question 193: not found (segment 191-195)
- [ ] question 191: expected 4 options, got 12

### `hacker_2_test_07/reading.md` (Hacker Volume 2, Test 07)

**Part 6:**
- [ ] missing header for 143-146 (page 187); synthesized
- [ ] question 146: expected 4 options, got 3

### `hacker_2_test_08/reading.md` (Hacker Volume 2, Test 08)

**Part 6:**
- [ ] question 134: expected 4 options, got 3

**Part 7:**
- [ ] question 180: expected 4 options, got 3

### `hacker_2_test_09/reading.md` (Hacker Volume 2, Test 09)

**Part 6:**
- [ ] question 138: expected 4 options, got 3

**Part 7:**
- [ ] question 152: not found (segment 151-152)
- [ ] question 163: not found (segment 161-164)
- [ ] question 164: not found (segment 161-164)
- [ ] question 179: not found (segment 176-180)
- [ ] question 180: not found (segment 176-180)
- [ ] question 192: expected 4 options, got 3

### `hacker_2_test_10/reading.md` (Hacker Volume 2, Test 10)

**Part 5:**
- [ ] question 104: expected 4 options, got 3

**Part 6:**
- [ ] missing header for 135-138 (page 275); synthesized
- [ ] question 136: expected 4 options, got 3
- [ ] question 146: expected 4 options, got 2

**Part 7:**
- [ ] question 172: not found (segment 172-175)
- [ ] question 173: not found (segment 172-175)

### `hacker_3_test_02/reading.md` (Hacker Volume 3, Test 02)

**Part 7:**
- [ ] question 175: expected 4 options, got 0

### `hacker_3_test_04/reading.md` (Hacker Volume 3, Test 04)

**Part 6:**
- [ ] question 136: expected 4 options, got 0

### `hacker_3_test_05/reading.md` (Hacker Volume 3, Test 05)

**Part 6:**
- [ ] question 143: expected 4 options, got 0

**Part 7:**
- [ ] question 166: not found (segment 164-167)
- [ ] question 175: not found (segment 172-175)
- [ ] question 174: expected 4 options, got 7

### `hacker_3_test_06/reading.md` (Hacker Volume 3, Test 06)

**Part 6:**
- [ ] question 136: expected 4 options, got 0

### `hacker_3_test_07/reading.md` (Hacker Volume 3, Test 07)

**Part 6:**
- [ ] question 134: expected 4 options, got 3

### `hacker_3_test_08/reading.md` (Hacker Volume 3, Test 08)

**Part 7:**
- [ ] question 154: not found (segment 153-154)

**Khác:**
- [ ] Part 7: đoạn 196-200 (list/web-page/e-mail) bị THIẾU HẲN — không tìm thấy dòng "Questions 196-200 refer to..." trong PDF gốc (mất ngay từ nguồn, không phải lỗi script). Cần đọc PDF gốc trang cuối Part 7 của test này và tự bổ sung đoạn văn + 5 câu hỏi.
- [ ] Part 7: cuối bài còn sót rác dạng "TEST B PART? 259 PROMOTIONS HOURS/LOCATION..." (footer bị OCR sai "8"→"B" nên script không lọc được) — cần xoá tay.

### `hacker_3_test_09/reading.md` (Hacker Volume 3, Test 09)

**Part 5:**
- [ ] question 126: not found at all

**Part 6:**
- [ ] question 134: expected 4 options, got 3
- [ ] question 140: expected 4 options, got 3
- [ ] question 142: expected 4 options, got 3

### `hacker_3_test_10/reading.md` (Hacker Volume 3, Test 10)

**Part 5:**
- [ ] question 114: not found at all
- [ ] question 116: not found at all
- [ ] question 115: expected 4 options, got 8

**Part 6:**
- [ ] question 138: expected 4 options, got 3
- [ ] question 146: expected 4 options, got 3

## 3. Test hoàn toàn sạch (không có cảnh báo tự động)

`hacker_2_test_01`, `hacker_3_test_01`, `hacker_3_test_03`

## 4. Lỗi font/glyph rải rác trong PDF gốc (không sửa được bằng script)

Đây là lỗi có sẵn trong file PDF nguồn (một số ký tự bị map sai trong font nhúng), không liên quan tới cách extract — cần soát và gõ lại tay khi gặp. Vài ví dụ đã phát hiện:

- [ ] `hacker_2_test_01/reading.md` — Part 6 Q131: "---™-" thay vì 1 từ nối (Once/When...)
- [ ] `hacker_2_test_01/reading.md` — Part 6 Q133: "you h't \"pay\"" — "h't" đáng lẽ là "hit"
- [ ] `hacker_3_test_01/reading.md` — Part 6 Q131 passage: "Delrio mostlys souvenir items" — thiếu chữ "sells"
- [ ] `hacker_2_test_01/reading.md` — Part 5 Q110: "is -- pressure" thay vì "is under pressure"

*Đây chỉ là các ví dụ đã tình cờ phát hiện, không phải danh sách đầy đủ — nhiều khả năng còn rải rác ở các test khác chưa được rà.*

## 5. Ghi chú khác

- `hacker_2_test_02/listening.md` đang được bạn tự chỉnh sửa tay song song — chưa được script `listening_dewrap.py` xử lý, cần tự hoàn thiện hoặc yêu cầu chạy script sau khi xong.
