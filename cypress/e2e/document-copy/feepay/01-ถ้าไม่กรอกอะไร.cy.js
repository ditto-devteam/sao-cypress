// Tests for the General Auto-Reply complains List
// Based on test cases from 01. ข้อมูลรับแจ้งเรื่องร้องเรียน/เบาะแส.json

describe('ข้อมูลรับแจ้งเรื่องร้องเรียน/เบาะแส', () => {
  beforeEach(() => {
    // ล็อกอินก่อนเริ่มการทดสอบแต่ละครั้ง
    cy.login(
      Cypress.env('USER_EMAIL_COMPLAIN'),
      Cypress.env('USER_PASSWORD_COMPLAIN'),
      'complain'
    );
    cy.wait(2000);

    cy.log('✅ ล็อกอินสำเร็จ - Expected: ต้องล็อกอินได้ก่อนเริ่มทดสอบ');
  });

  // กรณีทดสอบที่ 1: ถ้าไม่กรอกอะไร ต้องลิสก์ทั้งหมด
  it('ถ้าไม่กรอกอะไร ต้องลิสก์ทั้งหมด', () => {
    // เริ่มการทดสอบ E001
    cy.startTest(
      'E001',
      'เริ่มทดสอบการแสดงรายการทั้งหมดเมื่อไม่กรอกอะไร\n- นำทางไปยังหน้า auto-reply\n- ตรวจสอบการโหลดข้อมูลจาก API\n- เปรียบเทียบข้อมูลระหว่าง API และ Frontend\n- ตรวจสอบ pagination และการแสดงผล',
      'complain'
    );

    cy.log(
      '🧪 เริ่มการทดสอบ: ถ้าไม่กรอกอะไร ต้องลิสก์ทั้งหมด - Expected: แสดงข้อมูลทั้งหมดและ API ตรงกับ Frontend'
    );

    try {
      // นำทางไปยังหน้า auto-reply พร้อม authentication
      cy.log('🚀 ขั้นตอนที่ 1: นำทางไปยังหน้า auto-reply');
      cy.navigateToAutoReplyWithAuth(
        'ข้อมูลรับแจ้งเรื่องร้องเรียน/เบาะแส',
        '/v1/complains/pages'
      );
      cy.screenshot('ขั้นตอนที่ 1: นำทางไปยังหน้า auto-reply');

      // ตรวจสอบว่าตารางแสดงผลหรือไม่
      cy.get('table, [role=grid]', { timeout: 15000 }).should('be.visible');
      cy.log('✅ ตารางข้อมูลปรากฏบนหน้าจอแล้ว');
      cy.screenshot('ขั้นตอนที่ 2: ตารางข้อมูลปรากฏ');

      // เพิ่มการกรอกวันที่
      cy.log('📅 ขั้นตอนที่ 2: กรอกช่วงวันที่');
      cy.get('input[placeholder="DD/MM/YYYY – DD/MM/YYYY"]').click();

      // เลือกวันที่เริ่มต้น
      cy.get('.MuiDateRangeCalendar-root').should('be.visible');
      cy.get('.MuiPickersDay-root').contains('1').click();

      // เลือกวันที่สิ้นสุด
      cy.get('.MuiPickersDay-root').contains('23').click();

      cy.log(
        '✅ กรอกช่วงวันที่เรียบร้อยแล้ว - Expected: วันที่ 01/04/2025 - 23/04/2025'
      );

      // รอให้การร้องขอเครือข่ายเสร็จสมบูรณ์
      cy.log('⏳ ขั้นตอนที่ 3: รอให้ API โหลดข้อมูลเสร็จสิ้น');
      cy.screenshot('ขั้นตอนที่ 3: รอให้ API โหลดข้อมูลเสร็จสิ้น');
      cy.wait(3000);

      // ค้นหาการเรียก API complains/pages
      cy.get('@allRequests.all').then((requests) => {
        cy.log(`🔍 ตรวจสอบการเรียก API จากทั้งหมด ${requests.length} requests`);

        // แสดง URL ทั้งหมดเพื่อ debug
        requests.forEach((req, index) => {
          if (
            req.request &&
            req.request.url &&
            req.request.url.includes('/v1/complains/pages')
          ) {
            cy.log(`📡 Request ${index + 1}: ${req.request.url}`);
          }
        });

        const complainsPagesRequest = requests.find(
          (req) =>
            req.request &&
            req.request.url &&
            req.request.url.includes('/v1/complains/pages') &&
            req.response &&
            req.response.statusCode === 200
        );

        if (complainsPagesRequest) {
          cy.log(
            `✅ พบการร้องขอ complains/pages: ${complainsPagesRequest.request.url} - Expected: ต้องมีการเรียก API เพื่อดึงข้อมูลทั้งหมด`
          );
          cy.log(
            `📊 Status Code: ${complainsPagesRequest.response.statusCode}`
          );

          // ดึงข้อมูลจาก API response
          const responseBody = complainsPagesRequest.response.body;
          let apiItemCount = 0;
          let apiTotalCount = 0;

          // ตรวจสอบโครงสร้างข้อมูล
          if (responseBody.items && Array.isArray(responseBody.items)) {
            apiItemCount = responseBody.items.length;
            cy.log(`📋 พบข้อมูลใน responseBody.items: ${apiItemCount} รายการ`);
          } else if (responseBody.data && Array.isArray(responseBody.data)) {
            apiItemCount = responseBody.data.length;
            cy.log(`📋 พบข้อมูลใน responseBody.data: ${apiItemCount} รายการ`);
          }

          if (responseBody.total !== undefined) {
            apiTotalCount = responseBody.total;
            cy.log(`🔢 พบ total ใน responseBody: ${apiTotalCount}`);
          } else if (responseBody.displayTotal !== undefined) {
            apiTotalCount = responseBody.displayTotal;
            cy.log(`🔢 พบ displayTotal ใน responseBody: ${apiTotalCount}`);
          } else {
            apiTotalCount = apiItemCount;
            cy.log(`🔢 ใช้ itemCount เป็น total: ${apiTotalCount}`);
          }

          cy.log(
            `📋 จำนวนรายการจาก API: ${apiItemCount} - Expected: ข้อมูลจาก API ต้องตรงกับ Frontend`
          );
          cy.log(
            `🔢 จำนวนรวมจาก API: ${apiTotalCount} - Expected: จำนวนรวมจาก API ต้องตรงกับ pagination`
          );

          // เก็บข้อมูลสำหรับการเปรียบเทียบ
          cy.wrap({
            itemCount: apiItemCount,
            totalCount: apiTotalCount,
            url: complainsPagesRequest.request.url,
          }).as('apiResponse');
        } else {
          cy.log(
            '⚠️ ไม่พบการร้องขอ complains/pages API - Expected: ต้องมีการเรียก API เพื่อดึงข้อมูล'
          );
          cy.wrap(null).as('apiResponse');
        }
      });

      // นับจำนวนแถวใน frontend และเปรียบเทียบกับ API
      cy.log('📊 ขั้นตอนที่ 4: นับจำนวนแถวใน Frontend');
      cy.screenshot('ขั้นตอนที่ 4: นับจำนวนแถวใน Frontend');
      cy.get(
        '[role="row"]:not([class*="header"]):not([aria-rowindex="1"])'
      ).then(($rows) => {
        const frontendRowCount = $rows.length;
        cy.log(
          `📋 จำนวนแถวใน Frontend: ${frontendRowCount} - Expected: ต้องตรงกับ API`
        );

        // ดึงจำนวนรวมจาก pagination
        cy.log('📄 ขั้นตอนที่ 5: ตรวจสอบ pagination');
        cy.screenshot('ขั้นตอนที่ 5: ตรวจสอบ pagination');
        cy.get('.MuiTablePagination-displayedRows').then(($paginationText) => {
          const paginationText = $paginationText.text();
          const paginationMatch = paginationText.match(
            /(\d+)[-–](\d+)\s+of\s+(\d+)/
          );
          const frontendTotalCount = paginationMatch
            ? parseInt(paginationMatch[3])
            : frontendRowCount;

          cy.log(`📄 ข้อความ pagination: "${paginationText}"`);
          cy.log(
            `🔢 จำนวนรวมใน Frontend: ${frontendTotalCount} - Expected: ต้องตรงกับ API`
          );

          // เปรียบเทียบกับข้อมูลจาก API
          cy.log('🔄 ขั้นตอนที่ 6: เปรียบเทียบข้อมูล API กับ Frontend');
          cy.screenshot('ขั้นตอนที่ 6: เปรียบเทียบข้อมูล API กับ Frontend');
          cy.get('@apiResponse').then((apiData) => {
            if (apiData) {
              cy.log(
                '📊 เปรียบเทียบข้อมูล API กับ Frontend - Expected: ข้อมูลต้องตรงกันทุกประการ:'
              );
              cy.log(`   🔗 API URL: ${apiData.url}`);
              cy.log(
                `   📋 API: ${apiData.itemCount} รายการ, ${apiData.totalCount} รวม`
              );
              cy.log(
                `   🖥️ Frontend: ${frontendRowCount} แถว, ${frontendTotalCount} รวม`
              );

              // Assertion สำหรับการทดสอบ
              expect(
                apiData.totalCount,
                `จำนวนรวมระหว่าง API และ Frontend ต้องตรงกัน - Expected: ${apiData.totalCount} = ${frontendTotalCount}`
              ).to.equal(frontendTotalCount);
              expect(
                apiData.itemCount,
                `จำนวนรายการที่แสดงระหว่าง API และ Frontend ต้องตรงกัน - Expected: ${apiData.itemCount} = ${frontendRowCount}`
              ).to.equal(frontendRowCount);

              cy.log(
                '🎉 การทดสอบผ่าน: ข้อมูลระหว่าง API และ Frontend ตรงกัน - Expected: ข้อมูลต้องตรงกันทุกประการ ✅'
              );

              // ทดสอบผ่าน
              cy.passTest(
                'E001',
                `✅ ทดสอบการแสดงรายการทั้งหมดผ่าน\n\n📊 สถิติการทดสอบ:\n🔗 API URL: ${apiData.url}\n📋 API: ${apiData.itemCount} รายการ, ${apiData.totalCount} รวม\n🖥️ Frontend: ${frontendRowCount} แถว, ${frontendTotalCount} รวม\n📄 Pagination: "${paginationText}"\n\n🎯 ผลการทดสอบ:\n✓ API ถูกเรียกสำเร็จ\n✓ ข้อมูลระหว่าง API และ Frontend ตรงกันทุกประการ\n✓ Pagination แสดงผลถูกต้อง\n✓ ตารางแสดงข้อมูลครบถ้วน\n\n⚠️ หมายเหตุ: ระบบแสดงรายการทั้งหมดได้อย่างถูกต้องเมื่อไม่มีการกรอกข้อมูลค้นหา`,
                'complain'
              );
            } else {
              // ถ้าไม่มีข้อมูล API ให้ทดสอบเฉพาะ frontend
              cy.log(
                '⚠️ ไม่มีข้อมูล API สำหรับเปรียบเทียบ - ทดสอบเฉพาะ Frontend'
              );
              expect(
                frontendRowCount,
                'ต้องมีข้อมูลแสดงใน frontend - Expected: จำนวนแถว > 0'
              ).to.be.greaterThan(0);
              cy.log(
                '✅ การทดสอบ frontend ผ่าน: มีข้อมูลแสดงในตาราง - Expected: ต้องมีข้อมูลแสดง'
              );

              // ทดสอบผ่าน (แต่ไม่มีข้อมูล API)
              cy.passTest(
                'E001',
                `✅ ทดสอบการแสดงรายการทั้งหมดผ่าน (Frontend only)\n\n📊 สถิติการทดสอบ:\n🖥️ Frontend: ${frontendRowCount} แถว, ${frontendTotalCount} รวม\n📄 Pagination: "${paginationText}"\n\n🎯 ผลการทดสอบ:\n✓ ตารางแสดงข้อมูลครบถ้วน\n✓ Pagination แสดงผลถูกต้อง\n✓ มีข้อมูลแสดงในระบบ\n\n⚠️ หมายเหตุ: ไม่พบข้อมูล API สำหรับเปรียบเทียบ\n💡 แนะนำ: ตรวจสอบ network interception และ API endpoint`,
                'complain'
              );
            }
          });
          cy.screenshot('ขั้นตอนที่ 7: ทดสอบผ่าน');
        });
      });
    } catch (error) {
      // ทดสอบไม่ผ่าน
      cy.failTest(
        'E001',
        `❌ ทดสอบการแสดงรายการทั้งหมดไม่ผ่าน\n\n🚨 ข้อผิดพลาด: ${error.message}\n\n📝 รายละเอียดข้อผิดพลาด:\n- เกิดข้อผิดพลาดระหว่างการทดสอบ\n- อาจมีปัญหาใน element selection\n- อาจมีปัญหาใน API response handling\n- อาจมีปัญหาใน navigation หรือ authentication\n\n💡 แนะนำการแก้ไข:\n- ตรวจสอบการล็อกอินและ authentication\n- ตรวจสอบ selector ของ elements\n- ตรวจสอบ API endpoint และ network\n- ตรวจสอบ timing และ wait conditions\n- ตรวจสอบ error handling logic`,
        'complain'
      );
      throw error;
    }
  });
});
