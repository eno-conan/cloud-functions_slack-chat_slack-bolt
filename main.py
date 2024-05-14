import os
import logging
from slack_sdk import WebClient
from slack_sdk.errors import SlackApiError
from dotenv import load_dotenv

# デバッグレベルのログを出力します
logging.basicConfig(level=logging.INFO)

load_dotenv(verbose=True)
slack_token = os.getenv("SLACK_API_BOT_TOKEN")
slack_channel = os.getenv("SLACK_CHANNEL")
client = WebClient(token=slack_token)

try:
    
    # このブロックの内容に関して、PDFのリンクを送信すればいいのか？
    blocks = [
        {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "<https://docs.google.com/forms/d/e/1FAIpQLSf3kJrcEtxjhOrRmpW6M7wAZ-41PmhrFq3r0c-klFjZ7pDkpg/viewform>",
            },
        },
        # button
        {
			"type": "section",
            "block_id":"decision_button",
			"text": {
				"type": "mrkdwn",
				"text": "This is a section block with a button."
			},
			"accessory": {
				"type": "button",
				"text": {
					"type": "plain_text",
					"text": "Click Me",
					"emoji": True
				},
				"value": "click_me_123",
                # この値でこの後の処理につなげる
				"action_id": "decision_button_action"
			}
		}
    ]
    response = client.chat_postMessage(
        channel=slack_channel,
        text="はじめまして :wave: pythonからSlackへ通知テスト:bow:",
        blocks=blocks
    )
    print(response['ok'])
except SlackApiError as e:
    # You will get a SlackApiError if "ok" is False
    # str like 'invalid_auth', 'channel_not_found'
    assert e.response["error"]   
