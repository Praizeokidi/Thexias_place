/**
 * THEXIAS_PLACE private waitlist intake.
 * Deploy as a Web app: Execute as Me, access for Anyone with the link.
 * Keep the spreadsheet private; this endpoint only accepts submissions.
 */
const SPREADSHEET_ID = '1BtbEq-NcCdzjNQqW15yckU_Fbt1URRiLf1WXzs8qTO0';
const SHEET_NAME = 'Dashboard Data';

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet() {
  return json_({ ok: true, service: 'THEXIAS_PLACE waitlist', version: 1 });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ ok: false, message: 'Empty request.' });
    }
    const data = JSON.parse(e.postData.contents);
    // Honeypot support: bots filling this hidden field are rejected.
    if (String(data.website || '').trim()) return json_({ ok: false, message: 'Invalid request.' });

    const name = String(data.name || '').trim();
    const contact = String(data.contact || '').trim();
    const item = String(data.item || '').trim();
    const interests = Array.isArray(data.interests) ? data.interests.map(String).join(', ') : String(data.interests || '').trim();
    if (!name || !contact || !item || !interests) {
      return json_({ ok: false, message: 'Name, contact, interest and exact item are required.' });
    }
    if (name.length > 120 || contact.length > 160 || item.length > 240 || interests.length > 240) {
      return json_({ ok: false, message: 'One or more fields are too long.' });
    }

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
    if (!sheet) return json_({ ok: false, message: 'Dashboard Data sheet not found.' });
    sheet.appendRow([
      new Date(),
      name,
      contact,
      interests,
      item,
      'New',
      [data.size ? `Size: ${String(data.size).trim()}` : '', data.colour ? `Colour: ${String(data.colour).trim()}` : '', data.notes ? String(data.notes).trim() : ''].filter(Boolean).join(' · '),
    ]);
    return json_({ ok: true, message: 'Your waitlist request was saved.' });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, message: 'Could not save the request.' });
  } finally {
    lock.releaseLock();
  }
}
