describe("Register Government Agencies", () => {
  it("should navigate to the registration page", () => {
    const randomId = Math.floor(100000 + Math.random() * 900000); // 6 หลัก

    const user = {
      username: `user_${randomId}`,
      password: "Abc12345@++",
      firstName: "ชัชวาล",
      lastName: "ผาสุริวงศ์",
      phone: "023152222",
      mobile: "0988305939",
      email: `user_${randomId}@example.com`,
      idCardNumber: `7${Math.floor(
        100000000000 + Math.random() * 899999999999
      )}`, // สุ่ม 13 หลักขึ้นต้นด้วย 7
      birthYear: "2532",
      address: "91/111",
      province: "สมุทรปราการ",
      district: "บางพลี",
      subDistrict: "บางปลา",
      organizationName: "องค์การบริหารส่วนตำบล",
      department: "ฝ่ายแผนกบริหาร",
      position: "ตำแหน้งบริหาร",
    };

    // ที่เหลือใช้ user.username, user.email, user.idCardNumber ตามเดิมได้เลย
    cy.visit("https://joint-sao.devditto.com/home/");
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
    cy.get('input[name="userType"][value="2"]').check({ force: true });

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

    cy.get('input[name="organizationName"]').type(user.organizationName);
    cy.get('input[name="organizationDepartment"]').type(user.department);
    cy.get('input[name="organizationPosition"]').type(user.position);

    cy.contains("span", "นโยบายความเป็นส่วนตัว").click();
    cy.get(".MuiPaper-root.css-n1eh33").scrollTo("bottom", { duration: 1000 });

    cy.contains("button", "ยอมรับเงื่อนไข").should("not.be.disabled").click();

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
