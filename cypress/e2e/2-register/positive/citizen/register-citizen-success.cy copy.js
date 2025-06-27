describe("Register Government agencies", () => {
  it("should navigate to the registration page", () => {
    const user = {
      username: "chatchawan",
      password: "Abc12345@++",
      firstName: "ชัชวาล",
      lastName: "ผาสุริวงศ์",
      phone: "023152222",
      mobile: "0988305939",
      email: "chatchawan.pasu@gmail.com",
      idCardNumber: "1119900144845",
      address: "91/111",
      province: "สมุทรปราการ",
      district: "บางพลี",
      subDistrict: "บางปลา",
      birthYear: "2532",
    };

    // ไปที่หน้าแรก
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

    // กรอกข้อมูลผู้ใช้งาน
    cy.get('input[name="userType"][value="1"]').check({ force: true });
    cy.get('input[name="username"]').type(user.username);
    cy.get('input[name="password"]').type(user.password);
    cy.get('input[name="confirmPassword"]').type(user.password);

    // คำนำหน้า
    cy.get(".MuiAutocomplete-popupIndicator").first().click();
    cy.contains("li", "นาย").click();

    // ข้อมูลส่วนตัว
    cy.get('input[name="firstName"]').type(user.firstName);
    cy.get('input[name="lastName"]').type(user.lastName);
    cy.get('input[name="phone"]').type(user.phone);
    cy.get('input[name="mobile"]').type(user.mobile);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="idCardNumber"]').type(user.idCardNumber);

    // วันเกิด
    cy.get('button[aria-label="Choose date"]').click();
    cy.get('button[aria-label*="switch to year view"]').click();
    cy.contains("button", user.birthYear).click();

    // ที่อยู่ตามบัตร
    cy.get('input[name="idCardAddress"]').type(user.address);
    cy.get('[data-cy="idCardProvince"] input').type(user.province);
    cy.get(".MuiAutocomplete-popper").click();

    cy.get('[data-cy="idCardDistrict"] input').type(user.district);
    cy.get(".MuiAutocomplete-popper").click();

    cy.get('[data-cy="idCardSubDistrict"] input').type(user.subDistrict);
    cy.get(".MuiAutocomplete-popper").click();

    // เปิดสวิตช์เปลี่ยนที่อยู่ติดต่อ
    cy.get(".PrivateSwitchBase-input.MuiSwitch-input").click();

    // ยินยอมนโยบาย
    cy.contains("span", "นโยบายความเป็นส่วนตัว").click();
    cy.get(".MuiPaper-root.css-n1eh33").scrollTo("bottom", { duration: 1000 });
    cy.contains("button", "ยอมรับเงื่อนไข").should("not.be.disabled").click();

    // ยืนยันลงทะเบียน
    cy.contains("button", "ยืนยัน").click();
    cy.get(".MuiPaper-root.MuiDialog-paper")
      .find(".MuiButton-root")
      .contains("ยืนยัน")
      .click();
  });
});
