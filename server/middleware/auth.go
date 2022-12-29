package middleware

import (
	"fmt"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

type CustomClaims struct {
	UserID   string `json:"id"`
	Username string `json:"username"`
	jwt.RegisteredClaims
}

var jwtKey = []byte("jwtKey")

// Generates a JWT
func GenerateJWT(id, username string) (string, error) {

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &CustomClaims{
		UserID:   id,
		Username: username,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(10 * time.Minute)),
		},
	})

	// Signing the token
	tokenString, err := token.SignedString(jwtKey)

	if err != nil {
		return "Signing Error", err
	}

	return tokenString, nil
}

// Checks if given token string is valid
func ValidateToken(tokenString string) (*jwt.Token, error) {
	return jwt.Parse(tokenString, func(tokenString *jwt.Token) (interface{}, error) {
		_, hasError := tokenString.Method.(*jwt.SigningMethodHMAC)
		if !hasError {
			return nil, fmt.Errorf("unauthorised signing in error")
		}

		return []byte(jwtKey), nil
	})
}

// Check if user is authenticated before allowing access to other endpoints
// Takes in a handler, and verifies the request, returns handler if authorised (token is valid)
func CheckAuthJWT(endpoint func(w http.ResponseWriter, r *http.Request)) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		// Checks if token is present in cookie
		cookie, err := r.Cookie("token")

		if err != nil {
			w.WriteHeader(401)
			w.Write([]byte("Unsuccessful signing in. Token Absent."))
			return
		}

		tokenString := cookie.Value
		token, err := ValidateToken(tokenString)

		// Checks if there's an error from parsing the token string
		if err != nil {
			w.WriteHeader(401)
			w.Write([]byte("Unsuccessful signing in. Error in Parsing of Token."))
			return
		}

		// Checks if token is valid
		if !token.Valid {
			w.WriteHeader(401)
			w.Write([]byte("Unsuccessful signing in. Invalid Token."))
			return
		}

		// Extends expiry of cookie when authenticated
		RefreshJWT(w, r)

		endpoint(w, r)
	}
}

// Extract user id and username from the token
func ExtractClaims(w http.ResponseWriter, r *http.Request) (string, string, error) {
	cookie, _ := r.Cookie("token")
	tokenString := cookie.Value
	token, err := ValidateToken(tokenString)

	// Checks for Error in claims
	claims, noError := token.Claims.(jwt.MapClaims)
	if !noError {
		w.WriteHeader(401)
		w.Write([]byte("Unsuccessful extraction of claims. Invalid Token."))
		return "", "", err
	}

	return claims["id"].(string), claims["username"].(string), nil
}

// Extends Expiry of cookie
func RefreshJWT(w http.ResponseWriter, r *http.Request) {
	cookie, _ := r.Cookie("token")
	tokenString := cookie.Value

	// Extends expiry of cookie back by 10 minutes
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		MaxAge:  600,
		Expires: time.Now().Add(10 * time.Minute),
		Path:    "/",
	})
}
