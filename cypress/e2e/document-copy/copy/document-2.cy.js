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

// รอพิจารณา  เลือกสถานะ เลือกธนาคาร เลือกขนส่ง
describe("Document-Copy-BO", () => {
  const loginEmail = "system01@email.com";
  const loginPassword = "System@001";
  const targetFirstName = "ชัชวาล";

  it("Document-Copy-BO", () => {
    cy.visit("https://jointsao-backoffice.audit.go.th/login");

    // Login
    cy.get('input[name="email"]', { timeout: 10000 })
      .should("be.visible")
      .type(loginEmail);
    cy.get('input[name="password"]', { timeout: 10000 })
      .should("be.visible")
      .type(loginPassword);
    cy.contains("button", "Login").click();
    // cy.screenshot("BO-02-after-login"); // capture หลัง login

    cy.get(
      "button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-10ygcul"
    )
      .first()
      .should("be.visible")
      .click();

    cy.contains("ข้อมูลคัดสำเนาเอกสารและชำระค่าธรรมเนียม", {
      timeout: 500,
    }).click();

    cy.get('a[href="/010501/document-copy"]', { timeout: 10000 }).click();

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

    cy.wait(1000);

    // ข้อมูลเอกสาร 40 ชุด
    const documentsData = Array.from({ length: 40 }, (_, i) => ({
      name: `เอกสารตัวอย่าง ${i + 1}`, // ชื่อเอกสาร
      qty: `${Math.floor(Math.random() * 5) + 1}`, // จำนวนแบบสุ่ม 1-5
    }));

    documentsData.forEach((doc, index) => {
      cy.get(`input[name="documentCopyRequestFileList.${index}.pageTotal"]`)
        .should("be.visible")
        .type(doc.qty);

      cy.get(
        `div[name="documentCopyRequestFileList.${index}.documentTypeId"] button[aria-label="Open"]`
      )
        .first()
        .click();
      cy.contains("li", "เอกสารข้อมูลข่าวสารทั่วไป").click();

      cy.get(
        `input[name="documentCopyRequestFileList.${index}.pageTotalPrice"]`
      )
        .should("be.visible")
        .clear()
        .type(`${doc.qty * 10}`); // สมมติคิดราคาต่อหน้า 10

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

    // // เลือกธนาคาร
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
  });
});
