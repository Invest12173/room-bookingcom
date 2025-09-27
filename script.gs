function doPost(e) {
  const sheet = SpreadsheetApp.openById("YOUR_SHEET_ID").getSheetByName("Form Responses 1");
  const data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.classroom || "",
    data.capacity || "",
    data.start_date || "",
    data.start_time || "",
    data.end_time || "",
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
    data.additional || "",
    ""
  ]);

  return ContentService.createTextOutput("บันทึกสำเร็จ");
}
