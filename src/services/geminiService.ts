import { GoogleGenAI } from "@google/genai";
import { ReadingResult, DrawnCard, ReadingTheme, SpreadType } from '../types';

// Use a function to get the AI instance to ensure it uses the latest API key
const getAI = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("Gemini API key is missing or using placeholder.");
  }
  return new GoogleGenAI({ apiKey: apiKey || "" });
};

export const interpretReading = async (
  question: string,
  theme: ReadingTheme,
  spreadType: SpreadType,
  drawnCards: DrawnCard[]
): Promise<string> => {
  // Using gemini-3-flash-preview as recommended for basic text tasks
  const model = "gemini-3-flash-preview";
  
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

  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });
    
    if (!response.text) {
      console.error("Gemini returned empty response:", response);
      return "Các vì sao đang im lặng. Vui lòng thử lại sau.";
    }
    
    return response.text;
  } catch (error: any) {
    console.error("Gemini Error Details:", error);
    
    // Check for specific error messages
    if (error.message?.includes("API_KEY_INVALID")) {
      return "Lỗi: Khóa API không hợp lệ. Vui lòng kiểm tra cấu hình trong phần Secrets.";
    }
    
    return "Kết nối với vũ trụ bị gián đoạn. Vui lòng thử lại sau.";
  }
};
