package entity

import (
	"time"
	"gorm.io/gorm"
)

type LeaveRequest struct {
	gorm.Model
	Day time.Time `json:"day"`
	Description string    `json:"description"`
}