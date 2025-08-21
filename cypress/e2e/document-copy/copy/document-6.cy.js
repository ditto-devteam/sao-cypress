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
// กรอก รหัสขนส่ง
//  มันต้องอัพโหลดไฟล์ ด้วย
describe("Document-Copy-FO", () => {
  it("ยืนยันการบันทึกข้อมูลคัดสำเนา", () => {
    cy.wait(3000);
    // เข้า login page
    cy.visit("https://jointsao-backoffice.audit.go.th/login");

    // login
    cy.get('input[name="email"]', { timeout: 10000 }).type(
      "system01@email.com"
    );
    cy.get('input[name="password"]').type("System@001");
    cy.contains("button", "Login").click();

    // เปิดเมนู
    cy.get(
      "button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-10ygcul"
    )
      .first()
      .should("be.visible")
      .click();

    cy.contains("ข้อมูลคัดสำเนาเอกสารและชำระค่าธรรมเนียม", {
      timeout: 500,
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

    cy.get('input[placeholder="EX123456789TH"]').type("EX123456789TH");

    cy.contains("button", "บันทึกข้อมูลเสร็จสิ้น", { timeout: 400 }).click();

    // // กดปุ่ม "ยืนยัน" ภายใน dialog
    cy.get('div[role="dialog"]')
      .contains("button", "ยืนยัน")
      .should("be.visible")
      .click({ force: true });
    // cy.screenshot("BO-09-confirmed");
  });
});
