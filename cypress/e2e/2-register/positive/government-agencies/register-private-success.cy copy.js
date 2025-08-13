// ปิด fail test ถ้าเจอ React error #418 หรือ #423
Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("Minified React error #418") ||
    err.message.includes("Minified React error #423")
  ) {
    return false; // ข้าม error เหล่านี้
  }
  return true; // error อื่นให้ fail ปกติ
});

//  เอกชน
describe("Register private agencies", () => {
  it("should navigate to the registration page", () => {
    // เปิดหน้า Login
    cy.visit("https://jointsao.audit.go.th/login/");

    // คลิกปุ่ม/ลิงก์ สมัครสมาชิก
    cy.contains("สมัครสมาชิก").click();

    // ตรวจสอบว่า URL เปลี่ยนไปหน้า register (origin เดิม)
    cy.url().should("include", "/auth/thaid");

    // คลิกเลือกสมัครด้วย ThaID
    cy.contains("div", "สมัครสมาชิกด้วย ThaID").click();

    // กดปุ่มตกลง เพื่อไปหน้า QR code ที่ origin ใหม่
    cy.contains("button", "ตกลง").click();

    // --- ตรงนี้หยุดรอ manual scan QR code ก่อน ---
    cy.log("**กรุณาสแกน QR code ผ่านมือถือ แล้วระบบจะ redirect กลับมา**");
    cy.pause(); // หยุดให้คุณสแกนแล้วกด resume เอง

    // รอจนระบบ redirect กลับมาที่หน้า /register
    cy.url({ timeout: 120000 }).should("include", "/register");

    cy.contains("h3", "หน่วยงานของรัฐ").click({ force: true });

    // จากนั้นค่อยทำงานต่อ เช่น อัปโหลดรูป
    cy.contains("label", "อัปโหลดรูป")
      .find('input[type="file"]')
      .attachFile("janeeyeh_1748752324201.jpeg");

    cy.get('input[name="username"]').type("chatchawan");
    cy.get('input[name="password"]').type("Abcd@12345++");
    cy.get('input[name="confirmPassword"]').type("Abcd@12345++");

    // คลิกปุ่ม dropdown เพื่อเปิดรายการ
    cy.get("#\\:r1h\\:") // escape id พิเศษ
      .click({ force: true });

    // เลือกค่าที่ต้องการ เช่น "นาย"
    cy.contains("li", "นาย").click({ force: true });

    cy.get('input[name="mobile"]').type("0988305939");
    cy.get('input[name="email"]').type("chatchawan.pasu@gmail.com");
    cy.get('input[name="organizationPosition"]').type("ตำแหน่งทางการ");

    // // ที่อยู่ตามบัตรประชาชน
    cy.get('input[name="idCardAddress"]').type("91/111");
    // // กดปุ่ม dropdown เปิดรายการจังหวัด
    cy.get('div[name="idCardProvince"] button[aria-label="Open"]').click();
    // // รอให้รายการ dropdown แสดงขึ้นมา แล้วเลือกจังหวัด "สมุทรปราการ"
    cy.contains("li", "สมุทรปราการ").click();
    // // เลือก อำเภอ
    cy.get('div[name="idCardDistrict"] button[aria-label="Open"]').click();
    cy.contains("li", "บางพลี").click();
    // // เลือก ตำบล idCardSubDistrict
    cy.get('div[name="idCardSubDistrict"] button[aria-label="Open"]').click();
    cy.contains("li", "บางปลา").click();
    // // ข้อมูลที่อยู่ที่สามารถติดต่อได้
    cy.get(".MuiSwitch-input").click(); // toggle สวิตช์
    // ข้อมูลหน่วยงาน
    // พิมพ์ข้อความ "กลาโหม" ลงในช่อง
    cy.get("#\\:r2h\\:").type("กลาโหม", { delay: 100 });
    // เลือกรายการ "กลาโหม" จาก dropdown
    cy.contains("li", "กลาโหม").click();
    cy.get('input[name="organizationName"]').type("หน่วยงานพัฒนาระบบ");
    cy.get('input[name="organizationDepartment"]').type("หน่วยงานทดสอบ");
    cy.get('input[name="organizationAddress"]').type("แผนก");

    cy.get(
      'div[name="organizationProvince"] button[aria-label="Open"]'
    ).click();
    // // รอให้รายการ dropdown แสดงขึ้นมา แล้วเลือกจังหวัด "สมุทรปราการ"
    cy.contains("li", "สมุทรปราการ").click();
    // // เลือก อำเภอ
    cy.get(
      'div[name="organizationDistrict"] button[aria-label="Open"]'
    ).click();
    cy.contains("li", "บางพลี").click();
    // // เลือก ตำบล idCardSubDistrict
    cy.get(
      'div[name="organizationSubDistrict"] button[aria-label="Open"]'
    ).click();
    cy.contains("li", "บางปลา").click();

    cy.get('input[name="organizationPhoneNo"]').type("023122233");

    cy.get('input[name="organizationPhoneExt"]').type("11");
    cy.get('input[name="organizationMobileNo"]').type("023122233");

    // ข้อมูลผู้บังคับบัญชา
    // คลิกช่องคำนำหน้าชื่อ
    cy.get('[name="commanderPrefix"] input').click().type("นาย");

    // เลือก "นาย" จากรายการ
    cy.contains("li", "นาย").click();

    cy.get('input[name="commanderFirstName"]').type("นายชัชวาลบังคับ");

    cy.get('input[name="commanderLastName"]').type("นามสกุลบัญชา");
    cy.get('input[name="commanderPosition"]').type("ตำแหน่งผู้บังคับ");

    cy.get('input.PrivateSwitchBase-input[type="checkbox"]').check();
    cy.get("div.MuiPaper-root.css-n1eh33").scrollTo("bottom", {
      duration: 800,
    });

    cy.contains("button", "ยอมรับ").scrollIntoView().click();

    cy.contains("button", "ยืนยัน").click();

    cy.get("div.MuiDialogActions-root").contains("button", "ยืนยัน").click();
  });
});
