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
  const documentNames = Array.from(
    { length: 3 },
    (_, i) => `เอกสารโครงการก่อสร้าง ${String(i + 1).padStart(3, "0")}`
  );

  it("Document-Copy-BO", () => {
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

    // --- Loop เอกสารทั้งหมด ---
    documentNames.forEach((doc, index) => {
      cy.log(`กรอกข้อมูล: ${doc.name} (${doc.qty} หน้า)`);

      cy.get(
        `div[name="documentCopyRequestFileList.${index}.approveStatusId"] button[aria-label="Open"]`
      )
        .first()
        .click();
      cy.contains("li", "อนุมัติ").click();
    });

    // ต้องเลือกข้อมูลการจัดส่งเอกสารทางไปรษณีย์
    cy.get('[data-cy="shipping-company-input"]').click();

    // รอให้รายการ li ปรากฏ
    cy.get("li").contains("ไปรษณีย์ไทย").click();

    // คลิกเลือก radio button
    cy.contains("span", "ด่วน (45 บาท)").click();

    cy.contains("label", "เลือกธนาคาร")
      .parent()
      .find('button[aria-label="Open"]', { timeout: 5000 })
      .click();
    cy.contains("li", "ธนาคารกรุงไทย").click();
    cy.wait(900);
    // บันทึกและยืนยัน
    cy.contains("button", "บันทึกข้อมูล", { timeout: 5000 }).click();
    cy.wait(1000);
    cy.contains("button", "ยืนยัน", { timeout: 5000 }).click();

    // รอ alert ปรากฏ
    cy.get("div.MuiAlert-message", { timeout: 10000 })
      .should("be.visible") // ตรวจสอบว่า element ปรากฏ
      .and("contain.text", "บันทึกข้อมูลสำเร็จ"); // ตรวจสอบข้อความตรงกับที่ต้องการ
  });
});
