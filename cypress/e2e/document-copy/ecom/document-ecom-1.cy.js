// ข้าม fail test ถ้าเจอ React error #418, #423 หรือ #329
Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("Minified React error #418") ||
    err.message.includes("Minified React error #423") ||
    err.message.includes("Minified React error #329")
  ) {
    return false; // ไม่ให้ fail test
  }
  return true; // error อื่นยังให้ fail ปกติ
});

describe("Document-Copy-FO", () => {
  it("ยื่นคำขอคัดสำเนาเอกสาร พร้อม capture screenshot", () => {
    // ตั้งค่า viewport เป็น 1280x720 (สามารถเปลี่ยนค่าได้)
    // cy.viewport(1280, 720);
    // cy.wait(3000);

    // cy.visit("https://jointsao.audit.go.th/login/");
    // cy.get("body", { timeout: 30000 }).should("be.visible");
    // // cy.screenshot("01-login-page"); // capture หน้า login
    // cy.intercept("GET", "**/v1/auth/profile").as("getProfile");
    // // login
    // // รอให้ช่อง username พร้อม
    // cy.get('input[name="username"]', { timeout: 5000 })
    //   .should("be.visible")
    //   .type("chatchawan");

    // cy.get('input[name="password"]', { timeout: 5000 })
    //   .should("be.visible")
    //   .type("Abcd@12345++");
    // cy.contains("button", "เข้าสู่ระบบ").click();

    // // รอ profile load
    // cy.wait("@getProfile");
    // cy.wait(3000);

    cy.viewport(1280, 720);
    cy.wait(3000);

    cy.visit("https://jointsao.audit.go.th/login/");
    cy.get("body", { timeout: 30000 }).should("be.visible");
    cy.intercept("GET", "**/v1/auth/profile").as("getProfile");
    cy.wait(2000);
    // login
    cy.get('input[name="username"]', { timeout: 5000 }).type("chatchawan");
    cy.get('input[name="password"]', { timeout: 5000 }).type("Abcd@12345++");

    cy.contains("button", "เข้าสู่ระบบ").click();
    cy.wait(2000);
    // รอ profile load
    cy.wait("@getProfile");

    // hover menu → click submenu
    cy.contains(".label", "บริการและค่าธรรมเนียม").trigger("mouseover");
    cy.contains(".label", "คัดสำเนาเอกสารและข้อมูล")
      .parents("a")
      .first()
      .click({ force: true });

    // รอหน้า load
    cy.url().should("include", "/document-copy");
    cy.wait(3000);
    cy.contains("button", "เลือกรายการ").click();

    cy.get("div.MuiCard-root").contains("DOC006").click();
    cy.get("div.MuiCard-root").contains("DOC008").click();

    cy.contains("button", "รายการของฉัน").click();
    cy.wait(2000);
    // กรอกข้อมูลเอกสาร
    // cy.contains("label", "ไฟล์ที่อยู่อิเล็กทรอนิกส์").click();
    cy.contains("label", "ทางไปรษณีย์").click();
    cy.get("input.MuiSwitch-input").check({ force: true });
    // ส่งคำขอคัดสำเนา
    cy.contains("button", "ส่งคำขอคัดสำเนา").click();
    // cy.screenshot("08-submit-request"); // capture หลัง submit

    // ยืนยันการส่ง
    cy.contains("button", "ยืนยัน").click();
    // cy.screenshot("09-confirm-submit"); // capture หลัง confirm
  });
});
