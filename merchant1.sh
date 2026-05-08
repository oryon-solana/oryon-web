#!/bin/bash

ADDRESS="983SxHoiFtZNHZZSKeDzwihX5WVSbt9xSfZw2ZTZ77Sm"


curl -X PATCH https://merchant-1.vercel.app/api/points/wallet/${ADDRESS} \
  -H "Content-Type: application/json" \
  -d '{"points":100}'