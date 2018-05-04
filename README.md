## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false, foreign_key: false|
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
 has_many :groups, through: :members
 has_many :members
 has_many :messsages

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
 has_many :users, through: :members
 has_many :members
 has_many :messages

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
 belongs_to :group
 belongs_to :user
