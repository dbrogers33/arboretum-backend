const { google } = require('googleapis');
const express = require('express');
const router = express.Router()

const SCOPES = 'https://www.googleapis.com/auth/calendar.readonly'
const GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCtcqA0WkVe8gZc\nIa7pLytZUvZHS5wWJPJrhTioeFecZbr7B/HAb4FLxdK0AxkvIvKQgtOJFn/iyJmu\nSJ+ivIlf4CrEMV1dkyYRhcKakKTiyBsu5gKnbMOTsqq8kER5tKP5TCoKsPCpO0QT\n8y0GD3v5yXADYNjndlmKtI+zhlhHkE5q0bz8cWmvW+RfxOtL07EE0KptS937koTt\n6JHtRUQ9VLaqPNiW3OfSu72PJX08qSuCOCthhYUmlY0Rw6fJiIwAYNB+cBXuKMAx\no984SqlStJF55LA+TOUYME+ONcieyLsLDf17w8MB55kl7d/ksgaiIld8Cn+Bs0Yc\n3yffN7/3AgMBAAECggEAEwwcdcNYDOYtNp7oU2k/rG6E5y1xdakXCiG2KCIXFPDD\nCOBFdymHnGecDPKuKFQBKUeErXBQGPqIjfAhv8BOob2/VI5LP4RyUMhMp6asxM7O\n1Wai8fnqvGSJhW2eZ3Mj8rOfhk8KDruYbUxuLFU0+yhY6bYP+9MuYCIWCdP+C9Wp\nXPrrEdcFPnyAalGwzROFVvav/MDBS6RoOFNzCI+hNVtwVwBVyCT7m5a1FzmSS6Kk\nv7XZ2pb9npzsJ+n7xHlRVt2Sg//p6fiDnIpVOXQSucG203aGWgCZz/ezO3uS6uhR\n/5emCdU0hPvzBHAoWNdhI/i/zYvhez9ZTBfK8sPVOQKBgQDyCLnen65nzD2ZUg8z\nqcIxltkRrmGWuSBZ1H6FYk4ZAhUGj3GXAqYBXeNVKC4AfeCrRtDaUhulfOcNLtiV\n7XdWdmDHqjMhpGchJ7ZC13HU8ifYkcIj8fe5iPqERu+oS9OW65OXI87uxHwUlEqe\nNxwk7MBqBE0n4EeiUFoQEoxsLQKBgQC3dMH24QJa7/fhc5RiM4osWwHXuajvEQOD\niWbMn1v7x/Ex4qPQ+05HXYkY56MGUvi4feYa3u/J6GiTkAjISKkZ7hAQK/mWR5tc\nxOxyBYb5zaDetjecv54z5fKzgspBh5fhAThk8HAafBQM3F1naxQfIEaCyBq2q4dL\nUdWfce/fMwKBgDgs9E8KiuVGj0mFtUeNcCgoVet3qOjdwPd4jYER5wSA6jZilr+w\n+qy4iOob8Elm7f1y60iw4//N9Kanp9dsjVVBFodhJor5aIJWgEQVUzNUnRD0C7Zi\nE9g5RcPr3vYV219dAB2FTyM18YKpRIRiUCL13Fb+9pV5xcaTlcPDOlplAoGAU445\nHZFj+jkbhDKZHZTt1L/qee+UkrYEDK/TA1V9lpJ9N0RLak5bW8OtQouVw7ack6K7\n3/cz7ZkNsE/EwDvf0PCNnl/5AEpC56DFNDVyQWo3X9hMQfdAPdD4lmv2ZJw2P4PH\nxKmB1X43v5fKbuTlODwCAWTUTeiX6WUvT7ycDOMCgYEAojR+8jLI2ikdE2BjlBY3\nrgCOOZhQEfk2tYA+1HHcTNfbjS/JN/NVSphfMP867Nd8qCKozxENpJZ+Jvc962ge\nPClVbAFN1hFyH12yGU+FjyCIKxbFi/l6v/1WXm4p0Of0WD+Has2lzreC4wfjUAa2\nodA/eVUb60lytJqKM9OVutc=\n-----END PRIVATE KEY-----\n"
const GOOGLE_CLIENT_EMAIL = "denham@quickstart-1574277616312.iam.gserviceaccount.com"
const GOOGLE_PROJECT_NUMBER = "492258930533"
const GOOGLE_CALENDAR_ID = "denhamrogers10@gmail.com"

// https://dev.to/megazear7/google-calendar-api-integration-made-easy-2a68
router.get('/', (req, res) => {
    const jwtClient = new google.auth.JWT(
      GOOGLE_CLIENT_EMAIL,
      null,
      GOOGLE_PRIVATE_KEY,
      SCOPES
    );
  
    const calendar = google.calendar({
      version: 'v3',
      project: GOOGLE_PROJECT_NUMBER,
      auth: jwtClient
    });
  
    calendar.events.list({
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: (new Date()).toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    }, (error, result) => {
      if (error) {
        res.send(JSON.stringify({ error: error }));
      } else {
        if (result.data.items.length) {
          res.send(( result.data.items ));
        } else {
          res.send(JSON.stringify({ message: 'No upcoming events found.' }));
        }
      }
    });
  });

  module.exports = router;