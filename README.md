## uaersテーブル
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|

### Association
- has_many :groups
- has_many :messages
- has_many :groups, through: :groups_users


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|

### Association
- has_many :users
- has_many :messages
- has_many :users, through: :groups_users


## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## messages
|Column|Type|Options|
|------|----|-------|
|image|text||
|body|text|null: false|

### Association
- belongs_to :user
- belongs_to :group
