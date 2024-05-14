import os
import logging
from slack_bolt import App,Ack
from slack_sdk import WebClient
from slack_bolt.adapter.socket_mode import SocketModeHandler

app = App(token = os.environ.get('SLACK_BOT_TOKEN'), 
          signing_secret = os.environ.get("SLACK_SIGNING_SECRET")
          )

@app.action('decision_button_action')
def sample_modal(ack: Ack, body: dict, client: WebClient):
    # ボタンのリクエストを確認
    ack()
    
    # モーダル生成
    client.views_open(
        trigger_id=body['trigger_id'],
        view = {
            'type': 'modal',
            'callback_id': 'modal-id',
            'title': {'type': 'plain_text', 'text': 'Slackチャンネル設定ツール'},
            'close': {'type': 'plain_text', 'text': '閉じる'},
            'blocks': [
                {
            "type": "section",
            "text": {
                "type": "mrkdwn",
                "text": "Hello",
            },
        },
            ],
        },
    )
    
# アプリを起動
if __name__ == '__main__':
    SocketModeHandler(app, os.environ.get('SLACK_APP_TOKEN')).start()
    # app.start(port=int(os.environ.get("PORT", 8080)))