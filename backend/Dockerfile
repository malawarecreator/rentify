FROM golang:latest AS builder
LABEL authors="benjaminliu"

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -o rentify_backend .


FROM alpine:latest
EXPOSE 8080

RUN adduser -S appuser
USER appuser

WORKDIR /app

COPY --from=builder /app/rentify_backend .

CMD ["./rentify_backend"]

