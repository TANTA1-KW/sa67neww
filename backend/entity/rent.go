package entity

import (
    "gorm.io/gorm"
)

type Rent struct {
    gorm.Model

    Status         string      

    UserID   *uint  
    User     Users  `gorm:"foreignKey:UserID"`

}
