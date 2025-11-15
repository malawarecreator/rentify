package main

import (
	"context"
	"encoding/json"
	"errors"

	"cloud.google.com/go/firestore"
)

var projectId = "rentify-478316"

type user struct {
	ID       string `firestore:"-"`
	Name     string `firestore:"name"`
	Email    string `firestore:"email"`
	Password string `firestore:"password"` // we would've hashed this... idk why we didn't
}

type rating struct {
	Author  string `firestore:"author"`
	Rating  int    `firestore:"rating"`
	Comment string `firestore:"comment"`
}

type listing struct {
	ID                   string        `firestore:"-"`
	Title                string        `firestore:"title"`
	Body                 string        `firestore:"body"`
	StorageRelationLinks []string      `firestore:"storageRelationLinks"`
	Author               string        `firestore:"author"`
	Ratings              []rating      `firestore:"ratings"`
	Applications         []application `firestore:"applications"`
}

type application struct {
	Author      string `firestore:"author"`
	ListingID   string `firestore:"listingId"`
	Description string `firestore:"description"`
	Status      string `firestore:"status"`
}

func getFirestoreClient() (*firestore.Client, error) {
	client, err := firestore.NewClient(context.Background(), projectId)
	if err != nil {
		return nil, err
	}

	return client, nil
}

func getUser(ctx context.Context, client *firestore.Client, userID string) (*user, error) {
	docRef := client.Collection("user").Doc(userID)

	snapshot, err := docRef.Get(ctx)

	if err != nil {
		return nil, err
	}

	if snapshot.Exists() {
		data := snapshot.Data()

		if data != nil {
			jsonBytes, err := json.Marshal(data)

			if err != nil {
				return nil, err
			}

			var User user

			err = json.Unmarshal(jsonBytes, &User)

			if err != nil {
				return nil, err
			}

			return &User, nil
		}
	} else {
		return nil, errors.New("LISTING_NOT_FOUND")
	}
	return nil, errors.New("NORESULT")
}

func createUser(ctx context.Context, client *firestore.Client, User user) error {
	_, err := client.Collection("users").Doc(User.ID).Create(ctx, User)

	if err != nil {
		return err
	}

	return nil
}

func updateUser(ctx context.Context, client *firestore.Client, User user) error {
	_, err := client.Collection("users").Doc(User.ID).Set(ctx, User)

	if err != nil {
		return err
	}

	return nil
}

func deleteUser(ctx context.Context, client *firestore.Client, User user) error {
	_, err := client.Collection("users").Doc(User.ID).Delete(context.Background())

	if err != nil {
		return err
	}

	return nil
}

func getListing(ctx context.Context, client *firestore.Client, listingID string) (*listing, error) {
	docRef := client.Collection("listings").Doc(listingID)

	snapshot, err := docRef.Get(ctx)

	if err != nil {
		return nil, err
	}

	if snapshot.Exists() {
		data := snapshot.Data()

		if data != nil {
			jsonBytes, err := json.Marshal(data)

			if err != nil {
				return nil, err
			}

			var Listing listing

			err = json.Unmarshal(jsonBytes, &Listing)

			if err != nil {
				return nil, err
			}

			return &Listing, nil
		}
	} else {
		return nil, errors.New("LISTING_NOT_FOUND")
	}
	return nil, errors.New("NORESULT")
}

func createListing(ctx context.Context, client *firestore.Client, Listing listing) error {
	_, err := client.Collection("listings").Doc(Listing.ID).Create(ctx, Listing)

	if err != nil {
		return err
	}

	return nil
}

func updateListing(ctx context.Context, client *firestore.Client, Listing listing) error {
	_, err := client.Collection("listings").Doc(Listing.ID).Set(ctx, Listing)

	if err != nil {
		return err
	}

	return nil
}

func deleteListing(ctx context.Context, client *firestore.Client, Listing listing) error {
	_, err := client.Collection("listings").Doc(Listing.ID).Delete(ctx)

	if err != nil {
		return err
	}

	return nil
}

func applyForListing(ctx context.Context, client *firestore.Client, listingId string, Application application) error {
	listing, err := getListing(ctx, client, listingId)

	if err != nil {
		return err
	}

	listing.Applications = append(listing.Applications, Application)
	return updateListing(ctx, client, *listing)
}

func unApplyForListing(ctx context.Context, client *firestore.Client, listingId string, authorId string) error {
	listing, err := getListing(ctx, client, listingId)
	if err != nil {
		return err
	}

	for i := 0; i < len(listing.Applications); i++ {
		if listing.Applications[i].Author == authorId {
			listing.Applications = append(listing.Applications[:i], listing.Applications[i+1:]...)
		}
	}

	return updateListing(ctx, client, *listing)
}

func rateListing(ctx context.Context, client *firestore.Client, listingId string, Rating rating) error {
	listing, err := getListing(ctx, client, listingId)
	if err != nil {
		return err
	}

	listing.Ratings = append(listing.Ratings, Rating)
	return updateListing(ctx, client, *listing)
}
