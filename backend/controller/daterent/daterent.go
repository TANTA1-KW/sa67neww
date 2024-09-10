package daterent

import (
    "net/http"

    "github.com/gin-gonic/gin"
    "github.com/gtwndtl/projectsa/config"
    "github.com/gtwndtl/projectsa/entity"
)

func GetAll(c *gin.Context) {
    var daterent []entity.Daterent

    db := config.DB()
    results := db.Preload("Rent").Preload("Car").Find(&daterent) // Changed "Cars" to "Car" to match the model

    if results.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
        return
    }

    c.JSON(http.StatusOK, daterent)
}

func Get(c *gin.Context) {
    ID := c.Param("id")
    var daterent entity.Daterent

    db := config.DB()
    result := db.Preload("Rent").Preload("Car").First(&daterent, ID) // Changed "Cars" to "Car"

    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "Resource not found"})
        return
    }

    if daterent.ID == 0 {
        c.JSON(http.StatusNoContent, gin.H{})
        return
    }

    c.JSON(http.StatusOK, daterent)
}

func Update(c *gin.Context) {
    var input entity.Daterent
    ID := c.Param("id")

    db := config.DB()
    var daterent entity.Daterent
    result := db.First(&daterent, ID)

    if result.Error != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "ID not found"})
        return
    }

    if err := c.ShouldBindJSON(&input); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"status": 400, "message": "Invalid request payload"})
        return
    }

    // Update fields manually to avoid overwriting relationships
    daterent.StartRent = input.StartRent
    daterent.EndRent = input.EndRent
    daterent.RentID = input.RentID
    daterent.CarID = input.CarID

    result = db.Save(&daterent)

    if result.Error != nil {
        c.JSON(http.StatusBadRequest, gin.H{"status": 400, "message": "Failed to update"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"status": 200, "message": "Update successful"})
}

func Delete(c *gin.Context) {
    id := c.Param("id")

    db := config.DB()
    if tx := db.Delete(&entity.Daterent{}, id); tx.RowsAffected == 0 {
        c.JSON(http.StatusNotFound, gin.H{"status": 404, "error": "ID not found"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"status": 200, "message": "Deletion successful"})
}
