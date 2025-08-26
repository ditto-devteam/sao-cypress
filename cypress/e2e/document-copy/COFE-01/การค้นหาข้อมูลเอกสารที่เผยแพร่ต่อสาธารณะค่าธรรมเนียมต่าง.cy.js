// =================== HANDLE REACT ERRORS ===================
Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("Minified React error #418") ||
    err.message.includes("Minified React error #423") ||
    err.message.includes("Minified React error #329")
  ) {
    return false; // ✅ ข้าม error ไม่ให้ test fail
  }
  return true;
});

describe("การค้นหาข้อมูล/เอกสารที่เผยแพร่ต่อสาธารณะ/ค่าธรรมเนียมต่าง ๆ", () => {
  beforeEach(() => {
    cy.viewport(1980, 1080);
    cy.visit("https://jointsao.audit.go.th", {
      timeout: 30000,
      failOnStatusCode: false,
    });
    login("chatchawan", "System@001");
  });

  // it("ค้นหาเอกสารคัดสำเนาและข้อมูล", () => {
  //   navigateToServiceMenu("บริการและค่าธรรมเนียม", "คัดสำเนาเอกสารและข้อมูล");
  //   // ค้นหาเอกสาร DOC073
  //   searchDocumentByNumber("DOC073");
  // });

  it("ค้นหาเอกสารชำระค่าธรรมเนียม", () => {
    navigateToServiceMenu("บริการและค่าธรรมเนียม", "ค่าธรรมเนียม");
    // ค้นหาเอกสาร DOC073
    cy.get('input[placeholder="ค้นหาชื่อค่าธรรมเนียม"]').type(
      "ค่าตรวจสอบบัญชี"
    );
  });

  // =================== FUNCTIONS ===================

  function login(username, password) {
    cy.log("function login");

    // ✅ รอให้ปุ่ม "เข้าใช้งานระบบ" ปรากฏ แล้วกด
    cy.contains("a", "เข้าใช้งานระบบ", { timeout: 10000 })
      .should("be.visible")
      .click();

    // ✅ กรอก username, password
    cy.get('input[name="username"]').should("be.visible").type(username);
    cy.get('input[name="password"]').should("be.visible").type(password);

    // ✅ คลิกปุ่มเข้าสู่ระบบ
    cy.contains("button", "เข้าสู่ระบบ").click();

    // ✅ ตรวจสอบว่าล็อกอินสำเร็จ
    cy.url().should("not.include", "/login");
  }

  function navigateToServiceMenu(mainMenu, subMenu) {
    cy.log(`function navigateToServiceMenu: ${mainMenu} > ${subMenu}`);

    // hover main menu
    cy.contains(".label", mainMenu).trigger("mouseover");

    // click submenu
    cy.contains(".label", subMenu).closest("a").click({ force: true });

    // optional: เช็ค url หลัง click
    const expectedPath = subMenuToUrl(subMenu);
    if (expectedPath) {
      cy.location("pathname", { timeout: 10000 }).should(
        "include",
        expectedPath
      );
    }
  }

  function subMenuToUrl(subMenu) {
    switch (subMenu) {
      case "คัดสำเนาเอกสารและข้อมูล":
        return "/document-copy";
      case "ค่าธรรมเนียม":
        return "/fee-payment";
      default:
        return "";
    }
  }

  function searchDocumentByNumber(docNumber) {
    cy.log("function searchDocumentByNumber");

    // กรอกเลขเอกสารใน input
    cy.get('input[placeholder="ใส่เลขที่สำเนาข้อมูล"]')
      .should("be.visible")
      .clear()
      .type(docNumber)
      .should("have.value", docNumber);

    cy.wait(2000);
    cy.captureStep(`ค้นหาข้อมูลเอกสาร: ${docNumber}`);
  }
});

// =================== CUSTOM COMMAND ===================
Cypress.Commands.add("captureStep", (message) => {
  cy.log("function captureStep");

  const filename = message.replace(/\s+/g, "_");

  // กำหนด folder สำหรับเก็บ screenshot
  const folder = "COFE-01"; // ต้องสร้างด้วย cy.task("createFolder") ก่อน

  const filepath = `${folder}/${filename}`;
  cy.screenshot(filepath);
  cy.log(`Captured step: ${message} → ${filepath}`);
});
