describe("Login Test", () => {
  it("should log in successfully with valid credentials", () => {
    // 1. ไปที่ URL ของหน้า login
    cy.visit("https://sao.devditto.com/login/");
    
    // 2.กรอกข้อมูล username/email
    cy.get('input[name="username"]')  // หรือใช้ id ถ้ามี
      .type("system01@email.com"); // ใช้ email ที่ต้องการทดสอบ
    
    // 3. กรอกข้อมูล password
    cy.get('input[name="password"]') // หรือใช้ id ถ้ามี
      .type("System@001"); // ใช้ password ที่ต้องการทดสอบ
    
    // 4. คลิกปุ่ม Login
    cy.get('button[type="submit"]') // หรือใช้ id ถ้ามี
      .click();

    // 5. ตรวจสอบว่า URL เปลี่ยนไปหลังจากการล็อกอินสำเร็จ
    cy.url().should("include", "/dashboard"); // หรือ URL ที่คุณคาดว่าจะเป็นหลังการเข้าสู่ระบบ

    // 6. ตรวจสอบว่าองค์ประกอบบางอย่างในหน้าหลังจากล็อกอินปรากฏขึ้น
    cy.contains("Welcome"); // คำทักทายหรือข้อความที่ปรากฏหลังการล็อกอินสำเร็จ
  });
});
