describe("Register Government agencies", () => {
  it("should navigate to the registration page", () => {
    // 1. ไปที่ URL ของหน้า dashboard
    cy.visit("https://sao.devditto.com/dashboard/");

    cy.contains("เข้าใช้งานระบบ").click();

    cy.contains("สมัครสมาชิก").click();

    cy.url().should("include", "/register"); // ตรวจสอบ URL ว่ามี '/register' หรือไม่

    cy.get("h3.MuiTypography-root").contains("หน่วยงานภาครัฐ").click();

    cy.wait(1000);

    // คลิกที่ปุ่มเพื่อเปิดกล่องเลือกไฟล์
    cy.get(
      "button.MuiButtonBase-root.MuiCardActionArea-root.css-ja9q1h"
    ).click(); // คลิกปุ่ม
    cy.wait(1000);


    // ข้อมูลผู้ใช้งาน
    cy.get('input[type="file"]').attachFile("images1.jpg");

    cy.wait(1000);

    cy.get("label").contains("ประเภทผู้ใช้งาน").should("be.visible");

    cy.get("label")
      .contains("ประเภทผู้ใช้งาน")
      .invoke("attr", "for")
      .then((inputId) => {
        // Escape ตัวอักษรพิเศษใน inputId และค้นหา element โดยใช้ id ที่ escape แล้ว
        const escapedId = inputId.replace(/:/g, "\\:"); // Escape ':' ใน inputId
        cy.get(`#${escapedId}`).click(); // คลิกที่ input ที่มี id ที่เชื่อมโยงกับ label
      });

    // รอให้ autocomplete dropdown ปรากฏ (ให้เวลารายการโหลด)
    cy.get(".MuiAutocomplete-listbox", { timeout: 10000 }).should("be.visible");

    // เลือกตัวเลือกที่ต้องการ "นาย"
    cy.get(".MuiAutocomplete-listbox").contains("เจ้าหน้าที่").click();

    cy.get('input[name="username"]').type("chatchawan");

    cy.get('input[name="password"]').type("Abc12345@++");

    cy.get('input[name="confirmPassword"]').type("Abc12345@++");

    // ตรวจสอบว่า label มีข้อความ "คำนำหน้าชื่อ" และ input ที่เกี่ยวข้องแสดงอยู่
    cy.get("label").contains("คำนำหน้าชื่อ").should("be.visible");
    // หาค่า input ที่เชื่อมโยงกับ label ที่มีข้อความ "คำนำหน้าชื่อ"
    cy.get("label")
      .contains("คำนำหน้าชื่อ")
      .invoke("attr", "for")
      .then((inputId) => {
        // Escape ตัวอักษรพิเศษใน inputId และค้นหา element โดยใช้ id ที่ escape แล้ว
        const escapedId = inputId.replace(/:/g, "\\:"); // Escape ':' ใน inputId
        cy.get(`#${escapedId}`).click(); // คลิกที่ input ที่มี id ที่เชื่อมโยงกับ label
      });

    // รอให้ autocomplete dropdown ปรากฏ (ให้เวลารายการโหลด)
    cy.get(".MuiAutocomplete-listbox", { timeout: 10000 }).should("be.visible");

    // เลือกตัวเลือกที่ต้องการ "นาย"
    cy.get(".MuiAutocomplete-listbox").contains("นาย").click();

    cy.wait(1000);

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

    cy.get('input[name="position"]').type("พลเรือเอก พิเศษสุดในพลเรือ");

    // คลิกที่ปุ่มเพื่อเปิดปฏิทิน
    cy.get('button[aria-label="Choose date"]').click();
    // รอให้ปฏิทินแสดงขึ้นมา
    cy.get(".MuiCalendarPicker-root").should("be.visible");
    cy.wait(1000);
    // คลิกที่ปุ่มที่มีวันที่ 6
    cy.get("button.MuiPickersDay-root")
      .contains("6") // ตรวจสอบว่าเป็นปุ่มที่มีข้อความ "6"
      .click(); // คลิกที่วันที่ 6

    cy.wait(1000);
    // ข้อมูลที่อยู่ตามบัตรประชาชน
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

    // องค์กร หน่วยงาน ข้อมูลหน่วยงาน
    cy.get('input[name="organizationName"]').type("บริษัท นายไท");
    cy.wait(1000);

    // organizationDepartment
    cy.get('input[name="organizationDepartment"]').type("กรมดี");
    cy.wait(1000);
    //ข้อมูลที่อยู่ตามบัตรประชาชน
    cy.get('input[name="organizationAddress"]').type("เกาะ");

    cy.wait(1000);
    // ข้อมูลหน่วยงาน
    cy.get('[data-cy="organizationProvince"] input').type("เชียงใหม่"); // พิมพ์ชื่อจังหวัด
    cy.get(".MuiAutocomplete-popper").click();
    cy.wait(1000);
    cy.get('[data-cy="organizationDistrict"] input').type("แม่แจ่ม"); // พิมพ์ชื่อจังหวัด
    cy.get(".MuiAutocomplete-popper").click();
    cy.wait(1000);
    cy.get('[data-cy="organizationSubDistrict"] input').type("ท่าผา"); // พิมพ์ชื่อจังหวัด
    cy.get(".MuiAutocomplete-popper").click();

    cy.wait(2000);

    cy.get('[data-cy="commanderPrefix"] input').type("นาย"); // คำนำหน้า
    cy.get(".MuiAutocomplete-popper").click();

    cy.wait(2000);
    cy.get('input[name="commanderFirstName"]').type("นาวาเอก ไท พิเศษรับจบ");

    cy.get('input[name="commanderLastName"]').type("นามกสุล นาวาเอกพิเศษ");

    cy.get('input[name="commanderPosition"]').type("นาวาเอกสุงสุดในกองทัพ ");

    cy.wait(2000);


    
    // ค้นหา input[type="file"] และแนบไฟล์ PDF ที่ต้องการอัพโหลด
    cy.get('input[type="file"]') // เลือก input file
      .attachFile("images1.jpg"); // อัพโหลดไฟล์ PDF จากโฟลเดอร์ fixtures

    cy.wait(5000);



    // cy.get('button.MuiButtonBase-root').click();
    cy.contains("อัพโหลดแบบฟอร์ม ลงทะเบียนเข้าใช้งานระบบลงนามแล้ว").click();

    cy.contains("นโยบายความเป็นส่วนตัว (Privacy Policy)").click();
    cy.wait(1000);

    // ตรวจสอบว่า dialog content แสดงอยู่
    cy.get(".MuiDialogContent-root").should("be.visible");
    cy.wait(1000);
    // คลิกที่ scrollable area (สมมุติว่ามีคลาสที่สามารถ scroll ได้ภายใน)
    cy.get(".MuiDialogContent-root .MuiPaper-root").click();
    cy.wait(1000);
    // เลื่อนสกอล์ไปยังล่างสุดของ scrollable area
    cy.get(".MuiDialogContent-root .MuiPaper-root").scrollTo("bottom");
    cy.wait(1000);
    cy.contains("ยอมรับเงื่อนไข").click();
    cy.wait(1000);

    cy.get('button[type="submit"]').contains("ยืนยัน").click();
    cy.wait(1000);

    cy.get(".MuiPaper-root.MuiDialog-paper").should("be.visible");
    cy.wait(2000);

    // คลิกปุ่ม "ยืนยัน" ภายใน Dialog
    // ใช้ find ค้นหาปุ๋มที่อยู่ภายใน Muipaper-root.MuiDialog-paper
    cy.get(".MuiPaper-root.MuiDialog-paper")
      .find(".MuiButton-root")
      .contains("ยืนยัน")
      .click();

    cy.wait(1000);
  });
});
