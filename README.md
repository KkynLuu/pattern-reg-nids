# Hệ Thống Phát Hiện Xâm Nhập Mạng (NIDS) Với Lý Thuyết Quyết Định Bayes & Cây Quyết Định Tổ Hợp
> **Học phần:** Nhận dạng mẫu (Pattern Recognition) — Đồ án Cuối kỳ  
> **Bộ dữ liệu thực tế:** [NF-UNSW-NB15-v3](https://staff.itee.uq.edu.au/marius/NIDS_datasets/) (NetFlow v3, 53 đặc trưng đo lường viễn thông, ~2.36 triệu dòng)

---

## 🎯 1. Giới thiệu Bài toán & Đóng góp Cốt lõi

Phát hiện xâm nhập mạng (Network Intrusion Detection System - NIDS) là bài toán trọng yếu trong an toàn thông tin nhằm phân loại và phát hiện sớm các luồng lưu lượng độc hại (*DoS, Reconnaissance, Exploits, Fuzzers, Backdoor, Shellcode, Worms, Analysis, Generic*) giữa hàng triệu phiên truyền thông bình thường (*Benign*).

### Thách thức chính trong nhận dạng mẫu thực tế:
1. **Mất cân bằng lớp nghiêm trọng (Severe Class Imbalance):** Lưu lượng sạch chiếm **~94.6%**, trong khi các cuộc tấn công tinh vi chỉ chiếm **~5.4%** (nhiều lớp như *Worms, Analysis* chỉ chiếm < 0.05%).
2. **Chi phí tổn thất bất đối xứng (Asymmetric Loss Regime):**
   - **Bỏ sót cuộc tấn công ($C_{01}$ - False Negative):** Gây thất thoát dữ liệu nhạy cảm, sập hệ thống dịch vụ quan trọng (thiệt hại cực kỳ lớn).
   - **Báo động giả ($C_{10}$ - False Positive):** Chỉ tiêu tốn chi phí rà soát nhật ký của chuyên viên an ninh mạng ($C_{01} \gg C_{10}$).

### Thiết kế hệ thống nhận dạng mẫu:
- **Phương án cơ sở (Baselines):**
  1. **Gaussian Naive Bayes (GNB):** Mô hình xác suất sinh (Generative Model) dựa trên giả định độc lập có điều kiện giữa các đặc trưng NetFlow.
  2. **Logistic Regression (LR):** Mô hình phân biệt tuyến tính (Linear Discriminative Model) với hàm mất mát Cross-Entropy và ngưỡng quyết định chuẩn $\tau = 0.5$.
- **Phương án cải tiến (Improved Models):**
  1. **Decision Tree (CART):** Cây quyết định phi tuyến, tự động trích xuất các ngưỡng phân tách đa chiều và cấu trúc tương tác phi tuyến.
  2. **Random Forest Classifier (Bagged Ensemble):** Rừng cây tổ hợp 100 cây quyết định độc lập nhằm giảm phương sai, kết hợp **Lý thuyết quyết định Bayes (Bayes Minimum Risk Decision Theory)** để tìm ngưỡng quyết định tối ưu $\tau^* = \frac{C_{10}}{C_{10} + C_{01}}$, giảm thiểu tối đa tổn thất hoạt động thực tế.

---

## 📊 2. Kết quả Thực nghiệm & Đối sánh Toàn diện

### A. Phân Loại Nhị Phân (Binary: Benign vs. Attack)
Trên bài toán nhị phân đơn thuần, ranh giới phân tách tương đối rõ nhờ các cờ giao thức (TCP Flags) và cổng kết nối:

| Mô hình | Train Time | Accuracy | Precision | Recall (TPR) | F1-Score | ROC-AUC | Bayes Risk ($\tau=0.5$) | Bayes Risk ($\tau^*=0.01$) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Gaussian Naive Bayes (Baseline 1)** | 0.027s | 98.48% | 97.17% | 99.24% | 98.20% | 0.9888 | 0.0603 | 0.0559 |
| **Logistic Regression (Baseline 2)** | 0.147s | 99.95% | 99.93% | 99.96% | 99.95% | 0.9999 | 0.0028 | 0.0344 |
| **Decision Tree (Improved 1)** | 1.360s | **99.99%** | **99.99%** | **99.98%** | **99.99%** | **1.0000** | 0.0009 | **0.0001** |
| **Random Forest (Improved 2)** | 1.182s | **99.99%** | **99.99%** | **100.0%** | **99.99%** | **1.0000** | **0.0003** | **0.0017** |

---

### B. Phân Loại Đa Lớp (Multiclass: Nhận Diện Chính Xác 10 Loại Tấn Công)
⚡ **Đây là nơi Decision Tree và Random Forest thể hiện sự vượt trội mang tính quyết định so với các mô hình tuyến tính và xác suất sinh:**

| Mô hình | Multiclass Accuracy | F1-Macro (10 Classes) | F1-Weighted | Đánh giá năng lực |
| :--- | :---: | :---: | :---: | :--- |
| **Gaussian Naive Bayes (Baseline 1)** | 64.08% | 28.01% | 67.88% | Giả định độc lập bị sụp đổ giữa các đặc trưng NetFlow |
| **Logistic Regression (Baseline 2)** | 83.32% | 39.08% | 82.27% | Siêu phẳng tuyến tính không tách được các lớp chồng lấn |
| **Decision Tree (Improved 1)** | **89.30%** (+6.0%) | **61.73%** (+58.0%) | **88.43%** | Nắm bắt cấu trúc phi tuyến và luật phân tách phân cấp |
| **Random Forest (Improved 2)** | **89.94%** (+6.6%) | **60.92%** (+55.9%) | **89.09%** | Tổ hợp giảm phương sai, tối ưu phát hiện lớp hiếm |

---

## 🔍 3. Đối Sánh F1-Score Chi Tiết Trên 10 Phân Lớp Tấn Công (Per-Class F1)

Đánh giá chi tiết trên **61,343** bản ghi kiểm thử độc lập:

| Phân lớp tấn công | Mẫu Test | GNB F1 | Logistic Regression F1 | Decision Tree F1 | **Random Forest F1** | **Mức cải thiện (RF vs LR)** |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Benign** | 35,804 | 0.958 | 1.000 | 1.000 | **1.000** | +0.0% |
| **Exploits** | 8,550 | 0.120 | 0.652 | 0.757 | **0.773** | **+12.2%** |
| **Fuzzers** | 6,763 | 0.445 | 0.617 | 0.777 | **0.781** | **+16.4%** |
| **Generic** | 3,930 | 0.786 | 0.789 | 0.873 | **0.896** | **+10.7%** |
| **Reconnaissance** | 3,415 | 0.014 | 0.482 | 0.736 | **0.743** | **+26.1%** |
| **DoS** | 1,196 | 0.030 | 0.021 | 0.240 | **0.332** | **+31.0%** |
| **Backdoor** | 932 | 0.037 | 0.008 | 0.081 | **0.138** | **+13.0%** |
| **Shellcode** | 476 | 0.069 | 0.323 | 0.637 | **0.655** | **+33.1%** |
| **Analysis** | 245 | 0.339 | 0.015 | 0.357 | **0.175** | **+16.0%** |
| **Worms (Siêu hiếm)** | 32 | 0.005 | 0.000 | 0.714 | **0.600** | **+60.0%** (LR hoàn toàn bất lực) |

### Nhận xét phân tích lỗi & Hạn chế:
1. **Lỗi báo động giả (False Positives):** Xảy ra khi luồng Benign có lưu lượng burst đột biến hoặc cổng dịch vụ lạ tương tự hành vi DoS/Recon.
2. **Lỗi bỏ sót (False Negatives):** Các loại tấn công tàng hình dạng Generic/Fuzzers có kích thước gói tin và thời gian phiên tương đồng lưu lượng duyệt web thông thường.
3. **Hạn chế:** Mô hình dựa trên NetFlow chưa giải mã payload (Deep Packet Inspection) nên chưa phát hiện được payload mã hóa tinh vi trong nội dung gói tin.

---

## 🚀 4. Hướng dẫn Chạy Pipeline & Khởi chạy Demo

### Bước 1: Huấn luyện Mô hình & Xuất Toàn bộ Biểu đồ Thực nghiệm
```bash
# Tại thư mục gốc PatternReg
MPLCONFIGDIR=/tmp pixi run python final/train_models.py
```
> Script sẽ tự động huấn luyện 4 mô hình, tính toán ma trận rủi ro Bayes, xuất bảng số liệu vào `final/results/` và 7 đồ thị PNG chất lượng cao vào `final/plots/`.

### Bước 2: Khởi chạy Ứng dụng Demo Tương Tác (Frontend)
```bash
cd final/frontend
npm install
npm run dev
```
Mở trình duyệt truy cập: **`http://localhost:5173`**

---

## 👥 5. Bảng Phân Công & Tự Đánh Giá Đóng Góp Thành Viên

| Thành viên | Nhiệm vụ đảm nhiệm | Sản phẩm phụ trách | Tự đánh giá đóng góp |
| :--- | :--- | :--- | :---: |
| **Thành viên 1** | Trưởng nhóm, thiết kế pipeline ML, xây dựng baseline GNB & Logistic Regression | `train_models.py`, `results/` | 100% (Hoàn thành xuất sắc) |
| **Thành viên 2** | Xây dựng Decision Tree, Random Forest, lý thuyết quyết định Bayes & tính toán ma trận chi phí | `train_models.py`, `plots/` | 100% (Hoàn thành xuất sắc) |
| **Thành viên 3** | Phát triển ứng dụng Demo tương tác Frontend (Sandbox, Bayes Studio, Batch Explorer) | `frontend/`, UI Components | 100% (Hoàn thành xuất sắc) |
| **Thành viên 4** | Phân tích lỗi (Error Analysis), soạn thảo Báo cáo PDF & Slide thuyết trình | `CuoiKy.pdf`, `PRESENTATION_SCRIPT.md` | 100% (Hoàn thành xuất sắc) |

---

## 📚 6. Tài Liệu Tham Khảo (References)

1. **Sarhan, M., Layeghy, S., & Portmann, M. (2021).** Towards a Standard Feature Set for Network Intrusion Detection System Datasets. *IEEE Access*, 9, 15463-15478. (NF-UNSW-NB15-v3 dataset).
2. **Duda, R. O., Hart, P. E., & Stork, D. G. (2001).** *Pattern Classification* (2nd ed.). John Wiley & Sons. (Bayes Decision Theory & Minimum Risk Formulation).
3. **Breiman, L. (2001).** Random Forests. *Machine Learning*, 45(1), 5-32.
4. **Moustafa, N., & Slay, J. (2015).** UNSW-NB15: a comprehensive data set for network intrusion detection systems. *IEEE Military Communications and Information Systems Conference (MilCIS)*.
