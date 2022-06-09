package main

import (
	"log"

	lp "github.com/LdDl/fiber-long-poll/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/monitor"
	"github.com/gofiber/template/html"
)

func main() {
	// Initialize standard Go html template engine
    engine := html.New("./views", ".html")

	app := fiber.New(fiber.Config{
        Views: engine,
    })

	manager, err := lp.StartLongpoll(lp.Options{
		LoggingEnabled:                 false,
		MaxLongpollTimeoutSeconds:      120,
		MaxEventBufferSize:             100,
		EventTimeToLiveSeconds:         60 * 2,
		DeleteEventAfterFirstRetrieval: false,
	})
	if err != nil {
		log.Printf("Failed to create manager: %q", err)
		return
	}
	defer manager.Shutdown()

	app.Static("/", "./public")

	app.Get("/metrics", monitor.New(monitor.Config{Title: "MyService Metrics Page"})) //monitor page - https://docs.gofiber.io/api/middleware/monitor

	app.Get("/", func(c *fiber.Ctx) error {
        // Render index template
        return c.Render("index", fiber.Map{
            "Title": "Long Polling - Chat",
        })
    })
	app.Get("/sub", GetMessages(manager))
	app.Post("/pub", generatingMessages(manager))

	// 404 Handler
	app.Use(func(c *fiber.Ctx) error {
		return c.SendStatus(404) // => 404 "Not Found"
	})

	log.Fatal(app.Listen(":3000"))
}

// GetMessages Long polling request
func GetMessages(manager *lp.LongpollManager) func(ctx *fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		ctx.Context().PostArgs().Set("timeout", "15")
		ctx.Context().PostArgs().Set("category", "chat_lp")
		return manager.SubscriptionHandler(ctx)
	}
}

// generatingMessages Generate some messages
func generatingMessages(manager *lp.LongpollManager) func(ctx *fiber.Ctx) error {
	return func(ctx *fiber.Ctx) error {
		message := string(ctx.Body())
		if message != ""  {
			manager.Publish("chat_lp", message)
		}
        return ctx.SendString("POST request")
	}
}
