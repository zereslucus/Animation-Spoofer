console.log(` 
                 _______ _____   _______ ______ _______ _____   
                |     __|     |_|       |   __ \   _   |     |_  
                |    |  |       |   -   |   __ <       |       |
                |_______|_______|_______|______/___|___|_______|

                 _____   _______ _______ __  __ _______         
                |     |_|    ___|   _   |  |/  |     __|        
                |       |    ___|       |     <|__     |        
                |_______|_______|___|___|__|\__|_______|   
                                                     `);
import _0x16615b from 'node-fetch';
import _0x1eab6f from 'express';
import _0x426bce from 'body-parser';
import _0x3cd706 from 'fs';
import _0x14820a from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = _0x14820a.dirname(__filename);
const statusFilePath = _0x14820a.join(__dirname, "/STATUS.txt");
const statusContents = _0x3cd706.readFileSync(statusFilePath, "utf8");
let cookie = null;
for (const line of statusContents.split("\n")) {
  if (line.startsWith("COOKIE=")) {
    cookie = line.replace("COOKIE=", '').trim();
    break;
  }
}
if (!cookie) {
  console.error("❌ No .ROBLOSECURITY cookie found in STATUS.txt!");
  process.exit(0x1);
}
const mainApp = _0x1eab6f();
const secApp = _0x1eab6f();
const remapped = {};
const failedIDs = [];
const delay = _0x27c1ca => new Promise(_0x411390 => setTimeout(_0x411390, _0x27c1ca));
async function pullAnimation(_0x238731) {
  try {
    const _0x42f709 = await _0x16615b("https://assetdelivery.roblox.com/v1/asset?id=" + _0x238731, {
      'method': "GET",
      'headers': {
        'User-Agent': "RobloxStudio/WinInet",
        'Cookie': ".ROBLOSECURITY=" + cookie + ';'
      }
    });
    if (!_0x42f709.ok) {
      console.error("❌ Failed: " + _0x238731);
      return null;
    }
    return await _0x42f709.arrayBuffer();
  } catch {
    return null;
  }
}
async function publishAnimations(_0x317d82, _0x13f619, _0xe91f53, _0x2d4ec2) {
  const _0x1577d2 = Object.entries(_0xe91f53);
  for (let _0x519b23 = 0x0; _0x519b23 < _0x1577d2.length; _0x519b23 += 0x32) {
    const _0x364124 = _0x1577d2.slice(_0x519b23, _0x519b23 + 0x32);
    await Promise.all(_0x364124.map(async ([_0x565bb3, _0x592610]) => {
      const _0x437c94 = await pullAnimation(_0x592610);
      if (!_0x437c94) {
        failedIDs.push(_0x592610);
        return;
      }
      try {
        const _0x170e35 = await _0x16615b("https://www.roblox.com/ide/publish/uploadnewanimation?assetTypeName=Animation&name=" + encodeURIComponent(_0x565bb3) + "&description=" + encodeURIComponent(_0x565bb3) + "&AllID=1&ispublic=False&allowComments=True&isGamesAsset=False" + (_0x2d4ec2 ? '&groupId=' + _0x2d4ec2 : ''), {
          'method': "POST",
          'body': Buffer.from(_0x437c94),
          'headers': {
            'Cookie': ".ROBLOSECURITY=" + _0x317d82 + ';',
            'X-CSRF-Token': _0x13f619,
            'User-Agent': "RobloxStudio/WinInet",
            'Accept': "application/json",
            'Content-Type': "application/octet-stream"
          }
        });
        const _0x21c807 = await _0x170e35.text();
        const _0x24aac7 = Number(_0x21c807);
        if (!isNaN(_0x24aac7)) {
          remapped[_0x592610] = _0x24aac7;
          console.log("✅ Uploaded: " + _0x592610 + " => " + _0x24aac7);
        } else {
          failedIDs.push(_0x592610);
        }
      } catch {
        failedIDs.push(_0x592610);
      }
    }));
    await delay(0x5dc);
  }
  return {
    'remapped': remapped,
    'failedIDs': failedIDs
  };
}
mainApp.use(_0x426bce.json());
mainApp.use(_0x426bce.urlencoded({
  'extended': true
}));
secApp.use(_0x426bce.json());
secApp.use(_0x426bce.urlencoded({
  'extended': true
}));
let workingStill = true;
let workingOnSecApp = true;
mainApp.get('/', (_0x1b65ac, _0x46ac53) => {
  if (workingStill) {
    return _0x46ac53.json(null);
  }
  _0x46ac53.json(remapped);
  process.exit();
});
secApp.get('/', (_0x1ddf55, _0xdb9c3c) => {
  if (workingOnSecApp) {
    return _0xdb9c3c.json(null);
  }
  _0xdb9c3c.json(remapped);
});
import _0x130bd0 from 'noblox.js';
let csrf;
try {
  await _0x130bd0.setCookie(cookie);
  csrf = await _0x130bd0.getGeneralToken();
} catch {
  console.error("❌ CSRF token fetch failed.");
  process.exit(0x1);
}
mainApp.post('/', async (_0x4ed0ce, _0x413bbf) => {
  const _0x826814 = await publishAnimations(cookie, csrf, _0x4ed0ce.body.ids, _0x4ed0ce.body.groupID);
  workingStill = false;
  _0x413bbf.json({
    'status': "Success",
    ..._0x826814
  });
});
secApp.post('/', async (_0x1e5321, _0x10038c) => {
  _0x10038c.status(0xcc).send();
  await publishAnimations(cookie, csrf, _0x1e5321.body.ids, _0x1e5321.body.groupID);
  workingOnSecApp = false;
});
mainApp.listen(0x1b39, () => console.log("🌐 Listening to Globalcuh"));
secApp.listen(0x1b3a, () => console.log("🌐 Globalcuh on top | Run the LuaScript"));