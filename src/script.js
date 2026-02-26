// ฟังก์ชันหลักสำหรับโหลดและรันโมเดล
async function setupModel() {
    const statusLabel = document.getElementById('status');
    const resultLabel = document.getElementById('result');

    try {
        statusLabel.innerText = "⏳ กำลังโหลดโมเดลจาก GitHub...";

        /**
         * สำคัญมาก: Path ต้องตรงกับโครงสร้างบน GitHub
         * หาก index.html อยู่ที่ root และ model.json อยู่ในโฟลเดอร์ model
         * ให้ใช้ path ว่า 'model/model.json'
         */
        const modelPath = 'model/model.json';
        
        // โหลดโมเดล (Layers Model)
        const model = await tf.loadLayersModel(modelPath);

        statusLabel.innerText = "✅ โหลดโมเดลสำเร็จแล้ว!";
        statusLabel.style.color = "green";

        // --- ตัวอย่างการทำ Prediction (ปลดคอมเมนต์เพื่อทดสอบ) ---
        /*
        const dummyInput = tf.tensor2d([1.0], [1, 1]); // ปรับตาม shape ของโมเดลคุณ
        const prediction = model.predict(dummyInput);
        const data = await prediction.data();
        resultLabel.innerText = "ผลลัพธ์การทดสอบ: " + data[0];
        */

    } catch (error) {
        statusLabel.innerText = "❌ เกิดข้อผิดพลาด!";
        statusLabel.style.color = "red";
        console.error("รายละเอียด Error:", error);
        
        // คำแนะนำเมื่อเกิด Error
        resultLabel.innerHTML = `
            <small style="color: gray;">
                คำแนะนำ: ตรวจสอบว่าไฟล์ <b>model/model.json</b> และไฟล์ <b>.bin</b> 
                อัปโหลดขึ้น GitHub ครบถ้วนแล้วหรือยัง?
            </small>
        `;
    }
}

// เริ่มการทำงานเมื่อหน้าเว็บโหลดเสร็จ
window.onload = setupModel;
