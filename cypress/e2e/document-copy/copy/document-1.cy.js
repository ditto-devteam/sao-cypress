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

// 1.สร้างเอกสาร  ยื่นคัดสำเนา
describe("Document-Copy-FO", () => {
  it("ยื่นคำขอคัดสำเนาเอกสาร พร้อม capture screenshot", () => {
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
    cy.wait(2000);
    // สร้างใบคำขอด้วยตนเอง
    cy.contains("button", "สร้างใบคำขอด้วยตนเอง").click();
    cy.wait(500);
    // กรอกข้อมูลเอกสาร
    cy.contains("label", "ทางไปรษณีย์").click();
    cy.get("input.MuiSwitch-input").check({ force: true });

    cy.get('input[name="documents[0].documentName"]')
      .should("be.visible")
      .type("ชื่อสำเนาเอกสาร");
    cy.get('input[name="documents[0].qty"]').should("be.visible").type("2");

    cy.wait(500);

    cy.contains("button", "เพิ่มคำขอ").click();

    cy.get('input[name="documents[1].documentName"]')
      .should("be.visible")
      .type("เอกสารประมาณงบ เพื่อทดสอบระบบ");
    cy.get('input[name="documents[1].qty"]').should("be.visible").type("5");

    cy.contains("button", "เพิ่มคำขอ").click();

    cy.get('input[name="documents[2].documentName"]')
      .should("be.visible")
      .type("เอกสารประมาณงบ หน่วยงาน อบต");
    cy.get('input[name="documents[2].qty"]').should("be.visible").type("4");

    cy.contains("button", "เพิ่มคำขอ").click();

    cy.get('input[name="documents[3].documentName"]')
      .should("be.visible")
      .type("เอกสารการวางก่อสร้าง หน่วยงาน อบต");
    cy.get('input[name="documents[3].qty"]').should("be.visible").type("4");

    // ส่งคำขอคัดสำเนา
    cy.contains("button", "ส่งคำขอคัดสำเนา").click();

    // ยืนยันการส่ง
    cy.contains("button", "ยืนยัน").click();
  });
});
