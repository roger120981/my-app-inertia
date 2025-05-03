<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Participant extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'name', 'medicaid_id', 'gender', 'dob', 'address',
        'primary_phone', 'secondary_phone', 'community', 'is_active', 'case_manager_id',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'dob' => 'date',
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

    public function services(): HasMany
    {
        return $this->hasMany(Service::class);
    }

    public function caseManager(): BelongsTo
    {
        return $this->belongsTo(CaseManager::class);
    }
}