package Leave

import (
	"time"
	"encoding/json"
	"errors"
	"net/http"
	"gorm.io/gorm"
	"github.com/gin-gonic/gin"
	"github.com/gtwndtl/projectsa/config"
	"github.com/gtwndtl/projectsa/entity"
 )
 
 type CustomDate time.Time
 
 const dateFormat = "2006-01-02"
 
 // Custom UnmarshalJSON to handle date parsing
 func (d *CustomDate) UnmarshalJSON(b []byte) error {
	 str := string(b)
	 t, err := time.Parse(`"`+dateFormat+`"`, str)
	 if err != nil {
		 return err
	 }
	 *d = CustomDate(t)
	 return nil
 }
 // Custom MarshalJSON to handle date formatting
 func (d CustomDate) MarshalJSON() ([]byte, error) {
	 t := time.Time(d)
	 return json.Marshal(t.Format(dateFormat))
 }
 
 
 
 
 type (
	 addLeaveRequest struct {
		 Day        CustomDate `json:"day"`
		 Description string    `json:"description"`
	 }
 )
 func AddLeaveRequest(c *gin.Context) {
	 var payload addLeaveRequest
 
	 // Bind JSON payload to the struct
	 if err := c.ShouldBindJSON(&payload); err != nil {
		 c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		 return
	 }
 
	 // Convert day from string to time.Time
	 day := time.Time(payload.Day)
 
 
	 db := config.DB()
	 var leaveRequestCheck entity.LeaveRequest
 
	 // Check if there is already a leave request for the same day
	 result := db.Where("day = ?", day).First(&leaveRequestCheck)
 
	 if result.Error != nil && !errors.Is(result.Error, gorm.ErrRecordNotFound) {
		 c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		 return
	 }
 
	 if leaveRequestCheck.ID != 0 {
		 c.JSON(http.StatusConflict, gin.H{"status": 409, "error": "Leave request for this day already exists"})
		 return
	 }
 
	 // Create a new leave request
	 leaveRequest := entity.LeaveRequest{
		 Day:         day,
		 Description: payload.Description,
	 }
 
	 // Save the leave request to the database
	 if err := db.Create(&leaveRequest).Error; err != nil {
		 c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		 return
	 }
 
	 c.JSON(http.StatusCreated, gin.H{"status": 201, "message": "Leave request added successfully"})
 }
 