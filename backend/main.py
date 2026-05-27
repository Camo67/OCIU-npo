import os
from fastapi import FastAPI, Depends, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import asyncio
from typing import List, AsyncGenerator
from backend.api.endpoints import api_router
from backend.api.business_suite import business_suite_router
from backend.api.gemini_proxy import gemini_router
from backend.api.billing import billing_router
from backend.middleware.subscription import subscription_middleware
from backend.services.sse import sse_manager

load_dotenv()

app = FastAPI(title="CamoFlow OS API")
app.include_router(api_router, prefix="/api")
app.include_router(business_suite_router, prefix="/business-suite")
app.include_router(gemini_router, prefix="/api/gemini")
app.include_router(billing_router, prefix="/api/billing")

app.middleware("http")(subscription_middleware)

# Get allowed origins from environment variable, default to localhost for development
allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-User-Id"],
    expose_headers=["X-Request-Id"],
    max_age=600,
)

@app.get("/")
async def root():
    return {"message": "CamoFlow OS Orchestration Layer Running"}

@app.get("/health")
async def health():
    return {"status": "healthy"}

@app.get("/api/events")
async def events(request: Request):
    return StreamingResponse(sse_manager.subscribe(), media_type="text/event-stream")

@app.on_event("startup")
async def startup_event():
    import threading
    from backend.services.self_healing import start_self_heal
    threading.Thread(target=start_self_heal, daemon=True).start()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
