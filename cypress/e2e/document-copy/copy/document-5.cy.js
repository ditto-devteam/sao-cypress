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
// สร้างใบเสร็จรับเงิน

describe("Document-Copy-BO", () => {
  it("อนุมัติคำขอคัดสำเนาเอกสาร", () => {
    // เข้าสู่ระบบ Backoffice
    cy.wait(3000);
    cy.visit("https://jointsao-backoffice.audit.go.th/login");

    cy.get('input[name="email"]', { timeout: 10000 }).type(
      "system01@email.com"
    );
    cy.get('input[name="password"]').type("System@001");
    cy.contains("button", "Login").click();

    // เปิดเมนูหลัก
    cy.get(
      "button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-10ygcul"
    )
      .first()
      .should("be.visible")
      .click();

    cy.contains("ข้อมูลคัดสำเนาเอกสารและชำระค่าธรรมเนียม", {
      timeout: 5000,
    }).click();

    // เข้าไปยังหน้ารายการคัดสำเนา
    cy.get('a[href="/010501/document-copy"]').should("be.visible").click();

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
    cy.wait(2000);

    cy.contains("button", "สร้างใบเสร็จรับเงิน", { timeout: 300 }).click();
    cy.wait(2000);

    cy.contains("button", "ยืนยันข้อมูล").should("be.visible").click();

    cy.get('div[role="dialog"]', { timeout: 5000 })
      .should("be.visible")
      .within(() => {
        cy.contains("button", "ยืนยัน")
          .should("be.visible")
          .click({ force: true });
      });
  });
});
