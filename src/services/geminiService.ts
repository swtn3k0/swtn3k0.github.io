import { GoogleGenAI } from "@google/genai";
import { ReadingResult, DrawnCard, ReadingTheme, SpreadType } from '../types';

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
  drawnCards: DrawnCard[]
): Promise<string> => {
  // Prioritize gemini-1.5-flash for stability
  const models = ["gemini-1.5-flash", "gemini-3-flash-preview"];
  
  const cardsInfo = drawnCards.map((c, i) => {
    const pos = c.positionName ? ` (Vị trí: ${c.positionName === 'Past' ? 'Quá khứ' : c.positionName === 'Present' ? 'Hiện tại' : 'Tương lai'})` : '';
    return `${i + 1}. ${c.card.name}${c.isReversed ? ' (Ngược)' : ' (Xuôi)'}${pos}: ${c.isReversed ? c.card.meaningReversed : c.card.meaningUpright}`;
  }).join('\n');

  const prompt = `
    Bạn là một chuyên gia giải bài Tarot với giọng văn huyền bí, sâu sắc và thông thái.
    Hãy phân tích trải bài Tarot sau đây cho người dùng.
    
    Câu hỏi của người dùng: "${question}"
    Chủ đề: ${theme}
    Kiểu trải bài: ${spreadType}
    
    Các lá bài đã rút:
    ${cardsInfo}
    
    Vui lòng cung cấp một lời giải mã cá nhân hóa, sâu sắc và có chiều sâu cho trải bài này.
    Hãy kết nối các lá bài lại với nhau để tạo thành một câu chuyện hoặc lời hướng dẫn mạch lạc.
    Sử dụng tông giọng khuyến khích nhưng trung thực, mang lại cảm giác bí ẩn và trí tuệ.
    Giữ cho câu trả lời súc tích nhưng có tác động mạnh mẽ (khoảng 200-300 từ).
    Định dạng đầu ra bằng Markdown.
    PHẢI TRẢ LỜI BẰNG TIẾNG VIỆT.
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
