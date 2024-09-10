package entity

import (
    "gorm.io/gorm"
    "time"
)

type Daterent struct {
    gorm.Model

    StartRent time.Time 
    EndRent   time.Time 
    RentID *uint
    Rent   Rent `gorm:"foreignKey:RentID"`

    CarID *uint
    Car   Cars `gorm:"foreignKey:CarID"`
}
