const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");
const spinBtn = document.getElementById("spin-btn");
const resultText = document.getElementById("result");
const prizesInput = document.getElementById("prizes");
const updateBtn = document.getElementById("update-btn");

let prizes = ["Bánh kem 🎂", "Gấu bông 🧸", "Tiền 💰", "Đồng hồ ⌚", "Nước hoa 🌸", "Voucher 🎟️"];

updateBtn.addEventListener("click", () => {
    let input = prizesInput.value.split(",").map(p => p.trim());
    if (input.length > 1) {
        prizes = input;
        drawWheel();
    }
});

function drawWheel() {
    let angle = (2 * Math.PI) / prizes.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    prizes.forEach((prize, i) => {
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.arc(250, 250, 250, i * angle, (i + 1) * angle);
        ctx.fillStyle = i % 2 === 0 ? "#ffcc00" : "#ff6600";
        ctx.fill();
        ctx.stroke();
        ctx.save();

        ctx.translate(250, 250);
        ctx.rotate(i * angle + angle / 2);
        ctx.fillStyle = "black";
        ctx.font = "16px Arial";
        ctx.fillText(prize, 100, 10);
        ctx.restore();
    });
}

let spinning = false;
let rotation = 0;
spinBtn.addEventListener("click", () => {
    if (spinning) return;
    spinning = true;
    
    let spinTime = Math.random() * 3000 + 3000;
    let finalAngle = Math.random() * 360 + 360 * 5;

    let start = Date.now();
    let interval = setInterval(() => {
        let progress = (Date.now() - start) / spinTime;
        if (progress >= 1) {
            clearInterval(interval);
            spinning = false;
            let resultIndex = Math.floor((360 - (rotation % 360)) / (360 / prizes.length));
            resultText.textContent = `🎉 Chúc mừng! Bạn nhận được: ${prizes[resultIndex]}`;
        } else {
            rotation += (finalAngle - rotation) * 0.1;
            canvas.style.transform = `rotate(${rotation}deg)`;
        }
    }, 20);
});

drawWheel();
