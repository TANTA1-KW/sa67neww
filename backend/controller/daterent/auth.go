package daterent

import (
	"errors"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gtwndtl/projectsa/config"
	"github.com/gtwndtl/projectsa/entity"
	"gorm.io/gorm"
)

type (
    addDaterent struct {
        StartRent time.Time `json:"start_rent"`
        EndRent   time.Time `json:"end_rent"`
        RentID    uint      `json:"rent_id"`
        CarID     uint      `json:"car_id"`
    }
)

// AddDaterent handles the addition of a new daterent record
func AddDaterent(c *gin.Context) {
    var payload addDaterent

    // Bind JSON payload to the struct
    if err := c.ShouldBindJSON(&payload); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    db := config.DB()
    var daterentCheck entity.Daterent

    // Check if the user already has a rent record for the given RentID and CarID
    result := db.Where("rent_id = ? AND car_id = ?", payload.RentID, payload.CarID).First(&daterentCheck)

    if result.Error != nil && !errors.Is(result.Error, gorm.ErrRecordNotFound) {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
        return
    }

    if daterentCheck.ID != 0 {
        c.JSON(http.StatusConflict, gin.H{"status": 409, "error": "Rent record already exists for this RentID and CarID"})
        return
    }

    // Create a new daterent record
    daterent := entity.Daterent{
        StartRent: payload.StartRent,
        EndRent:   payload.EndRent,
        RentID:    &payload.RentID,
        CarID:     &payload.CarID,
    }

    // Save the daterent record to the database
    if err := db.Create(&daterent).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"status": 201, "message": "Daterent added successfully"})
}
