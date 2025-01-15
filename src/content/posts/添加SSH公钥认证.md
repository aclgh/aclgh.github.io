# 添加SSH公钥认证

之前长期以来都是手动输入密码在vscode上连接远程服务器，但比较生草的是连接时输入一次，打开文件夹还要再输入一次，实在是反人类，就研究了一下怎么简单的开启SSH公钥认证并记录下来。

## 生成密钥对

```bash
ssh-keygen -t rsa -b 4096
```

确保你安装了git，然后先使用这个指令生成密钥对，无特殊需求一直回车即可。

![image-20250115145000122](https://7365f31.webp.li/docs/1736923800176.png)

这里我用的是cmd，但是下一步的操作cmd就不行了，需要打开gitbash

## 将公钥复制到远程服务器

```bash
ssh-copy-id username@remote_host
```

把后面替换成你的登录用户名和主机地址，中间会提示你输入一次密码。

![image-20250115145245720](https://7365f31.webp.li/docs/1736923965753.png)

到这里服务器就配置好了，接下来要配置一下vscode。

## 配置vscode的sshconfig

Ctrl+Shitf+P之后输入sshconfig

在你原本的配置中加入下面一段配置：

```ssh config
Port 22
  PreferredAuthentications publickey
  IdentityFile "C:\Users\Administrator\.ssh\id_rsa"
```

![image-20250115145806992](https://7365f31.webp.li/docs/1736924287027.png)

到这里就配置完了，之后登录就不需要繁琐的输入密码了