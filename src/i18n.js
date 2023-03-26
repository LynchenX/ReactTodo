import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'vn',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // language resources
    resources: {
      en: {
        translation: {
          welcome: "Welcome to React",
          inputPlaceholderText: "What do you want to do?",
          todoTitle: "Todo List App",
          addTask: "Add task",
          normal: "Normal",
          high: "High",
          urgent: "Urgent",
          deadline: "Misses the deadline"
        }
      },
      vn: {
        translation: {
          welcome: "Chào mừng đến với bình nguyên vô tận",
          inputPlaceholderText: "Nhập một việc cần làm",
          todoTitle: "Danh việc cần làm",
          addTask: "Thêm việc",
          normal: "Bình thường",
          high: "Quan trọng",
          urgent: "Khẩn cấp",
          deadline: "Nhiệm vụ đã quá hạn"
        }
      },
    }
  });

export default i18n;
