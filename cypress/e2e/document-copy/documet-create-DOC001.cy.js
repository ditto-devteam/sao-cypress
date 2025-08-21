import "cypress-file-upload";

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

describe("master data", () => {
  const loginEmail = "system01@email.com";
  const loginPassword = "System@001";

  const documentNames = Array.from(
    { length: 2 },
    (_, i) => `เอกสารโครงการก่อสร้าง ${String(i + 1).padStart(3, "0")}`
  );

  it("passes", () => {
    cy.viewport(1280, 720);

    // cy.visit("http://localhost:3031/", { timeout: 3000 });
    cy.visit("https://jointsao-backoffice.audit.go.th/login");

    // รอจนกว่า URL จะตรงกับหน้าที่เข้า
    cy.url({ timeout: 10000 }).should("include", "/login");
    // Login
    cy.get('input[name="email"]', { timeout: 10000 }).type(loginEmail);
    cy.get('input[name="password"]', { timeout: 10000 }).type(loginPassword);
    cy.contains("button", "Login").click();

    // cy.contains(
    //   "div.MuiListItemButton-root",
    //   "คัดสำเนาเอกสารและข้อมูล"
    // ).click();

    cy.contains(
      "div.MuiListItemButton-root",
      "ข้อมูลคัดสำเนาเอกสารและชำระค่าธรรมเนียม"
    ).click();

    cy.get('a[href="/010502/document-copy/info"]', { timeout: 10000 }).click();

    // cy.wait(3000);

    // Loop ข้อมูลเอกสาร
    documentNames.forEach((docName) => {
      cy.contains("button", "สร้างข้อมูล").click();

      cy.get("h4.MuiTypography-root.MuiTypography-h4")
        .should("have.text", "จัดการข้อมูลเอกสารคัดสำเนา")
        .and("be.visible");

      cy.contains("fieldset legend span", "ประเภทเอกสาร*")
        .parents(".MuiInputBase-root")
        .find('input[role="combobox"]')
        .click();

      cy.contains("li", "เอกสารข้อมูลข่าว").click();

      cy.get('input[name="nameTh"]', { timeout: 500 }).clear().type(docName);

      cy.get('textarea[name="detailTh"]', { timeout: 500 })
        .clear()
        .type("รายละเอียด " + docName);

      cy.get('input[type="file"]').attachFile("docinfo.jpg");

      cy.get('input[name="isPublish"]').click();
      cy.get('input[name="masterChecked"]', { timeout: 1000 }).click();

      cy.get('input[name="electronicPrice"]', { timeout: 2000 })
        .clear()
        .type(350);
      cy.get('input[name="postPrice"]', { timeout: 2000 }).clear().type(280);
      cy.get('input[name="selfPickupPrice"]', { timeout: 2000 })
        .clear()
        .type(30);

      // upload pdf
      cy.get("#uploadpdfsdoc input[type=file]")
        .first()
        .selectFile("cypress/fixtures/document.pdf", { force: true });
      cy.get("#uploadpdfspreview input[type=file]")
        .first()
        .selectFile("cypress/fixtures/document.pdf", { force: true });

      cy.contains("button", "ประทับคำร้องความถูกต้องของข้อมูล", {
        timeout: 2000,
      }).click();
      cy.wait(3000);
      cy.contains("button", "บันทึก", { timeout: 2000 }).click();
      cy.wait(3000);

      cy.get('a[href="/010502/document-copy/info"]').first().click();

      cy.get('[data-field="nameTh"][data-colindex="2"]')
        .first()
        .should("contain", docName);
    });
  });
});
