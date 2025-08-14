// ปิด fail test ถ้าเจอ React error #418 หรือ #423
Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("Minified React error #418") ||
    err.message.includes("Minified React error #423")
  ) {
    return false; // ข้าม error เหล่านี้
  }
  return true; // error อื่นให้ fail ปกติ
});

//  เอกชน
describe("Register private agencies", () => {
  it("Register", () => {
    // สมัครสมาชิก เก็บ user password ลง cypress.env
    cy.visit("https://jointsao-backoffice.audit.go.th/login");

    cy.get('input[name="email"]').type("system01@email.com");
    cy.get('input[name="password"]').type("System@001");
    cy.contains("button", "Login").click();

    // กดที่ เมนู
    cy.get("button.MuiIconButton-root").click();
    cy.wait(100);
    cy.get("button.MuiIconButton-root").first().click();
    // cy.wait(100);
    cy.contains("ข้อมูลผู้ใช้งาน").click();
    cy.wait(100);
    cy.contains("หน่วยงานของรัฐ (รอยืนยัน)").click();

    const targetFirstName = "ชัชวาล";

    cy.get('div[role="row"]') // เลือกทุกแถว
      .filter((index, row) => {
        const firstName = Cypress.$(row)
          .find('div[data-field="firstName"]')
          .text()
          .trim();
        return firstName === targetFirstName; // กรองเฉพาะแถวที่ firstName ตรงกัน
      })
      .first() // เลือกแถวแรกที่เจอ
      .within(() => {
        // หาและคลิกปุ่มแก้ไขที่มี aria-label="แก้ไขข้อมูล"
        cy.get('span[aria-label="แก้ไขข้อมูล"] > button').click();
      });

    cy.wait(500);

    cy.contains("button", "ยืนยัน").click();

    cy.get('div[role="dialog"]').within(() => {
      cy.contains("button", "ยืนยัน").click();
    });
    cy.wait(100);
    cy.contains("bitton", "บันทึก").click();
  });
});
