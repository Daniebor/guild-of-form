-- Migration: Add completed_practices to profiles table
-- Date: 2026-01-07

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS completed_practices JSONB DEFAULT '[]'::jsonb;

-- Comment: This column stores stable IDs for completed practice items 
-- in the format "node-id-practice-index".
