package main

import (
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/gtwndtl/projectsa/config"
	"github.com/gtwndtl/projectsa/controller/cars"
    "github.com/gtwndtl/projectsa/controller/rent"
    "github.com/gtwndtl/projectsa/controller/daterent"
	"github.com/gtwndtl/projectsa/controller/genders"
	"github.com/gtwndtl/projectsa/controller/users"
	"github.com/gtwndtl/projectsa/middlewares"
)

const defaultPort = "8000"

func main() {
	port := getPort()

	// Open connection to the database
	config.ConnectionDB()

	// Setup database
	config.SetupDatabase()

	r := gin.Default()

	// Use CORS middleware
	r.Use(CORSMiddleware())

	// Auth routes
	r.POST("/signup", users.SignUp)
	r.POST("/signin", users.SignIn)
	r.POST("/addcar", cars.AddCar)
    r.POST("/addrent", rent.AddRent)
    r.POST("/adddaterent", daterent.AddDaterent)

	router := r.Group("/")
	{

		router.Use(middlewares.Authorizes())

		// User Route

		router.PUT("/user/:id", users.Update)

		router.GET("/users", users.GetAll)

		router.GET("/user/:id", users.Get)

		router.DELETE("/user/:id", users.Delete)

		// Car routes
		router.PUT("/cars/:id", cars.Update)

		router.GET("/cars", cars.GetAll)

		router.GET("/cars/:id", cars.Get)

		router.DELETE("/cars/:id", cars.Delete)

        // rent routes
        router.PUT("/rent/:id", rent.Update)
 
        router.GET("/rent", rent.GetAll)
 
        router.GET("/rent/:id", rent.Get)
 
        router.DELETE("/rent/:id", rent.Delete)
 
        // Car routes
        router.PUT("/daterent/:id", daterent.Update)
 
        router.GET("/daterent", daterent.GetAll)
 
        router.GET("/daterent/:id", daterent.Get)
 
        router.DELETE("/daterent/:id", daterent.Delete)

	}
	// Gender route
	r.GET("/genders", genders.GetAll)

	// Root route
	r.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "API RUNNING... PORT: %s", port)
	})

	// Run the server
	r.Run(":" + port)
}

func getPort() string {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
	return port
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
