const { Telegraf, Markup } = require('telegraf');
const express = require('express');

// إعداد السيرفر لإبقاء البوت حياً على Render
const app = express();
app.get('/', (req, res) => res.send('Bot is Running!'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// إعداد البوت باستخدام التوكن من الإعدادات
const bot = new Telegraf(process.env.BOT_TOKEN);

const azkar = {
    morning: [
        "☀️ *أذكار الصباح (1/3)*\n\n🔹 آية الكرسي: {اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...}\n\n🔹 سورة الإخلاص والمعوذتين (3 مرات).",
        "☀️ *أذكار الصباح (2/3)*\n\n🔹 أصبحنا وأصبح الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.\n\n🔹 اللهم بك أصبحنا، وبك أمسينا، وبك نحيا، وبك نموت، وإليك النشور.",
        "☀️ *أذكار الصباح (3/3)*\n\n🔹 سيد الاستغفار: اللهم أنت ربي لا إله إلا أنت، خلقتني وأنا عبدك، وأنا على عهدك ووعدك ما استطعت...\n\n🔹 رضيت بالله رباً، وبالإسلام ديناً، وبمحمد صلى الله عليه وسلم نبياً."
    ],
    evening: [
        "🌙 *أذكار المساء (1/3)*\n\n🔹 آية الكرسي: {اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...}\n\n🔹 سورة الإخلاص والمعوذتين (3 مرات).",
        "🌙 *أذكار المساء (2/3)*\n\n🔹 أمسينا وأمسى الملك لله، والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.\n\n🔹 اللهم بك أمسينا، وبك أصبحنا، وبك نحيا، وبك نموت، وإليك المصير.",
        "🌙 *أذكار المساء (3/3)*\n\n🔹 اللهم ما أمسى بي من نعمة أو بأحد من خلقك فمنك وحدك لا شريك لك، فلك الحمد ولك الشكر.\n\n🔹 بسم الله الذي لا يضر مع اسمه شيء في الأرض ولا في السماء وهو السميع العليم (3 مرات)."
    ]
};

// تصميم الأزرار (أذكار الصباح والمساء فقط)
const mainKeyboard = Markup.keyboard([
    ['☀️ أذكار الصباح'],
    ['🌙 أذكار المساء']
]).resize();

bot.start((ctx) => {
    ctx.reply('مرحباً بك في بوت أذكار المسلم 🌸\nإضغط على الزر بالأسفل لقراءة الأذكار:', mainKeyboard);
});

async function sendMessages(ctx, list) {
    for (const msg of list) {
        try {
            await ctx.replyWithMarkdown(msg);
            await new Promise(res => setTimeout(res, 600)); // تأخير بسيط لتنظيم الرسائل
        } catch (e) {
            console.error("Error:", e);
        }
    }
    await ctx.reply("✨ تقبل الله طاعاتكم.");
}

bot.hears('☀️ أذكار الصباح', (ctx) => sendMessages(ctx, azkar.morning));
bot.hears('🌙 أذكار المساء', (ctx) => sendMessages(ctx, azkar.evening));

// تشغيل البوت
bot.launch()
    .then(() => console.log("🚀 البوت يعمل الآن بنجاح بدون السبحة!"))
    .catch((err) => console.error("فشل التشغيل:", err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
