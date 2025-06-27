function generateRandomThaiID() {
  const digits = Array.from({ length: 12 }, () =>
    Math.floor(Math.random() * 10)
  );
  const sum = digits.reduce((acc, digit, i) => acc + digit * (13 - i), 0);
  const checkDigit = (11 - (sum % 11)) % 10;
  return digits.join("") + checkDigit;
}

describe("Register Government agencies", () => {
  it("should navigate to the registration page", () => {
    const random = Date.now().toString(); // เช่น "1687865212345"
    const baseUsername = `govuser_${random}`; // อาจยาวเกิน 20 ตัว
    const maxLength = 20;

    // ตัดให้ไม่เกิน 20 ตัวอักษร
    const username =
      baseUsername.length > maxLength
        ? baseUsername.slice(0, maxLength)
        : baseUsername;

    const user = {
      username: username,
      password: "Abc12345@++",
      firstName: "ชัชวาล",
      lastName: "ผาสุริวงศ์",
      phone: "023152222",
      mobile: "0988305939",
      email: `${username}@example.com`, // ใช้ username เดียวกันสร้าง email เพื่อไม่ให้ซ้ำ
      idCardNumber: generateRandomThaiID(),
      birthYear: "2532",
      position: "พันโท นาวา",
      address: "91/111",
      province: "สมุทรปราการ",
      district: "บางพลี",
      subDistrict: "บางปลา",
      organization: {
        name: "องค์กรชุดดำ",
        department: "กรมชุดดำ",
        address: "111/909",
      },
      commander: {
        prefix: "นาย",
        firstName: "ผู้บัญชาการทหาร",
        lastName: "นามกสุลทหาร",
        position: "ตำแหน่งพันโท",
      },
    };

    // === ขั้นตอนเริ่มต้น ===
    cy.visit("https://joint-sao.devditto.com/home/");
    cy.contains("เข้าใช้งานระบบ").click();
    cy.contains("สมัครสมาชิก").click();
    cy.url().should("include", "/register");
    cy.contains("สมัครสมาชิกด้วย ThaiID").click();

    cy.get('[data-testid="button-privacy-policy-text"]').click();

    cy.origin("https://imauthsbx.bora.dopa.go.th", () => {
      cy.contains("button", "ยืนยัน").should("be.visible").click();
    });

    // === ข้อมูลสมัครสมาชิก ===
    cy.contains("หน่วยงานภาครัฐ").click();
    cy.contains("label", "อัปโหลดรูป").click();
    cy.get('input[type="file"]').attachFile("janeeyeh_1748752324201.jpeg");

    cy.get('input[name="username"]').type(user.username);
    cy.get('input[name="password"]').type(user.password);
    cy.get('input[name="confirmPassword"]').type(user.password);

    cy.get('button[aria-label="Choose date"]').click();
    cy.get('button[aria-label*="switch to year view"]').click();
    cy.contains("button", user.birthYear).click();

    cy.get('[data-test="prefix"]').type("นาย");
    cy.get('ul[role="listbox"]').contains("นาย").click();
    cy.get('[data-test="prefix"]').should("have.value", "นาย");

    cy.get('input[name="firstName"]').type(user.firstName);
    cy.get('input[name="lastName"]').type(user.lastName);
    cy.get('input[name="phone"]').type(user.phone);
    cy.get('input[name="mobile"]').type(user.mobile);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="position"]').type(user.position);
    cy.get('input[name="idCardNumber"]').type(user.idCardNumber);

    cy.get('input[name="idCardAddress"]').type(user.address);
    cy.get('[data-cy="idCardProvince"] input').type(user.province);
    cy.get(".MuiAutocomplete-popper").click();
    cy.get('[data-cy="idCardDistrict"] input').type(user.district);
    cy.get(".MuiAutocomplete-popper").click();
    cy.get('[data-cy="idCardSubDistrict"] input').type(user.subDistrict);
    cy.get(".MuiAutocomplete-popper").click();

    cy.get(".PrivateSwitchBase-input.MuiSwitch-input").click();

    // === หน่วยงาน ===
    cy.get('input[name="organizationName"]').type(user.organization.name);
    cy.get('input[name="organizationDepartment"]').type(
      user.organization.department
    );
    cy.get('input[name="organizationAddress"]').type(user.organization.address);

    cy.get('[data-cy="organizationProvince"] input[role="combobox"]')
      .click()
      .type(user.province);
    cy.get('ul[role="listbox"]')
      .should("be.visible")
      .contains(user.province)
      .click();

    cy.get('[data-cy="organizationDistrict"] input[role="combobox"]')
      .click()
      .type(user.district);
    cy.get('ul[role="listbox"]')
      .should("be.visible")
      .contains(user.district)
      .click();

    cy.get('[data-cy="organizationSubDistrict"] input[role="combobox"]')
      .click()
      .type(user.subDistrict);
    cy.get('ul[role="listbox"]')
      .should("be.visible")
      .contains(user.subDistrict)
      .click();

    // === ผู้บังคับบัญชา ===
    cy.get('[data-cy="commanderPrefix"] input[role="combobox"]')
      .click()
      .type(user.commander.prefix);
    cy.get('ul[role="listbox"]')
      .should("be.visible")
      .contains(user.commander.prefix)
      .click();

    cy.get('input[name="commanderFirstName"]').type(user.commander.firstName);
    cy.get('input[name="commanderLastName"]').type(user.commander.lastName);
    cy.get('input[name="commanderPosition"]').type(user.commander.position);

    // === เงื่อนไข & ยืนยัน ===
    cy.contains("span", "นโยบายความเป็นส่วนตัว").click();
    cy.get(".MuiPaper-root.css-n1eh33").scrollTo("bottom", { duration: 1000 });
    cy.contains("button", "ยอมรับเงื่อนไข").should("not.be.disabled").click();

    // === อัปโหลดแบบฟอร์ม ===
    cy.wait(2000);

    // คลิกปุ่มเปิด input
    cy.contains(
      "button",
      "อัปโหลดแบบฟอร์ม ลงทะเบียนเข้าใช้งานระบบลงนาม"
    ).click();

    // แนบไฟล์ PDF ไปยัง input file
    cy.get('input[type="file"]').attachFile("register.pdf"); // จาก cypress/fixtures

    // คลิกปุ่ม "ยืนยัน" บนฟอร์มหลัก
    cy.contains("button", "ยืนยัน").click();

    // รอ Dialog Container และปุ่ม "ยืนยัน" บน dialog
    cy.get(".MuiDialog-container", { timeout: 10000 }).should("exist");
    cy.get(".MuiPaper-root.MuiDialog-paper")
      .should("be.visible")
      .find(".MuiButton-root")
      .contains("ยืนยัน")
      .click();
  });
});
