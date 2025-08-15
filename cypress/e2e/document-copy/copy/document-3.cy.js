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
    cy.viewport(1280, 720);

    cy.visit("https://jointsao.audit.go.th/login/");
    cy.get("body", { timeout: 30000 }).should("be.visible");
    cy.intercept("GET", "**/v1/auth/profile").as("getProfile");

    // login
    cy.get('input[name="username"]', { timeout: 1000 }).type("chatchawan");
    cy.get('input[name="password"]', { timeout: 1000 }).type("Abcd@12345++");
    cy.contains("button", "เข้าสู่ระบบ").click();

    // รอ profile load
    cy.wait("@getProfile");

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

    // // อัปโหลดไฟล์หลักฐาน
    cy.get('input[type="file"]').should("exist").attachFile("uploadfile.jpg");

    // // กดบันทึกและยืนยัน
    cy.contains("button", "ส่งหลักฐานการชำระค่าธรรมเนียม")
      .should("be.visible")
      .click();
    cy.contains("button", "ยืนยัน").should("be.visible").click();
  });
});
