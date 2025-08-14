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
// ประชาชน
describe("Register population agencies", () => {
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

    // จากนั้นค่อยทำงานต่อ เช่น อัปโหลดรูป
    cy.contains("label", "อัปโหลดรูป")
      .find('input[type="file"]')
      .attachFile("janeeyeh_1748752324201.jpeg");

    cy.get('input[name="userTypeCode"][value="01"]').check({ force: true });

    // cy.get("label.MuiFormControlLabel-root").contains("ประชาชนทั่วไป").click();

    // cy.contains('label', 'ประชาชนทั่วไป').click();

    cy.get('input[name="username"]').type("chatchawan");
    cy.get('input[name="password"]').type("Abcd@12345++");
    cy.get('input[name="confirmPassword"]').type("Abcd@12345++");
    cy.get('input[name="mobile"]').type("0988305939");
    cy.get('input[name="email"]').type("chatchawan.pasu@gmail.com");
    // ที่อยู่ตามบัตรประชาชน
    cy.get('input[name="idCardAddress"]').type("91/111");
    // กดปุ่ม dropdown เปิดรายการจังหวัด
    cy.get('div[name="idCardProvince"] button[aria-label="Open"]').click();

    // รอให้รายการ dropdown แสดงขึ้นมา แล้วเลือกจังหวัด "สมุทรปราการ"
    cy.contains("li", "สมุทรปราการ").click();

    // เลือก อำเภอ
    cy.get('div[name="idCardDistrict"] button[aria-label="Open"]').click();
    cy.contains("li", "บางพลี").click();
    // เลือก ตำบล idCardSubDistrict
    cy.get('div[name="idCardSubDistrict"] button[aria-label="Open"]').click();
    cy.contains("li", "บางปลา").click();
    // ข้อมูลที่อยู่ที่สามารถติดต่อได้
    // cy.get('input[type="checkbox"]').check({ force: true });
    cy.get('input[type="checkbox"].MuiSwitch-input').check({ force: true });
    // ยิมยอม
    cy.get('input.PrivateSwitchBase-input[type="checkbox"]').check();
    // เลื่อนลงสุดของเนื้อหานโยบาย
    cy.get("div.MuiPaper-root.css-n1eh33").scrollTo("bottom", {
      duration: 800,
    }); // 0.8 วิ เลื่อนนุ่ม ๆ

    // // หรือถ้าต้องเลื่อนให้ปุ่มอยู่ในจอ
    cy.contains("button", "ยอมรับ").scrollIntoView().click();

    cy.contains("button", "ยืนยัน").click();

    cy.get("div.MuiDialogActions-root").contains("button", "ยืนยัน").click();

    cy.get("div.MuiDialogActions-root").contains("button", "ตกลง").click();

    // LINE Connect
    cy.wait(2000);

    cy.get('img[alt="ปุ่ม LINE"]').click();
  });
});
