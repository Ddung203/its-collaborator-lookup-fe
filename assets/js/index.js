const elemsShow = document.querySelectorAll(".show");
const searchBtn = document.querySelector("#form-button");
const msvInput = document.querySelector("#msv");
const resultContentBox = document.querySelector("#result-content-box");
const footer = document.querySelector("#footer");

if (resultContentBox.offsetHeight <= 100) {
  footer.style.marginTop = "350px";
} else {
  footer.style.marginTop = "130px";
}

searchBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const msv = msvInput.value.trim();

  if (msv.length === 0) {
    alert("Vui lòng nhập mã sinh viên");
    return;
  }

  // const urlApi = `http://localhost:8080/student/${msv}`;
  const urlApi = `https://its-collaborator-lookup-be.vercel.app/student/${msv}`;

  const response = await fetch(urlApi, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseData = await response.json();

  let htmlResult = [
    `<p class="result-content">
              Xin chào <span>${responseData?.data?.hoten}</span>,<br><br> Trong những ngày vừa qua, <span>IT Supporter</span> rất
              vui vì nhận được đơn ứng tuyển của bạn. Sau quá trình làm bài test và
              phỏng vấn, chúng mình đã có kết quả dành cho bạn.<br>Xin <span>CHÚC MỪNG</span> bạn đã
              trở thành một Cộng tác viên mới của Đội hỗ trợ kỹ thuật IT Supporter.<br><br>
            </p>
            <p class="show note" >Hướng dẫn cho việc tham gia buổi họp đầu tiên của bạn với Đội đã được gửi qua email của bạn!<br><br>Nếu bạn chưa nhận được email hoặc thay đổi email, vui lòng bấm 👉 <span class="resend" id="resend">Gửi lại</span>👈</p>
            `,
    `<p class="result-content">
              Xin chào <span>${responseData?.data?.hoten}</span>,<br><br>Trong những ngày vừa qua, <span>IT Supporter</span> rất vui vì nhận được đơn ứng tuyển của bạn.<br><br>Chúng mình rất tiếc phải thông báo rằng sau quá trình xem xét và đánh giá kỹ lưỡng, chúng mình nhận thấy có một số điểm bạn chưa phù hợp với yêu cầu của chúng mình. <br><br>Lưu ý rằng điều này không phản ánh sự đánh giá về năng lực của bạn, mà chỉ đơn giản là quyết định trong điều kiện hiện tại của chúng mình.<br><br>Chúng mình hy vọng bạn sẽ tiếp tục quan tâm đến các hoạt động trong tương lai của chúng mình.<br>Xin cảm ơn bạn một lần nữa và chúc bạn mọi điều tốt lành!
            </p>
            `,
    `Không tìm thấy thông tin!`,
  ];

  if (responseData?.data?.msv && responseData?.data?.status === "pass") {
    resultContentBox.innerHTML = htmlResult[0];

    const resendSpan = document.querySelector("#resend");
    resendSpan?.addEventListener("click", sendAnEmailAgain);
  } else if (responseData?.data?.msv && responseData?.data?.status === "fail") {
    resultContentBox.innerHTML = htmlResult[1];
  } else {
    alert(htmlResult[2]);
  }

  if (resultContentBox.offsetHeight <= 100) {
    footer.style.marginTop = "350px";
  } else {
    footer.style.marginTop = "130px";
  }
});

const sendAnEmailAgain = (e) => {
  e.preventDefault();

  window.location.href =
    "https://ddung203.github.io/its-collaborator-lookup-fe/assets/html/index2.html";
};
