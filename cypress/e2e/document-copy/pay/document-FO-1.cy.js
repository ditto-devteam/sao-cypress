// ข้าม fail test ถ้าเจอ React error #418, #423 หรือ #329
Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("Minified React error #418") ||
    err.message.includes("Minified React error #423") ||
    err.message.includes("Minified React error #329")
  ) {
    return false; // ไม่ให้ fail test
  }
  return true; // error อื่นยังให้ fail ปกติ
});

describe("Pay-FO", () => {
  it("ยื่นคำขอคัดสำเนาเอกสาร พร้อม capture screenshot", () => {
    // ทดสอบระบบ UAT
    cy.visit("https://joint-sao.devditto.com/home/");
    cy.get("body", { timeout: 30000 }).should("be.visible");
    cy.screenshot("01-login-page"); // capture หน้า login

    cy.get('input[name="username"]', { timeout: 30000 })
      .should("be.visible")
      .type("chatchawan");
    cy.get('input[name="password"]', { timeout: 20000 })
      .should("be.visible")
      .type("Abcd@12345++");
    cy.contains("button", "เข้าสู่ระบบ").click();
    cy.screenshot("02-after-login"); // capture หลัง login

    cy.get(
      "button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-10ygcul"
    )
      .first()
      .click();
    cy.screenshot("03-open-service-menu"); // capture เมนูบริการเปิดแล้ว

    // เลือกเมนู "บริการและค่าธรรมเนียม"
    cy.contains("บริการและค่าธรรมเนียม").should("be.visible").click();
    cy.screenshot("04-select-service-fee"); // capture เลือกเมนูบริการและค่าธรรมเนียม

    // เลือกเมนูย่อย "คัดสำเนาเอกสารและข้อมูล"
    cy.contains("span.label", "คัดสำเนาเอกสารและข้อมูล")
      .should("be.visible")
      .click();
    cy.screenshot("05-select-document-copy"); // capture เลือกเมนูย่อย

    // สร้างใบคำขอด้วยตนเอง
    cy.contains("button", "สร้างใบคำขอด้วยตนเอง").click();
    cy.screenshot("06-create-request"); // capture หน้า form

    // กรอกข้อมูลเอกสาร
    cy.contains("label", "ไฟล์ที่อยู่อิเล็กทรอนิกส์").click();
    cy.get('input[name="documents[0].documentName"]')
      .should("be.visible")
      .type("ชื่อสำเนาเอกสาร");
    cy.get('input[name="documents[0].qty"]').should("be.visible").type("2");
    cy.screenshot("07-fill-document-info"); // capture หลังกรอกข้อมูล

    // ส่งคำขอคัดสำเนา
    cy.contains("button", "ส่งคำขอคัดสำเนา").click();
    cy.screenshot("08-submit-request"); // capture หลัง submit

    // ยืนยันการส่ง
    cy.contains("button", "ยืนยัน").click();
    cy.screenshot("09-confirm-submit"); // capture หลัง confirm
  });
});
