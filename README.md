sigaa-front

This is a multirepo which contains an [api](ahp-api/README.md) used to send emails, written in
nestjs and an [interface](ahp-form/README.md) written in vuetify (vue framework)

There's an **github action** working over every commit of this repo. See more about by clicking
[here]()

---

However, the github actions must be iniatlized, one way of do that, is creating a serivice:

1. Create a file that will be used by the service
```bash
sudo touch /etc/systemd/system/gh-actions.service
```

2. Edit the file
<pre>
[Unit]
Description=Github action services
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=always
RestartSec=1
User=ubuntu
ExecStart=/home/ubuntu/actions-runner/run.sh

[Install]
WantedBy=multi-user.target
</pre>

1. Configure the service
```bash
# autostart
sudo systemctl enable gh-actions

# start
sudo systemctl start gh-actions
```

With configuration above, your serve will automatically lauch github actions