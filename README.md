## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|contnt|string|null: false, foreign_key: false|
|image|string|null: true, foreign_key: false|
|group|references|null: false, foreign_key: true|
|user|references|null: false, foreign_key: true|


### Association
belongs_to :group
belongs_to :user

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|

### Association
 has_many :groups, through: :group_users
 has_many :group_users
 has_many :messages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
 has_many :users, through: :group_users
 has_many :group_users
 has_many :messages

## group_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
 belongs_to :group
 belongs_to :user
