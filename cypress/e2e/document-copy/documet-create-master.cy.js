import "cypress-file-upload";

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

describe("master data", () => {
  const loginEmail = "system01@email.com";
  const loginPassword = "System@001";
  const targetFirstName = "ชัชวาล";

  it("Document-Copy-BO", () => {
    cy.viewport(1280, 720);
    cy.wait(3000);

    cy.visit("https://jointsao-backoffice.audit.go.th/login");

    // Login
    cy.get('input[name="email"]', { timeout: 10000 })
      .should("be.visible")
      .type(loginEmail);
    cy.get('input[name="password"]', { timeout: 10000 })
      .should("be.visible")
      .type(loginPassword);
    cy.contains("button", "Login").click();

    cy.contains(
      "div.MuiListItemButton-root",
      "ข้อมูลคัดสำเนาเอกสารและชำระค่าธรรมเนียม"
    ).click();

    cy.get('a[href="/010502/document-copy/info"]', { timeout: 10000 }).click();

    cy.wait(3000);

    cy.contains("button", "สร้างข้อมูล").click();

    // คลิกที่ combobox
    cy.contains("fieldset legend span", "ประเภทเอกสาร*")
      .parents(".MuiInputBase-root")
      .find('input[role="combobox"]')
      .click();

    // เลือก option "เอกสารทั่วไป"
    cy.contains("li", "เอกสารข้อมูลข่าว").click();

    cy.get('input[name="nameTh"]', { timeout: 500 }).type(
      "เอกสารประกอบงบประมาณ อบต"
    );
    cy.wait(2000);

    cy.get('textarea[name="detailTh"]', { timeout: 500 }).type(
      "รายละเอียด งบประมาณ อบต ของ สมุทรปราการ"
    );

    cy.get('input[type="file"]').attachFile("qrcode.png");

    cy.get('input[name="isPublish"]').click();

    cy.get('input[name="masterChecked"]', { timeout: 1000 }).click();

    cy.get('input[name="electronicPrice"]', { timeout: 2000 }).type(350);

    cy.get('input[name="postPrice"]', { timeout: 2000 }).type(280);

    cy.get('input[name="selfPickupPrice"]', { timeout: 2000 }).type(150);
    // คลิก trigger ถ้ามี (เช่นปุ่ม หรือข้อความ "ลากหรือเลือกไฟล์")
    cy.contains("h6", "ลากหรือเลือกไฟล์").click();

    // Attach file ไปยัง hidden input[type="file"]
    cy.get('input[type="file"]', { force: true }).attachFile("uploadfile.pdf");

    // ตรวจสอบว่าไฟล์ attach ถูกต้อง
    cy.get('input[type="file"]').then(($input) => {
      const file = $input[0].files[0];
      expect(file.name).to.eq("uploadfile.pdf"); // ตรวจสอบชื่อไฟล์
      expect(file.size).to.be.greaterThan(0); // ตรวจสอบไฟล์ไม่ว่าง
    });
  });
});
