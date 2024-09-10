package cars

import (
    "errors"
    "net/http"
    "gorm.io/gorm"
    "github.com/gin-gonic/gin"
    "github.com/gtwndtl/projectsa/config"
    "github.com/gtwndtl/projectsa/entity"
)

type (
    addCar struct {
        LicensePlate string `json:"license_plate"`
        Province     string `json:"province"`
        Brands       string `json:"brands"`
        Models       string `json:"models"`
        ModelYear    string `json:"model_year"`
        Color        string `json:"color"`
        VIN          string `json:"vehicle_identification_number"`
        VRN          string `json:"vehicle_registration_number"`
        Status  string  `json:"status"`
        Type string `json:"type"`
        Picture      string `json:"picture"`
        
    }
)

// AddCar handles the addition of a new car
func AddCar(c *gin.Context) {
    var payload addCar

    // Bind JSON payload to the struct
    if err := c.ShouldBindJSON(&payload); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    db := config.DB()
    var carCheck entity.Cars

    // Check if the car with the provided license plate already exists
    result := db.Where("license_plate = ?", payload.LicensePlate).First(&carCheck)

    if result.Error != nil && !errors.Is(result.Error, gorm.ErrRecordNotFound) {
        c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
       return
    }

    if carCheck.ID != 0 {
        c.JSON(http.StatusConflict, gin.H{"status": 409, "error": "Car with this license plate already exists"})
       return
    }

    // Create a new car
    cars := entity.Cars{
        LicensePlate: payload.LicensePlate,
        Province:     payload.Province,
        Brands:       payload.Brands,
        Models:       payload.Models,
        ModelYear:    payload.ModelYear,
        Color:        payload.Color,
        VIN:          payload.VIN,
        VRN:          payload.VRN,
        Status: payload.Status,
        Type: payload.Type,
        Picture:      payload.Picture,
        
    }

    
    // Save the car to the database
    if err := db.Create(&cars).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, gin.H{"status": 201,"message": "Car added successfully"})
}



