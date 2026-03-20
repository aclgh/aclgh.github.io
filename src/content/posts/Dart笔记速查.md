---
title: Dart笔记速查
published: 2026-03-20
description: "dart的学习笔记"
image: "https://7365f31.webp.li/docs/1774003587.GIF"
tags: ["Code","Notes"]
category: "Learning"
draft: false
---
# Dart学习速查笔记

## 1. 变量与类型

### 1.1 var、dynamic、final、const
> 📂 `变量/变量与常量.dart` · `变量/动态类型.dart`

| 关键字 | 含义 | 能否重新赋值 | 能否换类型 |
|---------|------|:----------:|:--------:|
| `var` | 自动推断，首次赋值后类型固定 | ✅ | ❌ |
| `dynamic` | 关闭静态检查，什么都能赋 | ✅ | ✅ |
| `final` | 运行时常量，只赋值一次 | ❌ | — |
| `const` | 编译时常量，值必须编译期确定 | ❌ | — |

```dart
var age = 20;
// age = "20"; // ❌ var 推断后是 int，不能赋 String

dynamic free = "字符串";
free = 1;      // ✅ dynamic 可以绕过静态检测
free = false;  // ✅

final now = DateTime.now();   // ✅ 运行时确定
const pi = 3.1415926;
// const t = DateTime.now();  // ❌ 不是编译期常量

var long = 2;
// const length = long * pi * 10; // ❌ const 表达式中不允许出现变量
const length = 2 * pi * 10;      // ✅ 全部是编译期常量
```

**易错点**：
- 把 `var` 当成 `dynamic`。`var` 不是"任意类型"，它只是"自动推断类型"。
- `const` 表达式中不能包含任何变量（即使该变量是 `var` 声明的）。

### 1.2 数值类型
> 📂 `变量/数字类型.dart`

- `int` 与 `double` 不能随意互赋，需要用 `toInt()` / `toDouble()` 显式转换。
- `num` 可接收 `int` 和 `double`（`double` 可以直接赋给 `num`）。

```dart
int friendCount = 1;
double appleCount = 1.5;
num rest = 1.5;

// friendCount = appleCount;   // ❌ double 不能直接赋给 int
friendCount = appleCount.toInt();       // ✅ 截断小数
appleCount  = friendCount.toDouble();   // ✅
appleCount  = rest.toDouble();          // ✅ num → double
rest = appleCount;                      // ✅ double → num 直接赋值
```

### 1.3 布尔类型
> 📂 `变量/布尔类型.dart`

- `bool` 只有 `true` / `false` 两个值。
- Dart **不会** 像 JS 那样把 `0`、`""`、`null` 隐式转 `false`，条件必须是 `bool`。

```dart
bool isFinish = false;
print("当前状态为$isFinish");
isFinish = true;
```

---

## 2. 字符串、List、Map

### 2.1 String 模板字符串
> 📂 `变量/String类型.dart`

- 简单变量：`$name`
- 复杂表达式：`${DateTime.now()}`

```dart
String word = "喵";
print("我要说$word");
print("我要在${DateTime.now()}说喵喵喵");
```

### 2.2 List 常用操作
> 📂 `变量/列表类型1.dart` · `变量/列表类型2.dart`

**增删**：

```dart
List students = ['张三', "李四", "王五"];
students.add("小a");              // 尾部添加单个
students.addAll(["小a", "小b"]);  // 尾部添加列表
students.remove("小a");           // 删除满足内容的第一个
students.removeLast();            // pop，返回被删除的项
students.removeRange(0, 2);       // 删除索引 0 和 1（end 不包含！）
```

**查和遍历**：

```dart
// forEach — 对每个元素调用
students.forEach((item) {
  print(item);
});

// every — 是否全部满足条件
bool allZhang = students.every((item) {
  return item.toString().startsWith("张");
});

// where — 筛选满足条件的元素，返回 Iterable，需 .toList()
List filtered = students.where((item) {
  return item.toString().startsWith("张");
}).toList();
```

**常用属性**：

```dart
students.length;   // 长度
students.first;    // 第一个元素
students.last;     // 最后一个元素
students.isEmpty;  // 是否为空
```

**易错点**：`removeRange(start, end)` 的 `end` 不包含。

### 2.3 Map 常用操作
> 📂 `变量/Map类型.dart`

```dart
Map transMap = {"lunch": "午饭", "morning": "早上", "hello": "你好"};

// 访问 & 修改
print(transMap["lunch"]);
transMap["lunch"] = "中饭";

// 合并另一个 Map
transMap.addAll({"fuck": "草"});

// 判断
print(transMap.containsKey("lunch"));

// 遍历
transMap.forEach((key, value) {
  print("$key$value");
});

// 删除 & 清空
transMap.remove("lunch");    // 删除指定 key
transMap.clear();            // 清空所有
```

---

## 3. 函数

### 3.1 基础形式
> 📂 `函数/dart中的函数.dart` · `函数/匿名函数与箭头函数.dart`

```dart
// 普通函数 — 明确返回值
int add(int a, int b) {
  return a + b;
}

// 无返回值
void operate() {
  print("test");
}

// 省略返回类型 → 默认 dynamic
getValue() {
  return 1 + 2;
}

// 箭头函数 — 函数体只有一行，省略 return
int sub(int a, int b) => a - b;

// 匿名函数 — 赋值给变量，可作为参数传递
Function test = () {
  print("测试回调");
};

void onTest(Function callback) {
  callback();   // 匿名函数作为参数
}
```

### 3.2 参数写法
> 📂 `函数/函数的参数.dart`

| 类型 | 语法 | 调用方式 |
|------|------|----------|
| 必选参数 | `f(int a, int b)` | `f(1, 2)` |
| 可选位置参数 | `f(String a, [String? b])` | `f("hello", "happy")` |
| 可选命名参数 | `f(String a, {int? age})` | `f("王", age: 12)` |

```dart
// 可选位置参数 — 中括号包裹，支持默认值
String combine(String a, [String? b, String? c = "c"]) {
  return a + (b ?? "") + (c ?? "");  // ?? 空合并
}

// 可选命名参数 — 大括号包裹，?变量不传为 null
void showPerson(String username, {int? age, String? sex}) {
  print("姓名:$username,年龄:$age,性别:$sex");
}
```

**易错点**：`[]` 是"位置可选"，`{}` 是"命名可选"，调用方式完全不同。

---

## 4. 类与面向对象

### 4.1 类、属性、私有成员
> 📂 `类/类的定义.dart` · `类/公有属性与私有属性.dart`

- `class` 定义类，实例化时 `new` 可省略。
- 以下划线开头是 **"库私有"**（同文件可见，不是类私有）。

```dart
class Person {
  String name = "";
  int age = 0;
  String sex = "男";

  void study() {
    print("$name在学习");
  }
}

Person a = Person();  // new 可省
a.name = "小王";
a.study();
```

> ⚠️ `_name` 是库私有——在其他文件中 `import` 后无法访问 `a._name`，但**同文件内可以**。

### 4.2 构造函数
> 📂 `类/默认构造函数.dart` · `类/命名构造函数.dart` · `类/构造函数语法糖.dart`

**默认构造** → **命名构造** → **语法糖**，三步演进：

```dart
// ① 默认构造函数 — 手动赋值
class Person {
  String? name;
  int? age;
  Person({String? name, int? age}) {
    this.name = name;
    this.age = age;
  }
}

// ② 命名构造函数 — 提供多种创建方式
Person.createPerson({String? name, int? age}) {
  this.name = name;
  this.age = age;
}

// ③ 语法糖 — this.xxx 自动赋值，最简洁
class Person {
  String? _name;
  int? age;
  String? sex;
  Person(this._name, {this.age, this.sex});
  Person.createPerson(this._name, {this.age, this.sex});
}
```

### 4.3 继承、重写
> 📂 `类/继承.dart`

- `extends` 继承，子类**不会**自动继承构造函数。
- 子类构造函数要显式调 `super(...)`。
- `@override` 重写父类方法。

```dart
class Parent {
  String? name;
  int? age;
  Parent({this.name, this.age});
  void study() => print("父类-$name-$age");
}

class Child extends Parent {
  Child({String? name, int? age}) : super(name: name, age: age);

  @override
  void study() => print("子类-$name在学习");
}
```

### 4.4 多态：继承重写 vs 抽象类+接口
> 📂 `类/多态.dart`

两种实现多态的方式：

```dart
// 方式一：继承 + 方法重写
class PayBase {
  void pay() => print("基础支付");
}
class WxPay extends PayBase {
  @override
  void pay() => print("微信支付");
}

// 方式二：抽象类 + implements（接口实现）
abstract class PayBase1 {
  void pay();  // 抽象方法，不写具体实现
}
class WxPay1 implements PayBase1 {
  @override
  void pay() => print("微信支付");
}

// 使用时，父类引用指向子类对象
PayBase wx = WxPay();
wx.pay();  // "微信支付"
```

### 4.5 mixin 混入
> 📂 `类/混入.dart`

- `mixin` 用于"能力复用"，弥补不能继承多个类的缺点。
- 多个 mixin 有同名方法时，**后面的优先级更高**（覆盖前面的）。

```dart
mixin Base {
  void song(String name) => print("$name在唱歌");
}

class Student with Base {
  String? name;
  int? age;
  Student({this.age, this.name});
}

Student a = Student(name: "小王");
a.song(a.name!);  // 非空断言 !
```

### 4.6 泛型
> 📂 `类/泛型.dart`

- 泛型集合：`List<String>`、`Map<String, int>` 限定类型。
- 泛型函数：`T getValue<T>(T value)` 灵活约束。
- 泛型类：`class Student<T, P>` 多个类型参数。

```dart
// 泛型集合
List<String> list = [];
list.add("1");
// list.add(1);  // ❌ 类型不匹配

Map<String, int> map = {};
map["a"] = 1;

// 泛型函数
T getValue<T>(T value) => value;

void printList<T>(List<T> list) {
  list.forEach((item) => print(item));
}
printList<int>([1, 2, 3, 4]);
printList<String>(["1", "2", "3"]);

// 泛型类
class Student<T, P> {
  T? name;
  P? age;
}
Student<String, void> s = Student();
s.name = "";
Student<int, void> s1 = Student();
s1.name = 10;
```

---

## 5. 流程控制

### 5.1 条件分支
> 📂 `流程控制/if分支语句.dart` · `流程控制/switch-case.dart`

```dart
// if / else if / else
int score = 51;
if (score > 80) {
  print("优秀");
} else if (score >= 60) {
  print("及格");
} else {
  print("不及格");
}

// 三元表达式
bool isMarry = false;
print(isMarry ? "恭喜" : "还没有");

// switch-case — 适合枚举/固定值判断
int state = 2;  // 1待付款 2待发货 3待收货 4待评价
switch (state) {
  case 1: print("待付款"); break;
  case 2: print("待发货"); break;
  case 3: print("待收货"); break;
  case 4: print("待评价"); break;
  default: print("未知状态");
}
```

### 5.2 循环与跳转
> 📂 `流程控制/for循环.dart` · `流程控制/while循环.dart`

```dart
List foods = [1, 2, 3, 4, 5, 6];

// for 循环 + break
for (int i = 0; i < foods.length; i++) {
  if (i == 2) break;
  print(foods[i]);
}

// while 循环 + continue
int index = 0;
while (index < foods.length) {
  if (index == 2) {
    index++;     // ⚠️ continue 前必须先更新变量！
    continue;
  }
  print(foods[index]);
  index++;
}
```

**易错点**：`continue` 前忘记修改循环变量 → 死循环。

---

## 6. 运算符与空安全

### 6.1 算术 & 赋值运算符
> 📂 `运算符/算数运算符赋值运算符.dart`

```dart
double item = 10.99;
double allPrice = item * 4;
double money = 100;
double cash = money - allPrice;

print(10 / 3);   // 3.333...  普通除法返回 double
print(10 ~/ 3);  // 3         整除返回 int
print(10 % 3);   // 1         取余
```

赋值运算符：`=` `+=` `-=` `*=` `/=`（注意 `/=` 的左侧变量通常是 `double`）

### 6.2 比较 & 逻辑运算符
> 📂 `运算符/比较运算符与逻辑运算符.dart`

- 比较：`==` `!=` `>` `<` `>=` `<=`
- 逻辑：`&&`（与） `||`（或） `!`（取反）

```dart
bool isOpenDoor = true;
bool isOpenWindow = false;
isOpenWindow && isOpenDoor;  // 逻辑与
isOpenWindow || isOpenDoor;  // 逻辑或
!isOpenWindow;               // 取反
```

### 6.3 空安全三件套
> 📂 `运算符/空安全机制.dart`

| 运算符 | 含义 | 风险 |
|--------|------|------|
| `?.` | 对象为 `null` 时跳过操作，返回 `null` | 低 |
| `??` | 左侧为 `null` 时给默认值 | 低 |
| `!` | 非空断言，强制跳过静态检查 | ⚠️ 最高 |

```dart
String? username = null;             // 声明可空变量
username?.startsWith("新");          // 为 null 时跳过，返回 null
String name = username ?? "aclgh";   // 为 null 时使用后面的默认值
// username!.startsWith("新");       // ⚠️ 若为 null 运行时崩溃
```

---

## 7. 异步：Future 链式 与 async/await

### 7.1 Future 基本用法
> 📂 `异步/事件循环Future类.dart`

```dart
// Future 执行异步任务
Future f = Future(() {
  return "Hello Emu";
  // 没有抛出异常 → 成功状态
});

// then — 接收成功结果
f.then((value) {
  print(value);
});

// catchError — 捕获异常
Future f1 = Future(() {
  throw Exception();
});
f1.catchError((error) {
  print("出现错误了");
});
```

### 7.2 Future + then 链式调用
> 📂 `异步/Future的链式调用.dart`

```dart
Future(() => "Hello World")
    .then((value) => Future(() => "task1"))
    .then((value) => Future(() => "$value-task2"))
    .then((value) => Future(() => "$value-task3"))
    .then<void>((value) {
      print(value);          // "task1-task2-task3"
      throw Exception();
    })
    .catchError((error) {
      print("出现错误");
    });
```

**关键理解**：
- 每个 `then` 的返回值会传给下一个 `then`。
- `throw` 会把错误传到后面的 `catchError`。
- `then<void>` 表示这一步不再产出业务值，`catchError` 里就不需要返回字符串。

### 7.3 async/await（同步风格写异步）
> 📂 `异步/async和await.dart`

```dart
void test() async {
  try {
    await Future(() {
      throw Exception();
    });
    // await 下方的逻辑，永远是在 Future 执行成功之后才执行
    await Future.delayed(Duration(seconds: 3));
    print("执行成功！");
  } catch (e) {
    print("请求出现异常");
  }
}
```

**关键理解**：
- `await` 只能在 `async` 函数里用。
- 看起来像"同步顺序写"，本质还是异步。
- 多步骤异步 + 错误处理时，`async/await + try-catch` 可读性通常更好。

### 7.4 两种写法怎么选

| 场景 | 推荐 |
|------|------|
| 只处理一两个简单 Future | `then/catchError` 足够 |
| 多个步骤有前后依赖 | 优先 `async/await` |
| 团队协作 | 通常 `async/await` 更易维护 |

---

## 8. 高频易错点

| # | 易错点 | 说明 |
|---|--------|------|
| 1 | `var` ≠ `dynamic` | `var` 是自动推断，类型固定后不能换 |
| 2 | `const` 不能包含变量 | 即使是 `var` 声明的变量也不行 |
| 3 | 子类构造漏写 `super(...)` | 子类不会自动继承父类构造函数 |
| 4 | 滥用 `!` 非空断言 | 若实际为 `null` 会运行时崩溃 |
| 5 | 混淆 `[]` 与 `{}` 参数 | `[]` 位置可选 vs `{}` 命名可选 |
| 6 | `_name` 是库私有不是类私有 | 同文件内可以直接访问 |
| 7 | Future 链条类型不一致 | `then<void>` 后 `catchError` 不需要返回值 |
| 8 | `continue` 前不更新变量 | `while` 循环中极易导致死循环 |
| 9 | `removeRange` 的 `end` 不包含 | `removeRange(0, 2)` 只删除索引 0 和 1 |
| 10 | Dart 不做隐式布尔转换 | `if (0)` / `if ("")` 在 Dart 中不合法 |

---

## 9. 关键词索引

**变量与类型**：`var` `dynamic` `final` `const` `int` `double` `num` `String` `bool`
**集合**：`List` `Map` `add` `addAll` `remove` `removeLast` `removeRange` `clear` `where` `every` `forEach` `containsKey` `length` `first` `last` `isEmpty`
**函数**：`void` `=>` `Function` `callback` `[]` `{}` `??`
**类与 OOP**：`class` `_private` `this.xxx` `extends` `super` `@override` `abstract` `implements` `mixin` `with` `<T>`
**流程控制**：`if` `else` `switch` `case` `default` `for` `while` `break` `continue`
**运算符**：`~/` `%` `+=` `-=` `*=` `/=` `&&` `||` `?.` `??` `!`
**异步**：`Future` `then` `catchError` `async` `await` `try-catch` `Future.delayed`
