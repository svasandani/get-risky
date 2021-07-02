package util

import (
	"testing"
)

func TestHashAndSalt(t *testing.T) {
	password := "get_risky"

	t.Run("password should be obfuscated", func(t *testing.T) {
		got, _ := HashAndSalt(password)
		if got == password {
			t.Errorf("salted+hashed password == password = %t, want false", got == password)
		}
	})
}

func cuuid(t *testing.T, max int) <-chan string {
	out := make(chan string)
	go func() {
		for i := 0; i < max; i++ {
			t.Logf("Generated concurrent UUID #%d", i+1)
			out <- UUID()
		}
		close(out)
	}()
	return out
}

func TestUUID(t *testing.T) {
	suuid1 := UUID()
	suuid2 := UUID()

	t.Run("sequential UUIDs should be different", func(t *testing.T) {
		got := suuid1 == suuid2
		if got {
			t.Errorf("uuid_1 == uuid_2 = %t, want false", got)
		}
	})

	out := cuuid(t, 2)
	cuuid1 := <-out
	cuuid2 := <-out

	t.Run("concurrent UUIDs should be different", func(t *testing.T) {
		got := cuuid1 == cuuid2
		if got {
			t.Errorf("uuid_1 == uuid_2 = %t, want false", got)
		}
	})
}
