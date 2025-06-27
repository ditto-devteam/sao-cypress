describe("Register Government agencies", () => {
  it("should navigate to the registration page", () => {
    const randomSuffix = Date.now(); // ใช้ timestamp เพื่อให้ unique
    const user = {
      username: `user_${randomSuffix}`,
      password: "Abc12345@++",
      firstName: "ชัชวาล",
      lastName: "ผาสุริวงศ์",
      phone: "023152222",
      mobile: "0988305939",
      email: `user_${randomSuffix}@mail.com`,
      idCardNumber: generateRandomThaiID(),
      address: "91/111",
      province: "สมุทรปราการ",
      district: "บางพลี",
      subDistrict: "บางปลา",
      birthYear: "2532",
    };

    cy.visit("https://joint-sao.devditto.com/home/");
    cy.contains("เข้าใช้งานระบบ").click();
    cy.contains("สมัครสมาชิก").click();
    cy.url().should("include", "/register");
    cy.contains("สมัครสมาชิกด้วย ThaiID").click();
    cy.wait(1000);

    cy.get('[data-testid="button-privacy-policy-text"]').click();
    cy.wait(1000);

    cy.origin("https://imauthsbx.bora.dopa.go.th", () => {
      cy.contains("button", "ยืนยัน").should("be.visible").click();
    });

    cy.wait(2000);
    cy.contains("label", "อัปโหลดรูป").click();
    cy.get('input[type="file"]').attachFile("janeeyeh_1748752324201.jpeg");

    cy.get('input[name="userType"][value="1"]').check({ force: true });
    cy.get('input[name="username"]').type(user.username);
    cy.get('input[name="password"]').type(user.password);
    cy.get('input[name="confirmPassword"]').type(user.password);

    cy.get(".MuiAutocomplete-popupIndicator").first().click();
    cy.contains("li", "นาย").click();

    cy.get('input[name="firstName"]').type(user.firstName);
    cy.get('input[name="lastName"]').type(user.lastName);
    cy.get('input[name="phone"]').type(user.phone);
    cy.get('input[name="mobile"]').type(user.mobile);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="idCardNumber"]').type(user.idCardNumber);

    cy.get('button[aria-label="Choose date"]').click();
    cy.get('button[aria-label*="switch to year view"]').click();
    cy.contains("button", user.birthYear).click();

    cy.get('input[name="idCardAddress"]').type(user.address);
    cy.get('[data-cy="idCardProvince"] input').type(user.province);
    cy.get(".MuiAutocomplete-popper").click();

    cy.get('[data-cy="idCardDistrict"] input').type(user.district);
    cy.get(".MuiAutocomplete-popper").click();

    cy.get('[data-cy="idCardSubDistrict"] input').type(user.subDistrict);
    cy.get(".MuiAutocomplete-popper").click();

    cy.get(".PrivateSwitchBase-input.MuiSwitch-input").click();

    cy.contains("span", "นโยบายความเป็นส่วนตัว").click();
    cy.get(".MuiPaper-root.css-n1eh33").scrollTo("bottom", { duration: 1000 });
    cy.contains("button", "ยอมรับเงื่อนไข").should("not.be.disabled").click();

    cy.contains("button", "ยืนยัน").click();

    cy.get(".MuiDialog-container", { timeout: 10000 }).should("exist");
    cy.get(".MuiPaper-root.MuiDialog-paper")
      .should("be.visible")
      .find(".MuiButton-root")
      .contains("ยืนยัน")
      .click();
  });
});

// ฟังก์ชันช่วยสุ่มเลขบัตรประชาชน (13 หลัก)
function generateRandomThaiID() {
  const digits = Array.from({ length: 12 }, () =>
    Math.floor(Math.random() * 10)
  );
  const sum = digits.reduce((acc, digit, i) => acc + digit * (13 - i), 0);
  const checkDigit = (11 - (sum % 11)) % 10;
  return digits.join("") + checkDigit;
}
