# web-love
    
模仿抖音火一段时间的表白效果页面制作了一个页面，后期加入数据库支持使所有人都能简单快速的制作出这样的页面。
详情查看我的[博客文章](https://www.zkl2333.com/1983.html)。

## 需要的依赖

- node
- mysql
- nginx

## 使用方式

在[http://love.zkl2333.com/set](http://love.zkl2333.com/set)设置字段，点击确定提交。点击弹出的链接即可打开表白页面。可以将此链接永久保留（我的服务器短时间内不会关闭，保险起见建议自己搭建），可以制作成二维码等传播。

## 安装

1. git clone https://github.com/zkl2333/web-love.git
2. 建库建表
    ```sql
    CREATE DATABASE `love` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
    USE love;
    CREATE TABLE `id` (
    `id` int(20) NOT NULL AUTO_INCREMENT,
    `json` longtext NOT NULL,
    `md5` varchar(50) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `md5` (`md5`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8
    ```
3. 在项目根目录新建文件`dbconfig.json`,写入你的数据库配置。
    ```json
    {
        "host": "localhost",
        "user": "root",
        "password": "password",
        "database": "database",
        "port": 3306
    }
    ```
4. 使用``npm start``或``pm2 start main.js``启动项目。
5. 受用``nginx``等反代3000端口。
6. 设置页面在``yoursite.com/set``

## Contribute

如果有任何想法或需求，可以在 issue 中告诉我，同时欢迎各种 pull requests。
