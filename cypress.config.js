const { defineConfig } = require("cypress");
const fs = require("fs");
const path = require("path");

module.exports = defineConfig({
  e2e: {
    // point ที่ต้อง register task
    setupNodeEvents(on, config) {
      on("task", {
        createFolder(folderName) {
          const folderPath = path.join(
            "/Users/chatchawan/Documents/Work/Project/active_project/SAO/sao-cypress/cypress/screenshots",
            folderName
          );

          try {
            if (fs.existsSync(folderPath)) {
              // ลบ folder เก่า พร้อมไฟล์ข้างใน
              fs.rmSync(folderPath, { recursive: true, force: true });
              console.log(`ลบ folder เก่าเรียบร้อย: ${folderPath}`);
            }

            // สร้าง folder ใหม่
            fs.mkdirSync(folderPath, { recursive: true });
            console.log(`สร้าง folder ใหม่สำเร็จ: ${folderPath}`);

            return null; // ✅ return null
          } catch (err) {
            console.error("เกิดข้อผิดพลาดในการสร้าง folder:", err);
            return err; // ✅ return error object
          }
        },
      });

      return config;
    },
    baseUrl: "https://jointsao.audit.go.th",
    viewportWidth: 1280,
    viewportHeight: 720,
  },
});
