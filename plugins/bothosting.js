/*
Project Name : draĸonιѕ-мd
Creator      : Dev Sung ( Mr Sung Suhk )
Repo         : https://github.com/NaCkS-ai/Drakonis-MD
Support      : wa.me/1(236)362-1958
*/


const { malvin } = require('../malvin');

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

malvin({
    pattern: "bothosting",
    alias: ["deploy"],
    desc: "Display support and follow links",
    category: "main",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, {
    from, reply, pushname
}) => {
    try {
        

        const message = `
*STEPS ON HOW TO DEPLOY A WHATSAPP BOT*
First you need a GitHub account.
Create one using the link:
https://github.com/

Secondly create a discord account.
https://discord.com/login

Once your done creating and verifying the two account, move over to the next step.

*NEXT STEPS*
Next step is to fork the bot repository. Click the link
https://github.com/Xdking2/MALVIN-XD

Then download the zip file.

Now authorise your discord account then claim coins for 3days, each day u can claim 10 coins.


https://bot-hosting.net/?aff=1358062837397852211

*NOTE:* Some bot require larger server to process while. (25 coin)

When your done creating a server (25 coin) open the server.

Upload your bot code you have downloaded

Start server Enjoy 😉

*Watch:* tutorial sooon
https://youtube.com/@malvintech2
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
