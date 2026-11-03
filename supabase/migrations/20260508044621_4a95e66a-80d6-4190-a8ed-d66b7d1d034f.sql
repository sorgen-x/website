CREATE TABLE public.saved_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  model_id TEXT NOT NULL,
  exterior_id TEXT NOT NULL,
  interior_id TEXT NOT NULL,
  addon_ids TEXT[] NOT NULL DEFAULT '{}',
  total_price NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.saved_configurations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own saved configuration"
ON public.saved_configurations FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own saved configuration"
ON public.saved_configurations FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own saved configuration"
ON public.saved_configurations FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved configuration"
ON public.saved_configurations FOR DELETE
USING (auth.uid() = user_id);

CREATE TRIGGER update_saved_configurations_updated_at
BEFORE UPDATE ON public.saved_configurations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
