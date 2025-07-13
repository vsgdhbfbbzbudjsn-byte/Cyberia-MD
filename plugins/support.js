/*
Project Name : MALVIN XD
Creator      : Malvin King ( Mr Lord Malvin )
Repo         : https://github.com/XdKing2/MALVIN-XD
Support      : wa.me/263714757857
*/

const config = require('../settings');
const { malvin } = require('../malvin');
const { runtime } = require('../lib/functions');

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

malvin({
    pattern: "support",
    alias: ["follow", "links"],
    desc: "Display support and follow links",
    category: "main",
    react: "📡",
    filename: __filename
}, 
async (conn, mek, m, {
    from, reply, pushname
}) => {
    try {
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const uptimeFormatted = runtime(process.uptime());

        const message = `
╭─『 *Drakonis-MD - 𝗦𝗨𝗣𝗣𝗢𝗥𝗧* 』─
│ 👤 *Developer* : Dev Sung🇿🇦
│ ⚙️ *Mode*      : ${config.MODE}
│ ⏱️ *Uptime*    : ${uptimeFormatted}
│ 💠 *Prefix*    : ${config.PREFIX}
│ 🔖 *Version*   : ${config.version}
│ 🕰️ *Time*      : ${currentTime}
╰─────────────

📢 *Follow & Support Drakonis-MD* ${readMore}

🔔 *Official WhatsApp Channel*
🔗 https://whatsapp.com/channel/0029Vb6TAmjHwXb5Qx1BpE0j

🎬 *YouTube Channel*
🔗 https://youtube.com/@malvintech2

👨‍💻 *Developer Contact*
🔗 wa.me/1(236)362-1958

> 💡 Powered by *Dev Sung*
        `.trim();

        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/ygfz2e.jpg' },
            caption: message,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402507750390@newsletter',
                    newsletterName: '🪀『 draĸonιѕ-мd 』🪀',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Support Cmd Error:", e);
        reply(`⚠️ An error occurred:\n${e.message}`);
    }
});
