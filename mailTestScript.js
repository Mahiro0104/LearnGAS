function myFunction() {
  // 検索条件に該当するスレッド一覧を取得
  // スレッド……Gmailのメールとメールに対する返信のセット
  var threads = GmailApp.search('subject:フォームからのお問い合わせ -label:処理済み');

  // 該当するスレッド一覧からスレッドごとに処理
  threads.forEach(function(thread){

    // スレッド内のメール一覧を取得
    var messages = thread.getMessages();
    
    // 取得したメール一覧をメール毎に処理
    messages.forEach(function(message){

      // 本文を取得
      var plainBody = message.getPlainBody();

      // メールの本文が取得出来ているか確認
      Logger.log(plainBody);

      // 差出人を取得
      var name = plainBody.match(/差出人: (.*)/);

      // 会社名を取得
      var company = plainBody.match(/会社名: (.*)/);

      // メールアドレスを取得
      var email = plainBody.match(/メールアドレス: (.*)/);

      // 電話番号を取得
      var tell = plainBody.match(/電話番号: (.*)/);

      var sheet = SpreadsheetApp.getActive().getSheetByName('お問い合わせ');

      
      Logger.log(name[1]);
      Logger.log(company[1]);
      Logger.log(email[1]);
      Logger.log(tell[1]);

      var nextRow = sheet.getLastRow() + 1;

      sheet.getRange(nextRow, 1).setValue(name[1]);
      sheet.getRange(nextRow, 2).setValue(company[1]);
      sheet.getRange(nextRow, 3).setValue(email[1]);
      sheet.getRange(nextRow, 4).setValue(tell[1]);

      var label = GmailApp.getUserLabelByName('処理済み');
      thread.addLabel(label);
    });
  });
}