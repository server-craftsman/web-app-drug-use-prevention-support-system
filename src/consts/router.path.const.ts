export const ROUTER_URL = {
  AUTH: {
    LOGIN: "/dang-nhap",
    SIGN_UP: "/dang-ky",
    FORGOT_PASSWORD: "/quen-mat-khau",
    RESET_PASSWORD: "/doi-mat-khau",
    VERIFY_EMAIL: "/confirm-email",
    CONFIRM_EMAIL: "/confirm-email",
    UNAUTHOZIZED: "/khong-co-quyen",
    NOT_FOUND: "*",
  },
  ADMIN: {
    BASE: "/admin",
    OVERVIEW: "/admin/tong-quan",
    USERS: "/admin/khach-hang",
    SETTINGS: "/admin/cai-dat",
    MANAGER_BLOG: "/admin/quan-ly-blog",
    MANAGER_COURSE: "/admin/quan-ly-khoa-hoc",
    MANAGER_USER: "/admin/quan-ly-khach-hang",
    ANALYTICS: "/admin/thong-ke",
    STAFF_CONSULTANTS: "/admin/tu-van-vien",
    MANAGERS: "/admin/quan-ly",
    PERMISSIONS: "/admin/quyen-han",
    COMMUNITY_PROGRAMS: "/admin/chuong-trinh-cong-dong",
    RESOURCES: "/admin/tai-lieu",
    ASSESSMENTS: "/admin/danh-gia",
    CONSULTATIONS: "/admin/tuyen-dung",
    EMERGENCY_SUPPORT: "/admin/bao-hanh",
    ALERTS: "/admin/thong-bao",
    MESSAGES: "/admin/tin-nhan",
    SECURITY: "/admin/bao-mat",
    MANAGER_SESSION: "/admin/quan-ly-khoa-hoc",
    MANAGER_LESSON: "/admin/quan-ly-bai-hoc",
    MANAGER_CATEGORY: "/admin/quan-ly-danh-muc",
  },
  CONSULTANT: {
    BASE: "/consultant",
    OVERVIEW: "/consultant/tong-quan",
    USERS: "/consultant/khach-hang",
    SETTINGS: "/consultant/cai-dat",
    APPOINTMENTS: "/consultant/lich-hen-tu-van",
    APPOINTMENT_DETAIL: "/consultant/lich-hen-tu-van/:appointmentId",
    CLIENTS: "/consultant/khach-hang",
    CONSULTATIONS: "/consultant/tuyen-dung",
    ASSESSMENTS: "/consultant/danh-gia",
    RESOURCES: "/consultant/tai-lieu",
    REPORTS: "/consultant/bao-cao",
  },
  STAFF: {
    BASE: "/staff",
    OVERVIEW: "/staff/tong-quan",
    COURSES: "/staff/khoa-hoc",
    CONTENT: "/staff/noi-dung",
    COMMUNITY_PROGRAMS: "/staff/chuong-trinh-cong-dong",
    ASSESSMENTS: "/staff/danh-gia",
    EVENTS: "/staff/su-kien",
    RESOURCES: "/staff/tai-lieu",
    USERS: "/staff/khach-hang",
    REPORTS: "/staff/bao-cao",
    SETTINGS: "/staff/cai-dat",
    PROFILE: "/staff/profile",
  },
  MANAGER: {
    BASE: "/manager",
    OVERVIEW: "/manager/tong-quan",
    ANALYTICS: "/manager/thong-ke",
    USERS: "/manager/khach-hang",
    STAFF: "/manager/nhan-vien",
    CONSULTANTS: "/manager/tu-van-vien",
    PROGRAMS: "/manager/chuong-trinh",
    SURVEYS: "/manager/khao-sat",
    COURSES: "/manager/khoa-hoc",
    CATEGORIES: "/manager/danh-muc",
    REPORTS: "/manager/bao-cao",
    COMPLIANCE: "/manager/phap-luat",
    OPERATIONS: "/manager/hoat-dong",
    SCHEDULE: "/manager/lich-hen-tu-van",
    SCHEDULE_DETAIL: "/manager/lich-hen-tu-van/:appointmentId",
    REVIEWS: "/manager/danh-gia",
    SETTINGS: "/manager/cai-dat",
  },
  CUSTOMER: {
    BASE: "/customer",
    APPOINTMENTS: "/customer/lich-hen-tu-van",
    APPOINTMENT_DETAIL: "/customer/lich-hen-tu-van/:appointmentId",
    FAVORITES: "/customer/yeu-thich",
    SETTINGS: "/customer/cai-dat",
    COURSE: "/customer/khoa-hoc",
    ASSESSMENT: "/customer/danh-gia-rui-ro",
    MY_COURSE: "/customer/khoa-hoc-cua-toi",
    MY_COURSE_DETAIL: "/customer/khoa-hoc-cua-toi/:courseId",
    ORDER_HISTORY: "/customer/lich-su-don-hang",
    REVIEW_HISTORY: "/customer/lich-su-danh-gia",
    LESSON_DETAIL: "/customer/bai-hoc/:lessonId",
  },
  COMMON: {
    HOME: "/",
    ABOUT: "/ve-chung-toi",
    CONTACT: "/lien-he",
    FAQ: "/cau-hoi-thuong-gap",
    COVER: "/cover",
  },
  CLIENT: {
    BASE: "/",
    COURSE: "/khoa-hoc",
    COURSE_DETAIL: "/khoa-hoc/:courseId",
    BLOG: "/blog",
    BLOG_DETAIL: "/blog/:blogId",
    COUNSEL: "/tu-van",
    PROGRAM: "/chuong-trinh-cong-dong",
    PROGRAM_DETAIL: "/chuong-trinh-cong-dong/:programId", // detail page
    SURVEY_DETAIL: "/khau-sat/:surveyId", // client survey detail
    SURVEY_ATTEMPT: "/khau-sat/:surveyId/try", // attempt quiz page
    SURVEY: "/khau-sat", // client survey list
    ASSESSMENT: "/danh-gia-rui-ro",
    ASSESSMENT_RESULT: "/danh-gia-rui-ro/:assessmentId/ket-qua",
    CART: "/gio-hang",
    APPOINTMENTS: "/lich-hen-tu-van",
    FAVORITES: "/yeu-thich",
    SETTINGS: "/cai-dat",
    PAYMENT: "/thanh-toan",
    PAYMENT_SUCCESS: "/thanh-toan-thanh-cong",
    PAYMENT_FAIL: "/thanh-toan-that-bai",
  },
};
