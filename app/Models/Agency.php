<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Agency extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = ['name', 'contact_info'];

    protected $casts = [
        'contact_info' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) \Illuminate\Support\Str::uuid();
            }
        });
    }

    public function caseManagers(): HasMany
    {
        return $this->hasMany(CaseManager::class);
    }

    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }
}