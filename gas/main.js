// https://zenn.dev/se_ya/articles/4258968f14752d

const sendVoteStartButton = () => {

    //　ここに作成したblock kitを定義します
    const blockKit = [
        {
            type: 'section',
            text: {
                type: 'mrkdwn',
                text: '下記のボタンを押下して、投票を開始してください。',
            },
        },
        {
            type: 'actions',
            elements: [
                {
                    type: 'button',
                    text: {
                        type: 'plain_text',
                        emoji: true,
                        text: '投票開始',
                    },
                    style: 'primary',
                    value: 'start_vote',
                },
            ],
        },
    ];

    const payload = { blocks: blockKit };
    const options = { method: 'POST', payload: JSON.stringify(payload) };

    //Slackへメッセージを送信
    UrlFetchApp.fetch(WEBHOOK_URL, options);
}

/*
  // スクリプト プロパティから読み込み
  let token = SLACK_BOT_TOKEN;
  let slackApp = SlackApp.create(token);
  // 送信内容定義
  let channelId = "C06QD36AEUA";
  // let message = "testメッセージです";
  // let response = slackApp.postMessage(channelId, message);
 
  const postUrl = 'https://slack.com/api/chat.postMessage'
  const blocksData = {
  token: token,
  channel: channelId,
  blocks: [
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": "This is a plain text section block.",
          "emoji": true
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "This is a section block with a button."
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Click Me",
            "emoji": true
          },
          "value": "click_me_123",
          "action_id": "button-action"
        }
      }      
    ]
  }
 */

/**
 * インタラクティブ処理
 *  （投票開始ボタンに紐づいて動作する処理）
 */
function doPost(e) {
    // const postParam = JSON.parse(e.postData.getDataAsString());
    const json = JSON.parse(e.parameter.payload);

    // if (data.type == "url_verification") {
    //   return ContentService.createTextOutput(data.challenge);
    // }

    // //リクエスト検証
    try {
        if (json.token != SLACK_VERIFICATION_TOKEN) throw new Error('Invalid Token')
    } catch (e) {
        return ContentService.createTextOutput(e.message);
    }

    // 表示するモーダル画面情報をpayload（転送データの本体）として設定する
    const payload = {
        "trigger_id": json.trigger_id, //投票開始ボタンに設定されているトリガーID
        "view": MAIN_MODAL, //投票画面のBlockKit
    }

    // モーダル画面を表示する際のオプションを設定する
    const options = {
        "headers": { "Authorization": "Bearer " + SLACK_BOT_TOKEN },
        "method": "post",
        "contentType": "application/json",
        "payload": JSON.stringify(payload),
    };

    // 投票モーダル画面として表示する
    UrlFetchApp.fetch('https://slack.com/api/views.open', options);

    return ContentService.createTextOutput();
}

function doGet(e) {
    return ContentService.createTextOutput();
}