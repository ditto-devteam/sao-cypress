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

describe("survey", () => {
  const loginEmail = "system01@email.com";
  const loginPassword = "System@001";
  const targetFirstName = "ชัชวาล";

  it("survey-BO", () => {
    cy.viewport(1280, 720);
    cy.visit("https://jointsao-backoffice.audit.go.th/login");

    // Login
    cy.get('input[name="email"]', { timeout: 10000 })
      .should("be.visible")
      .type(loginEmail);
    cy.get('input[name="password"]', { timeout: 10000 })
      .should("be.visible")
      .type(loginPassword);
    cy.contains("button", "Login").click();

    cy.contains("ข้อมูลแบบสำรวจความคิดเห็น").click();
    cy.get('a[href="/010301/survey"]', { timeout: 10000 }).click();
    cy.wait(2000);

    cy.contains("button", "สร้างแบบสำรวจ").click();
    cy.wait(2000);

    // // 1. click เปิด dropdown
    // cy.get('div[role="combobox"]')
    //   .contains("กลุ่มแบบสำรวจ")
    //   .click({ force: true }); // force click เผื่อ MUI disable temporary

    // // 2. เลือก option ที่ต้องการ
    // cy.get('ul[role="listbox"] li') // MUI จะ render option เป็น li ใน ul
    //   .contains("แบบทดสอบวัดระดับความรู้")
    //   .click();
  });
});
