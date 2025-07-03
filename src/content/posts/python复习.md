---
title: python复习
published: 2025-06-22
description: "python复习笔记"
image: "https://7365f31.webp.li/docs/1741025285363.png"
tags: ["Code","Notes"]
category: "Learning"
draft: true
---
# python复习

## 进制转换

0b 开头表示二进制，0o 开头表示八进制，0x 开头表 示十六进制。二进制中，一个数只能出现 0 和 1，八进制中 0 到 7，十六进制中，除了 0 到 9 这十个数以外，还用 a 到 f 表示 10 到 15

对于 0b、0o、0x 的命名由来。 二进制英文为 binary，取首字母表示；八进制英文为 octal，取首字母 o 表示；十六进制英文简写为 hex，取其 中的 x 表示。 

## 小数相加

![image-20250621034155095](https://7365f31.webp.li/docs/1750448522199.png)

![image-20250621034201726](https://7365f31.webp.li/docs/1750448521804.png)

## 字符串比较大小

空字符串<数字(0123...9)<大写字母（ABC...Z）<小写字母（abc...z） 

![image-20250621034349821](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20250621034349821.png)

选择B

## 字符串函数

### （1）字符串查询 

find(str, __start, __end)：查找子串 str 第一次出现的位置，如果找到 则返回相应的索引，否则返回-1。__start 和__end 为可选参数，分别 表示查询的开始索引与结束索引的后一位。 

index(str, __start, __end)：类似于 find，只不过如果没找到会报异常。 其中 find 函数返回第一个字符 p 的索引，index 函数因未找到字符 s 报错。

### （2）大小写转换 

**upper( )、lower( )**：将字符串中所有元素都转为大（小）写 

**swapcase( )**：大写转为小写，小写转为大写。 

**capitalize( )**：第一个单词大写，其余小写。 

**title( )**：每个单词的第一次字符大写。

![image-20250621034659188](https://7365f31.webp.li/docs/1750448819255.png)

### （3）填充字符串 

**center(width, fillchar)、ljust(width, fillchar)、rjust(width, fillchar)** 返回一个指定的宽度 width 的字符串，fillchar 为填充的字符，默认为 空格。非填充字符分别显示在中间、最左侧、最右侧。

![image-20250621034732211](https://7365f31.webp.li/docs/1750448852280.png)

### （4）字符串截断 

**split(seq=‘ ’, num=string.count(str))**以 seq (默认空格)为分隔符截 取字符串。如果 num 有指定值，则仅截取前(num+1)个子字符串。 返回一个列表。num 基本不用。

![image-20250621034835120](https://7365f31.webp.li/docs/1750448915187.png)

### （5）字符串替换 

**replace(old, new [, max])** 将字符串中的 old 替换成 new。如果指定 max，则替换不超过 max 次。函数用得不多，更别提 max 了。

![image-20250621034857622](https://7365f31.webp.li/docs/1750448937678.png)

### （6）去除两端多余字符 

**strip(str)、lstrip(str)、rstrip(str)**：去掉左右两边的字符串 str（默认 为空格）。lstrip 和 rstrip 分别去掉左和右侧字符串 str。

![image-20250621034938103](https://7365f31.webp.li/docs/1750448978169.png)

## 字符串 format 函数

![image-20250621035536836](https://7365f31.webp.li/docs/1750449336927.png)

![image-20250621035546662](https://7365f31.webp.li/docs/1750449346736.png)

### format 函数的字符串填充用法

![image-20250621035650492](https://7365f31.webp.li/docs/1750449410560.png)

有三种填充方式，与 字符串函数里的 ljust()、center()、rjust()类似：原字符串分别居左、居 中、居右。书写格式就是冒号+待填充字符+原字符串对齐方式定义符 +所需长度。几个注意点，待填充的只能是一个字符，不能是字符串， 不写默认为空格填充；

对齐方式定义符也分三种 <：左对齐；^：居中；>：右对齐。 

如果原字符串超出所需长度，则按原字符串输出。至此，这题答 案已经清楚了，选 D。

![image-20250621035820704](https://7365f31.webp.li/docs/1750449500771.png)

这个“10.6” 的意义：如果原字符串小于 6 位，则用填充字符补足到 10 位；如果超出 6 位，则只取前 6 位，剩余 4 位用填充字符补足。

## 逻辑与、或的判别机制

![image-20250621113500070](https://7365f31.webp.li/docs/1750476900136.png)

选A，详见cs61a笔记#Logical Operators部分

## 分支结构

![image-20250621114143819](https://7365f31.webp.li/docs/1750477303890.png)

选C，紧凑形式如下

```python
a = 4 if 2 < 3 else 5

a

>>> 4
```



a 等于 4，如果 2 小 于 3 的话，否则就等于 5

## 异常处理

![image-20250621114628185](https://7365f31.webp.li/docs/1750477588246.png)

A 选项相信只要是跑过 python 程序的人都懂，像语法错误啊、 索引超出范围啊、文件读取不到啊，一旦出现直接寄，管后面写得再 好都没用。 

B 选项的话是这样的，要是一个程序可能出异常的代码占了一半， 也不大正常。

C 选项解释了 else 块的作用：仅在 try 块中代码不出现异常时执 行。 

D 选项就离谱了，except 块才是用来处理异常的。

## 列表、元组、字典、集合

append(x)：把 x 元素添加到列表末尾

pop( [ i ] )：删除列表中索引为 i 的元素，不加索引参数则默认 删除最后一个，并返回这个元素。

remove( x )：删除列表中第一个值为 x 的元素，如果没有，则返 回一个 ValueError 异常

insert( i, x )：在索引为 i 的元素之前插入 x 元素。

index( x [ , __start, __stop ])：返回列表中值为 x 的元素的第一个 索引，__start 和__stop 为可选参数，表示查找的开始索引和结束索引 的下一位，默认的范围为整个列表。如果没有找到会返回一个 ValueError 异常

count( x )：返回列表中值为 x 的元素出现的次数。

copy( )：返回一个与原列表元素相同的新列表。

```python
c=[1,2,3]
b=c
b.pop()
print(b)
print(c)
>>>[1,2]
>>>[1,2]
b=c.copy()
b.pop()
print(b)
print(c)
>>>[1,2]
>>>[1,2,3]
```

如上，b=c后其指向同一块地址，而使用c.copy()后就不受影响了。

clear( )：将列表元素清空。

sort( )、reverse( )：对列表排序，分别是正序和倒序。

```python
ls = [x for x in range(10)]
>>> [0,1,2,3,4,5,6,7,8,9]
```

## 字典

get( key[, __default )：返回指定键 key 的值，如果键不在字典 中，返回可选参数__default 的值

setdefault( key, __default )：如果键存在，键值对不做改变，返 回键对应的值；如果键不存在，则添加该键值对 key: __default

**keys( )、values( )、items( )**：分别返回键、值、键值对数组迭代 器用于 for...in 循环，返回的类型分别为 dict_keys、dict_values、 dict_items，不是列表！但都可通过 list( )方法转换成列表。

## 集合

```python
set1 = {1, 2, 3, 4, 5}
set2 = {1, 3, 5, 7, 9}
# 交运算
print(set1 & set2)
print(set1.intersection(set2))
# 并运算
print(set1 | set2)
print(set1.union(set2))
# 差运算
print(set1 - set2)
print(set1.difference(set2))
>>> {1, 3, 5}
>>> {1, 3, 5}
>>> {1, 2, 3, 4, 5, 7, 9}
>>> {1, 2, 3, 4, 5, 7, 9}
>>> {2, 4}
>>> {2, 4}

```

## 内置函数

**int( )、str( )、list( )、dict( )**：这一类函数还有 tuple( )、set( )等，不 管官方名叫啥，我更喜欢称为强制类型转换函数。
**chr( )、ord( )**：chr 函数传入一个整型值，返回该整型值对应的 Unicode 字符。ord 函数传入一个字符，返回该字符对应的 Unicode 编码。

**all( )、any( )**：传入可迭代参数（理解为组合类型就够了），对其中每 个元素进行判断。all：有假为假，同 and；any：有真为真，同 or。

```python
print(all([1,2,3,[]]))
print(any(('p','y','t','h','o','n')))
>>> False
>>> True
```

divmod( )：传入两个数（不可带虚数），返回商和余数的元组。

```python
divmod(5.5, 2)
>>> (2.0, 1.5)
```

zip( )：将多个可迭代参数同时开始迭代，每一次迭代创建一个元组， 当次迭代位置对应的元素依次填入元组中，最后返回元组组成的列表

```python
t = list(zip((1,2,3,4,5),[6,7,8,9,10,11],'sasasa'))
print(t)
>>> [(1, 6, 's'), (2, 7, 'a'), (3, 8, 's'),
(4, 9, 'a'), (5, 10, 's')]
```

![image-20250621203801256](https://7365f31.webp.li/docs/1750509481503.png)