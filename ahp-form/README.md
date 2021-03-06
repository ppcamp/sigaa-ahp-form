# ahp-form

## Project setup

<br/>

**Dev tool**

Type `@recommended` in vscode extensions to install some extra tools.

<br/>

**Cmd line**

```bash
# install
npm install

# compile for dev
npm run serve

# compiles and minifies for production
npm run build

# lints and fixes files
npm run lint
```

> Customize configuration
> See [Configuration Reference](https://cli.vuejs.org/config/).

## Running in aws

1. At first, you'll need to get an [aws-instance][aws]
2. Configure a server (in this code I'm using [nginx] due to it's lightweight size)
3. Build this code and put into your server folder
4. Note that, since we're using [nginx] and vue, we must changing the way that our app route, click [here][routing] to see more about it.

### Nginx server

```bash
# To start
sudo service nginx start

# to show the current staus
sudo service nginx status
```

### Copy build files to ssh

```bash
# where dist is this project's build zipped
# scp ORIGIN_FILE USERNAME@HOST:DESTINATION  or ...
# scp USERNAME@HOST:ORIGIN_FILE DESTINATION
scp dist.tar.gz awssigaa:/home/ubuntu

# extract it
tar -xf dist.tar.gz

# move it to folder that are exposed
sudo cp -r * /var/www/html/
```

The `awssigaa` is defined into `.config` file as:

<pre>
Host awssigaa
  HostName SOME_IP
  User ubuntu
  Port 22
  LogLevel INFO
  IdentityFile ~/.ssh/SOME_FILENAME.pem
</pre>

Note that this file must have `chmod 400`;

<!-- Links -->

[aws-instance]: https://console.aws.amazon.com/ec2/v2/home?region=us-east-1#Home:
[nginx]: https://www.nginx.com/blog/setting-up-nginx/
[routing]: https://stackoverflow.com/questions/49072584/vue-router-nginx-and-direct-link
