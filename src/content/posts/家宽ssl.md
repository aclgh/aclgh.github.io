---
title: 如何在家庭宽带使用反向代理配置ssl
published: 2025-09-14
description: "Let's Encrypt"
image: "https://7365f31.webp.li/docs/1757792449.jpeg"
tags: ["Code","Skill"]
category: "Skill"
draft: false
---
# 如何在家庭宽带使用反向代理配置ssl（Let's Encrypt）

众所周知，家庭宽带就算给你开启了公网ip也会封锁部分端口，例如80和443(当然也不能ping)。但是为了安全起见我还是想配置ssl，那么常规的反向代理就不能使用了，我便探索出了以下的方法。

## 配置acme.sh

首先我们要配置[acme.sh](https://get.acme.sh)，因为80和443的封锁，所以常规的http验证就无法实现，需要借由这个项目配置自动获取ssl证书。

> [!TIP]
>
> 可查看[配置文档](https://github.com/acmesh-official/acme.sh/wiki/%E8%AF%B4%E6%98%8E)快速配置

![image-20250914024226245](https://7365f31.webp.li/docs/1757788946.png)

像这样就安装成功了w，紧接着我们要配置。如果要更方便的获取证书（即不去手动添加dns记录），就要去配置域名解析商。~~我懒得写了你自己看[文档](https://github.com/acmesh-official/acme.sh/wiki/dnsapi)吧~~

## 配置 Nginx

在获取到 SSL 证书之后，就可以配置 Nginx 做反向代理了。由于家庭宽带封锁了 80/443 端口，我们可以选择其他未被封锁的端口（例如 5244）进行 HTTPS 服务。

1. **创建 Nginx 配置文件**
    在 `/etc/nginx/sites-available/` 下创建一个新的配置文件，例如 `myproject.conf`：

   ```
   server {
       listen 5244 ssl;
       server_name yourdomain.com;
   
       ssl_certificate /path/to/fullchain.cer;
       ssl_certificate_key /path/to/private.key;
       ssl_protocols TLSv1.2 TLSv1.3;
       ssl_prefer_server_ciphers on;
   
       location / {
           proxy_pass http://127.0.0.1:5245;  # 这里改为项目实际运行的端口
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

   > ⚠️ 注意将 `ssl_certificate` 和 `ssl_certificate_key` 路径替换为你自己 acme.sh 生成的证书路径。

2. **启用配置并测试语法**

   ```
   sudo ln -s /etc/nginx/sites-available/myproject.conf /etc/nginx/sites-enabled/
   sudo nginx -t
   ```

   如果语法检查通过，则可以重启 Nginx：

   ```
   sudo systemctl restart nginx
   sudo systemctl enable nginx
   ```

3. **开放端口**

   确保路由器和防火墙允许外网访问你选择的端口（例如 5244），这样 HTTPS 才能正常工作。家庭路由器通常需要做端口映射（Port Forwarding）。

## 自动续期证书

acme.sh 可以自动续期证书，但由于证书存放在用户目录或自定义路径，需要让 Nginx 在续期后重新加载证书。

1. **创建续期后执行脚本**

   ```
   #!/bin/bash
   cp /home/user/.acme.sh/yourdomain.com/fullchain.cer /etc/ssl/acme/yourdomain.crt
   cp /home/user/.acme.sh/yourdomain.com/yourdomain.key /etc/ssl/acme/yourdomain.key
   systemctl reload nginx
   ```

   记得给脚本可执行权限：

   ```
   chmod +x /usr/local/bin/reload_nginx_cert.sh
   ```

2. **配置 acme.sh 使用 deploy hook**

   ```
   ~/.acme.sh/acme.sh --install-cert -d yourdomain.com \
       --key-file /home/user/.acme.sh/yourdomain.com/yourdomain.key \
       --fullchain-file /home/user/.acme.sh/yourdomain.com/fullchain.cer \
       --reloadcmd "sudo /usr/local/bin/reload_nginx_cert.sh"
   ```

这样，当证书续期时，Nginx 会自动加载新证书，无需手动干预。(狠狠摸鱼！)