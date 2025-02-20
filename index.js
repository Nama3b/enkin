import schedule from "node-schedule";
import sendMessage from "./sendMessage.js";
import chamCong from "./chamCong.js";

// cài đặt ngày nghỉ ở đây
let dayExclude = [6, 0]; // theo thứ 0 -> 6 = chủ nhật -> thứ 7
let dateExclude = []; // theo ngày
// ------------------------

let isLoading;
let date;
let isChamCongDen;
let isChamCongVe;
let minuteStart;
let senderIdDefault = 6390925801033886;

schedule.scheduleJob("*/20 * * * * *", async function () {
  const dayCompare = new Date().getDay();
  const dateCompare = new Date().getDate();

  if (dayExclude.includes(dayCompare) || dateExclude.includes(dateCompare)) {
    return;
  }

  const dateNow = `${new Date().getDate()}-${
    new Date().getMonth() + 1
  }-${new Date().getFullYear()}`;

  if (!date || date !== dateNow) {
    date = dateNow;
    isLoading = false;
    isChamCongDen = false;
    isChamCongVe = false;
    minuteStart = Math.round(Math.random() * 19) + 1;
  } else {
    if (isLoading) {
      return;
    }
    const time = new Date();
    const hours = time.getHours();
    const minute = time.getMinutes();
    try {
      isLoading = true;
      if (hours === 8 && minute === minuteStart) {
        if (isChamCongDen) {
          return;
        }
        sendMessage(senderIdDefault, "Cham Cong Den");
        isChamCongDen = true;
        await chamCong("on");
        sendMessage(senderIdDefault, "Cham Cong Den Thanh Cong");
      }
      if ((hours >= 17 && minute >= 30) || hours > 17) {
        if (isChamCongVe) {
          return;
        }
        sendMessage(senderIdDefault, "Cham Cong Ve");
        isChamCongVe = true;
        await chamCong("off");
        sendMessage(senderIdDefault, "Cham Cong Ve Thanh Cong");
      }
    } catch (error) {
      sendMessage(senderIdDefault, "Cham Cong That Bai!!!");
    } finally {
      isLoading = false;
    }
  }
});
