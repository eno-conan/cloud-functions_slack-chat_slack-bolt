// 定数定義
const SLACK_BOT_TOKEN = PropertiesService.getScriptProperties().getProperty("SLACK_BOT_TOKEN");
const SLACK_VERIFICATION_TOKEN = PropertiesService.getScriptProperties().getProperty("SLACK_VERIFICATION_TOKEN");
const WEBHOOK_URL = PropertiesService.getScriptProperties().getProperty("WEBHOOK_URL");
const MAIN_MODAL = {
    "type": "modal",
    "title": {
        "type": "plain_text",
        "text": "XXXの投票",
        "emoji": true
    },
    "submit": {
        "type": "plain_text",
        "text": "投票を確定",
        "emoji": true
    },
    "close": {
        "type": "plain_text",
        "text": "キャンセル",
        "emoji": true
    },
    "blocks": [
        {
            "type": "section",
            "text": {
                "type": "plain_text",
                "text": "XXXの投票です",
                "emoji": true
            }
        },
        {
            "type": "divider"
        },
        {
            "type": "input",
            "block_id": "block_vote_getter",
            "label": {
                "type": "plain_text",
                "text": "得票者",
                "emoji": true
            },
            "element": {
                "type": "users_select",
                "placeholder": {
                    "type": "plain_text",
                    "text": "得票者を選んでください",
                    "emoji": true
                },
                "action_id": "action_vote_getter"
            }
        },
        {
            "type": "input",
            "block_id": "block_vote_reason",
            "label": {
                "type": "plain_text",
                "text": "投票理由"
            },
            "element": {
                "type": "plain_text_input",
                "placeholder": {
                    "type": "plain_text",
                    "text": "投票理由を記載してください"
                },
                "multiline": true,
                "action_id": "action_vote_reason"
            }
        }
    ]
}