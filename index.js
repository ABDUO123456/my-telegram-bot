const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf('process.env.BOT_TOKEN'); // ضع التوكن الخاص بك هنا

// المصفوفات للأذكار (كل عنصر سيُرسل في رسالة منفصلة)
const azkar = {
    morning: [
        "☀️ *أذكار الصباح*\n\n1. آية الكرسي: {اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...}",
        "☀️ *أذكار الصباح*\n\n2. {أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له}"
    ],
    evening: [
        "🌙 *أذكار المساء*\n\n1. آية الكرسي: {اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...}",
        "🌙 *أذكار المساء*\n\n2. {أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له}"
    ],
    afterPrayer: [
        "📿 *أذكار بعد الصلاة*\n\n1. أستغفر الله (3 مرات).",
        "---\n2. اللهم أنت السلام ومنك السلام، تباركت يا ذا الجلال والإكرام.",
        "---\n3. سبحان الله (33). الحمد لله (33). الله أكبر (33)."
    ]
};

// تصميم الأزرار كما في الصورة (عريضة وتحت بعضها)
const mainKeyboard = Markup.keyboard([
    ['☀️ أذكار الصباح', '🌙 أذكار المساء'],
    ['📿 أذكار بعد الصلاة'],
    ['📿 السبحة الإلكترونية']
]).resize(); // resize تجعل الأزرار بحجم مناسب وليس ضخماً

bot.start((ctx) => {
    ctx.reply('مرحباً بك في بوت الأذكار 🌸\nاختر من القائمة بالأسفل:', mainKeyboard);
});

// دالة الإرسال المتتابع (البعثرة)
async function sendMessages(ctx, list) {
    for (const msg of list) {
        await ctx.replyWithMarkdown(msg);
        // تأخير بسيط جداً ليبدو الإرسال مرتباً
        await new Promise(res => setTimeout(res, 500));
    }
    await ctx.reply("✨ تم إرسال جميع الأذكار.");
}

// برمجة الأزرار
bot.hears('☀️ أذكار الصباح', (ctx) => sendMessages(ctx, azkar.morning));
bot.hears('🌙 أذكار المساء', (ctx) => sendMessages(ctx, azkar.evening));
bot.hears('📿 أذكار بعد الصلاة', (ctx) => sendMessages(ctx, azkar.afterPrayer));

// السبحة الإلكترونية (مثال بسيط)
bot.hears('📿 السبحة الإلكترونية', (ctx) => {
    ctx.reply('اضغط على الزر للتسبيح:', Markup.inlineKeyboard([
        [Markup.button.callback('سُبْحَانَ اللَّهِ (0)', 'count')]
    ]));
});

bot.launch();
console.log("🚀 البوت يعمل الآن بنفس تصميم الصورة!");


const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Bot is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});