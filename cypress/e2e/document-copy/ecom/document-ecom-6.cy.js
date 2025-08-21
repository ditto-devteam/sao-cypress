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

describe("Document-Copy-FO", () => {
  const loginEmail = "system01@email.com";
  const loginPassword = "System@001";
  const targetFirstName = "ชัชวาล";
  const documentNames = Array.from(
    { length: 3 },
    (_, i) => `เอกสารโครงการก่อสร้าง ${String(i + 1).padStart(3, "0")}`
  );

  it("ยืนยันการบันทึกข้อมูลคัดสำเนา", () => {
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

    cy.wait(2000);
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

    cy.get('input[placeholder="EX123456789TH"]').type("EX555599001");

    cy.contains("button", "บันทึกข้อมูลเสร็จสิ้น").click();

    cy.get('div[role="dialog"]')
      .contains("button", "ยืนยัน")
      .should("be.visible")
      .click({ force: true });

    // รอ alert ปรากฏ
    // รอให้ snackbar ปรากฏ แล้วตรวจสอบข้อความ
    cy.get("div.MuiSnackbar-root div.MuiAlert-message", { timeout: 5000 })
      .should("be.visible")
      .and("contain.text", "บันทึกข้อมูลสำเร็จ");

    // cy.get("div.MuiAlert-message", { timeout: 10000 })
    //   .should("be.visible") // ตรวจสอบว่า element ปรากฏ
    //   .and("contain.text", "บันทึกข้อมูลสำเร็จ"); // ตรวจสอบข้อความตรงกับที่ต้องการ
  });
});
