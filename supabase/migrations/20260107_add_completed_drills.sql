-- Migration: Add completed_drills to profiles table
-- Date: 2026-01-07

ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS completed_drills JSONB DEFAULT '[]'::jsonb;

-- Comment: This column stores IDs of completed training drills 
-- to track first-time XP rewards vs repeat practice.
