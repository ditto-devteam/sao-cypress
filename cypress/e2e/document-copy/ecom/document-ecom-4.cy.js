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
  const loginEmail = "system01@email.com";
  const loginPassword = "System@001";
  const targetFirstName = "ชัชวาล";
  const documentNames = Array.from(
    { length: 3 },
    (_, i) => `เอกสารโครงการก่อสร้าง ${String(i + 1).padStart(3, "0")}`
  );

  it("อนุมัติคำขอคัดสำเนาเอกสาร", () => {
    cy.viewport(1280, 720);

    // --- Login ---
    cy.visit("https://jointsao-backoffice.audit.go.th/login");
    cy.get('input[name="email"]').should("be.visible").type(loginEmail);
    cy.get('input[name="password"]').should("be.visible").type(loginPassword);
    cy.contains("button", "Login").click();
    cy.wait(2000);

    // --- เข้าหน้า Document-Copy ---
    cy.contains("ชำระค่าธรรมเนียม").click();
    cy.get('a[href="/010501/document-copy"]').should("be.visible").click();

    // --- เลือกแถวของผู้ยื่น ---
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

    // // อนุมัติคำขอ
    cy.contains("button", "อนุมัติ").should("be.visible").click();
    cy.wait(2000);
    cy.contains("button", "ยืนยันข้อมูล").should("be.visible").click();

    // // ยืนยัน dialog
    cy.get('div[role="dialog"]', { timeout: 5000 })
      .should("be.visible")
      .within(() => {
        cy.contains("button", "ยืนยัน")
          .should("be.visible")
          .click({ force: true });
      });
  });
});
