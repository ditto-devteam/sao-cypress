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
  const loginUsername = "chatchawan";
  const loginPassword = "Abcd@12345++";

  const documentNames = Array.from(
    { length: 3 },
    (_, i) => `เอกสารโครงการก่อสร้าง ${String(i + 1).padStart(3, "0")}`
  );

  it("ยื่นคำขอคัดสำเนาเอกสาร พร้อม capture screenshot", () => {
    cy.viewport(1280, 720);

    cy.visit("https://jointsao.audit.go.th", {
      timeout: 30000,
      failOnStatusCode: false,
    });
    cy.wait(2000);

    // Login
    cy.contains("a", "เข้าใช้งานระบบ").click();
    cy.url().should("include", "/login");
    cy.wait(2000);
    cy.get('input[name="username"]').type(loginUsername);
    cy.get('input[name="password"]').type(loginPassword);
    cy.contains("button", "เข้าสู่ระบบ").click();
    cy.url().should("include", "/home");

    // Hover menu → click submenu
    cy.contains(".label", "บริการและค่าธรรมเนียม").trigger("mouseover");
    cy.contains(".label", "คัดสำเนาเอกสารและข้อมูล")
      .parents("a")
      .first()
      .click({ force: true });
    cy.url().should("include", "/document-copy");

    cy.contains("button", "เลือกรายการ", { timeout: 5000 }).click();

    // เลือก document จาก list
    documentNames.forEach((docName) => {
      cy.contains("p", docName, { timeout: 10000 })
        .should("be.visible")
        .click({ force: true });
    });

    cy.contains("button", "รายการของฉัน").click();
    cy.wait(2000);

    cy.contains("p", "บันทึกข้อมูล").should("be.visible");

    // เลือก option ทางไปรษณีย์ + switch
    cy.contains("label", "ทางไปรษณีย์").click();
    cy.get("input.MuiSwitch-input").check({ force: true });

    // Intercept POST ก่อนกด submit
    cy.intercept("POST", "**/document/copy-requests/process").as(
      "submitRequest"
    );

    // กด submit
    cy.contains("button", "ส่งคำขอคัดสำเนา")
      .should("be.visible")
      .click({ force: true });

    // รอ modal ปรากฏ และกดยืนยัน
    cy.get('div[role="dialog"]', { timeout: 10000 })
      .should("be.visible")
      .contains("button", "ยืนยัน")
      .click({ force: true });

    // รอ URL redirect
    cy.url({ timeout: 10000 }).should("include", "/document-copy/request/");
  });
});
