describe("Register Government agencies - Negative tests", () => {
  it("should show error when username is empty", () => {
    //     ชื่อผู้ใช้ว่าง: หากผู้ใช้ไม่กรอกชื่อผู้ใช้ ระบบจะไม่ยอมให้ดำเนินการต่อ
    // รหัสผ่านสั้นเกินไป: ตรวจสอบว่ารหัสผ่านที่สั้นเกินไปจะแสดงข้อผิดพลาด
    // รหัสผ่านไม่ตรงกัน: ถ้ารหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน ระบบจะแสดงข้อผิดพลาด
    // อีเมลไม่ถูกต้อง: ระบบจะตรวจสอบว่าอีเมลถูกกรอกมาอย่างถูกต้อง
    // เบอร์โทรศัพท์ไม่ถูกต้อง: ระบบจะแจ้งข้อผิดพลาดถ้าเบอร์โทรศัพท์ไม่ถูกต้อง
    // ไปที่หน้า Dashboard
    cy.visit("https://sao.devditto.com/dashboard/");

    // คลิก 'เข้าใช้งานระบบ'
    cy.contains("เข้าใช้งานระบบ").click();

    // คลิก 'สมัครสมาชิก'
    cy.contains("สมัครสมาชิก").click();

    cy.url().should("include", "/register");

    // เลือก 'หน่วยงานภาครัฐ'
    cy.get("h3.MuiTypography-root").contains("หน่วยงานภาครัฐ").click();

    // รอให้หน้าโหลด
    cy.wait(1000);

    // คลิกปุ่มเพื่อเลือกไฟล์
    cy.get(
      "button.MuiButtonBase-root.MuiCardActionArea-root.css-ja9q1h"
    ).click();
    cy.wait(1000);

    // กรอกข้อมูลที่ไม่ครบ
    cy.get('input[type="file"]').attachFile("images1.jpg");

    cy.get('input[name="username"]').type(""); // กรอกช่องว่าง (ผิดพลาด)

    cy.get('input[name="password"]').type("Abc12345@++");
    cy.get('input[name="confirmPassword"]').type("Abc12345@++");

    // คลิกที่ปุ่ม 'ยืนยัน'
    cy.get('button[type="submit"]').contains("ยืนยัน").click();

    // ตรวจสอบว่าแสดงข้อผิดพลาดเกี่ยวกับชื่อผู้ใช้
    cy.get(".error-message")
      .should("be.visible")
      .and("contain", "กรุณากรอกชื่อผู้ใช้");
  });

  it("should show error when password is too short", () => {
    // ไปที่หน้า Dashboard
    cy.visit("https://sao.devditto.com/dashboard/");

    // คลิก 'เข้าใช้งานระบบ'
    cy.contains("เข้าใช้งานระบบ").click();

    // คลิก 'สมัครสมาชิก'
    cy.contains("สมัครสมาชิก").click();

    cy.url().should("include", "/register");

    // เลือก 'หน่วยงานภาครัฐ'
    cy.get("h3.MuiTypography-root").contains("หน่วยงานภาครัฐ").click();

    // รอให้หน้าโหลด
    cy.wait(1000);

    // คลิกปุ่มเพื่อเลือกไฟล์
    cy.get(
      "button.MuiButtonBase-root.MuiCardActionArea-root.css-ja9q1h"
    ).click();
    cy.wait(1000);

    // กรอกข้อมูลที่ไม่ครบ
    cy.get('input[type="file"]').attachFile("images1.jpg");

    cy.get('input[name="username"]').type("chatchawan");
    cy.get('input[name="password"]').type("123"); // รหัสผ่านสั้นเกินไป (ผิดพลาด)
    cy.get('input[name="confirmPassword"]').type("123");

    // คลิกที่ปุ่ม 'ยืนยัน'
    cy.get('button[type="submit"]').contains("ยืนยัน").click();

    // ตรวจสอบว่าแสดงข้อผิดพลาดเกี่ยวกับรหัสผ่าน
    cy.get(".error-message")
      .should("be.visible")
      .and("contain", "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร");
  });

  it("should show error when passwords do not match", () => {
    // ไปที่หน้า Dashboard
    cy.visit("https://sao.devditto.com/dashboard/");

    // คลิก 'เข้าใช้งานระบบ'
    cy.contains("เข้าใช้งานระบบ").click();

    // คลิก 'สมัครสมาชิก'
    cy.contains("สมัครสมาชิก").click();

    cy.url().should("include", "/register");

    // เลือก 'หน่วยงานภาครัฐ'
    cy.get("h3.MuiTypography-root").contains("หน่วยงานภาครัฐ").click();

    // รอให้หน้าโหลด
    cy.wait(1000);

    // คลิกปุ่มเพื่อเลือกไฟล์
    cy.get(
      "button.MuiButtonBase-root.MuiCardActionArea-root.css-ja9q1h"
    ).click();
    cy.wait(1000);

    // กรอกข้อมูลที่ไม่ตรงกันในรหัสผ่าน
    cy.get('input[type="file"]').attachFile("images1.jpg");

    cy.get('input[name="username"]').type("chatchawan");
    cy.get('input[name="password"]').type("Abc12345@++");
    cy.get('input[name="confirmPassword"]').type("DifferentPassword123");

    // คลิกที่ปุ่ม 'ยืนยัน'
    cy.get('button[type="submit"]').contains("ยืนยัน").click();

    // ตรวจสอบว่าแสดงข้อผิดพลาดเกี่ยวกับรหัสผ่านไม่ตรงกัน
    cy.get(".error-message")
      .should("be.visible")
      .and("contain", "รหัสผ่านไม่ตรงกัน");
  });

  it("should show error when invalid email is provided", () => {
    // ไปที่หน้า Dashboard
    cy.visit("https://sao.devditto.com/dashboard/");

    // คลิก 'เข้าใช้งานระบบ'
    cy.contains("เข้าใช้งานระบบ").click();

    // คลิก 'สมัครสมาชิก'
    cy.contains("สมัครสมาชิก").click();

    cy.url().should("include", "/register");

    // เลือก 'หน่วยงานภาครัฐ'
    cy.get("h3.MuiTypography-root").contains("หน่วยงานภาครัฐ").click();

    // รอให้หน้าโหลด
    cy.wait(1000);

    // คลิกปุ่มเพื่อเลือกไฟล์
    cy.get(
      "button.MuiButtonBase-root.MuiCardActionArea-root.css-ja9q1h"
    ).click();
    cy.wait(1000);

    // กรอกข้อมูลที่ไม่ครบ
    cy.get('input[type="file"]').attachFile("images1.jpg");

    cy.get('input[name="username"]').type("chatchawan");
    cy.get('input[name="password"]').type("Abc12345@++");
    cy.get('input[name="confirmPassword"]').type("Abc12345@++");
    cy.get('input[name="email"]').type("invalidEmail"); // อีเมลไม่ถูกต้อง

    // คลิกที่ปุ่ม 'ยืนยัน'
    cy.get('button[type="submit"]').contains("ยืนยัน").click();

    // ตรวจสอบว่าแสดงข้อผิดพลาดเกี่ยวกับอีเมล
    cy.get(".error-message")
      .should("be.visible")
      .and("contain", "กรุณากรอกอีเมลให้ถูกต้อง");
  });

  it("should show error when phone number is invalid", () => {
    // ไปที่หน้า Dashboard
    cy.visit("https://sao.devditto.com/dashboard/");

    // คลิก 'เข้าใช้งานระบบ'
    cy.contains("เข้าใช้งานระบบ").click();

    // คลิก 'สมัครสมาชิก'
    cy.contains("สมัครสมาชิก").click();

    cy.url().should("include", "/register");

    // เลือก 'หน่วยงานภาครัฐ'
    cy.get("h3.MuiTypography-root").contains("หน่วยงานภาครัฐ").click();

    // รอให้หน้าโหลด
    cy.wait(1000);

    // คลิกปุ่มเพื่อเลือกไฟล์
    cy.get(
      "button.MuiButtonBase-root.MuiCardActionArea-root.css-ja9q1h"
    ).click();
    cy.wait(1000);

    // กรอกข้อมูลที่ไม่ครบ
    cy.get('input[type="file"]').attachFile("images1.jpg");

    cy.get('input[name="username"]').type("chatchawan");
    cy.get('input[name="password"]').type("Abc12345@++");
    cy.get('input[name="confirmPassword"]').type("Abc12345@++");

    cy.get('input[name="phone"]').type("invalidPhoneNumber"); // เบอร์โทรศัพท์ไม่ถูกต้อง

    // คลิกที่ปุ่ม 'ยืนยัน'
    cy.get('button[type="submit"]').contains("ยืนยัน").click();

    // ตรวจสอบว่าแสดงข้อผิดพลาดเกี่ยวกับเบอร์โทรศัพท์
    cy.get(".error-message")
      .should("be.visible")
      .and("contain", "กรุณากรอกหมายเลขโทรศัพท์ให้ถูกต้อง");
  });
});
