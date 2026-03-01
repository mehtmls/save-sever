const axios = require('axios');

module.exports = async (req, res) => {
    // 1. 設置跨域頭部（讓你的 GitHub Pages 網址能合法訪問它）
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', 'https://mehtmls.github.io');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // 處理瀏覽器的預檢請求 (Preflight)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 2. 只處理 POST 請求（因為我們要傳圖片數據）
    if (req.method === 'POST') {
        try {
            // 從前端發來的數據中解構出圖片 (Base64)
            const { image } = req.body;

            if (!image) {
                return res.status(400).json({ success: false, error: "沒傳圖片啊，兄弟！" });
            }

            // 3. 轉發給目標 API
            // 咱也就是說，伺服器發請求是不會被 CORS 攔截的
            const targetUrl = 'https://howattractiveami.app/api/detector';
            const response = await axios.post(targetUrl, req.body, {
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Referer': 'https://howattractiveami.app/'
                }
            });

            // 4. 把結果原封不動（或者你加點吐槽）傳回給前端
            return res.status(200).json(response.data);

        } catch (error) {
            console.error('代理出錯:', error.message);
            return res.status(500).json({ 
                success: false, 
                error: '雲端代理炸了', 
                msg: error.message 
            });
        }
    } else {
        // 如果有人用 GET 訪問，給他個下馬威
        res.status(405).json({ message: "這不是給你看的頁面，請用 POST 傳圖片過來！" });
    }
};
