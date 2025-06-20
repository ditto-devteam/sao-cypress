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

    cy.wait(2000);

    // กลับมาที่ website aso
    cy.contains("label", "อัปโหลดรูป").click();

    cy.wait(2000);

    // ข้อมูลผู้ใช้งาน
    cy.get('input[type="file"]').attachFile("images1.jpg");

    cy.wait(2000);

    // เลือกประเภทผู้ใช้งาน
    cy.get('input[name="userType"][value="1"]').check({ force: true });
    // ชื่อผู้ใช้งาน
    cy.get('input[name="username"]').type("chatchawan");
    // รหัสผ่าน
    cy.get('input[name="password"]').type("Abc12345@++");
    // ยินยันรหัสผ่าน
    cy.get('input[name="confirmPassword"]').type("Abc12345@++");

    // 1. เปิด dropdown เลือก คำนำหน้าชื่อ
    cy.get(".MuiAutocomplete-popupIndicator").first().click();

    cy.wait(2000);

    cy.contains("li", "นาย").click();
    cy.wait(2000);

    cy.get('input[name="firstName"]').type("ชัชวาล");
    cy.wait(1000);
    cy.get('input[name="lastName"]').type("ผาสุริวงศ์");
    cy.wait(1000);
    cy.get('input[name="phone"]').type("023152222");
    cy.wait(1000);
    cy.get('input[name="mobile"]').type("0988305939");
    cy.wait(1000);
    cy.get('input[name="email"]').type("chatchawan.pasu@gmail.com");
    cy.wait(1000);
    cy.get('input[name="idCardNumber"]').type("1119900144845");
    cy.wait(1000);

    // เพิ่มวันเกิด
    // 1. คลิกเปิด Date Picker
    cy.get('button[aria-label="Choose date"]').click();
    cy.wait(1000);
    cy.get('button[aria-label*="switch to year view"]').click();
    cy.wait(1000);
    // เลือกปี
    cy.contains("button", "2532").click();

    cy.wait(1000);

    // // ข้อมูลที่อยู่ตามบัตรประชาชน
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
    cy.wait(2000);

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
    // องค์กร หน่วยงาน ข้อมูลหน่วยงาน
    // cy.get('input[name="organizationName"]').type("บริษัท นายไท");
    // cy.wait(1000);

    // // organizationDepartment
    // cy.get('input[name="organizationDepartment"]').type("กรมดี");
    // cy.wait(1000);
    // //ข้อมูลที่อยู่ตามบัตรประชาชน
    // cy.get('input[name="organizationAddress"]').type("เกาะ");

    // cy.wait(1000);
    // // ข้อมูลหน่วยงาน
    // cy.get('[data-cy="organizationProvince"] input').type("เชียงใหม่"); // พิมพ์ชื่อจังหวัด
    // cy.get(".MuiAutocomplete-popper").click();
    // cy.wait(1000);
    // cy.get('[data-cy="organizationDistrict"] input').type("แม่แจ่ม"); // พิมพ์ชื่อจังหวัด
    // cy.get(".MuiAutocomplete-popper").click();
    // cy.wait(1000);
    // cy.get('[data-cy="organizationSubDistrict"] input').type("ท่าผา"); // พิมพ์ชื่อจังหวัด
    // cy.get(".MuiAutocomplete-popper").click();

    // cy.wait(2000);

    // cy.get('[data-cy="commanderPrefix"] input').type("นาย"); // คำนำหน้า
    // cy.get(".MuiAutocomplete-popper").click();

    // cy.wait(2000);
    // cy.get('input[name="commanderFirstName"]').type("นาวาเอก ไท พิเศษรับจบ");

    // cy.get('input[name="commanderLastName"]').type("นามกสุล นาวาเอกพิเศษ");

    // cy.get('input[name="commanderPosition"]').type("นาวาเอกสุงสุดในกองทัพ ");

    // cy.wait(2000);

    // ค้นหา input[type="file"] และแนบไฟล์ PDF ที่ต้องการอัพโหลด
    // cy.get('input[type="file"]') // เลือก input file
    //   .attachFile("images1.jpg"); // อัพโหลดไฟล์ PDF จากโฟลเดอร์ fixtures

    // cy.wait(5000);

    // // cy.get('button.MuiButtonBase-root').click();
    // cy.contains("อัพโหลดแบบฟอร์ม ลงทะเบียนเข้าใช้งานระบบลงนามแล้ว").click();

    // cy.contains("นโยบายความเป็นส่วนตัว (Privacy Policy)").click();
    // cy.wait(1000);

    // // ตรวจสอบว่า dialog content แสดงอยู่
    // cy.get(".MuiDialogContent-root").should("be.visible");
    // cy.wait(1000);
    // // คลิกที่ scrollable area (สมมุติว่ามีคลาสที่สามารถ scroll ได้ภายใน)
    // cy.get(".MuiDialogContent-root .MuiPaper-root").click();
    // cy.wait(1000);
    // // เลื่อนสกอล์ไปยังล่างสุดของ scrollable area
    // cy.get(".MuiDialogContent-root .MuiPaper-root").scrollTo("bottom");
    // cy.wait(1000);
    // cy.contains("ยอมรับเงื่อนไข").click();
    // cy.wait(1000);

    // cy.get('button[type="submit"]').contains("ยืนยัน").click();
    // cy.wait(1000);

    // cy.get(".MuiPaper-root.MuiDialog-paper").should("be.visible");
    // cy.wait(2000);

    // // // คลิกปุ่ม "ยืนยัน" ภายใน Dialog
    // // // ใช้ find ค้นหาปุ๋มที่อยู่ภายใน Muipaper-root.MuiDialog-paper
    // cy.get(".MuiPaper-root.MuiDialog-paper")
    //   .find(".MuiButton-root")
    //   .contains("ยืนยัน")
    //   .click();

    // cy.wait(30000);
  });
});
