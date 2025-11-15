package main

import (
	"context"
	"errors"
	"fmt"

	"cloud.google.com/go/firestore"
	"google.golang.org/api/iterator"
)

var projectId = "rentify-478316"

type user struct {
	ID       string `firestore:"-"`
	Name     string `firestore:"name"`
	Email    string `firestore:"email"`
	Password string `firestore:"password"` // we would've hashed this... idk why we didn't
}

type rating struct {
	Author  string  `firestore:"author"`
	Rating  float64 `firestore:"rating"`
	Comment string  `firestore:"comment"`
}

type listing struct {
	ID                   string        `firestore:"-"`
	Title                string        `firestore:"title"`
	Body                 string        `firestore:"body"`
	StorageRelationLinks []string      `firestore:"storageRelationLinks"`
	Author               string        `firestore:"author"`
	Ratings              []rating      `firestore:"ratings"`
	Applications         []application `firestore:"applications"`
	Price                float64       `firestore:"price"`
	Interval             string        `firestore:"interval"`
	Available            bool          `firestore:"available"`
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
	docRef := client.Collection("users").Doc(userID)

	snapshot, err := docRef.Get(ctx)

	if err != nil {
		return nil, err
	}

	var user user
	if err := snapshot.DataTo(&user); err != nil {

		return nil, fmt.Errorf("failed to convert firestore data to user struct: %w", err)
	}

	user.ID = docRef.ID

	return &user, nil
}

func createUser(ctx context.Context, client *firestore.Client, User user) (string, error) {
	docRef, _, err := client.Collection("users").Add(ctx, User)

	if err != nil {
		return "", err
	}

	User.ID = docRef.ID

	return User.ID, nil
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

func getAllListings(ctx context.Context, client *firestore.Client) ([]listing, error) {
	iter := client.Collection("listings").Documents(ctx)
	var listings []listing
	for {
		doc, err := iter.Next()

		if err == iterator.Done {
			break
		}

		if err != nil {
			return nil, err
		}
		var Listing listing
		err = doc.DataTo(&Listing)
		if err != nil {
			return nil, err
		}
		Listing.ID = doc.Ref.ID
		listings = append(listings, Listing)
	}

	return listings, nil
}

func getListing(ctx context.Context, client *firestore.Client, listingID string) (*listing, error) {
	docRef := client.Collection("listings").Doc(listingID)

	snapshot, err := docRef.Get(ctx)

	if err != nil {
		return nil, err
	}

	var Listing listing
	if err := snapshot.DataTo(&Listing); err != nil {

		return nil, fmt.Errorf("failed to convert firestore data to listing struct: %w", err)
	}
	Listing.ID = docRef.ID
	return &Listing, nil
}

func createListing(ctx context.Context, client *firestore.Client, Listing listing) (string, error) {
	docRef, _, err := client.Collection("listings").Add(ctx, Listing)

	if err != nil {
		return "", nil
	}

	return docRef.ID, nil
}

func updateListing(ctx context.Context, client *firestore.Client, Listing listing, listingId string) error {
	_, err := client.Collection("listings").Doc(listingId).Set(ctx, Listing)

	if err != nil {
		return err
	}

	return nil
}

func deleteListing(ctx context.Context, client *firestore.Client, listingId string) error {
	_, err := client.Collection("listings").Doc(listingId).Delete(ctx)

	if err != nil {
		return err
	}

	return nil
}

func applyForListing(ctx context.Context, client *firestore.Client, listingId string, Application application) error {
	Listing, err := getListing(ctx, client, listingId)
	if !Listing.Available {
		return errors.New("listing is not available")
	}
	if err != nil {
		return err
	}
	Application.Status = "pending"
	Listing.Applications = append(Listing.Applications, Application)
	return updateListing(ctx, client, *Listing, listingId)
}

func approveApplication(ctx context.Context, client *firestore.Client, listingId string, listingCreatorId string, applicationAuthor string) error {

	Listing, err := getListing(ctx, client, listingId)
	if !Listing.Available {
		return errors.New("listing is not available")
	}
	if err != nil {
		return err
	}

	if listingCreatorId == Listing.Author {
		for _, application := range Listing.Applications {
			if applicationAuthor == application.Author {
				application.Status = "approved"
				Listing.Available = false
				return nil
			}
		}
		return errors.New("application not found")
	} else {
		return errors.New("listing does not belong to this creator")
	}
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

	return updateListing(ctx, client, *listing, listingId)
}

func rateListing(ctx context.Context, client *firestore.Client, listingId string, Rating rating) error {
	listing, err := getListing(ctx, client, listingId)
	if err != nil {
		return err
	}

	listing.Ratings = append(listing.Ratings, Rating)
	return updateListing(ctx, client, *listing, listingId)
}
