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
  // const loginEmail = "system01@email.com";
  // const loginPassword = "System@001";
  // const targetFirstName = "ชัชวาล";

  const loginUsername = "chatchawan";
  const loginPassword = "Abcd@12345++";

  const documentNames = Array.from(
    { length: 3 },
    (_, i) => `เอกสารโครงการก่อสร้าง ${String(i + 1).padStart(3, "0")}`
  );

  it("ยื่นคำขอคัดสำเนา + อัปโหลดหลักฐานชำระค่าธรรมเนียม", () => {
    cy.viewport(1280, 720);

    cy.visit("https://jointsao.audit.go.th", {
      timeout: 30000,
      failOnStatusCode: false,
    });
    cy.wait(2000);

    // Login
    cy.contains("a", "เข้าใช้งานระบบ").click();
    cy.url().should("include", "/login");
    cy.wait(2000);
    cy.get('input[name="username"]').type(loginUsername);
    cy.get('input[name="password"]').type(loginPassword);
    cy.contains("button", "เข้าสู่ระบบ").click();
    cy.url().should("include", "/home");

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
