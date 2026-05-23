<!DOCTYPE html>
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"></script>
</head>
<body>
<script>
function md5(str) {
  return CryptoJS.MD5(str).toString();
}
function aesEncryptToBase64(plaintext, keyStr, ivStr) {
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const iv = CryptoJS.enc.Utf8.parse(ivStr);
  const enc = CryptoJS.AES.encrypt(plaintext, key, {
    iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7
  });
  return enc.ciphertext.toString(CryptoJS.enc.Base64);
}
function aesDecryptFromBase64(ciphertextB64, keyStr, ivStr) {
  const key = CryptoJS.enc.Utf8.parse(keyStr);
  const iv = CryptoJS.enc.Utf8.parse(ivStr);
  const ciphertext = CryptoJS.enc.Base64.parse(ciphertextB64);
  const enc = CryptoJS.lib.CipherParams.create({ ciphertext });
  return CryptoJS.AES.decrypt(enc, key, {
    iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7
  }).toString(CryptoJS.enc.Utf8);
}
function encryptBody(jsonStr) {
  const masterKey = "ajqfy63c7hrpb67f";
  const IV = "vpq8agq6zvwmddqj";
  const ts = String(Date.now());
  let randomKey = "";
  for (let i = 0; i < 16; i++) randomKey += Math.floor(Math.random() * 10);
  return JSON.stringify({
    abc: ts + aesEncryptToBase64(randomKey, masterKey, IV),
    qwe: aesEncryptToBase64(jsonStr, randomKey, IV),
  });
}
function decryptResponse(data) {
  const keysToTry = [
    ["ajqfy63c7hrpb67f", "vpq8agq6zvwmddqj"],
    ["1234567890abcdef", "0bNhv5FdTUcU3bYC"],
  ];
  for (const [key, iv] of keysToTry) {
    try {
      const randomKey = aesDecryptFromBase64(data.abc.slice(13), key, iv);
      if (!randomKey) continue;
      return JSON.parse(aesDecryptFromBase64(data.qwe, randomKey, iv));
    } catch (e) {}
  }
  throw new Error("Cannot decrypt response");
}
async function login(mobile, password) {
  const udid = "a1b2c3d4e5f6a7b8";
  const timestamp = String(Date.now());
  const headers = {
    "Content-Type": "application/json",
    appId: "MMLive",
    os: "1",
    "X-UDID": udid,
    "X-Timestamp": timestamp,
    versionTag: "Y",
    "N-L": "Y",
    "X-Language": "YN",
    "X-Sign": md5(udid + "jgyh,kasd" + timestamp),
    "X-AppVersion": "1.0.0",
    "P-G": "N",
    "P-AE": "1",
    "NEW-PK": "1",
    "TEST-FLAG": "0",
    "User-Agent": "MMLive/1.0.0 (Linux; Android 13; SM-G998B) okhttp/4.9.0",
  };
  const body = {
    appId: "MMLive", os: "1", udid, timestamp: Number(timestamp),
    channel: "", versionTag: "Y", language: "YN", token: "",
    paySign: md5(udid.slice(0, 6) + "8qiezi" + timestamp),
    sign: md5(udid + "jgyh,kasd" + timestamp),
    mobile, password, address: "unknow",
    city: "", province: "", softVersion: "1.0.0",
    model: "SM-G998B", version: "13", x: "", y: "",
  };
  const resp = await fetch(
    "https://gateway.mm-obtain.com/center-client/mm/sys/auth/app/2026/new/phone/login",
    { method: "POST", headers, body: encryptBody(JSON.stringify(body)) }
  );
  return decryptResponse(await resp.json());
}
// --- SỬ DỤNG ---
login("0708893821", "namnam123").then((data) => {
  console.log("Login success:", data);
  // => { code: 0, msg: "success", data: { token: "eyJ...", randomKey: "...", randomVector: "..." } }
  if (data.code === 0) {
    set_token("mmlive", data.data.token);
  }
}).catch(console.error);
</script>
</body>
</html>
