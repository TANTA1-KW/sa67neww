package rent

import (
    "errors"
    "net/http"
    "gorm.io/gorm"
    "github.com/gin-gonic/gin"
    "github.com/gtwndtl/projectsa/config"
    "github.com/gtwndtl/projectsa/entity"
)

type (
    addRent struct {
    	Status string `json:"status"`
    	UserID uint    `json:"user_id"`
    }
)

// AddRent handles the addition of a new rent record
func AddRent(c *gin.Context) {
    var payload addRent

    // Bind JSON payload to the struct
    if err := c.ShouldBindJSON(&payload); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    db := config.DB()
    var rentCheck entity.Rent

    // Check if the user already has a rent record (assuming a user can only have one rent at a time)
    result := db.Where("user_id = ?", payload.UserID).First(&rentCheck)

    if result.Error != nil && !errors.Is(result.Error, gorm.ErrRecordNotFound) {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }

    if rentCheck.ID != 0 {
        c.JSON(http.StatusConflict, gin.H{"status": 409, "error": "User already has a rent record"})
        return
    }

    // Create a new rent record
    rent := entity.Rent{
        Status: payload.Status,
        UserID: &payload.UserID,
    }

    // Save the rent record to the database
    if err := db.Create(&rent).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"status": 201, "message": "Rent added successfully"})
}
