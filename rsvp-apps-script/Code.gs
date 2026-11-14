// RSVP — Boda Gerwin & Yeralding — BACKEND COMPLETO (v4, correo al invitado en su idioma)
// Abrir: Hoja "RSVP — Boda Gerwin & Yeralding — Lista de confirmaciones" > Extensiones > Apps Script
// Pegar este archivo completo, Guardar, y desplegar una NUEVA VERSIÓN de la implementación web existente:
// Desplegar > Administrar implementaciones > Editar la implementación > Versión nueva > Implementar
// Cambios v4 (14/11/2026):
//  - El correo de confirmación al invitado sale en EL IDIOMA EN QUE CONFIRMÓ (d.lang): si confirma
//    en holandés, asunto y cuerpo en holandés; si confirma en español, en español. El aviso a
//    Yeralding sigue en español.
// Cambios v3 (14/11/2026):
//  - Logger.log en cada paso (recepción, filas, envío a Yeralding, envío al invitado, errores): si algo
//    falla, el texto del error queda en Registros de Apps Script (Ejecuciones > Registros).
//  - El envío a Yeralding ya no tumba toda la respuesta: si falla, se registra, se devuelve
//    {ok:true, emailOk:false, emailError:"..."} y las filas quedan guardadas igualmente.
//  - El teléfono se guarda como texto (con apóstrofe inicial): los números que empiezan por + se
//    interpretaban como fórmula y salían como #ERROR! en la hoja (pasó con Diego Ocando Rondon).
// Cada envío:
//  - guarda una fila en Confirmaciones (siempre)
//  - guarda una fila en Lista DJ (solo si hay canción sugerida)
//  - guarda una fila en Lista Alergias (solo si hay alergia/dieta)
//  - envía un email PERSONALIZADO a Yeralding con TODA la info de ese invitado (igual que en las sheets)
//  - si el invitado dejó su correo, le envía también su confirmación personalizada
var SHEET_MAIN = '1CU8o07btaAslyiEDO1-2owvPs77xD7EHaiSFZiw2lF0';
var SHEET_DJ = '1pZd3pAmFDC8aNTg2JBDIA4PCLAeupDzqbzvc8QBU594';
var SHEET_ALLERGY = '10CDG3GK_1wU4rXmenr3_J-zoTf6gk9vh-LaFJ9E25os';
var YERALDING_EMAIL = 'rondonyeralding@gmail.com';

function esc(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// El teléfono se guarda como texto para que Sheets no lo lea como fórmula
// (un teléfono que empieza por + salía como #ERROR!).
function phoneText(p) {
  p = String(p || '').trim();
  return p ? "'" + p : '';
}

function doPost(e) {
  var emailOk = true;
  var emailError = '';
  try {
    var d = JSON.parse(e.postData.contents);
    var now = new Date();
    Logger.log('RSVP doPost: name=%s attend=%s email=%s phone=%s lang=%s', d.name || '', d.attend || '', d.email || '', d.phone || '', d.lang || '');
    var attendMap = { 'cena': ['Sí — Cena', 'SÍ, asistirá a la cena'], 'fiesta': ['Sí — Fiesta', 'SÍ, asistirá a la fiesta'], 'ambos': ['Sí — Ambos', 'SÍ, asistirá a ambos (cena y fiesta)'], 'si': ['Sí', 'SÍ, asistirá'], 'no': ['No', 'NO podrá asistir'] };
    var attendPair = attendMap[d.attend] || attendMap['ambos'];
    var attend = attendPair[0];
    var attendText = attendPair[1];
    SpreadsheetApp.openById(SHEET_MAIN).getSheetByName('Hoja 1').appendRow(
      [now, d.name || '', d.email || '', phoneText(d.phone), attend, d.diet || '', d.song || '', d.lang || '']);
    if (d.song) {
      SpreadsheetApp.openById(SHEET_DJ).getSheetByName('Hoja 1').appendRow(
        [now, d.name || '', d.song, d.email || '', phoneText(d.phone), attend]);
    }
    if (d.diet) {
      SpreadsheetApp.openById(SHEET_ALLERGY).getSheetByName('Hoja 1').appendRow(
        [now, d.name || '', d.diet, d.email || '', phoneText(d.phone), attend]);
    }
    Logger.log('RSVP filas guardadas: name=%s attend=%s', d.name || '', attend);
    var dateStr = Utilities.formatDate(now, 'Europe/Luxembourg', 'dd/MM/yyyy HH:mm');
    // Email PERSONALIZADO a Yeralding: la misma info que en las sheets, de ESTE invitado, no genérico.
    var subject = 'Nueva confirmación RSVP: ' + (d.name || 'Invitado') + ' — ' + attendText + ' · Boda Gerwin & Yeralding';
    var htmlBody = '<div style="font-family:Georgia,serif;color:#1A120B;max-width:600px;">'
      + '<h2 style="color:#8C6726;">Hola Yeralding,</h2>'
      + '<p><b>' + esc(d.name) + '</b> acaba de confirmar en la invitación de la boda, el ' + dateStr + ':</p>'
      + '<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;">'
      + '<tr><td style="border:1px solid #D4AF37;"><b>Invitado</b></td><td style="border:1px solid #D4AF37;">' + esc(d.name) + '</td></tr>'
      + '<tr><td style="border:1px solid #D4AF37;"><b>Correo</b></td><td style="border:1px solid #D4AF37;">' + esc(d.email) + '</td></tr>'
      + '<tr><td style="border:1px solid #D4AF37;"><b>Teléfono</b></td><td style="border:1px solid #D4AF37;">' + esc(d.phone) + '</td></tr>'
      + '<tr><td style="border:1px solid #D4AF37;"><b>Asistencia</b></td><td style="border:1px solid #D4AF37;"><b>' + attendText + '</b></td></tr>'
      + '<tr><td style="border:1px solid #D4AF37;"><b>Alergias / Dieta</b></td><td style="border:1px solid #D4AF37;">' + esc(d.diet || 'Ninguna') + '</td></tr>'
      + '<tr><td style="border:1px solid #D4AF37;"><b>Canción DJ</b></td><td style="border:1px solid #D4AF37;">' + esc(d.song || 'Ninguna sugerida') + '</td></tr>'
      + '<tr><td style="border:1px solid #D4AF37;"><b>Idioma</b></td><td style="border:1px solid #D4AF37;">' + esc(d.lang || '') + '</td></tr>'
      + '</table>'
      + '<p>Esta es exactamente la misma información que quedó guardada en las listas:</p>'
      + '<p><a href="https://docs.google.com/spreadsheets/d/' + SHEET_MAIN + '/edit">Confirmaciones</a> · '
      + '<a href="https://docs.google.com/spreadsheets/d/' + SHEET_DJ + '/edit">Lista DJ</a> · '
      + '<a href="https://docs.google.com/spreadsheets/d/' + SHEET_ALLERGY + '/edit">Lista Alergias</a></p>'
      + '<p style="color:#8C6726;">Boda Gerwin &amp; Yeralding · 01 de mayo de 2027 · Hotel ReeHorst, Ede</p></div>';
    var plainBody = 'Hola Yeralding,\n\n' + (d.name || '') + ' acaba de confirmar en la invitación de la boda, el ' + dateStr + ':\n\n'
      + 'Invitado: ' + (d.name || '') + '\n'
      + 'Correo: ' + (d.email || '') + '\n'
      + 'Teléfono: ' + (d.phone || '') + '\n'
      + 'Asistencia: ' + attendText + '\n'
      + 'Alergias / Dieta: ' + (d.diet || 'Ninguna') + '\n'
      + 'Canción DJ: ' + (d.song || 'Ninguna sugerida') + '\n'
      + 'Idioma: ' + (d.lang || '') + '\n\n'
      + 'Listas actualizadas automáticamente:\n'
      + '- Confirmaciones: https://docs.google.com/spreadsheets/d/' + SHEET_MAIN + '/edit\n'
      + '- Lista DJ: https://docs.google.com/spreadsheets/d/' + SHEET_DJ + '/edit\n'
      + '- Lista Alergias: https://docs.google.com/spreadsheets/d/' + SHEET_ALLERGY + '/edit\n';
    try {
      Logger.log('RSVP enviando correo a Yeralding: name=%s', d.name || '');
      MailApp.sendEmail({to: YERALDING_EMAIL, subject: subject, body: plainBody, htmlBody: htmlBody});
      Logger.log('RSVP correo a Yeralding enviado: name=%s', d.name || '');
    } catch (me) {
      emailOk = false;
      emailError = String(me && me.stack ? me.stack : me);
      Logger.log('RSVP ERROR enviando correo a Yeralding: name=%s error=%s', d.name || '', emailError);
    }
    // Confirmación personalizada al propio invitado, si dejó su correo.
    // Va en EL IDIOMA EN QUE CONFIRMÓ: holandés si lang es 'nl', español en el resto.
    if (d.email) {
      var isNL = (d.lang === 'nl');
      var attendNL = { 'cena': 'Ja, ik ben erbij bij het diner', 'fiesta': 'Ja, ik ben erbij bij het feest', 'ambos': 'Ja, ik ben erbij bij beide (diner en feest)', 'si': 'Ja, ik ben erbij', 'no': 'Nee, ik kan helaas niet komen' };
      var attendGuest = isNL ? (attendNL[d.attend] || attendNL['ambos']) : attendText;
      var guestSubject = isNL
        ? 'Je bevestiging — Bruiloft Gerwin & Yeralding, 01 mei 2027'
        : 'Tu confirmación — Boda Gerwin & Yeralding, 01 de mayo de 2027';
      var guestBody = isNL
        ? 'Hallo ' + (d.name || '') + ',\n\nBedankt voor je bevestiging. Zo is je bevestiging geregistreerd:\n\n'
          + 'Aanwezigheid: ' + attendGuest + '\n'
          + 'Allergieën / Dieet: ' + (d.diet || 'Geen') + '\n'
          + 'DJ-nummer: ' + (d.song || 'Geen nummer voorgesteld') + '\n\n'
          + 'Viering: zaterdag 01 mei 2027, 19:30, Hotel ReeHorst, Bennekomseweg 24, 6717 LM Ede, Nederland.\n'
          + 'Tot in mei! Gerwin & Yeralding'
        : 'Hola ' + (d.name || '') + ',\n\nGracias por confirmar. Así quedó registrada tu confirmación:\n\n'
          + 'Asistencia: ' + attendText + '\n'
          + 'Alergias / Dieta: ' + (d.diet || 'Ninguna') + '\n'
          + 'Canción DJ: ' + (d.song || 'Ninguna sugerida') + '\n\n'
          + 'Celebración: sábado 01 de mayo de 2027, 19:30, Hotel ReeHorst, Bennekomseweg 24, 6717 LM Ede, Países Bajos.\n'
          + '¡Nos vemos en mayo! Gerwin & Yeralding';
      try {
        MailApp.sendEmail(d.email, guestSubject, guestBody);
        Logger.log('RSVP correo al invitado enviado: %s lang=%s', d.email, d.lang || 'es');
      } catch (ge) {
        Logger.log('RSVP ERROR enviando correo al invitado %s: %s', d.email, String(ge && ge.stack ? ge.stack : ge));
      }
    }
    return ContentService.createTextOutput(JSON.stringify({ok: true, emailOk: emailOk, emailError: emailError})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    var errText = String(err && err.stack ? err.stack : err);
    Logger.log('RSVP ERROR doPost: %s', errText);
    return ContentService.createTextOutput(JSON.stringify({ok: false, emailOk: false, error: errText})).setMimeType(ContentService.MimeType.JSON);
  }
}
function doGet() {
  return ContentService.createTextOutput('RSVP OK');
}
