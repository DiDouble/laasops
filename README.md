# 目前进度

![simple_architecture](docs/current_progress/2020-03-24_05-49/1.png)

![simple_architecture](docs/current_progress/2020-03-23_20-04/2.png)

# 接下来

添加LogicDesigner, 使的将Data&Command可以串联起来形成业务

​		定义logic的编码规则
​		运行logic(拓展、性能、稳定、规范)

添加数据输入/输出/订阅/触发 管道



添加执行引擎, 使得可以加载执行Logic



模拟DevOps场景以调整已有功能

......

# 总体来说

从数据的角度驱动由分发、组装由数据和指令库构造的逻辑

![simple_architecture](docs/images/simple_architecture.png)

# LaasHub 组成元素

## 工作站	

### 设计器

![simple_architecture](docs/images/Designer-basic-think.png)

### 用户面板

#### 数据面板

##### 数据操作

##### 数据展示

###### 套版

###### 拓扑

##### 数据状态

#### 使用者面板

##### 用户

##### 角色

##### 流程

##### 权限

#### 审计

## 分发库

分发器分发逻辑业务

## 执行引擎

引擎执行逻辑业务

# 部署

参考 https://hub.docker.com/r/laashub/laasops

```
docker run -d --name laasops -p 5000:80 -v distribution/configs/application.yml:distribution/configs/application.yml  laashub/laasops
```

依赖MySQL, 参考 distribution/dependency/mysql.sh 文件