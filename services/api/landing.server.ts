import { createClient } from '@/lib/supabase/server';
import type { LandingConfig } from '@/lib/config/landing';
import { defaultLandingConfig } from '@/lib/config/landing';

export async function getLandingConfig(): Promise<LandingConfig> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('landing_config')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching landing config:', error);
    return defaultLandingConfig;
  }

  return data.config as LandingConfig;
} 