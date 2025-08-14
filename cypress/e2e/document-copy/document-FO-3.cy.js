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
    // เข้าสู่ระบบ FO
    cy.visit("https://jointsao.audit.go.th/login/");
    cy.get("body", { timeout: 20000 }).should("be.visible"); // รอ body โหลดก่อน
    cy.get('input[name="username"]', { timeout: 10000 }).type("chatchawan");
    cy.get('input[name="password"]', { timeout: 10000 }).type("Abcd@12345++");
    cy.contains("button", "เข้าสู่ระบบ").click();

    // เปิดเมนูบริการ
    cy.get(
      "button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-10ygcul"
    )
      .first()
      .should("be.visible")
      .click();

    cy.get("span.svg-color.MuiBox-root.css-1wps9mn")
      .should("be.visible")
      .click();

    // เข้าเมนูบริการและค่าธรรมเนียม → คัดสำเนาเอกสารและข้อมูล
    cy.contains("button, span", "บริการและค่าธรรมเนียม", { timeout: 10000 })
      .should("be.visible")
      .click();

    cy.contains("span.label", "คัดสำเนาเอกสารและข้อมูล")
      .should("be.visible")
      .click();

    // เปิดประวัติการคัดสำเนา
    cy.contains("a", "ประวัติการคัดสำเนา").should("be.visible").click();

    // กดดูรายละเอียดรายการแรก
    cy.get('button[aria-label="ดูรายละเอียด"]')
      .first()
      .should("be.visible")
      .click();

    // อัปโหลดไฟล์หลักฐาน
    cy.get('input[type="file"]').should("exist").attachFile("uploadfile.jpg"); // ไฟล์อยู่ใน /cypress/fixtures

    // กดบันทึกและยืนยัน
    cy.contains("button", "ส่งหลักฐานการชำระค่าธรรมเนียม")
      .should("be.visible")
      .click();

    cy.contains("button", "ยืนยัน").should("be.visible").click();
  });
});
