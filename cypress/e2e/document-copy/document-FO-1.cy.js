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
  it("ยื่นคำขอคัดสำเนาเอกสาร", () => {
    cy.visit("https://jointsao.audit.go.th/login/");
    cy.get("body", { timeout: 20000 }).should("be.visible"); // รอ body โหลดก่อน
    // Login
    cy.get('input[name="username"]', { timeout: 10000 }).type("chatchawan");
    cy.get('input[name="password"]', { timeout: 10000 }).type("Abcd@12345++");
    cy.contains("button", "เข้าสู่ระบบ").click();

    // เปิดเมนูบริการ
    cy.get(
      "button.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.css-10ygcul"
    )
      .should("be.visible")
      .click();
    cy.get("span.svg-color.MuiBox-root.css-1wps9mn")
      .should("be.visible")
      .click();

    // เลือกเมนู "บริการและค่าธรรมเนียม"
    cy.contains("บริการและค่าธรรมเนียม").should("be.visible").click();

    // เลือกเมนูย่อย "คัดสำเนาเอกสารและข้อมูล"
    cy.contains("span.label", "คัดสำเนาเอกสารและข้อมูล")
      .should("be.visible")
      .click();

    // สร้างใบคำขอด้วยตนเอง
    cy.contains("button", "สร้างใบคำขอด้วยตนเอง").click();

    // กรอกข้อมูลเอกสาร
    cy.contains("label", "ไฟล์ที่อยู่อิเล็กทรอนิกส์").click();
    cy.get('input[name="documents[0].documentName"]')
      .should("be.visible")
      .type("ชื่อสำเนาเอกสาร");
    cy.get('input[name="documents[0].qty"]').should("be.visible").type("2");

    // ส่งคำขอคัดสำเนา
    cy.contains("button", "ส่งคำขอคัดสำเนา").click();

    // ยืนยันการส่ง
    cy.contains("button", "ยืนยัน").click();
  });
});
