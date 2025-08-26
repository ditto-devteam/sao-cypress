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

describe("การสร้างใบคำขอคัดสำเนาเอกสารและข้อมูลด้วยตนเอง", () => {
  const DOCUMENT_COUNT = 2;
  const documentsData = Array.from({ length: DOCUMENT_COUNT }, (_, i) => ({
    name: `การตรวจสอบ กระทรวงมหาดไทย ปีแบบที่ ${i + 1}`,
    qty: `${Math.floor(Math.random() * 5) + 1}`,
  }));

  beforeEach(() => {
    cy.task("createFolder", "COFE-02").then((result) => {
      if (result) {
        cy.log("เกิด error: " + result);
      } else {
        cy.log("สร้าง folder สำเร็จ");
      }
    });

    cy.viewport(1980, 1080);
    cy.visit("https://jointsao.audit.go.th", {
      timeout: 30000,
      failOnStatusCode: false,
    });
    login("chatchawan", "System@001");
  });

  it("การสร้างใบคำขอคัดสำเนาเอกสารและข้อมูลด้วยตนเอง", () => {
    navigateToDocumentCopyMenu();
    startManualRequest();
    selectDeliveryOption();
    fillDocumentsData();

    cy.get('input[name^="documents"][name$="documentName"]').should(
      "have.length",
      DOCUMENT_COUNT
    );
    // action ที่ทำให้เกิด request
    cy.get("button[type='submit']").click();

    cy.contains("button", "ยืนยัน").click();
    cy.wait(4000);
    cy.captureStep(
      "ขั้นตอนที่ 2 สามารถบันทึกใบคำขอคัดสำเนาเอกสารและข้อมูลด้วยตนเองได้"
    );
  });

  // =================== FUNCTIONS ===================

  // function login(username, password) {
  //   cy.log("function login");
  //   cy.wait(5000);
  //   cy.contains("เข้าใช้งานระบบ", { timeout: 2000 })
  //     .should("be.visible")
  //     .click();

  //   cy.get('input[name="username"]').type(username);
  //   cy.get('input[name="password"]').type(password);
  //   cy.contains("button", "เข้าสู่ระบบ").click();
  //   cy.url().should("not.include", "/login");
  //   // cy.captureStep("ล็อกอินสำเร็จ");
  // }
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

  function navigateToDocumentCopyMenu() {
    cy.log("function navigateToDocumentCopyMenu");
    cy.contains(".label", "บริการและค่าธรรมเนียม").trigger("mouseover");
    cy.contains(".label", "คัดสำเนาเอกสารและข้อมูล")
      .closest("a")
      .click({ force: true });
    cy.url().should("include", "/document-copy");
  }

  function startManualRequest() {
    cy.log("function startManualRequest");

    cy.wait(2000);
    cy.contains("button", "สร้างใบคำขอด้วยตนเอง").click();
    cy.captureStep(
      "ขั้นตอนที่ 1 สามารถแสดงหน้าจอสร้างใบคำขอคัดสำเนาเอกสารและข้อมูลด้วยตนเองได้"
    );
  }

  function selectDeliveryOption() {
    cy.log("function selectDeliveryOption");
    cy.contains("label", "ทางไปรษณีย์").click();
    cy.get("input.MuiSwitch-input").check({ force: true });
  }

  function fillDocumentsData() {
    cy.log("function fillDocumentsData");

    documentsData.forEach((doc, index) => {
      cy.get(`input[name="documents[${index}].documentName"]`)
        .should("be.visible")
        .type(doc.name)
        .should("have.value", doc.name);

      cy.get(`input[name="documents[${index}].qty"]`)
        .should("be.visible")
        .type(doc.qty)
        .should("have.value", doc.qty);

      if (index < documentsData.length - 1) {
        cy.contains("button", "เพิ่มคำขอ").click();
        cy.wait(200);
      }
    });
  }
});

Cypress.Commands.add("captureStep", (message) => {
  cy.log("function captureStep");

  const filename = message.replace(/\s+/g, "_");

  // กำหนด folder ที่ต้องการเก็บ
  const folder = "COFE-02"; // folder ที่เราสร้างไว้ด้วย cy.task("createFolder")

  // path relative จาก cypress/screenshots
  const filepath = `${folder}/${filename}`;

  cy.screenshot(filepath);
  cy.log(`Captured step: ${message} → ${filepath}`);
});
