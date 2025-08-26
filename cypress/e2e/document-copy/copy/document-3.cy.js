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

// อัพโหลด ยอดเงิน เข้าระบบ แบ file
describe("Document-Copy-FO", () => {
  it("ยื่นคำขอคัดสำเนา + อัปโหลดหลักฐานชำระค่าธรรมเนียม", () => {
    cy.viewport(1280, 720);

    cy.visit("https://jointsao.audit.go.th", {
      timeout: 30000,
      failOnStatusCode: false,
    });
    cy.wait(1000);

    cy.contains("a", "เข้าใช้งานระบบ").click();
    cy.url().should("include", "/login");
    cy.get('input[name="username"]').type("chatchawan");
    cy.get('input[name="password"]').type("System@001");
    cy.contains("button", "เข้าสู่ระบบ").click();

    cy.url().should("include", "/home");

    cy.wait(2000);

    cy.contains(".label", "บริการและค่าธรรมเนียม").trigger("mouseover");

    cy.contains(".label", "คัดสำเนาเอกสารและข้อมูล")
      .parents("a")
      .first()
      .click({ force: true });

    // รอหน้า load
    cy.url().should("include", "/document-copy");

    // // เปิดประวัติการคัดสำเนา
    cy.contains("a", "ประวัติการคัดสำเนา").should("be.visible").click();

    // // กดดูรายละเอียดรายการแรก
    cy.get('button[aria-label="ดูรายละเอียด"]')
      .first()
      .should("be.visible")
      .click();

    //อัปโหลดไฟล์หลักฐาน
    cy.get('input[type="file"]').should("exist").attachFile("uploadfile.jpg");

    // // กดบันทึกและยืนยัน
    cy.contains("button", "ส่งหลักฐานการชำระค่าธรรมเนียม")
      .should("be.visible")
      .click();
    cy.contains("button", "ยืนยัน").should("be.visible").click();
  });
});
