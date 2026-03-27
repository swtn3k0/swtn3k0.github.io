import { GoogleGenAI } from "@google/genai";
import { ReadingResult, DrawnCard, ReadingTheme, SpreadType, DeckType, UserInfo } from '../types';

// Use a function to get the AI instance to ensure it uses the latest API key
const getAI = () => {
  // Get key from environment (injected during build via GitHub Secrets)
  let apiKey = "";
  try {
    apiKey = String(process.env.GEMINI_API_KEY);
  } catch (e) {
    apiKey = "";
  }

  if (!apiKey || apiKey === "undefined" || apiKey === "null" || apiKey === "" || apiKey === "MY_GEMINI_API_KEY") {
    throw new Error("MISSING_KEY");
  }
  
  return new GoogleGenAI({ apiKey: apiKey.trim() });
};

export const interpretReading = async (
  question: string,
  theme: ReadingTheme,
  spreadType: SpreadType,
  drawnCards: DrawnCard[],
  deckType: DeckType,
  userInfo: UserInfo
): Promise<string> => {
  // Use gemini-3-flash-preview as the primary model for best speed and higher free limits
  const models = ["gemini-3-flash-preview", "gemini-3.1-pro-preview"];
  
  const cardsInfo = drawnCards.map((c, i) => {
    const pos = c.positionName ? ` (Vị trí: ${c.positionName === 'Past' ? 'Quá khứ' : c.positionName === 'Present' ? 'Hiện tại' : 'Tương lai'})` : '';
    return `${i + 1}. ${c.card.name}${c.isReversed ? ' (Ngược)' : ' (Xuôi)'}${pos}: ${c.isReversed ? c.card.meaningReversed : c.card.meaningUpright}`;
  }).join('\n');

  const deckName = deckType === DeckType.TAROT ? 'Tarot' : 'Bài Tây (Playing Cards)';

  const prompt = `
    Bạn là một chuyên gia giải bài ${deckName} chuyên nghiệp, có kiến thức sâu sắc về tâm linh và tâm lý học.
    Hãy phân tích trải bài ${deckName} sau đây cho người dùng.
    
    Thông tin người xem:
    - Họ và tên: ${userInfo.fullName}
    - Năm sinh: ${userInfo.birthYear}
    - Nhu cầu/Câu hỏi cụ thể: "${userInfo.request || 'Không có'}"
    
    Câu hỏi của người dùng cho trải bài này: "${question}"
    Chủ đề: ${theme}
    Kiểu trải bài: ${spreadType}
    
    Các lá bài đã rút:
    ${cardsInfo}
    
    YÊU CẦU VỀ ĐỊNH DẠNG (RẤT QUAN TRỌNG):
    1. Sử dụng các icon (emoji) phù hợp để làm câu trả lời sinh động (ví dụ: ✨, 🔮, 🃏, 🌟, ❤️, 💼, 🌙, ☀️).
    2. Chia câu trả lời thành các đoạn rõ ràng, có cách dòng (xuống dòng 2 lần) để dễ đọc.
    3. Cấu trúc bài viết:
       - Lời chào cá nhân hóa gửi tới ${userInfo.fullName}.
       - Giải mã chi tiết từng lá bài (kèm icon và phân tích sâu sắc).
       - Tổng kết và lời khuyên từ vũ trụ dành riêng cho tình huống này.
    4. Sử dụng ngôn ngữ huyền bí nhưng gần gũi, sâu sắc và mang tính khích lệ.
    5. Trình bày bằng Markdown để các tiêu đề và danh sách hiển thị đẹp mắt.
    6. PHẢI TRẢ LỜI BẰNG TIẾNG VIỆT.
    7. Độ dài khoảng 300-400 từ để đảm bảo sự chi tiết.
  `;

  let lastError: any = null;
  for (const model of models) {
    try {
      const ai = getAI();
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
      });
      
      if (response.text) {
        return response.text;
      }
    } catch (error: any) {
      console.warn(`Model ${model} failed:`, error);
      lastError = error;
    }
  }

  console.error("All Gemini models failed:", lastError);
  
  const errorMessage = lastError?.message || "";
  
  if (lastError instanceof Error && lastError.message === "MISSING_KEY") {
    return "Lỗi: Không tìm thấy khóa API. Vui lòng kiểm tra cấu hình GitHub Secrets.";
  }
  
  if (errorMessage.includes("API_KEY_INVALID") || errorMessage.includes("leaked")) {
    return "Lỗi: Khóa API không hợp lệ hoặc đã bị lộ. Vui lòng cập nhật khóa mới trong GitHub Secrets.";
  }
  
  if (errorMessage.includes("location not supported")) {
    return "Lỗi: Dịch vụ AI chưa hỗ trợ vùng lãnh thổ của bạn. Vui lòng thử dùng VPN.";
  }
  
  return `Kết nối với vũ trụ bị gián đoạn. Chi tiết lỗi: ${errorMessage.substring(0, 100)}...`;
};
