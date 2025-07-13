const { malvin } = require("../malvin");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");
const { setCommitHash, getCommitHash } = require("../data/updateDB");

const GITHUB_TOKEN = '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'; // 🔐 PRIVATE
const GITHUB_OWNER = 'dev-malvin';
const GITHUB_REPO = 'm';
const BRANCH = 'main';

malvin({
    pattern: "update2",
    alias: ["upgrade", "sync"],
    react: "🆕",
    desc: "Update the bot to the latest version.",
    category: "misc",
    filename: __filename,
}, async (client, message, args, { reply, isOwner }) => {
    if (!isOwner) return reply("🚫 Only the owner can use this command.");

    try {
        await reply("🔍 Checking for updates...");

        const commitURL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits/${BRANCH}`;
        const { data: commitData } = await axios.get(commitURL, {
            headers: { Authorization: `token ${GITHUB_TOKEN}` }
        });
        const latestCommitHash = commitData.sha;
        const currentHash = await getCommitHash();

        if (latestCommitHash === currentHash) {
            return reply("✅ Your draĸonιѕ-мd bot is already up-to-date!");
        }

        await reply("🚀 Update available! Downloading...");

        const zipURL = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/zipball/${BRANCH}`;
        const zipPath = path.join(__dirname, "latest.zip");
        const { data: zipData } = await axios.get(zipURL, {
            responseType: "arraybuffer",
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github+json"
            }
        });
        fs.writeFileSync(zipPath, zipData);

        await reply("📦 Extracting the update...");
        const extractPath = path.join(__dirname, "latest");
        const zip = new AdmZip(zipPath);
        zip.extractAllTo(extractPath, true);

        const extractedFolders = fs.readdirSync(extractPath);
        const repoFolder = path.join(extractPath, extractedFolders[0]);

        await reply("🛠️ Replacing files...");
        copyFolderSync(repoFolder, path.join(__dirname, ".."));

        await setCommitHash(latestCommitHash);

        fs.unlinkSync(zipPath);
        fs.rmSync(extractPath, { recursive: true, force: true });

        await reply("✅ Update complete! Restarting...");
        process.exit(0);
    } catch (error) {
        console.error("❌ Update error:", error);
        return reply("⚠️ Update failed. Try manually.");
    }
});

function copyFolderSync(source, target) {
    if (!fs.existsSync(target)) fs.mkdirSync(target, { recursive: true });
    for (const item of fs.readdirSync(source)) {
        const src = path.join(source, item);
        const dest = path.join(target, item);

        if (["settings.js", "app.json"].includes(item)) {
            console.log(`🔒 Skipped ${item} to preserve settings.`);
            continue;
        }

        if (fs.lstatSync(src).isDirectory()) {
            copyFolderSync(src, dest);
        } else {
            fs.copyFileSync(src, dest);
        }
    }
}
