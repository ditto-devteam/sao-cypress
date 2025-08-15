import "cypress-file-upload";

// ข้าม React minified errors ที่ไม่ทำให้ test fail
Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("Minified React error #418") ||
    err.message.includes("Minified React error #423") ||
    err.message.includes("Minified React error #329")
  ) {
    return false;
  }
  return true;
});

describe("Document-Copy-FO", () => {
  it("ยื่นคำขอคัดสำเนา + อัปโหลดหลักฐานชำระค่าธรรมเนียม", () => {
    // // เข้าสู่ระบบ FO
    // cy.visit("https://jointsao.audit.go.th/login/");
    // cy.get("body", { timeout: 20000 }).should("be.visible"); // รอ body โหลดก่อน
    // cy.screenshot("FO-01-login-page"); // capture หน้า login

    // cy.get('input[name="username"]', { timeout: 10000 }).type("chatchawan");
    // cy.get('input[name="password"]', { timeout: 10000 }).type("Abcd@12345++");
    // cy.contains("button", "เข้าสู่ระบบ").click();
    // cy.screenshot("FO-02-after-login"); // capture หลัง login

    cy.visit("https://jointsao.audit.go.th/login/");
    cy.get("body", { timeout: 30000 }).should("be.visible");
    // cy.screenshot("FO-01-login-page"); // capture หน้า login

    cy.get('input[name="username"]', { timeout: 20000 })
      .should("be.visible")
      .type("chatchawan");
    cy.get('input[name="password"]', { timeout: 20000 })
      .should("be.visible")
      .type("Abcd@12345++");
    cy.contains("button", "เข้าสู่ระบบ").click();
    // cy.screenshot("FO-02-after-login"); // capture หลัง login

    // เปิดเมนูบริการ
    cy.get(
      "button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-10ygcul"
    )
      .first()
      .should("be.visible")
      .click();
    // cy.screenshot("FO-03-menu-opened"); // capture หลังเปิดเมนู

    cy.contains("บริการและค่าธรรมเนียม").should("be.visible").click();
    // cy.screenshot("FO-04-service-icon-clicked"); // capture หลังคลิก icon

    cy.contains("span.label", "คัดสำเนาเอกสารและข้อมูล")
      .should("be.visible")
      .click();
    // cy.screenshot("FO-06-copy-menu"); // capture หลังเลือกเมนูย่อย

    // เปิดประวัติการคัดสำเนา
    cy.contains("a", "ประวัติการคัดสำเนา").should("be.visible").click();
    // cy.screenshot("FO-07-history-page"); // capture หน้า history

    // กดดูรายละเอียดรายการแรก
    cy.get('button[aria-label="ดูรายละเอียด"]')
      .first()
      .should("be.visible")
      .click();
    // cy.screenshot("FO-08-view-detail"); // capture หน้า detail

    // อัปโหลดไฟล์หลักฐาน
    cy.get('input[type="file"]').should("exist").attachFile("uploadfile.jpg");
    // cy.screenshot("FO-09-file-upload"); // capture หลังเลือกไฟล์

    // กดบันทึกและยืนยัน
    cy.contains("button", "ส่งหลักฐานการชำระค่าธรรมเนียม")
      .should("be.visible")
      .click();
    cy.contains("button", "ยืนยัน").should("be.visible").click();
    // cy.screenshot("FO-10-confirm-submit"); // capture หลังยืนยัน
  });
});
