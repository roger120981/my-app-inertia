<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Caregiver extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'name', 'email', 'phone', 'is_active', 'certifications', 'available_hours',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'certifications' => 'array',
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

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(Service::class, 'service_caregiver')
                    ->withPivot('assigned_hours', 'assigned_at')
                    ->withTimestamps();
    }
}