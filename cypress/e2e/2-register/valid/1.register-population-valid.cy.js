describe("Register population", () => {
  it("should navigate to the registration page", () => {
    // 1. ไปที่ URL ของหน้า dashboard
    cy.visit("https://sao.devditto.com/dashboard/");

    // cy.wait(1000); // รอ 1 วินาที (1000 มิลลิวินาที)

    // 2. คลิกที่ปุ่ม 'เข้าใช้งานระบบ' หรือ 'Login'
    cy.contains("เข้าใช้งานระบบ").click();

    // cy.wait(1000); // รอ 1 วินาที (1000 มิลลิวินาที)

    // 3. รอให้มีการโหลดหน้า Login แล้วคลิกที่ 'สมัครสมาชิก'
    cy.contains("สมัครสมาชิก").click();

    // cy.wait(1000); // รอ 1 วินาที (1000 มิลลิวินาที)

    // 4. ตรวจสอบว่าอยู่ในหน้า 'สมัครสมาชิก' หรือหน้าใหม่
    cy.url().should("include", "/register"); // ตรวจสอบ URL ว่ามี '/register' หรือไม่

    // 5. ค้นหา input ที่เป็นประเภท file (สำหรับการอัพโหลดไฟล์)
    cy.get('input[type="file"]').attachFile("images.jpg");

    // cy.wait(1000);

    cy.get('input[type="radio"][value="1"]') // ค้นหา radio button ที่ value="1"
      .check(); // ทำการเลือก (ติ๊ก) radio button

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

    cy.get('input[name="idCardAddress"]').type(
      "91/111 หมู่บ้าน the plant ซ 28"
    );
    cy.wait(1000);

    cy.get("label").contains("จังหวัด").should("be.visible");
    cy.get("label")
      .contains("จังหวัด")
      .invoke("attr", "for")
      .then((inputId) => {
        // Escape ตัวอักษรพิเศษใน inputId และค้นหา element โดยใช้ id ที่ escape แล้ว
        const escapedId = inputId.replace(/:/g, "\\:"); // Escape ':' ใน inputId
        cy.get(`#${escapedId}`).click(); // คลิกที่ input ที่มี id ที่เชื่อมโยงกับ label
      });

    cy.get(".MuiAutocomplete-listbox", { timeout: 10000 }).should("be.visible");

    cy.get(".MuiAutocomplete-listbox").contains("สมุทรปราการ").click();

    cy.wait(2000);

    cy.get("label").contains("อำเภอ").should("be.visible");
    cy.get("label")
      .contains("อำเภอ")
      .invoke("attr", "for")
      .then((inputId) => {
        // Escape ตัวอักษรพิเศษใน inputId และค้นหา element โดยใช้ id ที่ escape แล้ว
        const escapedId = inputId.replace(/:/g, "\\:"); // Escape ':' ใน inputId
        cy.get(`#${escapedId}`).click(); // คลิกที่ input ที่มี id ที่เชื่อมโยงกับ label
      });

    cy.get(".MuiAutocomplete-listbox", { timeout: 10000 }).should("be.visible");

    cy.get(".MuiAutocomplete-listbox").contains("บางพลี").click();

    cy.wait(2000);

    cy.get("label").contains("ตำบล").should("be.visible");
    cy.get("label")
      .contains("ตำบล")
      .invoke("attr", "for")
      .then((inputId) => {
        // Escape ตัวอักษรพิเศษใน inputId และค้นหา element โดยใช้ id ที่ escape แล้ว
        const escapedId = inputId.replace(/:/g, "\\:"); // Escape ':' ใน inputId
        cy.get(`#${escapedId}`).click(); // คลิกที่ input ที่มี id ที่เชื่อมโยงกับ label
      });

    cy.get(".MuiAutocomplete-listbox", { timeout: 10000 }).should("be.visible");

    cy.get(".MuiAutocomplete-listbox").contains("บางปลา").click();

    cy.wait(2000);

    // คลิกที่ checkbox เพื่อเปลี่ยนสถานะ
    cy.get(".PrivateSwitchBase-input.MuiSwitch-input").click();
    cy.wait(1000);

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
