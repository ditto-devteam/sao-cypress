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
    cy.visit("https://joint-sao.devditto.com/login/");
    cy.get("body", { timeout: 50000 }).should("be.visible");

    cy.get('input[name="username"]', { timeout: 30000 })
      .should("be.visible")
      .type("suwit01");
    cy.get('input[name="password"]', { timeout: 20000 })
      .should("be.visible")
      .type("System@001");
    cy.contains("button", "เข้าสู่ระบบ").click();

    // เปิดเมนูฝั่งซ้าย
    cy.get('button[type="button"]').first().click();

    // cy.contains("บริการและค่าธรรมเนียม", { timeout: 500 }).click();
    // cy.contains("คัดสำเนาเอกสารและข้อมูล").click();
  });
});
