package main

import (
	"context"
	"testing"
)

func test_createUser(t *testing.T) {

	client, err := getFirestoreClient()
	if err != nil {
		t.Fatal(err)
	}
	err = createUser(context.Background(), client, user{
		Name:     "ben",
		Email:    "sigma@hawktuah.com",
		Password: "123456",
	})
	if err != nil {
		t.Error(err)
	}

	return
}
