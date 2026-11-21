/**
 * ============================================================================
 * DỮ LIỆU HỒ SƠ BÁC SĨ (DỄ DÀNG CHỈNH SỬA)
 * ============================================================================
 * Bạn chỉ cần thay đổi thông tin trong file này, toàn bộ website sẽ tự động
 * cập nhật theo dữ liệu mới mà không cần sửa HTML hay CSS.
 */

window.DOCTOR_PROFILE = {
  // 1. Thông tin cơ bản
  brandMark: "BS.A",
  shortName: "BS. CKII. Hoàng Anh",
  fullName: "BS. CKII. Nguyễn Hoàng Anh",
  honorific: "Bác sĩ Chuyên khoa II • Nhãn khoa & Phẫu thuật Khúc xạ",
  eyebrow: "CHUYÊN KHOA MẮT • PHẪU THUẬT KHÚC XẠ & ĐÁY MẮT",
  heroHeadlineLine1: "Giữ trọn ánh sáng,",
  heroHeadlineLine2: "nâng niu từng đôi mắt.",
  heroSummary:
    "Hơn 15 năm đồng hành cùng hàng chục nghìn bệnh nhân tìm lại thị lực sắc nét bằng công nghệ nhãn khoa hiện đại, phác đồ cá nhân hóa và sự tận tâm trong từng ca khám.",
  availabilityText: "Đang nhận lịch khám tuần này",

  // Ảnh đại diện & ảnh phòng khám (thay đường dẫn ảnh thật của bác sĩ tại đây)
  portraitImage: "assets/images/doctor-portrait.jpg",
  clinicImage: "assets/images/clinic-interior.jpg",

  // 2. Các con số nổi bật
  stats: [
    {
      value: 15,
      suffix: "+",
      label: "Năm kinh nghiệm",
      detail: "Chuyên sâu Nhãn khoa & Khúc xạ"
    },
    {
      value: 12500,
      suffix: "+",
      label: "Ca phẫu thuật",
      detail: "SMILE, LASIK & Phaco an toàn"
    },
    {
      value: 99.4,
      suffix: "%",
      decimals: 1,
      label: "Bệnh nhân hài lòng",
      detail: "Đánh giá sau điều trị & tái khám"
    },
    {
      value: 28,
      suffix: "+",
      label: "Công trình & Chứng chỉ",
      detail: "Đào tạo trong nước & quốc tế"
    }
  ],

  // 3. Dải công nghệ & hiệp hội chạy ngang (Marquee)
  marqueeItems: [
    "Phẫu thuật SMILE Pro",
    "Femto-LASIK Thế hệ mới",
    "Chụp OCT Hoàng điểm 3D",
    "Bản đồ Giác mạc Pentacam",
    "Phẫu thuật Phaco Đa tiêu cự",
    "Chụp hình Đáy mắt Không giãn đồng tử",
    "Kiểm soát Cận thị Ortho-K",
    "Hội Nhãn khoa Việt Nam (VOS)",
    "Thành viên APAO Quốc tế"
  ],

  // 4. Giới thiệu & Triết lý nghề y
  about: {
    sectionTag: "VỀ BÁC SĨ",
    title: "Y học chính xác song hành cùng sự thấu cảm",
    quote:
      "“Mỗi đôi mắt là một thế giới riêng biệt. Điều quan trọng nhất không chỉ là công nghệ hiện đại nhất, mà là lắng nghe đúng nhu cầu thị giác và chọn phương án an toàn nhất cho từng người bệnh.”",
    paragraphs: [
      "Tốt nghiệp xuất sắc Đại học Y Dược và hoàn thành chương trình Bác sĩ Chuyên khoa II Nhãn khoa, BS. Nguyễn Hoàng Anh đã dành hơn một thập kỷ chuyên sâu trong chẩn đoán hình ảnh nhãn khoa, phẫu thuật khúc xạ (SMILE Pro, Femto-LASIK) và điều trị các bệnh lý đáy mắt phức tạp.",
      "Với phong cách thăm khám tỉ mỉ, giải thích rõ ràng bằng hình ảnh trực quan (OCT, bản đồ giác mạc, hình chụp đáy mắt), bác sĩ luôn giúp bệnh nhân an tâm và hiểu rõ tình trạng mắt trước mọi quyết định điều trị."
    ],
    principles: [
      {
        icon: "precision",
        title: "Chẩn đoán chuẩn xác",
        desc: "Ứng dụng hệ thống chụp OCT hoàng điểm, bản đồ giác mạc và chụp hình đáy mắt độ phân giải cao."
      },
      {
        icon: "personal",
        title: "Phác đồ cá nhân hóa",
        desc: "Thiết kế lộ trình điều trị riêng theo cấu trúc giác mạc, nghề nghiệp và nhu cầu thị lực của từng người."
      },
      {
        icon: "care",
        title: "Đồng hành sau điều trị",
        desc: "Theo dõi sát sao lịch tái khám và hỗ trợ trực tiếp trong suốt quá trình phục hồi thị lực."
      }
    ]
  },

  // 5. Chuyên môn & Dịch vụ điều trị
  specialties: [
    {
      id: "refractive",
      number: "01",
      tag: "Mũi nhọn",
      title: "Phẫu thuật Khúc xạ LASIK & SMILE Pro",
      shortDesc:
        "Xóa cận – viễn – loạn thị không đau, hồi phục nhanh với công nghệ laser thế hệ mới, bảo tồn tối đa cấu trúc giác mạc.",
      duration: "10 – 15 phút",
      recovery: "24 giờ sinh hoạt lại",
      highlights: [
        "Khám chuyên sâu 12 bước & lập bản đồ giác mạc toàn diện",
        "Công nghệ SMILE Pro đường mổ siêu nhỏ chỉ 2mm, giảm khô mắt",
        "Femto-LASIK và Phakic ICL cho giác mạc mỏng hoặc độ cận cao",
        "Theo dõi hậu phẫu định kỳ 1 ngày – 1 tuần – 1 tháng – 6 tháng"
      ]
    },
    {
      id: "retina",
      number: "02",
      tag: "Chuyên sâu",
      title: "Chẩn đoán & Điều trị Bệnh lý Đáy mắt",
      shortDesc:
        "Phát hiện sớm và kiểm soát hiệu quả bệnh võng mạc tiểu đường, thoái hóa hoàng điểm, tắc mạch võng mạc bằng hệ thống OCT tiên tiến.",
      duration: "20 – 30 phút",
      recovery: "Khám & tư vấn trong ngày",
      highlights: [
        "Chụp cắt lớp võng mạc CIRRUS HD-OCT đánh giá chi tiết hoàng điểm",
        "Chụp hình đáy mắt kỹ thuật số không cần tiêm thuốc cản quang",
        "Tầm soát biến chứng mắt cho bệnh nhân đái tháo đường & tăng huyết áp",
        "Lập hồ sơ theo dõi tiến triển hình ảnh qua từng chu kỳ"
      ]
    },
    {
      id: "phaco",
      number: "03",
      tag: "An toàn cao",
      title: "Phẫu thuật Phaco Đục thủy tinh thể",
      shortDesc:
        "Khôi phục thị lực sáng rõ cho người lớn tuổi bằng kỹ thuật Phaco đường mổ nhỏ không khâu, đa dạng thủy tinh thể đơn & đa tiêu cự.",
      duration: "10 – 15 phút",
      recovery: "Về trong ngày",
      highlights: [
        "Tính công suất thủy tinh thể nhân tạo chuẩn xác bằng sinh trắc quang học",
        "Tư vấn lựa chọn IOL đơn tiêu, đa tiêu hoặc chống loạn thị phù hợp",
        "Hạn chế tối đa xâm lấn, không đau, thị lực cải thiện rõ rệt sau 24h",
        "Quy trình vô khuẩn đạt chuẩn phòng mổ nhãn khoa quốc tế"
      ]
    },
    {
      id: "comprehensive",
      number: "04",
      tag: "Toàn diện",
      title: "Kiểm soát Cận thị & Khám Mắt Chuyên sâu",
      shortDesc:
        "Chăm sóc sức khỏe mắt định kỳ cho trẻ em, dân văn phòng và người lớn tuổi; điều trị khô mắt, glôcôm và tật khúc xạ học đường.",
      duration: "25 – 35 phút",
      recovery: "Không cần nghỉ dưỡng",
      highlights: [
        "Kiểm soát tiến triển cận thị ở trẻ em bằng Ortho-K & tròng kiểm soát",
        "Tầm soát Glôcôm (thiên đầu thống) đo nhãn áp & thị trường tự động",
        "Điều trị hội chứng khô mắt văn phòng và mỏi điều tiết chuyên biệt",
        "Tư vấn chế độ dinh dưỡng và vệ sinh thị giác khoa học"
      ]
    }
  ],

  // 6. Quá trình đào tạo & Công tác (Timeline)
  timeline: [
    {
      period: "2021 – Hiện tại",
      role: "Bác sĩ Chuyên khoa II • Trưởng đơn vị Phẫu thuật Khúc xạ & Chẩn đoán hình ảnh",
      organization: "Bệnh viện Chuyên khoa Mắt Công nghệ cao",
      description:
        "Trực tiếp thăm khám, chỉ định và thực hiện hàng nghìn ca phẫu thuật SMILE Pro, Femto-LASIK, Phaco; phụ trách hội chẩn các ca bệnh lý võng mạc – hoàng điểm phức tạp."
    },
    {
      period: "2018 – 2020",
      role: "Tốt nghiệp Bác sĩ Chuyên khoa II Nhãn khoa",
      organization: "Đại học Y Dược TP. Hồ Chí Minh",
      description:
        "Hoàn thành luận văn chuyên sâu về ứng dụng chụp cắt lớp võng mạc OCT và bản đồ giác mạc trong tối ưu hóa kết quả phẫu thuật khúc xạ."
    },
    {
      period: "2016 – 2017",
      role: "Tu nghiệp Phẫu thuật Khúc xạ & Đáy mắt Quốc tế",
      organization: "Trung tâm Nhãn khoa Quốc tế Singapore (SNEC)",
      description:
        "Đào tạo thực hành nâng cao về kỹ thuật laser không vạt SMILE, xử lý biến chứng giác mạc và chẩn đoán hình ảnh võng mạc chuyên sâu."
    },
    {
      period: "2011 – 2016",
      role: "Bác sĩ Điều trị & Bác sĩ Nội trú Nhãn khoa",
      organization: "Bệnh viện Mắt Trung tâm",
      description:
        "Xây dựng nền tảng lâm sàng vững chắc qua hơn 30.000 lượt khám mắt, trực cấp cứu nhãn khoa và tham gia nhiều đề tài nghiên cứu cấp cơ sở."
    }
  ],

  // 7. Bằng cấp, Chứng chỉ & Ghi nhận
  credentials: [
    {
      year: "2024",
      title: "Chứng nhận Phẫu thuật viên SMILE Pro Xuất sắc",
      issuer: "Carl Zeiss Meditec Asia-Pacific"
    },
    {
      year: "2022",
      title: "Báo cáo viên Khoa học Hội nghị Nhãn khoa Toàn quốc",
      issuer: "Hội Nhãn khoa Việt Nam (VOS)"
    },
    {
      year: "2020",
      title: "Bằng Bác sĩ Chuyên khoa Cấp II – Chuyên ngành Mắt",
      issuer: "Đại học Y Dược TP. HCM"
    },
    {
      year: "2017",
      title: "Chứng chỉ Fellowship Phẫu thuật Khúc xạ & Giác mạc",
      issuer: "Singapore National Eye Centre"
    }
  ],

  // 8. Cảm nhận bệnh nhân
  testimonials: [
    {
      name: "Chị Huỳnh Ngọc Thảo",
      meta: "24 tuổi • Phẫu thuật SMILE Pro",
      rating: 5,
      quote:
        "Mình cận hơn 5 độ suốt 10 năm nên rất lo trước khi mổ. Bác sĩ Anh giải thích cực kỳ kỹ từng chỉ số trên bản đồ giác mạc và kết quả chụp OCT. Quá trình mổ êm ru chỉ khoảng 10 phút, sáng hôm sau mở mắt nhìn rõ mọi thứ mà không cần kính, thực sự rất xúc động!"
    },
    {
      name: "Chú Võ Minh Thành",
      meta: "62 tuổi • Phẫu thuật Phaco 2 mắt",
      rating: 5,
      quote:
        "Mắt chú bị đục thủy tinh thể nhìn mờ như có màn sương. Được bác sĩ Anh khám nhẹ nhàng, tư vấn kỹ loại thủy tinh thể phù hợp. Mổ xong về trong ngày, giờ chú đọc báo, lái xe buổi tối rõ ràng trở lại. Rất cảm ơn sự tận tâm của bác sĩ."
    },
    {
      name: "Anh Lý Công Quân",
      meta: "31 tuổi • Tầm soát Đáy mắt & Khô mắt",
      rating: 5,
      quote:
        "Mình làm IT nhìn màn hình 12 tiếng mỗi ngày, mắt hay nhức và nhìn nhòe. Bác sĩ cho chụp đáy mắt và kiểm tra phim nước mắt rất bài bản, không vẽ thêm dịch vụ thừa. Làm theo phác đồ và hướng dẫn của bác sĩ 2 tuần là mắt dễ chịu hẳn."
    }
  ],

  // 9. Câu hỏi thường gặp (FAQ)
  faqs: [
    {
      question: "Trước khi đi khám mổ cận (LASIK / SMILE Pro) tôi cần lưu ý gì?",
      answer:
        "Bạn nên ngưng đeo kính áp tròng mềm ít nhất 3–7 ngày (hoặc 2–4 tuần với kính Ortho-K) để giác mạc trở về hình dạng tự nhiên, giúp kết quả đo bản đồ giác mạc chính xác nhất. Khi đi khám nên có người đi cùng hoặc mang kính mát vì có thể cần nhỏ giãn đồng tử kiểm tra đáy mắt."
    },
    {
      question: "Thời gian khám chuyên sâu và tư vấn với bác sĩ mất bao lâu?",
      answer:
        "Một buổi khám mắt tổng quát kéo dài khoảng 25–35 phút. Với gói khám chuyên sâu tiền phẫu thuật khúc xạ (đo khúc xạ, bản đồ giác mạc, chụp OCT hoàng điểm, chụp hình đáy mắt và bác sĩ trực tiếp tư vấn), tổng thời gian khoảng 60–90 phút."
    },
    {
      question: "Tôi có thể đặt lịch khám trước theo khung giờ mong muốn không?",
      answer:
        "Có. Đặt lịch trực tuyến giúp bạn được ưu tiên tiếp nhận đúng khung giờ đã chọn, hạn chế thời gian chờ đợi và hồ sơ được chuẩn bị sẵn trước khi vào phòng khám cùng BS. Hoàng Anh."
    },
    {
      question: "Bệnh nhân tiểu đường có cần chụp hình đáy mắt định kỳ không?",
      answer:
        "Rất cần thiết. Biến chứng võng mạc đái tháo đường thường diễn tiến âm thầm ở giai đoạn đầu không gây đau nhức. Bác sĩ khuyến nghị người bệnh tiểu đường nên khám và chụp hình đáy mắt / OCT tối thiểu 6–12 tháng một lần để bảo vệ thị lực lâu dài."
    }
  ],

  // 10. Lịch khám & Thông tin liên hệ
  schedule: [
    { day: "Thứ 2 – Thứ 6", hours: "07:30 – 11:30  |  13:30 – 17:00", location: "Phòng khám Chuyên khoa Mắt – Khu Công nghệ cao", status: "Khám & Phẫu thuật" },
    { day: "Thứ 7", hours: "07:30 – 12:00  |  13:30 – 16:30", location: "Phòng khám Chuyên khoa Mắt – Khu Công nghệ cao", status: "Khám chuyên sâu" },
    { day: "Chủ Nhật", hours: "08:00 – 11:30 (Theo lịch hẹn)", location: "Phòng khám ngoài giờ", status: "Đặt hẹn trước" }
  ],

  contact: {
    hotlineDisplay: "0908 123 456",
    hotlineHref: "tel:+84908123456",
    zaloUrl: "https://zalo.me/0908123456",
    email: "lienhe@bshoanganh.vn",
    address: "Số 128 Nguyễn Đình Chiểu, Quận 3, TP. Hồ Chí Minh",
    clinicName: "Trung tâm Nhãn khoa & Phẫu thuật Khúc xạ"
  }
};
