import requests
from dotenv import load_dotenv
import os

load_dotenv()

def generate_itinerary(destination: str, days: int):
    """Generate itinerary using Hugging Face API"""
    API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1"
    headers = {"Authorization": f"Bearer {os.getenv('HF_API_KEY')}"}
    
    prompt = (
        f"Create a detailed {days}-day travel itinerary for {destination}. "
        "Include morning, afternoon, and evening activities each day. "
        "Suggest specific restaurants and notable attractions. "
        "Format each day clearly with headings."
    )
    
    response = requests.post(
        API_URL,
        headers=headers,
        json={"inputs": prompt}
    )
    
    return response.json()[0]['generated_text']