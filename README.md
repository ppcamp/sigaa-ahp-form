sigaa-front

This is a multirepo which contains an [api](ahp-api/README.md) used to send emails, written in
nestjs and an [interface](ahp-form/README.md) written in vuetify (vue framework)

There's an **github action** working over every commit of this repo. See more about by clicking
[here](https://docs.github.com/en/actions)

Why is this a monorepo?
R.: I've decided to use a monorepo due to 2 factors:
- The api is a very lightweight, has only one controller so, we don't need a repo just to this.
  > Another way to create the interface could be using nextjs framework, which problably handle with my api problem.
- The actions in github, usually took some memory, and due the fact that I'm using aws, the best way to do so is creating only one action

Why don't use multiples branches and configure actions for each one?
R.: Because, when doing so, I was getting too much problem to handle with action orders.
> One approach to this, is creating 3 branches (front, back, dev), where dev should (I)compile correctly
> front, (II) move the build content to another place, (III) and compile the api then.

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