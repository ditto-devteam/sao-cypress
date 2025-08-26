// =================== HANDLE REACT ERRORS ===================
Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("Minified React error #418") ||
    err.message.includes("Minified React error #423") ||
    err.message.includes("Minified React error #329")
  ) {
    return false;
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

  it("การค้นหาข้อมูล/เอกสารที่เผยแพร่ต่อสาธารณะ/ค่าธรรมเนียมต่าง ๆ", () => {
    // navigateToDocumentCopyMenu();
    navigateToServiceMenu("บริการและค่าธรรมเนียม", "คัดสำเนาเอกสารและข้อมูล");

    searchDocumentByNumber("DOC073"); // ค้นหาเอกสาร

    navigateToServiceMenu("บริการและค่าธรรมเนียม", "ค่าธรรมเนียม");

  });

  // =================== FUNCTIONS ===================

  function login(username, password) {
    cy.log("function login");
    cy.wait(3000);
    cy.contains("เข้าใช้งานระบบ", { timeout: 2000 })
      .should("be.visible")
      .click();

    cy.get('input[name="username"]').type(username);
    cy.get('input[name="password"]').type(password);
    cy.contains("button", "เข้าสู่ระบบ").click();
    cy.url().should("not.include", "/login");
  }

//   function navigateToDocumentCopyMenu() {
//     cy.log("function navigateToDocumentCopyMenu");
//     cy.contains(".label", "บริการและค่าธรรมเนียม").trigger("mouseover");
//     cy.contains(".label", "คัดสำเนาเอกสารและข้อมูล")
//       .closest("a")
//       .click({ force: true });
//     cy.url().should("include", "/document-copy");
//   }
// });

function navigateToServiceMenu(mainMenu, subMenu) {
  cy.log(`function navigateToServiceMenu: ${mainMenu} > ${subMenu}`);
  
  // hover main menu
  cy.contains(".label", mainMenu).trigger("mouseover");

  // click submenu
  cy.contains(".label", subMenu)
    .closest("a")
    .click({ force: true });

  cy.url().should("include", subMenuToUrl(subMenu)); // optional: เช็ค url
}

// helper function mapping ชื่อ submenu -> path
function subMenuToUrl(subMenu) {
  switch (subMenu) {
    case "คัดสำเนาเอกสารและข้อมูล":
      return "/document-copy";
    case "ชำระค่าธรรมเนียม":
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
  cy.captureStep(`ขั้นตอนที่ 1 สามารถค้นหาข้อมูลเอกสารที่เผยแพร่ต่อสาธารณะได้`);
}

Cypress.Commands.add("captureStep", (message) => {
  cy.log("function captureStep");

  const filename = message.replace(/\s+/g, "_");

  // กำหนด folder ที่ต้องการเก็บ
  const folder = "COFE-01"; // folder ที่เราสร้างไว้ด้วย cy.task("createFolder")

  // path relative จาก cypress/screenshots
  const filepath = `${folder}/${filename}`;

  cy.screenshot(filepath);
  cy.log(`Captured step: ${message} → ${filepath}`);
});
