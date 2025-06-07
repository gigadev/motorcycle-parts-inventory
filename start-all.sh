#!/bin/bash
# Start both backend and Angular frontend in parallel

# Start backend in a new terminal tab/window if possible, otherwise in background
(cd backend && npm start &)

# Wait a bit to ensure backend starts before frontend
sleep 2

# Start Angular frontend
npx ng serve
