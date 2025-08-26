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
            if (!fs.existsSync(folderPath)) {
              fs.mkdirSync(folderPath, { recursive: true });
              console.log(`สร้าง folder สำเร็จ: ${folderPath}`);
            } else {
              console.log(`folder มีอยู่แล้ว: ${folderPath}`);
            }
            return null; // ✅ ต้อง return null
          } catch (err) {
            console.error(err);
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
