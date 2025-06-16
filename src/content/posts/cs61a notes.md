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

## 1.Funcation

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

## 2.Control

### Multiple Environment in one diagram

![image-20250304012933795](https://7365f31.webp.li/docs/1741022973950.png)

这里有三个不同的frame，两个局部frame followed the全局frame；调用的函数与被调用的函数主体在不同的frame中

![image-20250304013505874](https://7365f31.webp.li/docs/1741023305920.png)

变量名被赋值取决于当前环境最近（从局部frame找到全局frame）的frame里的值，因此可以使形参与函数名相同。

### Some Python features 

#### truediv and floordiv

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

## 3.Higher-Order Functions

### Control

![image-20250323015714893](https://7365f31.webp.li/docs/1742666241580.png)

纯函数编程思想，自己实现if函数

![image-20250323020311461](https://7365f31.webp.li/docs/1742666591534.png)

![image-20250323020549868](https://7365f31.webp.li/docs/1742666749927.png)

传入的参数如果是表达式会在使用前统一计算，而控制语句会选择执行语句的哪些部分和跳过哪些部分，因此他们在语言中并不仅仅是函数。

### Control Expressions

#### Logical Operators

![image-20250323020934571](https://7365f31.webp.li/docs/1742666974628.png)

2 and 3 --> 3

```python
def has_big_sqrt(x)
	return x > 0 and sqrt(x) > 10
```

可以有效避免遇到x<0时程序的崩溃

![image-20250323021007694](https://7365f31.webp.li/docs/1742667007732.png)

```python
def reasonable(n):
return n == 0 or 1/n !=0
```

### Higher Order Functions

```python
from math import pi,sqrt

def area_square(r):
  assert r > 0, 'A length must be postitive'
  return r*r
```

assert断言如果前数为假，报错并输出后字符串

![image-20250323022455619](https://7365f31.webp.li/docs/1742667895686.png)

![image-20250323022756964](https://7365f31.webp.li/docs/1742668077024.png)

统一化思想

#### Example

![image-20250323023933119](https://7365f31.webp.li/docs/1742668773176.png)

接受另一个函数作为参数的函数称为高阶函数

![image-20250323024405363](https://7365f31.webp.li/docs/1742669046077.png)

通过额外的括号来传入内部帧的函数的参数，原理是先评估前半部分得出结果是一个函数，如下图

![image-20250323024502942](https://7365f31.webp.li/docs/1742669103009.png)

作用，统一方法，移除重复的部分，分散函数功能

#### lambda 特性

- lambda 函数是匿名的：
  所谓匿名函数，通俗地说就是没有名字的函数。lambda函数没有名字。
- lambda 函数有输入和输出：
  输入是传入到参数列表argument_list的值，输出是根据表达式expression计算得到的值。
- lambda 函数拥有自己的命名空间：
  不能访问自己参数列表之外或全局命名空间里的参数，只能完成非常简单的功能。


常见的lambda函数示例：

```python
lambda x, y: x*y			# 函数输入是x和y，输出是它们的积x*y
lambda:None					# 函数没有输入参数，输出是None
lambda *args: sum(args)		# 输入是任意个数参数，输出是它们的和(隐性要求输入参数必须能进行算术运算)
lambda **kwargs: 1			# 输入是任意键值对参数，输出是1
```

# Environments for higher-order functions

高阶函数是以一个函数作为参数的函数

![image-20250328160654925](https://7365f31.webp.li/docs/1743149215049.png)

## env foe nested definitions

![image-20250328161655988](https://7365f31.webp.li/docs/1743149816184.png)

尽管在全局帧调用了f1里定义的函数，但是此函数的父环境在被定义的时候就确定了为f1(即被定义时的环境)，因此adder中的n会优先从f1中获取。

![image-20250328162106782](https://7365f31.webp.li/docs/1743150066959.png)

如何绘制一个环境图

## Local Name

![image-20250328162507385](https://7365f31.webp.li/docs/1743150307510.png)

f和g两个函数的父帧都是全局帧，所以y是f的本地变量，g无法直接访问。

![image-20250328162622908](https://7365f31.webp.li/docs/1743150382958.png)与上一个例子相反，这里的k是nested(嵌套)的，因此可以正常使用。

## Function Composition

![image-20250328163410731](https://7365f31.webp.li/docs/1743150850938.png)

更加复杂的符合高阶函数

## Lambda Expressions

[返回上文](#lambda 特性)

![image-20250328165835757](https://7365f31.webp.li/docs/1743152315924.png)

### Lambda Expressions Versus Def Statements

![image-20250328170915320](https://7365f31.webp.li/docs/1743152955420.png)

在lambda创建并复制后，lambda函数才被赋予名称。

## Function Currying

![image-20250328171451825](https://7365f31.webp.li/docs/1743153291959.png)

把接收多参的函数转化成可以逐个调用单个参数并返回接收剩下参数的函数称为柯里化

