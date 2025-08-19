// ปิด fail test ถ้าเจอ React minified errors
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

describe("Document-Copy-BO", () => {
  it("อนุมัติคำขอคัดสำเนาเอกสาร", () => {
    // เข้าสู่ระบบ Backoffice
    cy.wait(3000);
    cy.visit("https://jointsao-backoffice.audit.go.th/login");
    cy.get("body", { timeout: 20000 }).should("be.visible");
    cy.wait(3000);
    cy.get('input[name="email"]').type("system01@email.com");
    cy.get('input[name="password"]').type("System@001");
    cy.contains("button", "Login").click();
    cy.wait(2000);
    cy.get(
      "button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-10ygcul"
    )
      .first()
      .should("be.visible")
      .click();

    cy.contains("ข้อมูลคัดสำเนาเอกสารและชำระค่าธรรมเนียม", {
      timeout: 5000,
    }).click();

    cy.get('a[href="/010501/document-copy"]').should("be.visible").click();
    cy.wait(2000);
    // เลือกรายการตามชื่อผู้ขอ
    const targetFirstName = "ชัชวาล";
    cy.get('div[role="row"]')
      .filter((index, row) => {
        const firstName = Cypress.$(row)
          .find('div[data-field="I-requestFirstName"]')
          .text()
          .trim();
        return firstName === targetFirstName;
      })
      .first()
      .within(() => {
        cy.get('span[aria-label="แก้ไขข้อมูล"] button').click();
      });
    // cy.screenshot("BO-06-selected-request");
    cy.wait(2000);
    // อนุมัติคำขอ
    cy.contains("button", "อนุมัติ").should("be.visible").click();
    cy.contains("button", "ยืนยันข้อมูล").should("be.visible").click();
    // cy.screenshot("BO-07-after-approve");

    // ยืนยัน dialog
    cy.get('div[role="dialog"]', { timeout: 5000 })
      .should("be.visible")
      .within(() => {
        cy.contains("button", "ยืนยัน")
          .should("be.visible")
          .click({ force: true });
      });
    // cy.screenshot("BO-08-dialog-confirmed");
  });
});
