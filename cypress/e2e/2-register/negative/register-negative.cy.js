describe("Register - Negative Cases", () => {
  const baseUrl = "https://joint-sao.devditto.com";

  beforeEach(() => {
    cy.visit(`${baseUrl}/home`);
    cy.contains("เข้าใช้งานระบบ").click();
    cy.contains("สมัครสมาชิก").click();
    cy.url().should("include", "/register");
    cy.contains("สมัครสมาชิกด้วย ThaiID").click();

    cy.get('[data-testid="button-privacy-policy-text"]').click();

    cy.origin("https://imauthsbx.bora.dopa.go.th", () => {
      cy.contains("button", "ยืนยัน").should("be.visible").click();
    });

    cy.contains("label", "อัปโหลดรูป").click();
    cy.get('input[type="file"]').attachFile("janeeyeh_1748752324201.jpeg");
  });

  it("should not submit empty form", () => {
    cy.contains("button", "ยืนยัน").click();
    cy.contains("กรุณากรอกชื่อผู้ใช้งาน").should("exist");
  });

  it("should show error for invalid email format", () => {
    cy.get('input[name="email"]').type("not-an-email");
    cy.contains("button", "ยืนยัน").click();
    cy.contains("รูปแบบอีเมลไม่ถูกต้อง").should("exist");
  });

  it("should not allow mismatched passwords", () => {
    cy.get('input[name="password"]').type("Abc12345@++");
    cy.get('input[name="confirmPassword"]').type("WrongPassword123");

    cy.contains("button", "ยืนยัน").click();
    cy.contains("รหัสผ่านไม่ตรงกัน").should("exist");
  });

  it("should show error for duplicate username", () => {
    // ใช้ username ซ้ำที่เคยสมัครแล้ว
    cy.get('input[name="username"]').type("chatchawan");
    cy.get('input[name="password"]').type("Abc12345@++");
    cy.get('input[name="confirmPassword"]').type("Abc12345@++");

    cy.contains("button", "ยืนยัน").click();
    cy.contains("ชื่อผู้ใช้งานนี้ถูกใช้ไปแล้ว").should("exist");
  });
});
