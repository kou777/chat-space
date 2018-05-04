## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false, foreign_key: false|
|image|string|null: true, foreign_key: false|
|group|references|null: false, foreign_key: true|
|user|references|null: false, foreign_key: true|
|timestamps|timestamp|

### Association
belongs_to :group
belongs_to :user

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|null: false, foreign_key: false, unique: true|
|timestamps|timestamp|

### Association
 has_many :groups, through: :members
 has_many :members

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|timestamps|timestamp|

### Association
 has_many :users, through: :members
 has_many :members

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
 belongs_to :group
 belongs_to :user
