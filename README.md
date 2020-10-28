


### 相应字段有: 
    type 字段数据类型(sequlize. s…) 
    allowNull(是否允许为空true,false) 
    autoIncrement(自增, true ,false) 
    unique(唯一性, true,false, string) 
    comment (解释 说明)
    defaultValue (字段默认值)
    primaryKey (对主键的设置, true,false) 
    defaultValue(默认值的设置) 



  ### 定义表关联
 foreignKey 指定外键
 targetKey 目标键
  belongsTo  属于 一对一
  hasMany   一对多 有很多
  hasOne
  BelongsToMany
  // 将userId添加到Article模型
  Article.belongsTo(User,{foreignKey:'userId',targetKey:'id',as:'comment'});
  constraints: false禁用外键约束


// 文章属于某一个用户
Article.belongsTo(User, { foreignKey: 'userId', constraints: false });
//用户一对多个文章 关联文章
User.hasMany(Article, { constraints: false });
//文章属于某一个分类
Article.belongsTo(ArticleSort, { foreignKey: 'articleSortId', constraints: false, });
//一个分类里有很多文章
ArticleSort.hasMany(Article, { constraints: false });
//评论属于某一个用户
ArticleComment.belongsTo(User, { foreignKey: 'commentUserId', constraints: false, as: 'commentUser' });
//关联replyUserId 回复评论的人员
ArticleComment.belongsTo(User, { foreignKey: 'replyUserId', constraints: false, as: 'replyUser' });
//文章评论表自关联 rootId = id 自关联
ArticleComment.hasMany(ArticleComment, { foreignKey: 'rootId', as: 'childComment', constraints: false });
  
 

