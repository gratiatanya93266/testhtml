document.getElementById("get_token").addEventListener("click", function () {
  get_token("mmlive");
});
document.getElementById("get_token_qq").addEventListener("click", function () {
  get_token("qqlive");
});
document.getElementById("relogin").addEventListener("click", function () {
  login();
});
document.getElementById("relogin_qq").addEventListener("click", function () {
  loginqq();
});
const QQ_UDID = 'bd60d97b3c6a61ed2066343985a9c8c8';
const QQ_SIGN = '3F88D94297996BC008A38C3D3766140A';
const QQ_TIMESTAMP = '1780077628981';

const KEY = CryptoJS.enc.Utf8.parse("ugxxmyfrbh9cgg2s");
const IV = CryptoJS.enc.Utf8.parse("a4cehrwwtew8pwty");
function decrypt(str, keyStr, ivStr) {
  let key = KEY;
  let iv = IV;

  // Nếu có khóa và IV được cung cấp, sử dụng chúng
  if (keyStr && ivStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
  }

  // Chuyển đổi chuỗi base64 thành dạng có thể giải mã
  let base64 = CryptoJS.enc.Base64.parse(str);
  let src = CryptoJS.enc.Base64.stringify(base64);

  // Giải mã
  var decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return CryptoJS.enc.Utf8.stringify(decrypt).toString(); // Trả về chuỗi đã giải mã
}
function decryptLast(par) {
  let qweKey = decrypt(par.abc.substring(13)); // Giải mã phần abc
  let decryptData = decrypt(par.qwe, qweKey, "a4cehrwwtew8pwty"); // Giải mã phần qwe

  if (isJSON(decryptData)) {
    decryptData = JSON.parse(decryptData); // Chuyển đổi thành đối tượng JSON nếu cần
  }
  return decryptData; // Trả về dữ liệu đã giải mã
}
function isJSON(str) {
  if (typeof str === "string") {
    try {
      var obj = JSON.parse(str);
      return typeof obj === "object" && obj !== null;
    } catch (e) {
      return false;
    }
  }
  return false;
}
function encrypt(str, keyStr, ivStr) {
  let key = KEY;
  let iv = IV;

  if (keyStr && ivStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
    iv = CryptoJS.enc.Utf8.parse(ivStr);
  }

  let srcs = CryptoJS.enc.Utf8.parse(str);
  let encrypt = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return CryptoJS.enc.Base64.stringify(encrypt.ciphertext);
}

// Hàm mã hóa cuối cùng
function encryptLast(data) {
  let num = suijione(true, false, false, 16);
  let encryptData = {
    abc: new Date().getTime() + encrypt(num),
    qwe: encrypt(JSON.stringify(data), num, "a4cehrwwtew8pwty"),
  };
  return encryptData;
}
function suijione(num, maxA, minlA, fqy) {
  let arr = [];
  let arr1 = [];
  let arr2 = [];
  if (num) {
    for (let m = 0; m <= 9; m++) {
      arr.push(m);
    }
  }
  if (maxA) {
    for (let m = 65; m <= 90; m++) {
      arr1.push(m);
    }
  }
  if (minlA) {
    for (let m = 97; m <= 122; m++) {
      arr2.push(m);
    }
  }
  if (!fqy) {
    console.log("生成位数必传");
  }
  let mergeArr = arr.concat(arr1);
  let mergeArr1 = mergeArr.concat(arr2);
  let _length = mergeArr1.length;
  let text = "";
  for (let m = 0; m < fqy; m++) {
    let text1 = "";
    let random = getRandom(0, _length);
    if (mergeArr1[random] <= 9) {
      text1 = mergeArr1[random];
    } else {
      text1 = String.fromCharCode(mergeArr1[random]);
    }
    text += text1;
  }
  return text;
}
function getRandom(a, b) {
  var max = a;
  var min = b;
  if (a < b) {
    max = b;
    min = a;
  }
  return parseInt(Math.random() * (max - min)) + min;
}
// Sử dụng hàm decryptLast để giải mã dữ liệu
function decryptL(par) {
  let data = localStorage.getItem("keyqq");

  let key = JSON.parse(data).randomKey;
  let iv = JSON.parse(data).randomVector;
  let decryptData = decrypt(par, key, iv);
  return decryptData;
}
function decryptString(encryptedString) {
  const key = "star@livega*963."; // Khóa giải mã
  const iv = "0608040307010502"; // Vector khởi tạo (IV)

  // Chuỗi đã mã hóa cần giải mã

  // Hàm giải mã
  function decrypt(encrypted, key, iv) {
    try {
      const parsedKey = CryptoJS.enc.Utf8.parse(key);
      const parsedIv = CryptoJS.enc.Utf8.parse(iv);
      const decrypted = CryptoJS.AES.decrypt(encrypted, parsedKey, {
        iv: parsedIv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });
      return decrypted.toString(CryptoJS.enc.Utf8);
    } catch (error) {
      console.error("Decryption failed:", error);
      return null;
    }
  }

  // Thực hiện giải mã
  return decrypt(encryptedString, key, iv);
}

////////////
function getlist() {
  const url =
    "https://gateway.mm-obtain.com/live-client/live/new/4231/1529/list";

  fetch(url, {
    method: "POST",
    headers: {
      "x-timestamp": 1722326222690,
      "x-udid": "4f20d7258366d7c7d1090af96474e260",
      "x-sign": "0d315027f868dd33df0f8640b3724437",
      Referer: "https://mm-live.online",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type: 1, uid: 2026328074 }),
  })
    .then((response) => response.json())
    .then((data) => {
      var html = ``;
      for (var i = 0; i < data.data.length; i++) {
        html += `<div class="live" liveId="${data.data[i].liveId}" type="${data.data[i].type}" liveStatus="${data.data[i].liveStatus}" anchorId="${data.data[i].anchorId}"><p>${data.data[i].nickname}</p><image style="width:120px;height:120px;object-fit: cover;" src="${data?.data[i].avatar}"/></div>`;
      }
      document.getElementById("list_idol").innerHTML = html;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function getlistqq() {
  const url =
    "https://gateway.qq-obtain.com/live-client/live/new/4231/1529/list";
  const ts = Date.now().toString();
  const sign = CryptoJS.MD5(QQ_UDID + 'jgyh,kasd' + ts).toString().toUpperCase();
  const body = encryptLast({ uid: 0, type: 1 });

  fetch(url, {
    method: "POST",
    headers: {
       'Content-Type': 'application/json',
        'x-timestamp': ts,
        'x-udid': QQ_UDID,
        'x-sign': sign,
        appid: 'QQlive',
        'p-ae': 'n',
    },
    body: JSON.stringify(body),
    referrerPolicy: 'no-referrer',
  })
    .then((response) => response.json())
    .then((data) => {
      const decryptedResult = decryptLast(data);
      console.log("Success:", decryptedResult);
      data = decryptedResult;
      var html = ``;
      for (var i = 0; i < data.data.length; i++) {
        html += `<div class="liveqq" liveId="${data.data[i].liveId}" type="${data.data[i].type}" liveStatus="${data.data[i].liveStatus}" anchorId="${data.data[i].anchorId}"><p>${data.data[i].nickname}</p><image style="width:120px;height:120px;object-fit: cover;" src="${data?.data[i].avatar}"/></div>`;
      }
      document.getElementById("list_idol_qqllive").innerHTML = html;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function getlistyy() {
  const url = "https://api.fnccdn.com/511/api/plr/zbliv/h5/v5/public/live/lives?pageNum=1&pageSize=200&labelId=1";
    //"https://api.fnccdn.com/511/api/live-service/h5/v5/public/live/lives?pageNum=1&pageSize=200&labelId=1";

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic d2ViLXBsYXllcjp3ZWJQbGF5ZXIyMDIyKjk2My4hQCM=`,
      "x-frame-options": "DENY",
      "x-content-type-option": "nosniff",
      "locale-language": "VIT",
      merchantid: "511",
      "dev-type": "H5",
      area: "VN",
      "Content-Type": "application/json",
      Referer: "https://ten-trang-web-cua-ban.com",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    body: JSON.stringify({
      pageNum: 1,
      pageSize: 100,
      labelId: 1,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      var html = ``;
      for (var i = 0; i < data.records.length; i++) {
        html += `<div class="liveyy" liveId="${data.records[i].id}" type="${data.records[i].payType}" liveStatus="${data.records[i].showType}" anchorId="${data.records[i].anchorId}"><p>${data.records[i].anchorNickname}</p><image style="width:120px;height:120px;object-fit: cover;" src="${data?.records[i].coverUrl}"/></div>`;
      }
      document.getElementById("list_idol_yyllive").innerHTML = html;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function getlist789() {
  const url =
    "https://api.fnccdn.com/560/api/plr/zbliv/h5/v5/public/live/lives?pageNum=1&pageSize=200&labelId=1";

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic d2ViLXBsYXllcjp3ZWJQbGF5ZXIyMDIyKjk2My4hQCM=`,
      "x-frame-options": "DENY",
      "x-content-type-option": "nosniff",
      "locale-language": "VIT",
      merchantid: "560",
      "dev-type": "H5",
      area: "VN",
      "Content-Type": "application/json",
      Referer: "https://ten-trang-web-cua-ban.com",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    body: JSON.stringify({
      pageNum: 1,
      pageSize: 100,
      labelId: 1,
    }), // Chuyển dữ liệu thành chuỗi JSON
  })
    .then((response) => response.json())
    .then((data) => {
      var html = ``;
      for (var i = 0; i < data.records.length; i++) {
        html += `<div class="live789" liveId="${data.records[i].id}" type="${data.records[i].payType}" liveStatus="${data.records[i].showType}" anchorId="${data.records[i].anchorId}"><p>${data.records[i].anchorNickname}</p><image style="width:120px;height:120px;object-fit: cover;" src="${data?.records[i].coverUrl}"/></div>`;
      }
      document.getElementById("list_idol_789live").innerHTML = html;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getlisthot51() {
  const url =
    "https://api.fnccdn.com/501/api/plr/zbliv/h5/v5/public/live/lives?pageNum=1&pageSize=200&labelId=1";

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic d2ViLXBsYXllcjp3ZWJQbGF5ZXIyMDIyKjk2My4hQCM=`,
      "x-frame-options": "DENY",
      "x-content-type-option": "nosniff",
      "locale-language": "VIT",
      merchantid: "501",
      "dev-type": "H5",
      area: "VN",
      "Content-Type": "application/json",
      Referer: "https://ten-trang-web-cua-ban.com",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    body: JSON.stringify({
      pageNum: 1,
      pageSize: 100,
      labelId: 1,
    }), // Chuyển dữ liệu thành chuỗi JSON
  })
    .then((response) => response.json())
    .then((data) => {
      var html = ``;
      for (var i = 0; i < data.records.length; i++) {
        html += `<div class="hot51" liveId="${data.records[i].id}" type="${data.records[i].payType}" liveStatus="${data.records[i].showType}" anchorId="${data.records[i].anchorId}"><p>${data.records[i].anchorNickname}</p><image style="width:120px;height:120px;object-fit: cover;" src="${data?.records[i].coverUrl}"/></div>`;
      }
      document.getElementById("list_idol_hot51").innerHTML = html;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function get_token(key) {

}
function set_token(key, token) {
  localStorage.setItem(key, JSON.stringify(token));
}
function login() {
  const url =
    "https://gateway.mm-obtain.com/center-client/mm/sys/auth/app/2026/new/phone/login";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      appId: "MMLive",
      os: 0,
      sign: "21c6066ff81e18305b5186108248e312",
      timestamp: 1722330828163,
      udid: "4f20d7258366d7c7d1090af96474e260",
      model: "IOS",
      password: "namnam123",
      version: "1.0.2",
      softVersion: "1.0.0",
      mobile: "0708893821",
    }), // Chuyển dữ liệu thành chuỗi JSON
  })
    .then((response) => response.json())
    .then((data) => {
      set_token("mmlive", data.data.token);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function loginqq() {
  const url =
    "https://gateway.qq-obtain.com/center-client/sys/auth/new/email/login";

  fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'X-UDID': QQ_UDID,
      'X-Timestamp': QQ_TIMESTAMP,
      'X-Sign': QQ_SIGN,
      appId: 'QQlive',
      os: '1',
      versionTag: 'Y',
      'N-L': 'Y',
      'X-Language': 'YN',
      'X-AppVersion': '2.6.0',
      'P-G': 'G',
      'P-AE': '1',
      'NEW-PK': '1',
      'TEST-FLAG': '0',
      'User-Agent': 'okhttp/4.9.3',
    },
    body: JSON.stringify({
      abc: '1780077628981EeUiWCwG4k61Etvei7wwAH4sccHb6qWfUySFUeUAJtY=',
      qwe: '3stteyeoSfIUH6pmmbaEr2KW2lDTAwy9JNbtnUs7fHbmBmG0yFcJxKpbTXDxOzx+7+c9haf5+sBA3YnvVgmuL0fPkGk5PcqyNv0Fw15I0/I0+DZ9r8fUNwGs+mdy1+DZBCGLy+BXwF+Ua74rwjILHYX457PF4t3l12zGHmabm30XtbZnqsB83sg7eup2critE7apTsMqObLsPJpc56zPvX6Jt4oCMRx61HyfLcpm44qcDL66kKGM/Jr373xN+dRE/j/xBbiFWsBpPmZU4orwTsqEhC4H6Wel7UtDWSCUXGD6pWXGv4ORCxr6yka7Ln9xnJRweLKXEHiP6W6HrPvICDP9cCHPskSDZgK3FfiOXw6dX7la5BKiPi7QvWlvKqNRJEKxufFdRWGKnF3px3Za16uptAWU8yRcOt2cw8KWrI9eUlPutIdwteVUDaasS7U6tRs+u80VFd4hUqHDr9LtGg8V99e58eT7TfEPKzoUrJS70WvxOxl5qU/cjTrZGYecJcy0PVsSmblUDl4K4j0geF9YkdoJkGbc4nxS+9LOFYsp/90n26hAKKV8hQXj7GmP7Z05169xANyjzviR/bSn9A==',
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const decryptedResult = decryptLast(data);
      localStorage.setItem('qqlive_token', JSON.stringify(decryptedResult.data?.token || decryptedResult.token;));
      localStorage.setItem('qqlive_key', JSON.stringify({
        randomKey: decryptedResult.data?.randomKey || decryptedResult.randomKey,
        randomVector: decryptedResult.data?.randomVector || decryptedResult.randomVector,
      }));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function addClickEventAfterDelay() {
  setTimeout(function () {
    var elements = document.getElementsByClassName("live");
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", function () {
        var liveId = this.getAttribute("liveId");
        var anchorId = this.getAttribute("anchorId");
        var liveStatus = this.getAttribute("liveStatus");
        var type = this.getAttribute("type");

        getLink(liveId, anchorId, liveStatus, type);
      });
    }
  }, 2000); // 2000ms = 2 giây
  setTimeout(function () {
    var elements = document.getElementsByClassName("liveqq");
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", function () {
        var liveId = this.getAttribute("liveId");
        var anchorId = this.getAttribute("anchorId");
        var liveStatus = this.getAttribute("liveStatus");
        var type = this.getAttribute("type");

        getLinkqq(liveId, anchorId, liveStatus, type);
      });
    }
  }, 2000); // 2000ms = 2 giây
  setTimeout(function () {
    var elements = document.getElementsByClassName("liveyy");
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", function () {
        var liveId = this.getAttribute("liveId");
        var anchorId = this.getAttribute("anchorId");
        var liveStatus = this.getAttribute("liveStatus");
        var type = this.getAttribute("type");

        getLinkyy(liveId, anchorId, liveStatus, type);
      });
    }
  }, 2000); // 2000ms = 2 giây
  setTimeout(function () {
    var elements = document.getElementsByClassName("live789");
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", function () {
        var liveId = this.getAttribute("liveId");
        var anchorId = this.getAttribute("anchorId");
        var liveStatus = this.getAttribute("liveStatus");
        var type = this.getAttribute("type");

        getLink789(liveId, anchorId, liveStatus, type);
      });
    }
  }, 2000); // 2000ms = 2 giây
  setTimeout(function () {
    var elements = document.getElementsByClassName("hot51");
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener("click", function () {
        var liveId = this.getAttribute("liveId");
        var anchorId = this.getAttribute("anchorId");
        var liveStatus = this.getAttribute("liveStatus");
        var type = this.getAttribute("type");

        getLinkHot51(liveId, anchorId, liveStatus, type);
      });
    }
  }, 2000); // 2000ms = 2 giây
}
function getLink(liveId, anchorId, liveStatus, type) {
  const url = "https://gateway.mm-obtain.com/live-client/live/inter/room/220";
  
  var token = localStorage.getItem("mmlive");
  token = token.replace(/"/g, "");

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `HSBox ${token}`,
      "x-timestamp": 1722326222690,
      "x-udid": "4f20d7258366d7c7d1090af96474e260",
      "x-sign": "0d315027f868dd33df0f8640b3724437",
      Referer: "https://mm-live.online",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      anchorId: Number(anchorId),
      liveId: Number(liveId),
      uid: 2026328074,
      adJumpUrl: "",
      liveStatus: Number(liveStatus),
      isRoomPreview: 0,
      type: type,
    }), // Chuyển dữ liệu thành chuỗi JSON
  })
    .then((response) => response.json())
    .then((data) => {
      var link = data.data.pullStreamUrl.replaceAll("rtmp", "webrtc");
      location.href = `/testhtml/video.html?link=${link}`;
    })
    .catch((error) => {
      alert(error);
    });
}
function getLinkqq(liveId, anchorId, liveStatus, type) {
  const url = "https://gateway.qq-obtain.com/live-client/live/inter/room/220";
  // Lấy token + key từ localStorage (hoặc login nếu chưa có)
  let token = JSON.parse(localStorage.getItem('qqlive_token') || 'null');
  let keys = JSON.parse(localStorage.getItem('qqlive_key') || '{}');
  let uid = localStorage.getItem('qqlive_uid') || '3024272496';

  if (!token) {
    token = await loginqq();
    keys = JSON.parse(localStorage.getItem('qqlive_key') || '{}');
    uid = localStorage.getItem('qqlive_uid') || '3024272496';
  }

  const ts = Date.now().toString();
  const sign = CryptoJS.MD5(QQ_UDID + 'jgyh,kasd' + ts).toString().toUpperCase();
  const paySign = CryptoJS.MD5(QQ_UDID.substring(0, 6) + '8qiezi' + ts).toString().toUpperCase();

  const body = encryptLast({
    appId: 'QQlive',
    udid: QQ_UDID,
    timestamp: Number(ts),
    token: token,
    sign: sign,
    channel: '',
    versionTag: 'Y',
    language: 'YN',
    'X-AppVersion': '2.6.0',
    'P-G': 'N',
    os: '1',
    paySign: paySign,
    anchorId: Number(anchorId),
    liveId: Number(liveId),
    uid: Number(uid),
    adJumpUrl: '',
    liveStatus: Number(liveStatus || 1),
    isRoomPreview: 0,
    type: type || '1',
  });

  fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      appId: 'QQlive',
      'X-UDID': QQ_UDID,
      'X-Timestamp': ts,
      'X-Sign': sign,
      'X-AppVersion': '2.6.0',
      versionTag: 'Y',
      'N-L': 'Y',
      'X-Language': 'YN',
      'P-G': 'N',
      'P-AE': '1',
      'NEW-PK': '1',
      OS: '1',
      Authorization: 'HSBox ' + token,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
    body: JSON.stringify(body),
    referrerPolicy: 'no-referrer',
  })
    .then((response) => response.json())
    .then((data) => {
      const decryptedResult = decryptLast(data);
      const url = decryptL(decryptedResult.data.pullStreamUrl);
      console.log("url", url);

      var link = url.replaceAll("rtmp", "webrtc");
      location.href = `/testhtml/video.html?link=${link}`;
    })
    .catch((error) => {
      alert(error);
    });
}

// function getLinkqq(liveId, anchorId, liveStatus, type) {
//   var token = localStorage.getItem("qqlive").replace(/"/g, "");
//   const keyqq = JSON.parse(localStorage.getItem("keyqq") || "{}");
//   const UDID = keyqq.udid || "05991a20be781bc01fd54e34a16021ed";
//   const TS = Date.now().toString();
//   const sign = CryptoJS.MD5(UDID + "jgyh,kasd" + TS).toString().toUpperCase();
//   const paySign = CryptoJS.MD5(UDID.substring(0,6) + "8qiezi" + TS).toString().toUpperCase();
//   const body = encryptLast({
//     appId: "QQlive", udid: UDID, timestamp: +TS, token: token,
//     sign: sign, channel: "", versionTag: "Y", language: "YN",
//     "X-AppVersion": "2.6.0", "P-G": "N", os: "1",
//     paySign: paySign,
//     anchorId: Number(anchorId), liveId: Number(liveId),
//     uid: Number(keyqq.uid || 2026328074), adJumpUrl: "",
//     liveStatus: Number(liveStatus), isRoomPreview: 0, type: type,
//   });
//   fetch("https://gateway.qq-obtain.com/live-client/live/inter/room/220", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "appId": "QQlive",
//       "X-UDID": UDID,
//       "X-Timestamp": TS,
//       "X-Sign": sign,
//       "X-AppVersion": "2.6.0",
//       "versionTag": "Y",
//       "N-L": "Y",
//       "X-Language": "YN",
//       "P-G": "N",
//       "P-AE": "1",
//       "NEW-PK": "1",
//       "TEST-FLAG": "0",
//       "os": "1",
//       "Authorization": "HSBox " + token,
//     },
//     body: JSON.stringify(body),
//   })
//     .then(r => r.json())
//     .then(data => {
//       const decryptedResult = decryptLast(data);
//       const roomData = decryptedResult.data || decryptedResult;
//       const url = decryptL(roomData.pullStreamUrl);
//       console.log("url", url);
//       var link = url.replaceAll("rtmp", "webrtc");
//       location.href = `/testhtml/video.html?link=${link}`;
//     })
//     .catch(error => alert(error));
// }

function getLinkyy(liveId, anchorId, liveStatus, type) {
  const url = "https://api.fnccdn.com/511/api/plr/zbliv/h5/v3/public/live/room-info";

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic d2ViLXBsYXllcjp3ZWJQbGF5ZXIyMDIyKjk2My4hQCM=`,
      "x-frame-options": "DENY",
      "x-content-type-option": "nosniff",
      "locale-language": "VIT",
      merchantid: "511",
      "dev-type": "H5",
      area: "VN",
      "Content-Type": "application/json",
      Referer: "https://ten-trang-web-cua-ban.com",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    body: JSON.stringify({
      anchorId: anchorId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      let link = decryptString(data.unlDefPa);
      console.log(link);
      location.href = `/testhtml/video.html?link=${link}`;
    })
    .catch((error) => {
      alert(error);
    });
}
function getLink789(liveId, anchorId, liveStatus, type) {
  const url = "https://api.fnccdn.com/560/api/plr/zbliv/h5/v3/public/live/room-info";

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic d2ViLXBsYXllcjp3ZWJQbGF5ZXIyMDIyKjk2My4hQCM=`,
      "x-frame-options": "DENY",
      "x-content-type-option": "nosniff",
      "locale-language": "VIT",
      merchantid: "560",
      "dev-type": "H5",
      area: "VN",
      "Content-Type": "application/json",
      Referer: "https://ten-trang-web-cua-ban.com",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    body: JSON.stringify({
      anchorId: anchorId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      let link = decryptString(data.unlDefPa);
      console.log(link);
      location.href = `/testhtml/video.html?link=${link}`;
    })
    .catch((error) => {
      alert(error);
    });
}
function getLinkHot51(liveId, anchorId, liveStatus, type) {
  const url = "https://api.fnccdn.com/501/api/plr/zbliv/h5/v3/public/live/room-info";

  fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic d2ViLXBsYXllcjp3ZWJQbGF5ZXIyMDIyKjk2My4hQCM=`,
      "x-frame-options": "DENY",
      "x-content-type-option": "nosniff",
      "locale-language": "VIT",
      merchantid: "501",
      "dev-type": "H5",
      area: "VN",
      "Content-Type": "application/json",
      Referer: "https://ten-trang-web-cua-ban.com",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
    body: JSON.stringify({
      anchorId: anchorId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      let link = decryptString(data.unlDefPa);
      console.log(link);
      location.href = `/testhtml/video.html?link=${link}`;
    })
    .catch((error) => {
      alert(error);
    });
}
document.addEventListener("DOMContentLoaded", function () {
  getlist();
  getlistqq();
  getlistyy();
  getlist789();
  getlisthot51();
  addClickEventAfterDelay();
});
