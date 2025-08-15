// ปิด fail test ถ้าเจอ React error #418, #423 หรือ #329
Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("Minified React error #418") ||
    err.message.includes("Minified React error #423") ||
    err.message.includes("Minified React error #329")
  ) {
    return false; // ข้าม error เหล่านี้
  }
  return true; // error อื่นให้ fail ปกติ
});

describe("Document-Copy-BO", () => {
  const loginEmail = "system01@email.com";
  const loginPassword = "System@001";
  const targetFirstName = "ชัชวาล";

  it("Document-Copy-BO", () => {
    cy.viewport(1280, 720);

    cy.visit("https://jointsao-backoffice.audit.go.th/login");
    // cy.screenshot("BO-01-login-page"); // capture หน้า login
    cy.wait(5000);
    // Login
    cy.get('input[name="email"]', { timeout: 10000 })
      .should("be.visible")
      .type(loginEmail);
    cy.get('input[name="password"]', { timeout: 10000 })
      .should("be.visible")
      .type(loginPassword);
    cy.contains("button", "Login").click();
    cy.wait(5000);

    cy.contains("ชำระค่าธรรมเนียม").click();
    cy.get('a[href="/010501/document-copy"]').should("be.visible").click();
    // หา row ของผู้ยื่น FO
    cy.get('div[role="row"]', { timeout: 10000 })
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

    cy.wait(2000);

    cy.get(
      'div[name="documentCopyRequestFileList.0.approveStatusId"] button[aria-label="Open"]',
      { timeout: 5000 }
    )
      .first()
      .click();

    cy.contains("li", "อนุมัติ", { timeout: 4000 }).click();
    // cy.screenshot("BO-07-filled-data"); // capture หลังกรอกข้อมูล
    cy.wait(1000);
    // เลือกธนาคาร
    cy.contains("label", "เลือกธนาคาร")
      .parent()
      .find('button[aria-label="Open"]', { timeout: 5000 })
      .click();
    cy.wait(500);
    cy.contains("li", "ธนาคารกรุงไทย").click();
    // cy.screenshot("BO-08-selected-bank"); // capture หลังเลือกธนาคาร

    // บันทึกและยืนยัน
    cy.contains("button", "บันทึกข้อมูล", { timeout: 5000 }).click();
    cy.contains("button", "ยืนยัน", { timeout: 5000 }).click();
    // cy.screenshot("BO-09-after-confirm"); // capture หลังยืนยัน
  });
});
