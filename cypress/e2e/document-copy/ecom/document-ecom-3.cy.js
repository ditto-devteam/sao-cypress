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
  const loginEmail = "system01@email.com";
  const loginPassword = "System@001";
  const targetFirstName = "ชัชวาล";

  it("ยื่นคำขอคัดสำเนา + อัปโหลดหลักฐานชำระค่าธรรมเนียม", () => {
    cy.viewport(1280, 720);

    cy.intercept("GET", "**/v1/auth/profile").as("getProfile"); // ตั้ง alias ก่อน visit
    cy.visit("https://jointsao.audit.go.th/login/");

    cy.get("body", { timeout: 30000 }).should("be.visible");

    // รอให้ฟอร์ม login แสดงก่อน
    cy.get('input[name="username"]', { timeout: 10000 })
      .should("be.visible")
      .type("chatchawan");

    cy.get('input[name="password"]', { timeout: 10000 })
      .should("be.visible")
      .type("Abcd@12345++");

    cy.contains("button", "เข้าสู่ระบบ").click();
    cy.wait(2000);
    // รอ profile load
    cy.wait("@getProfile");

    // hover menu → click submenu
    cy.contains(".label", "บริการและค่าธรรมเนียม").trigger("mouseover");
    cy.contains(".label", "คัดสำเนาเอกสารและข้อมูล")
      .parents("a")
      .first()
      .click({ force: true });

    // รอหน้า load
    cy.url().should("include", "/document-copy");

    cy.contains("a", "ประวัติการคัดสำเนา").should("be.visible").click();
    cy.wait(3000);
    // // กดดูรายละเอียดรายการแรก
    cy.get('button[aria-label="ดูรายละเอียด"]')
      .first()
      .should("be.visible")
      .click();
    cy.wait(2000);
    cy.get('input[type="file"]').should("exist").attachFile("uploadfile.jpg");

    // // // กดบันทึกและยืนยัน
    cy.contains("button", "ส่งหลักฐานการชำระค่าธรรมเนียม")
      .should("be.visible")
      .click();
    cy.contains("button", "ยืนยัน").should("be.visible").click();
  });
});
