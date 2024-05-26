function operateSpreadSheetData() {
    // // スプレッドシートとシートを取得
    // var sheetName = 'sheet1'; // ここにシート名を入力
    // var spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    // var sheet = spreadsheet.getSheetByName(sheetName);

    // // 現在時刻を取得
    // const formattedDate = getCurrentTime();

    // // 最終行を取得して、次行にデータを追加
    // var lastRow = sheet.getLastRow();
    // // 追加するデータを定義
    // var newData = [formattedDate, `データ${lastRow+1}`]; // 
    // sheet.getRange(lastRow + 1, 1, 1, newData.length).setValues([newData]);

    // // AppSheet API利用（データ追加）
    // const formattedDate = getCurrentTime();
    // const rows = [{
    //     "タイムスタンプ": formattedDate,
    //     "名前": "Sample"
    //   }];
    // let response = callAppsheetAPI("Add",rows);
    // console.log(response.getResponseCode())

    // AppSheet API利用（データ検索）
    const rows = [{
        "タイムスタンプ": 20240526121307,
    }];
    let response = callAppsheetAPI("Find", rows);
    console.log(response.getContentText());
}

function callAppsheetAPI(method, rows) {
    // ADD
    // https://support.google.com/appsheet/answer/10104797?hl=en
    // FIND
    // https://support.google.com/appsheet/answer/10105770?hl=ja&sjid=2713060602064805976-AP
    var url = `https://api.appsheet.com/api/v2/apps/${APP_ID}/tables/${TABLE_NAME}/Action?applicationAccessKey=${ACCESS_KEY}`;
    var payload = {
        "Action": method,
        "Properties": {
            "Locale": "ja-JP",
        },
        "Rows": rows
    };

    var options = {
        'method': 'post',
        'contentType': 'application/json',
        'payload': JSON.stringify(payload)
    };

    var response = UrlFetchApp.fetch(url, options);
    return response;
}

function getCurrentTime() {
    // 現在時刻を取得
    const now = new Date();
    // 時間を特定の形式でフォーマット
    const formattedDate = Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyyMMddHHmmss');
    return formattedDate;
}
