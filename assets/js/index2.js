const notificationBox = document.querySelector(".notification-container");
const submitSendmailBtn = document.querySelector("#submit-sendmai");

const hotenInput = document.getElementById("hoten");
const msvInput = document.getElementById("msv");
const lopInput = document.getElementById("lop");
const sdtInput = document.getElementById("sdt");
const emailInput = document.getElementById("email");

function showNotification() {
  notificationBox.style.right = "20px";

  setTimeout(() => {
    notificationBox.style.right = "-300px";
  }, 2000);
}

submitSendmailBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  submitSendmailBtn.disabled = true;
  setTimeout(() => {
    submitSendmailBtn.disabled = false;
  }, 2000);

  const data = {
    hoten: hotenInput.value,
    msv: msvInput.value,
    lop: lopInput.value,
    sdt: sdtInput.value,
    email: emailInput.value,
  };

  for (const property in data) {
    if (data[property].length === 0) {
      alert("Vui lòng nhập đủ thông tin!");
      return;
    }
  }

  // const urlApi = `http://localhost:8080/email`;
  const urlApi = `https://its-collaborator-lookup-be.vercel.app/email`;

  const response = await fetch(urlApi, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const responseData = await response.json();

  if (responseData.status === "success") showNotification();
  else {
    notificationBox.innerHTML = `<div class="notification">Không tìm thấy mã sinh viên!</div>`;
    showNotification();
  }
});
