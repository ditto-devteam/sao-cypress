describe("Register Government agencies", () => {
  it("should navigate to the registration page", () => {
    // ประชาชนทั่วไป
    // 1. ไปที่ URL ของหน้า dashboard
    cy.visit("https://joint-sao.devditto.com/home/");

    cy.contains("เข้าใช้งานระบบ").click();

    cy.contains("สมัครสมาชิก").click();

    cy.url().should("include", "/register"); // ตรวจสอบ URL ว่ามี '/register' หรือไม่

    // เลือก สมัครสมาชิกด้วย ThaiID
    cy.contains("สมัครสมาชิกด้วย ThaiID").click();

    cy.wait(1000);
    // data-testid="button-privacy-policy-text"
    cy.get('[data-testid="button-privacy-policy-text"]').click();

    cy.wait(1000);

    cy.origin("https://imauthsbx.bora.dopa.go.th", () => {
      cy.contains("button", "ยืนยัน").should("be.visible").click();
    });

    cy.wait(1000);

    // กลับมาที่ website aso
    cy.contains("label", "อัปโหลดรูป").click();

    cy.wait(1000);

    // ข้อมูลผู้ใช้งาน
    cy.get('input[type="file"]').attachFile("janeeyeh_1748752324201.jpeg");

    cy.wait(1000);

    // เลือกภาคเอกชน
    cy.get('input[name="userType"][value="2"]').check({ force: true });

    // ชื่อผู้ใช้งาน
    cy.get('input[name="username"]').type("chatchawa001");
    // รหัสผ่าน
    cy.get('input[name="password"]').type("Abc12345@++");
    // ยินยันรหัสผ่าน
    cy.get('input[name="confirmPassword"]').type("Abc12345@++");

    // 1. เปิด dropdown เลือก คำนำหน้าชื่อ
    cy.get(".MuiAutocomplete-popupIndicator").first().click();
    cy.wait(1000);

    cy.contains("li", "นาย").click();
    cy.wait(1000);

    cy.get('input[name="firstName"]').type("ชัชวาล");
    cy.wait(1000);
    cy.get('input[name="lastName"]').type("ผาสุริวงศ์");
    cy.wait(1000);
    cy.get('input[name="phone"]').type("023152222");
    cy.wait(1000);
    cy.get('input[name="mobile"]').type("0988305939");
    cy.wait(1000);
    cy.get('input[name="email"]').type("chatchawan.pa@dittothailand.com");
    cy.wait(1000);
    cy.get('input[name="idCardNumber"]').type("7183866081304");
    cy.wait(1000);

    // // เพิ่มวันเกิด
    // 1. คลิกเปิด Date Picker
    cy.get('button[aria-label="Choose date"]').click();
    cy.wait(1000);
    cy.get('button[aria-label*="switch to year view"]').click();
    cy.wait(1000);
    // เลือกปี
    cy.contains("button", "2532").click();

    cy.wait(1000);

    // // // ข้อมูลที่อยู่ตามบัตรประชาชน
    cy.get('input[name="idCardAddress"]').type("91/111");
    cy.wait(1000);

    cy.get('[data-cy="idCardProvince"] input').type("สมุทรปราการ"); // พิมพ์ชื่อจังหวัด
    cy.get(".MuiAutocomplete-popper").click();

    cy.wait(1000);

    cy.get('[data-cy="idCardDistrict"] input').type("บางพลี"); // พิมพ์ชื่อบางพลี
    cy.get(".MuiAutocomplete-popper").click();

    cy.wait(1000);

    cy.get('[data-cy="idCardSubDistrict"] input').type("บางปลา"); // พิมพ์ชื่อบางปลา
    cy.get(".MuiAutocomplete-popper").click();

    // คลิกที่ checkbox เพื่อเปลี่ยนสถานะ ข้อมูลที่อยู่ที่สามารถติดต่อได้
    cy.get(".PrivateSwitchBase-input.MuiSwitch-input").click();
    cy.wait(1000);

    // องค์กร
    cy.get('input[name="organizationName"]').type("องค์การบริหารส่วนตำบล");

    cy.get('input[name="organizationDepartment"]').type("ฝ่ายแผนกบริหาร");

    cy.get('input[name="organizationPosition"]').type("ตำแหน้งบริหาร");

    //  กดที่ นโยบาย
    cy.contains("span", "นโยบายความเป็นส่วนตัว").click();
    cy.wait(2000);

    // Scroll container จนสุด
    cy.get(".MuiPaper-root.css-n1eh33") // หรือ selector ที่เหมาะกับกล่องข้อความ
      .scrollTo("bottom", { duration: 1000 });

    // รอให้ปุ่ม "ยินยอม" ถูกเปิดใช้งาน (ไม่ disabled)
    cy.contains("button", "ยอมรับเงื่อนไข")
      .should("not.be.disabled") // รอจนปุ่มพร้อม
      .click();

    cy.wait(3000);

    cy.contains("button", "ยืนยัน").click();

    cy.wait(3000);

    cy.get(".MuiPaper-root.MuiDialog-paper")
      .find(".MuiButton-root")
      .contains("ยืนยัน")
      .click();

    cy.wait(3000);
  });
});
