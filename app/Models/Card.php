<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    use HasFactory;

<<<<<<< HEAD
    protected $fillable = ['title','user_id', 'imgurl', 'videourl', 'audiourl'];
=======
    protected $fillable = ['title','author', 'imgurl', 'videourl', 'audiourl'];
>>>>>>> bffbfaa1dd0f238b3c7ba0744915a5dfe1100ad6

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
<<<<<<< HEAD
        public function likes()
    {
        return $this->hasMany(Like::class);
    }
    public function user() {
        return $this->belongsTo(User::class);
    }

         public function subscribers()
    {
        return $this->hasMany(Subscriber::class);
    }
=======
>>>>>>> bffbfaa1dd0f238b3c7ba0744915a5dfe1100ad6
}
