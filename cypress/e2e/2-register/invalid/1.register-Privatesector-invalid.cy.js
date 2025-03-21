describe("Register Private sector", () => {
  it("should navigate to the registration page", () => {
    cy.visit("https://sao.devditto.com/dashboard/");

    cy.contains("เข้าใช้งานระบบ").click();
    cy.contains("สมัครสมาชิก").click();

    cy.url().should("include", "/register");

    cy.get('input[type="file"]').attachFile("images.jpg");

    cy.get('input[type="radio"][value="2"]').check();

    cy.get('input[name="username"]').type("chatchawan");
    cy.get('input[name="password"]').type("Abc12345@++");
    cy.get('input[name="confirmPassword"]').type("Abc12345@++");

    cy.get("label").contains("คำนำหน้าชื่อ").should("be.visible");
    cy.get("label")
      .contains("คำนำหน้าชื่อ")
      .invoke("attr", "for")
      .then((inputId) => {
        const escapedId = inputId.replace(/:/g, "\\:");
        cy.get(`#${escapedId}`).click();
      });

    cy.get(".MuiAutocomplete-listbox", { timeout: 10000 }).should("be.visible");
    cy.get(".MuiAutocomplete-listbox").contains("นาย").click();

    cy.wait(1000);
    cy.get('input[name="firstName"]').type("ชัชวาล");
    cy.get('input[name="lastName"]').type("ผาสุริวงศ์");
    cy.get('input[name="phone"]').type("023152222");
    cy.get('input[name="mobile"]').type("0988305939");
    cy.get('input[name="email"]').type("chatchawan.pasu@gmail.com");
    cy.get('input[name="idCardNumber"]').type("1119900144845");

    cy.get('button[aria-label="Choose date"]').click();
    cy.get(".MuiCalendarPicker-root").should("be.visible");

    cy.get("button.MuiPickersDay-root").contains("6").click();
    cy.get('input[name="idCardAddress"]').type("91/111 หมู่บ้าน the plant ซ 28");

    cy.get("label").contains("จังหวัด").should("be.visible");
    cy.get("label")
      .contains("จังหวัด")
      .invoke("attr", "for")
      .then((inputId) => {
        const escapedId = inputId.replace(/:/g, "\\:");
        cy.get(`#${escapedId}`).click();
      });

    cy.get(".MuiAutocomplete-listbox", { timeout: 10000 }).should("be.visible");
    cy.get(".MuiAutocomplete-listbox").contains("สมุทรปราการ").click();

    cy.wait(2000);

    cy.get("label").contains("อำเภอ").should("be.visible");
    cy.get("label")
      .contains("อำเภอ")
      .invoke("attr", "for")
      .then((inputId) => {
        const escapedId = inputId.replace(/:/g, "\\:");
        cy.get(`#${escapedId}`).click();
      });

    cy.get(".MuiAutocomplete-listbox", { timeout: 10000 }).should("be.visible");
    cy.get(".MuiAutocomplete-listbox").contains("บางพลี").click();

    cy.wait(2000);
    cy.get(".PrivateSwitchBase-input.MuiSwitch-input").click();
    cy.wait(2000);

    cy.get('input[name="organizationName"]').type("บริษัท นายไท จำกัดมหานะเธอ");

    cy.get('input[name="organizationDepartment"]').type("ฝ่าย เทคโน แผนก เทคนิค");
    cy.get('input[name="organizationPosition"]').type("ตำแหน่ง สายขิง");

    cy.contains("นโยบายความเป็นส่วนตัว (Privacy Policy)").click();

    cy.get(".MuiDialogContent-root").should("be.visible");
    cy.get(".MuiDialogContent-root .MuiPaper-root").click();
    cy.get(".MuiDialogContent-root .MuiPaper-root").scrollTo("bottom");

    cy.contains("ยอมรับเงื่อนไข").click();
    cy.wait(1000);
    cy.get('button[type="submit"]').contains("ยืนยัน").click();

    cy.get(".MuiPaper-root.MuiDialog-paper").should("be.visible");
    cy.wait(2000);
    cy.get(".MuiPaper-root.MuiDialog-paper")
      .find(".MuiButton-root")
      .contains("ยืนยัน")
      .click();
    cy.wait(1000);
  });
});
