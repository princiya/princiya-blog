---
title: Managing pythons on MacOS
date: '2020-09-29'
spoiler: Handling different python versions on MacOS
cta: 'Pythons on MacOS'
tags: ["technical", "notes"]
cover: './python.png'
---

This post is more of a personal notes. Recently, I had to run a script on my machine which until then was only run by one person in our office. The problem started with us having different [openssl](https://www.openssl.org/) versions. I had `LibreSSL` vs the other person had `OpenSSL`.

This started creating one problem after the other. For example the script passed in `pbkdf2` argument into the `openssl` cipher and this wasn't supported in `LibreSSL`[Link](https://stackoverflow.com/questions/61938795/openssl-pbkdf2-option-no-longer-supported)

I updated `openssl` to the correct version to support the above mentioned `pbkdf2` cipher; the next error was the following `Error: No available formula with the name "python@2"`

I tried to reinstall python@2 like [this](https://stackoverflow.com/a/63725223/2672494).

This fixed the openssl error, but the `awscli` was broken and got the following error `ERROR:root:code for hash md5 was not found.`

> As of Feb. 10, 2020, python@2 was removed from homebrew.

I followed the steps mentioned [here](https://stackoverflow.com/a/59816812/2672494), but `awscli` was still broken.

I updated the `awscli` to [version 2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-mac.html#cliv2-mac-install-cmd).

Then I tried to add `awscli` to the `PATH` as mentioned [here](https://docs.aws.amazon.com/cli/latest/userguide/install-macos.html#awscli-install-osx-path)

`awscli` and `openssl` were both fixed, but now I had to upgrade all `awscli` commands to the version 2.

For example: `aws ecr get-login-password` [link to connect to docker](https://docs.aws.amazon.com/AmazonECR/latest/userguide/Registries.html#registry_auth)

It took me one and a half days to finally have the script running on my machine too. I hope this post helps someone.