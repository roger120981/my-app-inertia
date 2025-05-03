<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Service extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'participant_id', 'agency_id', 'type', 'weekly_hours',
        'weekly_units', 'start_date', 'end_date', 'status',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
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

    public function participant(): BelongsTo
    {
        return $this->belongsTo(Participant::class);
    }

    public function agency(): BelongsTo
    {
        return $this->belongsTo(Agency::class);
    }

    public function caregivers(): BelongsToMany
    {
        return $this->belongsToMany(Caregiver::class, 'service_caregiver')
                    ->withPivot('assigned_hours', 'assigned_at')
                    ->withTimestamps();
    }

    public function getAllowedFieldsAttribute(): array
    {
        switch ($this->type) {
            case 'Home Care':
            case 'ADHC':
                return ['weekly_hours', 'weekly_units']; // Ambos permitidos
            case 'HDM':
                return ['weekly_units']; // Solo unidades
            default:
                return ['weekly_hours', 'weekly_units']; // Por defecto, ambos
        }
    }

    public function getHoursLabelAttribute(): string
    {
        return 'Weekly Hours';
    }

    public function getUnitsLabelAttribute(): string
    {
        return 'Weekly Units';
    }
}