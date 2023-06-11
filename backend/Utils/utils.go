package utils

import "log"

func Log(endp string) {
	log.Printf("Requested : <%s>\n", endp)
}
