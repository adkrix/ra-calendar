ra-calendar
===========

Jquery calendar for bootstrap

Install project

    cd <work-path>/ra-calendar
    bundle install
    npm install

Build distribution in dist/ directory

    grunt

Start development

    grunt server

Update on remote server with ftp

    grunt deploy

For ftp create `.ftppass` file

    {
      "host": "my-server",
      "dest": "/",
      "key": {
        "username": "my-user",
        "password": "my-pass"
      }
    }

Start server in console

    bin/server.sh

Open in browser

    http://127.0.0.1:8080