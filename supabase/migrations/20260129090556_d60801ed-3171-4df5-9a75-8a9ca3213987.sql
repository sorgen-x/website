-- Create health profiles table for storing user health data
CREATE TABLE public.health_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  -- Basic health metrics
  age INTEGER,
  gender TEXT,
  height NUMERIC,
  weight NUMERIC,
  -- Sleep related
  avg_sleep_hours NUMERIC,
  sleep_quality_score INTEGER,
  -- Stress & lifestyle
  stress_level INTEGER,
  exercise_frequency INTEGER,
  caffeine_intake INTEGER,
  screen_time_hours NUMERIC,
  -- Health conditions
  health_conditions TEXT[],
  -- Calculated scores
  overall_health_score INTEGER,
  sleep_health_score INTEGER,
  stress_management_score INTEGER,
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Create intervention recommendations table
CREATE TABLE public.intervention_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  health_profile_id UUID REFERENCES public.health_profiles(id) ON DELETE CASCADE,
  -- Recommendation details
  intervention_type TEXT NOT NULL,
  priority INTEGER NOT NULL DEFAULT 1,
  title TEXT NOT NULL,
  description TEXT,
  expected_improvement TEXT,
  -- Causal model data
  causal_factors JSONB,
  predicted_effectiveness NUMERIC,
  -- Status tracking
  status TEXT NOT NULL DEFAULT 'pending',
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.health_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intervention_recommendations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for health_profiles
CREATE POLICY "Users can view their own health profile"
ON public.health_profiles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own health profile"
ON public.health_profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own health profile"
ON public.health_profiles
FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for intervention_recommendations
CREATE POLICY "Users can view their own recommendations"
ON public.intervention_recommendations
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own recommendations"
ON public.intervention_recommendations
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own recommendations"
ON public.intervention_recommendations
FOR UPDATE
USING (auth.uid() = user_id);

-- Add trigger for automatic timestamp updates
CREATE TRIGGER update_health_profiles_updated_at
BEFORE UPDATE ON public.health_profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_intervention_recommendations_updated_at
BEFORE UPDATE ON public.intervention_recommendations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
