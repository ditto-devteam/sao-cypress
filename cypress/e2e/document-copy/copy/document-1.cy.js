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

    cy.visit("https://jointsao.audit.go.th", {
      timeout: 30000,
      failOnStatusCode: false,
    });
    cy.wait(1000);

    cy.contains("a", "เข้าใช้งานระบบ").click();
    cy.url().should("include", "/login");
    cy.get('input[name="username"]').type("chatchawan");
    cy.get('input[name="password"]').type("Abcd@12345++");
    cy.contains("button", "เข้าสู่ระบบ").click();

    cy.url().should("include", "/home");
    cy.wait(2000);

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

    // ข้อมูลเอกสาร 40 ชุด
    const documentsData = Array.from({ length: 40 }, (_, i) => ({
      name: `เอกสารตัวอย่าง ${i + 1}`,
      qty: `${Math.floor(Math.random() * 5) + 1}`, // จำนวนแบบสุ่ม 1-5
    }));

    // กรอกข้อมูลเอกสารทั้งหมด
    documentsData.forEach((doc, index) => {
      cy.get(`input[name="documents[${index}].documentName"]`)
        .should("be.visible")
        .type(doc.name);

      cy.get(`input[name="documents[${index}].qty"]`)
        .should("be.visible")
        .type(doc.qty);

      // เพิ่มคำขอ ถ้าไม่ใช่รายการสุดท้าย
      if (index < documentsData.length - 1) {
        cy.contains("button", "เพิ่มคำขอ").click();
        cy.wait(200); // รอ UI update
      }
    });

    // ส่งคำขอคัดสำเนา
    cy.contains("button", "ส่งคำขอคัดสำเนา").click();

    // ยืนยันการส่ง
    cy.contains("button", "ยืนยัน").click();
  });
});
