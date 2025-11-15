package main

import (
	"context"
	"testing"
)

var client, err = getFirestoreClient()

func TestCreateUser(t *testing.T) {
	id, err := createUser(context.Background(), client, user{
		Name:     "John Doe",
		Email:    "john_doe@gmail.com",
		Password: "123456",
	})

	if err != nil {
		t.Fatal(err)
	}
	t.Log(id)
	return
}

func TestGetUser(t *testing.T) {
	User, err := getUser(context.Background(), client, "wjciBppDMQzc1p6mHc7q")

	if err != nil {
		t.Fatal(err)
	}

	t.Log(User)
}

func TestCreateListing(t *testing.T) {
	id, err := createListing(context.Background(), client, listing{
		Title: "Diddy house",
		Body:  "Description of didy house",
		StorageRelationLinks: []string{
			"NOSTORAGE",
		},
		Author:       "ID",
		Ratings:      []rating{},
		Applications: []application{},
		Price:        6767.7,
		Interval:     "night",
	})

	if err != nil {
		t.Fatal(err)
	}

	t.Log(id)
}

func TestGetListing(t *testing.T) {
	Listing, err := getListing(context.Background(), client, "woHxJkbrJ07oHIbBehKJ")

	if err != nil {
		t.Fatal(err)
	}

	t.Log(Listing)
}

func TestApplyForListing(t *testing.T) {
	err := applyForListing(context.Background(), client, "woHxJkbrJ07oHIbBehKJ", application{
		Author:      "wjciBppDMQzc1p6mHc7q",
		ListingID:   "woHxJkbrJ07oHIbBehKJ",
		Description: "I am a gooner and i want to goon at your house",
		Status:      "pending",
	})

	if err != nil {
		t.Fatal(err)
	}
}

func TestRateListing(t *testing.T) {
	err := rateListing(context.Background(), client, "woHxJkbrJ07oHIbBehKJ", rating{
		Author:  "wjciBppDMQzc1p6mHc7q",
		Rating:  6.7,
		Comment: "W gooning pillow and baby oil provided",
	})

	if err != nil {
		t.Fatal(err)
	}
}
