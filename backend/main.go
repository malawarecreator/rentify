package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"time"

	"cloud.google.com/go/firestore"
	"cloud.google.com/go/storage"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"google.golang.org/api/iterator"
)

func main() {
	router := gin.Default()

	// Configure CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:3000", "http://127.0.0.1:3000"}
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}
	config.AllowCredentials = true
	router.Use(cors.New(config))

	client, err := getFirestoreClient()
	if err != nil {
		panic(err)
	}
	storageClient, err := storage.NewClient(context.Background())
	if err != nil {
		panic(err)
	}

	defer func(client *firestore.Client) {
		err := client.Close()
		if err != nil {
			panic(err)
		}
	}(client)

	router.GET("/healthz", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status": "ok",
		})
	})

	router.POST("/createUser", func(c *gin.Context) {
		var User user
		err := c.ShouldBindBodyWithJSON(&User)
		iter := client.Collection("users").Where("email", "==", User.Email).Documents(context.Background())

		for {
			doc, err := iter.Next()
			if errors.Is(err, iterator.Done) {
				break
			}

			if err != nil {
				log.Fatal(err)
			}
			if doc.Exists() {
				c.JSON(400, gin.H{
					"error": "User already exists",
				})
			}
		}

		if err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			log.Println("Failed to create user: " + err.Error())
			return
		}

		id, err := createUser(context.Background(), client, User)
		if err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			log.Println("Failed to create user: " + err.Error())
			return
		}
		log.Println("Created user: " + id)
		c.JSON(201, gin.H{
			"id": id,
		})
	})

	router.GET("/user/:id", func(c *gin.Context) {
		id := c.Param("id")

		User, err := getUser(context.Background(), client, id)

		if err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}
		log.Println("User: " + User.ID)
		c.JSON(200, User)
	})

	router.POST("/createListing", func(c *gin.Context) {
		listingJSON := c.PostForm("data")
		var Listing listing

		if err := json.Unmarshal([]byte(listingJSON), &Listing); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		fileHeader, err := c.FormFile("file")
		if err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		file, err := fileHeader.Open()
		if err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}
		defer file.Close()

		objName := fmt.Sprintf("rentify-data/%d_%s", time.Now().Unix(), fileHeader.Filename)

		w := storageClient.
			Bucket("rentify-data").
			Object(objName).
			NewWriter(context.Background())

		if _, err := io.Copy(w, file); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		if err := w.Close(); err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		fileURL := fmt.Sprintf(
			"https://storage.googleapis.com/%s/%s",
			"rentify-data",
			objName,
		)
		Listing.StorageRelationLinks = append(Listing.StorageRelationLinks, fileURL)

		id, err := createListing(context.Background(), client, Listing)
		if err != nil {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		c.JSON(201, gin.H{"id": id, "url": fileURL})
	})

	router.GET("/listing/:id", func(c *gin.Context) {
		id := c.Param("id")

		Listing, err := getListing(context.Background(), client, id)

		if err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(200, Listing)
	})

	router.GET("/listings", func(c *gin.Context) {
		listings, err := getAllListings(context.Background(), client)

		if err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(200, listings)
	})

	router.DELETE("/deleteListing", func(c *gin.Context) {
		id := c.Query("id")
		err = deleteListing(context.Background(), client, id)
		if err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}
		c.JSON(200, gin.H{
			"deleted": id,
		})
	})

	router.POST("/applyForListing", func(c *gin.Context) {
		listingId := c.Query("id")
		var Application application
		err := c.ShouldBindBodyWithJSON(&Application)
		if err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}

		err = applyForListing(context.Background(), client, listingId, Application)
		if err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(200, gin.H{
			"applied_for_listing": Application,
		})
	})

	router.POST("/unApplyForListing", func(c *gin.Context) {
		listingId := c.Query("id")
		authorId := c.Query("author")

		err := unApplyForListing(context.Background(), client, listingId, authorId)
		if err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(200, gin.H{
			"unapplied_for_listing": listingId,
		})
	})

	router.POST("/rateListing", func(c *gin.Context) {
		listingId := c.Query("id")
		var Rating rating
		err = c.ShouldBindBodyWithJSON(&Rating)

		if err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}

		err = rateListing(context.Background(), client, listingId, Rating)
		if err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}

		c.JSON(200, gin.H{
			"rate_listing": Rating,
		})
	})

	router.POST("/approveApplication", func(c *gin.Context) {
		listingId := c.Query("id")
		listingCreatorId := c.Query("creator")
		applicationAuthorId := c.Query("applicationAuthor")

		err := approveApplication(context.Background(), client, listingId, listingCreatorId, applicationAuthorId)
		if err != nil {
			c.JSON(400, gin.H{
				"error": err.Error(),
			})
			return
		}
	})

	err = router.Run(":8080")
	if err != nil {
		return
	}
}
