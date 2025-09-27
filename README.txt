# 📖 คู่มือการใช้งานระบบจองห้อง (เชื่อม Google Sheets)

## 1️⃣ เตรียม Google Sheet
1. ไปที่ [Google Sheets](https://sheets.google.com) → สร้างไฟล์ใหม่
2. ตั้งชื่อ เช่น "การจองห้องประชุม"
3. แถวแรกใส่หัวตาราง:
วันที่บันทึก | ห้อง | วันที่ใช้ | เวลา | วัตถุประสงค์ | เจ้าหน้าที่โสต | ไมค์ลอย | จำนวนไมค์ | ผู้เข้าร่วม | ผู้ขอใช้ | ตำแหน่ง | คณะ/หน่วยงาน | เบอร์ | ผู้ควบคุม | หมายเหตุ

## 2️⃣ สร้าง Apps Script
1. ใน Google Sheets → เมนู **Extensions → Apps Script**
2. ลบโค้ดเดิม → วางโค้ดนี้:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.classroom || "",
    data.start_date || "",
    (data.start_time || "") + " - " + (data.end_time || ""),
    data.purpose || "",
    data.av || "",
    data.mic || "",
    data.mic_count || "",
    data.participants || "",
    data.requester || "",
    data.position || "",
    data.faculty || "",
    data.contact || "",
    data.controller || "",
    data.additional || ""
  ]);
  return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
}
```

3. กด **Deploy → New Deployment**
   - Deployment type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. กด Deploy → อนุญาตสิทธิ์ → คัดลอก URL ที่ได้

## 3️⃣ แก้ไฟล์ index.html
1. เปิดไฟล์ `index.html` ด้วยโปรแกรมแก้ไขข้อความ (VS Code, Notepad++)
2. ค้นหา:
```js
await fetch("YOUR_GOOGLE_SCRIPT_WEBAPP_URL", {
```
3. แทนที่ `"YOUR_GOOGLE_SCRIPT_WEBAPP_URL"` ด้วย URL ที่คัดลอกมาจากขั้นตอน Deploy

## 4️⃣ ทดสอบการทำงาน
1. เปิด `index.html` ในเบราว์เซอร์
2. กรอกข้อมูล → กด "ยืนยันการจอง"
3. ตรวจสอบ Google Sheets → ข้อมูลต้องถูกบันทึกเป็นแถวใหม่

## 5️⃣ นำไปออนไลน์
- **GitHub Pages** → อัปโหลดไฟล์ทั้งหมด → เปิด Settings → Pages → เลือก main / root
- **Netlify** → ลากโฟลเดอร์ทั้งหมดไปที่ [https://app.netlify.com/drop](https://app.netlify.com/drop)

## 6️⃣ หมายเหตุ
- ถ้าใช้ URL root (เช่น https://yourname.github.io/project/) จะโหลด `index.html` อัตโนมัติ
- ถ้าจะทดสอบเฉพาะเครื่อง ให้ดับเบิลคลิกไฟล์ `index.html` เปิดในเบราว์เซอร์ได้เลย
