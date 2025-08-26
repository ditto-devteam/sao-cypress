// ✅ ปิด fail test ถ้าเจอ React error #418, #423 หรือ #329
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

  // ✅ กำหนดจำนวนเอกสารที่ต้องการทดสอบ (ปรับตรงนี้พอ)
  const DOCUMENT_COUNT = 5;

  // // ✅ สร้างข้อมูลเอกสารตาม DOCUMENT_COUNT
  // const documentsData = Array.from({ length: DOCUMENT_COUNT }, (_, i) => ({
  //   name: `เอกสารตัวอย่าง ${i + 1}`, // ชื่อเอกสาร
  //   qty: `${Math.floor(Math.random() * 5) + 1}`, // จำนวนสุ่ม 1-5
  // }));

  // // ✅ สร้างข้อมูลตาม DOCUMENT_COUNT
  // const documentsData = Array.from({ length: DOCUMENT_COUNT }, (_, i) => ({
  //   name: `การตรวจสอบผลสัมฤทธิ์และประสิทธิภาพการดำเนินงาน การบริหารจัดการระบบรวบรวมและระบบบำบัดน้ำ ประจำปีงบประมาณ ${
  //     i + 1
  //   }`,
  //   qty: `${Math.floor(Math.random() * 5) + 1}`, // จำนวนสุ่ม 1-5
  // }));

  // ✅ สร้างข้อมูลตาม DOCUMENT_COUNT
  const documentsData = Array.from({ length: DOCUMENT_COUNT }, (_, i) => ({
    name: `การตรวจสอบดำเนินงานองค์การตลาด กระทรวงมหาดไทย ปีแบบที่ ${i + 1}`,
    qty: `${Math.floor(Math.random() * 5) + 1}`, // จำนวนสุ่ม 1-5
  }));

  it("Document-Copy-BO", () => {
    // ✅ Login
    cy.visit("https://jointsao-backoffice.audit.go.th/login");

    cy.get('input[name="email"]', { timeout: 10000 })
      .should("be.visible")
      .type(loginEmail);
    cy.get('input[name="password"]', { timeout: 10000 })
      .should("be.visible")
      .type(loginPassword);
    cy.contains("button", "Login").click();

    // ✅ เข้าเมนู Document-Copy
    cy.get(
      "button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-10ygcul"
    )
      .first()
      .should("be.visible")
      .click();

    cy.wait(2000);
    cy.contains("ข้อมูลคัดสำเนาเอกสารและชำระค่าธรรมเนียม", {
      timeout: 500,
    }).click();

    cy.get('a[href="/010501/document-copy"]', { timeout: 10000 }).click();

    // ✅ หา row ที่ชื่อ "ชัชวาล"
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

    // ✅ กรอกข้อมูลเอกสารตาม DOCUMENT_COUNT
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
        .type(`${doc.qty * 10}`); // สมมติราคาหน้าละ 10

      cy.get(
        `div[name="documentCopyRequestFileList.${index}.approveStatusId"] button[aria-label="Open"]`
      )
        .first()
        .click();
      cy.contains("li", "อนุมัติ").click();
    });

    // ✅ เลือกข้อมูลการจัดส่ง
    cy.get('[data-cy="shipping-company-input"]').click();
    cy.get("li").contains("ไปรษณีย์ไทย").click();
    cy.contains("span", "ด่วน (45 บาท)").click();

    // ✅ เลือกธนาคาร
    cy.contains("label", "เลือกธนาคาร")
      .parent()
      .find('button[aria-label="Open"]', { timeout: 5000 })
      .click();
    cy.contains("li", "ธนาคารกรุงไทย").click();

    cy.wait(900);

    // ✅ บันทึกและยืนยัน
    cy.contains("button", "บันทึกข้อมูล", { timeout: 5000 }).click();
    cy.wait(1000);
    cy.contains("button", "ยืนยัน", { timeout: 5000 }).click();
  });
});
