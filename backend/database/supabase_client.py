import os
from supabase import create_client, Client
from typing import Optional
import logging
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables first
ROOT_DIR = Path(__file__).parent.parent
load_dotenv(ROOT_DIR / '.env')

logger = logging.getLogger(__name__)

class SupabaseClient:
    """Supabase client wrapper for database operations"""
    
    def __init__(self):
        self.url = os.environ.get('SUPABASE_URL')
        self.service_key = os.environ.get('SUPABASE_SERVICE_KEY')
        self.anon_key = os.environ.get('SUPABASE_ANON_KEY')
        
        # Debug logging
        logger.info(f"SUPABASE_URL: {self.url}")
        logger.info(f"SUPABASE_SERVICE_KEY present: {bool(self.service_key)}")
        logger.info(f"SUPABASE_ANON_KEY present: {bool(self.anon_key)}")
        
        if not all([self.url, self.service_key, self.anon_key]):
            raise ValueError(f"Missing Supabase configuration. URL: {bool(self.url)}, Service: {bool(self.service_key)}, Anon: {bool(self.anon_key)}")
        
        # Use service key for backend operations (full access)
        self.client: Client = create_client(self.url, self.service_key)
        
        # Anon client for public operations
        self.anon_client: Client = create_client(self.url, self.anon_key)
    
    def get_client(self, use_service_key: bool = True) -> Client:
        """Get Supabase client instance
        
        Args:
            use_service_key: If True, return service key client (full access)
                           If False, return anon key client (limited access)
        """
        return self.client if use_service_key else self.anon_client

# Global instance
supabase_client = SupabaseClient()