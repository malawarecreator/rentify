export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:8080"

async function parseResponse<T>(res: Response, fallbackMessage: string): Promise<T> {
  if (!res.ok) {
    let details = fallbackMessage;
    try {
      const data = (await res.json()) as { error?: string; message?: string };
      if (data?.error) details = data.error;
      else if (data?.message) details = data.message;
    } catch (_) {
      // ignore json parse issues
    }

    // Add more specific error messages based on status code
    if (res.status === 404) {
      details = `${fallbackMessage}: Endpoint not found`;
    } else if (res.status === 500) {
      details = `${fallbackMessage}: Server error`;
    } else if (res.status >= 400 && res.status < 500) {
      details = `${fallbackMessage}: Client error (${res.status})`;
    }

    console.error('API Error:', res.status, res.statusText, details);
    throw new Error(details);
  }

  try {
    // Check if response has content before trying to parse JSON
    const contentLength = res.headers.get('content-length');
    const contentType = res.headers.get('content-type');

    // If no content-length or content-type doesn't indicate JSON, return empty object
    if (contentLength === '0' || !contentType?.includes('application/json')) {
      return {} as T;
    }

    const text = await res.text();
    if (!text.trim()) {
      // Empty response body
      return {} as T;
    }

    return JSON.parse(text) as T;
  } catch (error) {
    console.error('Failed to parse JSON response:', error, 'Response status:', res.status);
    throw new Error(`${fallbackMessage}: Invalid response format`);
  }
}

export interface ApiUser {
  ID: string;
  Name: string;
  Email: string;
  Password?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

const mapUser = (user: ApiUser): User => ({
  id: user.ID,
  name: user.Name,
  email: user.Email,
});

export interface ApiApplication {
  Author: string;
  ListingID: string;
  Description: string;
  Status: string;
}

export interface Application {
  author: string;
  listingId: string;
  description: string;
  status: string;
}

const mapApplication = (application: ApiApplication): Application => ({
  author: application.Author,
  listingId: application.ListingID,
  description: application.Description,
  status: application.Status,
});

export interface ApiRating {
  Author: string;
  Rating: number;
  Comment: string;
}

export interface Rating {
  author: string;
  rating: number;
  comment: string;
}

const mapRating = (rating: ApiRating): Rating => ({
  author: rating.Author,
  rating: rating.Rating,
  comment: rating.Comment,
});

export interface ApiListing {
  ID: string;
  Title: string;
  Body: string;
  StorageRelationLinks?: string[] | null;
  Author: string;
  Ratings?: ApiRating[] | null;
  Applications?: ApiApplication[] | null;
  Price: number;
  Interval: string;
  Available: boolean;
}

export interface Listing {
  id: string;
  title: string;
  body: string;
  storageRelationLinks: string[];
  author: string;
  ratings: Rating[];
  applications: Application[];
  price: number;
  interval: string;
  available: boolean;
}

const mapListing = (listing: ApiListing): Listing => ({
  id: listing.ID,
  title: listing.Title,
  body: listing.Body,
  storageRelationLinks: listing.StorageRelationLinks ?? [],
  author: listing.Author,
  ratings: (listing.Ratings ?? []).map(mapRating),
  applications: (listing.Applications ?? []).map(mapApplication),
  price: listing.Price,
  interval: listing.Interval,
  available: listing.Available,
});

export async function checkApiHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/healthz`, {
      cache: "no-store",
    });
    return res.ok;
  } catch (error) {
    console.warn('API health check failed:', error);
    return false;
  }
}

export async function fetchListings(): Promise<Listing[]> {
  console.log('Fetching listings from:', `${API_BASE_URL}/listings`);

  try {
    const res = await fetch(`${API_BASE_URL}/listings`, {
      cache: "no-store",
      headers: {
        'Content-Type': 'application/json',
      },
      // Add mode: 'cors' to ensure CORS is properly handled
      mode: 'cors',
    });

    console.log('Response status:', res.status, res.statusText);

    // Check for CORS-related errors
    if (res.status === 0 || res.type === 'opaque') {
      throw new Error('CORS error: Backend does not allow requests from this origin. Please check backend CORS configuration.');
    }

    const listings = await parseResponse<ApiListing[]>(res, "Unable to load listings");
    console.log('Fetched listings:', listings.length);
    return listings.map(mapListing);
  } catch (error) {
    // Handle CORS errors specifically
    if (error instanceof TypeError && error.message.includes('CORS')) {
      throw new Error('CORS error: Backend does not allow requests from this origin. The API may need CORS headers configured.');
    }
    throw error;
  }
}

export async function fetchListing(id: string): Promise<Listing> {
  const res = await fetch(`${API_BASE_URL}/listing/${id}`, {
    cache: "no-store",
  });
  const listing = await parseResponse<ApiListing>(res, "Unable to load listing");
  return mapListing(listing);
}

export interface CreateListingPayload {
  title: string;
  body: string;
  price: number;
  interval: string;
  author: string;
  file: File;
  available?: boolean;
}

export async function createListing(payload: CreateListingPayload): Promise<{ id: string; url: string }> {
  const formData = new FormData();
  const listingData = {
    title: payload.title,
    body: payload.body,
    price: payload.price,
    interval: payload.interval,
    author: payload.author,
    available: payload.available ?? true,
    storageRelationLinks: [] as string[],
    ratings: [] as Rating[],
    applications: [] as Application[],
  };

  formData.append("data", JSON.stringify(listingData));
  formData.append("file", payload.file);

  const res = await fetch(`${API_BASE_URL}/createListing`, {
    method: "POST",
    body: formData,
  });

  return parseResponse<{ id: string; url: string }>(res, "Unable to create listing");
}

export async function deleteListing(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/deleteListing?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
  await parseResponse<{ deleted: string }>(res, "Unable to delete listing");
}

export interface ApplyForListingPayload {
  author: string;
  description: string;
}

export async function applyForListing(
  listingId: string,
  payload: ApplyForListingPayload
): Promise<void> {
  const res = await fetch(
    `${API_BASE_URL}/applyForListing?id=${encodeURIComponent(listingId)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: payload.author,
        description: payload.description,
        listingId,
      }),
    }
  );

  await parseResponse<unknown>(res, "Unable to apply for listing");
}

export interface RateListingPayload {
  author: string;
  rating: number;
  comment: string;
}

export async function rateListing(
  listingId: string,
  payload: RateListingPayload
): Promise<void> {
  const res = await fetch(
    `${API_BASE_URL}/rateListing?id=${encodeURIComponent(listingId)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        author: payload.author,
        rating: payload.rating,
        comment: payload.comment,
      }),
    }
  );

  await parseResponse<unknown>(res, "Unable to rate listing");
}

export async function approveApplication(
  listingId: string,
  listingCreatorId: string,
  applicationAuthorId: string
): Promise<void> {
  const res = await fetch(
    `${API_BASE_URL}/approveApplication?id=${encodeURIComponent(listingId)}&creator=${encodeURIComponent(listingCreatorId)}&applicationAuthor=${encodeURIComponent(applicationAuthorId)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }
  );

  await parseResponse<unknown>(res, "Unable to approve application");
}

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

export async function createUserAccount(payload: CreateUserPayload): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/createUser`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      password: payload.password,
    }),
  });

  const data = await parseResponse<{ id: string }>(res, "Unable to create user");
  return {
    id: data.id,
    name: payload.name,
    email: payload.email,
  };
}

export async function fetchUserById(id: string): Promise<User> {
  const res = await fetch(`${API_BASE_URL}/user/${id}`, {
    cache: "no-store",
  });
  const data = await parseResponse<ApiUser>(res, "Unable to load user");
  return mapUser(data);
}
