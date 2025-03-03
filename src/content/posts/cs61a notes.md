---
title: CS61A学习笔记
published: 2025-03-04
description: "看cs61a2024的视频笔记"
image: "https://7365f31.webp.li/docs/1741025285363.png"
tags: ["Code","Notes"]
category: "Learning"
draft: false
---
# CS61A学习笔记

## Funcation

### global frame and local feame

![image-20250227005443348](https://7365f31.webp.li/docs/1740588888604.png)

声明函数时会将函数的定义放在global frame(全局帧)，而在调用时会新建一个local frame，在local frame中调用变量/函数时会优先从local frame中查找进而去global frame中查找，因此local frame followed global frame。

### Environment Diagrams

![image-20250302222140180](https://7365f31.webp.li/docs/1740925306600.png)

### print and None

![image-20250302222508313](https://7365f31.webp.li/docs/1740925508370.png)

None代表没有返回任何值，函数没有指定返回值将会返回None；None不会被解释器展示

![image-20250302222815529](https://7365f31.webp.li/docs/1740925695604.png)

None与其他类型运算会抛出类型错误

#### pure/non-pure functions

![image-20250302223352771](https://7365f31.webp.li/docs/1740926032803.png)

一些函数(如print)不会返回值(返回None)但是会产生side effect，在调用这个函数时会产生

![image-20250302224150047](https://7365f31.webp.li/docs/1740926510721.png)

看完下一节回来尝试习题https://insideempire.github.io/CS61A-Website-Archive/lab/lab01/index.html

## Control

### Multiple Environment in one diagram

![image-20250304012933795](https://7365f31.webp.li/docs/1741022973950.png)

这里有三个不同的frame，两个局部frame followed the全局frame；调用的函数与被调用的函数主体在不同的frame中

![image-20250304013505874](https://7365f31.webp.li/docs/1741023305920.png)

变量名被赋值取决于当前环境最近（从局部frame找到全局frame）的frame里的值，因此可以使形参与函数名相同。

### Some Python features 

#### truefiv and floorfiv

![image-20250304014054854](https://7365f31.webp.li/docs/1741023655550.png)

真除法和整除

#### documents  string

![image-20250304014844151](https://7365f31.webp.li/docs/1741024124846.png)

书写文档字符串以告诉别人这个函数在做什么，且可以配合-v测试代码（也称文档测试）；习惯上形参用大写字母开头

![image-20250304015134487](https://7365f31.webp.li/docs/1741024294560.png)

### conditional statement 

![image-20250304015955571](/Users/heroaclgh/Library/Application Support/typora-user-images/image-20250304015955571.png)

一个if，0-more个elif，0-1个else

![image-20250304020232445](https://7365f31.webp.li/docs/1741024952494.png)

### Iteration

迭代

![image-20250304020547696](https://7365f31.webp.li/docs/1741025148391.png)
