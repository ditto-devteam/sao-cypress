describe("Register population - Negative tests", () => {
  it("should show error when username is empty", () => {
    //     กรอกชื่อผู้ใช้เป็นช่องว่าง: ตรวจสอบว่าเมื่อไม่กรอกชื่อผู้ใช้จะเกิดข้อผิดพลาด
    // รหัสผ่านที่สั้นเกินไป: ตรวจสอบว่าเมื่อรหัสผ่านสั้นเกินไป ระบบจะแจ้งเตือน
    // รหัสผ่านที่ไม่ตรงกัน: ตรวจสอบว่าหากรหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน ระบบจะแจ้งเตือน
    // อีเมลไม่ถูกต้อง: ตรวจสอบว่าเมื่อกรอกอีเมลที่ไม่ถูกต้อง ระบบจะแจ้งเตือน
    // เบอร์โทรศัพท์ไม่ถูกต้อง: ตรวจสอบว่าเมื่อกรอกเบอร์โทรศัพท์ที่ไม่ถูกต้อง ระบบจะแจ้งเตือน
    // 1. ไปที่ URL ของหน้า dashboard
    cy.visit("https://sao.devditto.com/dashboard/");

    // 2. คลิกที่ปุ่ม 'เข้าใช้งานระบบ' หรือ 'Login'
    cy.contains("เข้าใช้งานระบบ").click();

    // 3. รอให้มีการโหลดหน้า Login แล้วคลิกที่ 'สมัครสมาชิก'
    cy.contains("สมัครสมาชิก").click();

    // 4. ตรวจสอบว่าอยู่ในหน้า 'สมัครสมาชิก' หรือหน้าใหม่
    cy.url().should("include", "/register");

    // 5. กรอกข้อมูลที่ไม่ครบ (กรอกชื่อผู้ใช้เป็นช่องว่าง)
    cy.get('input[name="username"]').type(""); // กรอกช่องว่าง
    cy.get('input[name="password"]').type("Abc12345@++");
    cy.get('input[name="confirmPassword"]').type("Abc12345@++");

    // 6. คลิกปุ่มยืนยัน
    cy.get('button[type="submit"]').contains("ยืนยัน").click();

    // 7. ตรวจสอบว่ามีข้อผิดพลาดที่เกี่ยวกับการกรอกชื่อผู้ใช้
    cy.get(".error-message")
      .should("be.visible")
      .and("contain", "กรุณากรอกชื่อผู้ใช้");
  });

  it("should show error when password is too short", () => {
    // 1. ไปที่ URL ของหน้า dashboard
    cy.visit("https://sao.devditto.com/dashboard/");

    // 2. คลิกที่ปุ่ม 'เข้าใช้งานระบบ' หรือ 'Login'
    cy.contains("เข้าใช้งานระบบ").click();

    // 3. รอให้มีการโหลดหน้า Login แล้วคลิกที่ 'สมัครสมาชิก'
    cy.contains("สมัครสมาชิก").click();

    // 4. ตรวจสอบว่าอยู่ในหน้า 'สมัครสมาชิก' หรือหน้าใหม่
    cy.url().should("include", "/register");

    // 5. กรอกข้อมูลที่ผิดพลาด (กรอกรหัสผ่านที่สั้นเกินไป)
    cy.get('input[name="username"]').type("chatchawan");
    cy.get('input[name="password"]').type("123"); // รหัสผ่านที่สั้นเกินไป
    cy.get('input[name="confirmPassword"]').type("123");

    // 6. คลิกปุ่มยืนยัน
    cy.get('button[type="submit"]').contains("ยืนยัน").click();

    // 7. ตรวจสอบว่ามีข้อผิดพลาดที่เกี่ยวกับรหัสผ่าน
    cy.get(".error-message")
      .should("be.visible")
      .and("contain", "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษร");
  });

  it("should show error when passwords do not match", () => {
    // 1. ไปที่ URL ของหน้า dashboard
    cy.visit("https://sao.devditto.com/dashboard/");

    // 2. คลิกที่ปุ่ม 'เข้าใช้งานระบบ' หรือ 'Login'
    cy.contains("เข้าใช้งานระบบ").click();

    // 3. รอให้มีการโหลดหน้า Login แล้วคลิกที่ 'สมัครสมาชิก'
    cy.contains("สมัครสมาชิก").click();

    // 4. ตรวจสอบว่าอยู่ในหน้า 'สมัครสมาชิก' หรือหน้าใหม่
    cy.url().should("include", "/register");

    // 5. กรอกข้อมูลที่ไม่ตรงกันในฟิลด์รหัสผ่าน
    cy.get('input[name="username"]').type("chatchawan");
    cy.get('input[name="password"]').type("Abc12345@++");
    cy.get('input[name="confirmPassword"]').type("DifferentPassword123");

    // 6. คลิกปุ่มยืนยัน
    cy.get('button[type="submit"]').contains("ยืนยัน").click();

    // 7. ตรวจสอบว่ามีข้อผิดพลาดที่รหัสผ่านไม่ตรงกัน
    cy.get(".error-message")
      .should("be.visible")
      .and("contain", "รหัสผ่านไม่ตรงกัน");
  });

  it("should show error when email is invalid", () => {
    // 1. ไปที่ URL ของหน้า dashboard
    cy.visit("https://sao.devditto.com/dashboard/");

    // 2. คลิกที่ปุ่ม 'เข้าใช้งานระบบ' หรือ 'Login'
    cy.contains("เข้าใช้งานระบบ").click();

    // 3. รอให้มีการโหลดหน้า Login แล้วคลิกที่ 'สมัครสมาชิก'
    cy.contains("สมัครสมาชิก").click();

    // 4. ตรวจสอบว่าอยู่ในหน้า 'สมัครสมาชิก' หรือหน้าใหม่
    cy.url().should("include", "/register");

    // 5. กรอกข้อมูลที่ผิดพลาดในอีเมล (อีเมลไม่ถูกต้อง)
    cy.get('input[name="username"]').type("chatchawan");
    cy.get('input[name="password"]').type("Abc12345@++");
    cy.get('input[name="confirmPassword"]').type("Abc12345@++");
    cy.get('input[name="email"]').type("invalidEmail"); // อีเมลไม่ถูกต้อง

    // 6. คลิกปุ่มยืนยัน
    cy.get('button[type="submit"]').contains("ยืนยัน").click();

    // 7. ตรวจสอบว่ามีข้อผิดพลาดเกี่ยวกับอีเมล
    cy.get(".error-message")
      .should("be.visible")
      .and("contain", "กรุณากรอกอีเมลให้ถูกต้อง");
  });

  it("should show error when phone number is invalid", () => {
    // 1. ไปที่ URL ของหน้า dashboard
    cy.visit("https://sao.devditto.com/dashboard/");

    // 2. คลิกที่ปุ่ม 'เข้าใช้งานระบบ' หรือ 'Login'
    cy.contains("เข้าใช้งานระบบ").click();

    // 3. รอให้มีการโหลดหน้า Login แล้วคลิกที่ 'สมัครสมาชิก'
    cy.contains("สมัครสมาชิก").click();

    // 4. ตรวจสอบว่าอยู่ในหน้า 'สมัครสมาชิก' หรือหน้าใหม่
    cy.url().should("include", "/register");

    // 5. กรอกข้อมูลที่ผิดพลาดในเบอร์โทรศัพท์ (เบอร์โทรศัพท์ไม่ถูกต้อง)
    cy.get('input[name="phone"]').type("invalidPhoneNumber"); // เบอร์โทรศัพท์ไม่ถูกต้อง

    // 6. คลิกปุ่มยืนยัน
    cy.get('button[type="submit"]').contains("ยืนยัน").click();

    // 7. ตรวจสอบว่ามีข้อผิดพลาดเกี่ยวกับเบอร์โทรศัพท์
    cy.get(".error-message")
      .should("be.visible")
      .and("contain", "กรุณากรอกหมายเลขโทรศัพท์ให้ถูกต้อง");
  });
});
